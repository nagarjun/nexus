import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

interface NavItemProps {
  name: string
  icon: React.ElementType
  path?: string
  onClick?: () => void
  isActive?: boolean
  isExpanded: boolean
  'data-testid'?: string
}

export function NavItem({
  name,
  icon: Icon,
  path,
  onClick,
  isActive = false,
  isExpanded,
  'data-testid': dataTestId,
}: NavItemProps) {
  const commonClasses = classNames(
    'flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-700 font-medium text-xs uppercase w-full rounded-md transition-colors duration-200 group',
    {
      'bg-indigo-100 border border-indigo-400 dark:bg-slate-700 dark:border-slate-500': isActive,
      'justify-center w-10 h-10': !isExpanded,
    },
  )

  const iconClasses = classNames('w-5 h-5 stroke-1 flex-shrink-0', {
    'm-0': !isExpanded,
    'text-indigo-600 dark:text-slate-200': isActive,
  })

  const content = (
    <>
      <Icon className={iconClasses} />
      {isExpanded && (
        <span
          className={classNames('ml-3', {
            'text-indigo-600 dark:text-slate-200': isActive,
          })}
        >
          {name}
        </span>
      )}
    </>
  )

  if (path) {
    return (
      <Link href={path} className={commonClasses} data-testid={dataTestId}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={commonClasses} data-testid={dataTestId}>
      {content}
    </button>
  )
}
