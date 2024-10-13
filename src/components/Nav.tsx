'use client'

import classNames from 'classnames'
import {
  Shrink,
  Home,
  LayoutGrid,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Book,
  Plane,
  Quote,
  Printer,
  Twitter,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { useDarkMode } from '@/app/hooks/useDarkMode'

import { NavItem } from './NavItem'

interface NavItem {
  name: string
  icon: React.ElementType
  path: string
}

const navItems: NavItem[] = [
  { name: 'Home', icon: Home, path: '/home' },
  { name: 'All Apps', icon: LayoutGrid, path: '/apps' },
]

const favoriteApps: NavItem[] = [
  { name: 'Flight Log', icon: Plane, path: '/flight-log' },
  { name: 'Journal', icon: Book, path: '/journal' },
  { name: 'Quotes Library', icon: Quote, path: '/quotes-library' },
]

const shortcuts: NavItem[] = [
  { name: 'Print Daily Briefing', icon: Printer, path: '#' },
  { name: 'Tweet Composer', icon: Twitter, path: '#' },
]

export function Nav() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [isExpanded, setIsExpanded] = useState(true)
  const pathname = usePathname()

  const handleShortcutClick = (name: string) => {
    alert(name)
  }

  return (
    <nav
      className={classNames(
        'flex flex-col h-screen bg-white dark:bg-slate-600 border-r border-gray-200 dark:border-slate-500 transition-all duration-300 relative',
        isExpanded ? 'w-64' : 'w-[76px]',
      )}
      data-testid="nav-menu"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-500">
        <div className="flex items-center">
          <div className="bg-indigo-600 dark:bg-slate-700 p-2 rounded">
            <Shrink className="w-6 h-6 text-white stroke-1" />
          </div>
          {isExpanded && (
            <span className="ml-3 text-sm font-bold text-gray-800 dark:text-slate-200 uppercase">Nexus</span>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            name={item.name}
            icon={item.icon}
            path={item.path}
            isActive={pathname.includes(item.path)}
            isExpanded={isExpanded}
            data-testid={`nav-link-${item.name.toLowerCase()}`}
          />
        ))}
        <div className={classNames('mt-4 mb-2', !isExpanded && 'border-t border-gray-200 dark:border-slate-500 pt-4')}>
          {isExpanded && (
            <h3 className="mt-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase mb-2">
              Favorite Apps
            </h3>
          )}
          {favoriteApps.map((item) => (
            <NavItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              path={item.path}
              isActive={pathname.includes(item.path)}
              isExpanded={isExpanded}
              data-testid={`nav-link-${item.name.toLowerCase()}`}
            />
          ))}
        </div>

        <div className={classNames('mt-4 mb-2', !isExpanded && 'border-t border-gray-200 dark:border-slate-500 pt-4')}>
          {isExpanded && (
            <h3 className="mt-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase mb-2">Shortcuts</h3>
          )}
          {shortcuts.map((item) => (
            <NavItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              onClick={() => handleShortcutClick(item.name)}
              isExpanded={isExpanded}
              data-testid={`shortcut-${item.name.toLowerCase().replace(' ', '-')}`}
            />
          ))}
        </div>
      </div>
      <div className="p-4">
        <NavItem
          name={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          icon={isDarkMode ? Sun : Moon}
          onClick={toggleDarkMode}
          isExpanded={isExpanded}
          data-testid="dark-mode-toggle"
        />
      </div>
      <button
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
        className="absolute -right-[0.9rem] top-[1.4rem] bg-white dark:bg-slate-600 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 border border-gray-200 dark:border-slate-500"
        data-testid="toggle-expand-button"
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </nav>
  )
}
