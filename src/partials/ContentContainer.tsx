import classNames from 'classnames'
import { PropsWithChildren } from 'react'

interface ContentContainerProps extends PropsWithChildren {
  className?: string
  noPadding?: boolean
}

export const ContentContainer: React.FC<ContentContainerProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div
      className={classNames(
        'flex flex-col flex-grow border-t border-gray-200 dark:border-slate-500 bg-white dark:bg-slate-600',
        { 'p-4': !noPadding },
        className,
      )}
    >
      {children}
    </div>
  )
}
