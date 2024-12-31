import classNames from 'classnames'
import { Noto_Serif } from 'next/font/google'
import React from 'react'

import { Quote } from '@/actions/quotes/types'
import { Skeleton } from '@/components/ui'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
  style: 'italic',
})

interface QuoteCardProps {
  quote?: Quote.QuoteRowWithAuthorAndCategories
  loading?: boolean
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, loading = false }) => {
  return (
    <div
      className={classNames('p-4 border border-gray-200 dark:border-slate-500 rounded-lg h-full flex flex-col', {
        'transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-slate-700': !loading,
      })}
    >
      {loading ? (
        <>
          <Skeleton className="h-24 w-full mb-4" />
          <Skeleton className="h-4 w-1/2 mt-auto" />
          <Skeleton className="h-3 w-1/3 mt-1" />
        </>
      ) : (
        <>
          <p className={`${notoSerif.className} font-medium text-xl mb-4`}>{quote?.quote}</p>
          {quote?.authorName && <p className="text-gray-600 dark:text-slate-400 text-sm mt-auto">{quote.authorName}</p>}
          {quote?.source && <p className="mt-0.5 text-gray-500 dark:text-slate-500 text-xs">{quote.source}</p>}
        </>
      )}
    </div>
  )
}
