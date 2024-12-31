'use client'

import { useState, useEffect, useRef } from 'react'

import { listQuotes, Quote } from '@/actions/quotes'
import { AppName } from '@/app/apps'
import { PageHeader } from '@/app/partials/PageHeader'
import { Button, Label } from '@/components/ui'
import { Frame, ContentContainer } from '@/partials'

import { AddQuoteDialog } from './AddQuoteDialog'
import { AuthorsSelector } from './AuthorsSelector'
import { QuoteCard } from './QuoteCard'

export default function QuotesLibrary() {
  const [quotes, setQuotes] = useState<Quote.QuoteRowWithAuthorAndCategories[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const initialFetchDone = useRef(false)

  const fetchQuotes = async (pageToFetch: number) => {
    if (pageToFetch === 1 && initialFetchDone.current) return

    try {
      setLoading(true)
      const result = await listQuotes({ page: pageToFetch, limit: 25 })
      if (result.success) {
        setQuotes((prevQuotes) => {
          if (pageToFetch === 1) {
            initialFetchDone.current = true
            return result.quotes
          }
          return [...prevQuotes, ...result.quotes]
        })
        setHasMore(result.pagination.hasNextPage)
        setPage(pageToFetch + 1)
      } else {
        setError(result.message || 'Failed to fetch quotes')
      }
    } catch {
      setError('An error occurred while fetching quotes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes(1)
  }, [])

  const handleShowMore = () => {
    if (!loading && hasMore) {
      fetchQuotes(page)
    }
  }

  return (
    <Frame title={AppName.QuoteLibrary} disablePadding>
      <PageHeader appName={AppName.QuoteLibrary}>
        <AddQuoteDialog />
      </PageHeader>
      <ContentContainer noPadding>
        <div className="flex flex-col sm:flex-row h-full">
          {/* Left column - Filters */}
          <div className="w-full sm:w-[300px] p-4 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-slate-500">
            <h2 className="text-lg mb-4 text-gray-800 dark:text-slate-200">Filters</h2>
            <Label>Author</Label>
            <AuthorsSelector onSelect={() => {}} />
          </div>

          {/* Right column - Quotes */}
          <div className="pb-28 sm:pb-4 sm:flex-1 p-4 overflow-y-auto">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {loading && !initialFetchDone.current
                ? Array.from({ length: 10 }).map((_, index) => (
                    <div key={`loading-${index}`} className="break-inside-avoid mb-4">
                      <QuoteCard loading />
                    </div>
                  ))
                : quotes.map((quote) => (
                    <div key={quote.id} className="break-inside-avoid mb-4">
                      <QuoteCard quote={quote} />
                    </div>
                  ))}
              {error && <div className="col-span-full text-center text-red-500">{error}</div>}
              {!loading && !error && quotes.length === 0 && (
                <div className="col-span-full text-center text-gray-500">No quotes found.</div>
              )}
            </div>
            {initialFetchDone.current && hasMore && (
              <div className="mt-10 mb-5 text-center">
                <Button onClick={handleShowMore} disabled={loading} loading={loading} variant="secondary" size="lg">
                  Show More
                </Button>
              </div>
            )}
          </div>
        </div>
      </ContentContainer>
    </Frame>
  )
}
