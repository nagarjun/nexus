'use server'

import { getPgClient } from '../../../lib/pg'

import { Quote } from './types'

export async function createQuote(input: Quote.CreateQuoteInput): Promise<Quote.CreateQuoteResult> {
  const client = await getPgClient()

  try {
    await client.query('BEGIN')

    // Insert quote and get or create author in a single query
    const quoteResult = await client.query<Quote.QuoteRow>(
      `INSERT INTO "quotes" (quote, "authorId", source, url)
       VALUES ($1, (SELECT get_or_create_author($2)), $3, $4)
       RETURNING *`,
      [input.quote, input.authorName, input.source, input.url],
    )
    const newQuote = quoteResult.rows[0]

    // Insert categories
    if (input.categories.length > 0) {
      const categoryValues = input.categories
        .map((_, index) => `($1, (SELECT get_or_create_category($${index + 2})))`)
        .join(', ')
      const categoryQuery = `
        INSERT INTO "quotesCategoriesJunction" ("quoteId", "categoryId")
        VALUES ${categoryValues}
      `
      await client.query(categoryQuery, [newQuote.id, ...input.categories])
    }

    await client.query('COMMIT')

    return {
      success: true,
      message: 'Quote created successfully',
      quote: newQuote,
    }
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error creating quote:', error)
    return {
      success: false,
      message: 'Failed to create quote',
    }
  } finally {
    client.release()
  }
}
