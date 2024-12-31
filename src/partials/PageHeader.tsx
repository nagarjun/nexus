'use client'

import { AppName, apps } from '@/app/apps'

interface PageHeaderProps {
  appName: AppName
  description?: string | React.ReactNode
  children?: React.ReactNode
}

export function PageHeader({ appName, description, children }: PageHeaderProps) {
  const app = apps[appName]
  const IconComponent = app.icon

  return (
    <>
      {/* Spacer div to prevent content from jumping under fixed header */}
      <div className="hidden md:block h-[89px]" />

      <header
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-gray-200 dark:border-slate-500 bg-slate-100 dark:bg-slate-800 md:fixed md:top-[73px] md:right-0 z-10"
        style={{
          left: 'var(--nav-width)',
          transition: 'left 0.3s ease',
        }}
      >
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="flex-shrink-0 w-12 h-12 mr-4 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <IconComponent className="text-gray-900 dark:text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white uppercase">{app.name}</h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{description || app.description}</p>
          </div>
        </div>
        {children && <div className="mt-4 sm:mt-0">{children}</div>}
      </header>
    </>
  )
}
