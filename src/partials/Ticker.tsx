'use client'

import { Shuffle, RefreshCw } from 'lucide-react'
import { useState, useEffect, useCallback, useRef } from 'react'

import { getTickerContent } from '@/actions/ticker'
import { Ticker as TickerType } from '@/actions/ticker/types'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function Ticker() {
  const [items, setItems] = useState<TickerType.Item[]>([])
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const initialFetchDone = useRef(false)

  const fetchTickerContent = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getTickerContent()
      setItems(data)
      setCurrentItemIndex(Math.floor(Math.random() * data.length))
    } catch {
      setError('Failed to load ticker content')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const shuffleItem = useCallback(() => {
    setCurrentItemIndex((prevIndex) => {
      if (items.length <= 1) return prevIndex
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * items.length)
      } while (newIndex === prevIndex)
      return newIndex
    })
  }, [items.length])

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchTickerContent()
      initialFetchDone.current = true
    }

    // Set up interval for shuffling
    intervalRef.current = setInterval(shuffleItem, 120000) // 2 minutes

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchTickerContent, shuffleItem])

  const currentItem = items[currentItemIndex]

  return (
    <div
      className="bg-white dark:bg-slate-700 border-b border-gray-200 dark:border-slate-500 flex flex-col md:flex-row md:h-[73px] md:fixed md:top-0 md:right-0 z-10"
      style={{
        left: 'var(--nav-width)',
        transition: 'left 0.3s ease'
      }}
      data-testid="ticker-strip"
    >
      {/* News content */}
      <div className="flex-1 p-4 md:py-0 md:pl-8 md:pr-4 flex items-center h-[73px]">
        {isLoading ? (
          <Skeleton className="h-6 w-full" />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          currentItem && (
            <div className="flex gap-2 text-sm max-w-full">
              <span className="font-bold uppercase">{currentItem.type}:</span>
              {currentItem.url ? (
                <a
                  href={currentItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:truncate hover:underline"
                >
                  {currentItem.title}
                </a>
              ) : (
                <p className="sm:truncate">{currentItem.title}</p>
              )}
            </div>
          )
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center p-4 md:pr-4 md:pl-0">
        {/* Desktop buttons */}
        <div className="hidden md:flex gap-2">
          <Button variant="ghost" size="icon" onClick={shuffleItem} disabled={isLoading || items.length === 0}>
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={fetchTickerContent} disabled={isLoading}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile buttons */}
        <div className="flex md:hidden w-full gap-2">
          <Button variant="outline" className="flex-1" onClick={shuffleItem} disabled={isLoading || items.length === 0}>
            <Shuffle className="h-4 w-4" />
            Shuffle
          </Button>
          <Button variant="outline" className="flex-1" onClick={fetchTickerContent} disabled={isLoading}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  )
}
