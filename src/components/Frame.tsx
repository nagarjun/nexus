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
    <div className="flex h-screen overflow-hidden" data-testid="frame">
      <Nav />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="bg-white dark:bg-slate-600 border-b border-gray-200 dark:border-slate-500 h-[73px] flex items-center pl-8 pr-4">
          <div className="flex gap-2 text-sm">
            <span className="font-bold uppercase">News:</span>
            <p>
              Indian origin entrepreneur sells company for $900 million, buys iconic townhouse in the Upper West Side
            </p>
          </div>
        </div>
        <div className={`${disablePadding ? '' : 'p-4'}`} data-testid="frame-content">
          {children}
        </div>
      </div>
    </div>
  )
}
