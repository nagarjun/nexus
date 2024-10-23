'use client'

import { useEffect, PropsWithChildren } from 'react'

import { Nav } from './Nav'

interface FrameProps {
  title?: string
  disablePadding?: boolean
}

export function Frame({ title, disablePadding = false, children }: PropsWithChildren<FrameProps>) {
  useEffect(() => {
    document.title = title ? `${title} - Nexus` : 'Nexus'
  }, [title])

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden" data-testid="frame">
      <div className="w-full md:w-auto" data-testid="frame-left">
        <Nav />
      </div>
      <div className="flex flex-col flex-1 min-h-full overflow-y-auto" data-testid="frame-right">
        <div
          className="hidden md:flex bg-white dark:bg-slate-700 border-b border-gray-200 dark:border-slate-500 h-[73px] items-center pl-8 pr-4"
          data-testid="ticker-strip"
        >
          <div className="flex gap-2 text-sm">
            <span className="font-bold uppercase">News:</span>
            <p>
              Indian origin entrepreneur sells company for $900 million, buys iconic townhouse in the Upper West Side
            </p>
          </div>
        </div>
        <div className={`flex flex-col flex-grow ${disablePadding ? '' : 'p-4'}`} data-testid="frame-content">
          {children}
        </div>
      </div>
    </div>
  )
}
