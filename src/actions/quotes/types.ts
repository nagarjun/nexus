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
}
