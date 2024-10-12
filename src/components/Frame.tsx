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
          <span className="text-gray-800 dark:text-slate-200">Ticker Strip</span>
        </div>
        <div className={`${disablePadding ? '' : 'p-4'}`} data-testid="frame-content">
          {children}
        </div>
      </div>
    </div>
  )
}
