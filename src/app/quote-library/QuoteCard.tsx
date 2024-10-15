import classNames from 'classnames'
import { Noto_Serif } from 'next/font/google'
import React from 'react'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
  style: 'italic',
})

interface QuoteCardProps {
  text: string
  author?: string
  source?: string
  link?: string
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ text, author, source, link }) => {
  const cardContent = (
    <div
      className={classNames('p-4 border border-gray-200 dark:border-slate-500 rounded-lg h-full flex flex-col', {
        'transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-slate-700': link,
      })}
    >
      <p className={`${notoSerif.className} font-medium text-xl mb-4`}>{text}</p>
      {author && <p className="text-gray-600 dark:text-slate-400 text-sm mt-auto">- {author}</p>}
      {source && <p className="mt-0.5 text-gray-500 dark:text-slate-500 text-xs">{source}</p>}
    </div>
  )

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {cardContent}
      </a>
    )
  }

  return cardContent
}
