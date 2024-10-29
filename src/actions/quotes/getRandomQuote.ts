'use server'

import { getPgClient } from '../../../lib/pg'

import { Quote } from './types'

type GetRandomQuoteResult = {
  success: boolean
  message?: string
  quote?: Quote.QuoteRowWithAuthorAndCategories
}

export async function getRandomQuote(): Promise<GetRandomQuoteResult> {
  const client = await getPgClient()

  try {
    const query = `
      SELECT q.*, a.name AS "authorName",
             array_agg(DISTINCT c.name) AS categories
      FROM quotes q
      JOIN "quoteAuthors" a ON q."authorId" = a.id
      LEFT JOIN "quotesCategoriesJunction" qcj ON q.id = qcj."quoteId"
      LEFT JOIN "quoteCategories" c ON qcj."categoryId" = c.id
      GROUP BY q.id, a.name
      ORDER BY RANDOM()
      LIMIT 1
    `

    const result = await client.query<Quote.QuoteRowWithAuthorAndCategories>(query)

    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'No quotes found',
      }
    }

    return {
      success: true,
      quote: result.rows[0],
    }
  } catch (error) {
    console.error('Error fetching random quote:', error)
    return {
      success: false,
      message: 'Failed to fetch random quote',
    }
  } finally {
    client.release()
  }
}
