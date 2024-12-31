import { Plane, Book, Quote, BookOpen, List, Link, Home } from 'lucide-react'

export enum AppName {
  Bookmarks = 'Bookmarks',
  Bookshelf = 'Bookshelf',
  FlightLog = 'Flight Log',
  Home = 'Home',
  Journal = 'Journal',
  MonthlyReading = 'Monthly Reading',
  QuoteLibrary = 'Quote Library',
}

export interface App {
  name: AppName
  icon: React.ElementType
  path: string
  description?: string
}

export const apps: Record<AppName, App> = {
  [AppName.Bookmarks]: {
    name: AppName.Bookmarks,
    icon: Link,
    path: '/bookmarks',
    description: 'Track and manage your bookmarks',
  },
  [AppName.Bookshelf]: {
    name: AppName.Bookshelf,
    icon: BookOpen,
    path: '/bookshelf',
    description: 'Track and manage your books',
  },
  [AppName.FlightLog]: {
    name: AppName.FlightLog,
    icon: Plane,
    path: '/flight-log',
    description: 'Track and manage your flight history',
  },
  [AppName.Home]: {
    name: AppName.Home,
    icon: Home,
    path: '/home',
  },
  [AppName.Journal]: {
    name: AppName.Journal,
    icon: Book,
    path: '/journal',
    description: 'Write and organize your personal journal entries',
  },
  [AppName.MonthlyReading]: {
    name: AppName.MonthlyReading,
    icon: List,
    path: '/monthly-reading',
    description: 'Track and manage your monthly reading',
  },
  [AppName.QuoteLibrary]: {
    name: AppName.QuoteLibrary,
    description: 'Store and organize your favorite quotes',
    icon: Quote,
    path: '/quote-library',
  },
}
