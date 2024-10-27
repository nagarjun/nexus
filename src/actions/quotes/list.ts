'use server'

import { getPgClient } from '../../../lib/pg'

import { Quote } from './types'

export async function listQuotes(input: Quote.ListQuotesInput): Promise<Quote.ListQuotesResult> {
  const client = await getPgClient()

  try {
    const limit = input.limit || 10
    const offset = input.page ? (input.page - 1) * limit : 0
    const orderBy = input.orderBy || 'createdAt'
    const orderDirection = input.orderDirection || 'DESC'

    let query = `
      SELECT q.*, a.name AS "authorName", 
             array_agg(DISTINCT c.name) AS categories
      FROM quotes q
      JOIN "quoteAuthors" a ON q."authorId" = a.id
      LEFT JOIN "quotesCategoriesJunction" qcj ON q.id = qcj."quoteId"
      LEFT JOIN "quoteCategories" c ON qcj."categoryId" = c.id
    `

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryParams: any[] = []
    const whereConditions: string[] = []

    if (input.authorId) {
      whereConditions.push(`q."authorId" = $${queryParams.length + 1}`)
      queryParams.push(input.authorId)
    }

    if (input.categories && input.categories.length > 0) {
      const categoryPlaceholders = input.categories.map((_, index) => `$${queryParams.length + index + 1}`).join(', ')
      whereConditions.push(`c.name IN (${categoryPlaceholders})`)
      queryParams.push(...input.categories)
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`
    }

    query += `
      GROUP BY q.id, a.name
      ORDER BY q."${orderBy}" ${orderDirection}
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `

    queryParams.push(limit, offset)

    const result = await client.query<Quote.QuoteRowWithAuthorAndCategories>(query, queryParams)

    const countQuery = `
      SELECT COUNT(DISTINCT q.id) 
      FROM quotes q
      LEFT JOIN "quotesCategoriesJunction" qcj ON q.id = qcj."quoteId"
      LEFT JOIN "quoteCategories" c ON qcj."categoryId" = c.id
      ${whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : ''}
    `

    const countResult = await client.query<{ count: string }>(countQuery, queryParams.slice(0, -2))

    const totalCount = parseInt(countResult.rows[0].count, 10)
    const totalPages = Math.ceil(totalCount / limit)

    return {
      success: true,
      quotes: result.rows,
      pagination: {
        currentPage: input.page || 1,
        totalPages,
        totalCount,
        hasNextPage: (input.page || 1) < totalPages,
        hasPreviousPage: (input.page || 1) > 1,
      },
    }
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return {
      success: false,
      message: 'Failed to fetch quotes',
      quotes: [],
      pagination: {
        currentPage: input.page || 1,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    }
  } finally {
    client.release()
  }
}
