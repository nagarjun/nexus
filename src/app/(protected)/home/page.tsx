'use client'

import { useEffect, useState } from 'react'

import { getRandomQuote } from '@/actions/quotes/getRandomQuote'
import { Quote } from '@/actions/quotes/types'
import { QuoteCard } from '@/app/(protected)/quote-library/QuoteCard'
import { AppName } from '@/app/apps'
import { PageHeader, ContentContainer } from '@/partials'

export default function Dashboard() {
  const [quote, setQuote] = useState<Quote.QuoteRowWithAuthorAndCategories>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuote = async () => {
      const result = await getRandomQuote()
      if (result.success && result.quote) {
        setQuote(result.quote)
      }
      setLoading(false)
    }

    fetchQuote()
  }, [])

  return (
    <>
      <PageHeader appName={AppName.Home} />
      <ContentContainer>
        <div className="w-full max-w-[350px]">
          <QuoteCard quote={quote} loading={loading} />
        </div>
      </ContentContainer>
    </>
  )
}
