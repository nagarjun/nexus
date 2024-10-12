'use client'

import classNames from 'classnames'
import { Shrink, Home, LayoutGrid, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface NavItem {
  name: string
  icon: React.ElementType
  path: string
}

const navItems: NavItem[] = [
  { name: 'Home', icon: Home, path: '/home' },
  { name: 'Apps', icon: LayoutGrid, path: '/apps' },
]

export function Nav() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const isDark = document.body.classList.contains('dark')
    setIsDarkMode(isDark)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('dark')
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
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
          <Link
            key={item.name}
            href={item.path}
            className={classNames(
              'flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-700 font-medium text-xs uppercase rounded-md transition-colors duration-200 group',
              {
                'bg-indigo-100 border border-indigo-400 dark:bg-slate-700 dark:border-slate-500': pathname.includes(
                  item.path,
                ),
                'justify-center w-10 h-10': !isExpanded,
              },
            )}
            data-testid={`nav-link-${item.name.toLowerCase()}`}
          >
            <item.icon
              className={classNames('w-5 h-5 stroke-1 flex-shrink-0', {
                'm-0': !isExpanded,
                'text-indigo-600 dark:text-slate-200': pathname.includes(item.path),
              })}
            />
            {isExpanded && (
              <span
                className={classNames('ml-3', {
                  'text-indigo-600 dark:text-slate-200': pathname.includes(item.path),
                })}
              >
                {item.name}
              </span>
            )}
          </Link>
        ))}
      </div>
      <div className="p-4">
        <button
          className={classNames(
            'flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-700 font-medium text-xs uppercase rounded-md transition-colors duration-200 group',
            { 'justify-center w-10 h-10': !isExpanded },
          )}
          onClick={toggleDarkMode}
          data-testid="dark-mode-toggle"
        >
          {isDarkMode ? (
            <>
              <Sun className={classNames('w-5 h-5 stroke-1 flex-shrink-0', { 'm-0': !isExpanded })} />
              {isExpanded && <span className="ml-3">Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className={classNames('w-5 h-5 stroke-1 flex-shrink-0', { 'm-0': !isExpanded })} />
              {isExpanded && <span className="ml-3 uppercase">Dark Mode</span>}
            </>
          )}
        </button>
      </div>
      <button
        onClick={toggleExpanded}
        className="absolute -right-[0.9rem] top-[1.4rem] bg-white dark:bg-slate-600 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 border border-gray-200 dark:border-slate-500"
        data-testid="toggle-expand-button"
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </nav>
  )
}
