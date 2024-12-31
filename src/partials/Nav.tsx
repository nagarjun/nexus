'use client'

import classNames from 'classnames'
import { Shrink, Home, LayoutGrid, Moon, Sun, ChevronLeft, ChevronRight, Printer, Twitter, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

import { apps, AppName, App } from '@/app/apps'

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

const favoriteApps: App[] = [
  apps[AppName.Bookshelf],
  apps[AppName.FlightLog],
  apps[AppName.Journal],
  apps[AppName.MonthlyReading],
  apps[AppName.QuoteLibrary],
]

const shortcuts: NavItem[] = [
  { name: 'Print Daily Briefing', icon: Printer, path: '#' },
  { name: 'Tweet Composer', icon: Twitter, path: '#' },
]

interface NavContentProps {
  isExpanded: boolean
  pathname: string
  handleShortcutClick: (name: string) => void
  toggleDarkMode: () => void
  isDarkMode: boolean
}

const NavContent = ({ isExpanded, pathname, handleShortcutClick, toggleDarkMode, isDarkMode }: NavContentProps) => (
  <div className="flex flex-col h-full">
    <div className="flex-grow p-4 space-y-2">
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
      {!isExpanded && (
        <div className="my-2">
          <div className="h-px bg-gray-200 dark:bg-slate-500" />
        </div>
      )}
      <div className="flex flex-col space-y-2">
        {isExpanded && (
          <h3 className="mt-6 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase mb-2">Favorite Apps</h3>
        )}
        {favoriteApps.map((item) => (
          <NavItem
            key={item.name}
            name={item.name}
            icon={item.icon}
            path={item.path}
            isActive={pathname.includes(item.path)}
            isExpanded={isExpanded}
            data-testid={`nav-link-${item.name.toLowerCase().replace(' ', '-')}`}
          />
        ))}
      </div>

      {!isExpanded && (
        <div className="my-2">
          <div className="h-px bg-gray-200 dark:bg-slate-500" />
        </div>
      )}
      <div className="flex flex-col space-y-2">
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
    <div className="p-4 mt-auto">
      <NavItem
        name={isDarkMode ? 'Light Mode' : 'Dark Mode'}
        icon={isDarkMode ? Sun : Moon}
        onClick={toggleDarkMode}
        isExpanded={isExpanded}
        data-testid="dark-mode-toggle"
      />
    </div>
  </div>
)

export function Nav() {
  const { theme, setTheme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Adjust breakpoint as needed
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--nav-width', isExpanded ? '256px' : '76px')
  }, [isExpanded])

  const handleShortcutClick = (name: string) => {
    alert(name)
  }

  const MobileNav = () => (
    <nav className="h-[74px] bg-white dark:bg-slate-700 border-b border-gray-200 dark:border-slate-500">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center">
          <div className="bg-indigo-600 dark:bg-slate-800 p-2 rounded">
            <Shrink className="w-6 h-6 text-white stroke-1" />
          </div>
          <span className="ml-3 text-sm font-bold text-gray-800 dark:text-slate-200 uppercase">Nexus</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
          <Menu className="w-6 h-6 text-gray-800 dark:text-slate-200" />
        </button>
      </div>
    </nav>
  )

  const MobileMenu = () => (
    <div
      className={`fixed inset-0 bg-white dark:bg-slate-700 z-50 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
            <X className="w-6 h-6 text-gray-800 dark:text-slate-200" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <NavContent
            isExpanded={true}
            pathname={pathname}
            handleShortcutClick={handleShortcutClick}
            toggleDarkMode={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            isDarkMode={theme === 'dark'}
          />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {isMobile ? (
        <>
          <MobileNav />
          <MobileMenu />
        </>
      ) : (
        <nav
          className={classNames(
            'fixed top-0 left-0 flex flex-col h-screen bg-white dark:bg-slate-700 border-r border-gray-200 dark:border-slate-500 z-20 transition-all duration-300',
            isExpanded ? 'w-64' : 'w-[76px]',
          )}
          data-testid="nav-menu"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-500">
            <div className="flex items-center">
              <div className="bg-indigo-600 dark:bg-slate-800 p-2 rounded">
                <Shrink className="w-6 h-6 text-white stroke-1" />
              </div>
              {isExpanded && (
                <span className="ml-3 text-sm font-bold text-gray-800 dark:text-slate-200 uppercase">Nexus</span>
              )}
            </div>
          </div>
          <NavContent
            isExpanded={isExpanded}
            pathname={pathname}
            handleShortcutClick={handleShortcutClick}
            toggleDarkMode={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            isDarkMode={theme === 'dark'}
          />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -right-[0.9rem] top-[1.4rem] bg-white dark:bg-slate-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 border border-gray-200 dark:border-slate-500"
            data-testid="toggle-expand-button"
          >
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </nav>
      )}
    </>
  )
}
