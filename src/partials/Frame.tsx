'use client'

import { usePathname } from 'next/navigation'
import { useEffect, PropsWithChildren } from 'react'

import { apps, AppName } from '@/app/apps'

import { Nav } from './Nav'
import { Ticker } from './Ticker'

export function Frame({ children }: PropsWithChildren) {
  const pathname = usePathname()

  useEffect(() => {
    const getTitle = () => {
      let title = ''

      switch (true) {
        case pathname.includes('/home'):
          title = 'Home'
          break
        case pathname.includes(apps[AppName.Bookshelf].path):
          title = apps[AppName.Bookshelf].name
          break
        case pathname.includes(apps[AppName.FlightLog].path):
          title = apps[AppName.FlightLog].name
          break
        case pathname.includes(apps[AppName.Journal].path):
          title = apps[AppName.Journal].name
          break
        case pathname.includes(apps[AppName.MonthlyReading].path):
          title = apps[AppName.MonthlyReading].name
          break
        case pathname.includes(apps[AppName.QuoteLibrary].path):
          title = apps[AppName.QuoteLibrary].name
          break
        default:
          title = 'Nexus'
          break
      }

      return `Nexus - ${title}`
    }

    document.title = getTitle()
  }, [pathname])

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden" data-testid="frame">
      <div className="w-full md:w-auto" data-testid="frame-left">
        <Nav />
      </div>
      <div
        className="flex flex-col flex-1 min-h-full overflow-y-auto md:transition-[margin] md:duration-300"
        style={{
          marginLeft: 'calc(var(--nav-width) * var(--is-desktop, 0))',
        }}
        data-testid="frame-right"
      >
        <div className="md:hidden">
          <Ticker />
        </div>
        <div className="hidden md:block">
          <Ticker />
        </div>
        <div className="flex flex-col flex-grow p-4" data-testid="frame-content">
          {children}
        </div>
      </div>
    </div>
  )
}
