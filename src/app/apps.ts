import { Plane, Book, Quote } from 'lucide-react'

export enum AppName {
  FlightLog = 'Flight Log',
  Journal = 'Journal',
  QuoteLibrary = 'Quote Library',
}

export interface App {
  name: AppName
  icon: React.ElementType
  path: string
  description?: string
}

export const apps: Record<AppName, App> = {
  [AppName.FlightLog]: {
    name: AppName.FlightLog,
    icon: Plane,
    path: '/flight-log',
    description: 'Track and manage your flight history',
  },
  [AppName.Journal]: {
    name: AppName.Journal,
    icon: Book,
    path: '/journal',
    description: 'Write and organize your personal journal entries',
  },
  [AppName.QuoteLibrary]: {
    name: AppName.QuoteLibrary,
    description: 'Store and organize your favorite quotes',
    icon: Quote,
    path: '/quote-library',
  },
}
