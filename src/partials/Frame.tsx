'use client'

import { useEffect, PropsWithChildren } from 'react'

import { Nav } from './Nav'
import { Ticker } from './Ticker'

interface FrameProps {
  title?: string
  disablePadding?: boolean
}

export function Frame({ title, disablePadding = false, children }: PropsWithChildren<FrameProps>) {
  useEffect(() => {
    document.title = title ? `${title} - Nexus` : 'Nexus'
  }, [title])

  return (
    <div 
      className="flex flex-col md:flex-row h-screen overflow-hidden" 
      data-testid="frame"
    >
      <div className="w-full md:w-auto" data-testid="frame-left">
        <Nav />
      </div>
      <div 
        className="flex flex-col flex-1 min-h-full overflow-y-auto md:transition-[margin] md:duration-300"
        style={{
          marginLeft: 'calc(var(--nav-width) * var(--is-desktop, 0))'
        }}
        data-testid="frame-right"
      >
        <div className="md:hidden">
          <Ticker />
        </div>
        <div className="hidden md:block">
          <Ticker />
        </div>
        <div 
          className={`flex flex-col flex-grow ${disablePadding ? '' : 'p-4'}`} 
          data-testid="frame-content"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
