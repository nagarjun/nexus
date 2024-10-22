'use client'

import { Plus } from 'lucide-react'
import { AppName } from '@/app/apps'
import { PageHeader } from '@/app/partials/PageHeader'
import { Button } from '@/components/ui'
import { Frame, ContentContainer } from '@/partials'

import { QuoteCard } from './QuoteCard'

const placeholderQuotes = [
  {
    text: 'When something is important enough, you do it even if the odds are not in your favor.',
    author: 'Elon Musk',
  },
  { text: 'Be the change that you wish to see in the world.', author: 'Mahatma Gandhi' },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: 'Thomas A. Edison' },
  { text: "If you tell the truth, you don't have to remember anything.", author: 'Mark Twain' },
  {
    text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela',
  },
  { text: 'Always forgive your enemies; nothing annoys them so much.', author: 'Oscar Wilde' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'I think, therefore I am.', author: 'René Descartes' },
  { text: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates' },
  {
    text: 'It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.',
    author: 'Maurice Switzer',
  },
]

export default function QuotesLibrary() {
  return (
    <Frame title={AppName.QuoteLibrary} disablePadding>
      <PageHeader appName={AppName.QuoteLibrary}>
        <Button variant="default" onClick={() => {}}>
          <Plus /> Add Quote
        </Button>
      </PageHeader>
      <ContentContainer noPadding>
        <div className="flex flex-col sm:flex-row h-full">
          {/* Left column - Filters */}
          <div className="w-full sm:w-1/5 p-4 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-slate-500">
            <h2 className="text-lg mb-4 text-gray-800 dark:text-slate-200">Filters</h2>
            <p className="text-gray-600 dark:text-slate-400">Filter options will be added here.</p>
          </div>

          {/* Right column - Quotes */}
          <div className="sm:w-4/5 p-4 overflow-y-auto">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {placeholderQuotes.map((quote, index) => (
                <div key={index} className="break-inside-avoid mb-4">
                  <QuoteCard
                    text={quote.text}
                    author={quote.author}
                    link={index % 2 === 0 ? 'https://example.com' : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentContainer>
    </Frame>
  )
}
