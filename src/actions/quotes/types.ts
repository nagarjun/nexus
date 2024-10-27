export namespace Quote {
  export type QuoteRow = {
    id: string // UUID
    quote: string
    authorId: string // UUID
    source?: string
    url?: string
    createdAt: Date
    updatedAt: Date
  }

  export type CreateQuoteInput = {
    quote: string
    authorName: string
    source?: string
    url?: string
    categories: string[]
  }

  export type CreateQuoteResult = {
    success: boolean
    message: string
    quote?: QuoteRow
  }

  export interface ListQuotesInput {
    page?: number
    limit?: number
    orderBy?: 'createdAt' | 'updatedAt'
    orderDirection?: 'ASC' | 'DESC'
    authorId?: number
    categories?: string[]
  }

  export interface QuoteRowWithAuthorAndCategories extends QuoteRow {
    authorName: string
    categories: string[]
  }

  export interface ListQuotesResult {
    success: boolean
    message?: string
    quotes: QuoteRowWithAuthorAndCategories[]
    pagination: {
      currentPage: number
      totalPages: number
      totalCount: number
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
  }
}
