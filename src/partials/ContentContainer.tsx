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
        'flex flex-col flex-grow bg-white dark:bg-slate-700 sm:absolute sm:top-[156px] sm:h-[calc(100vh-156px)] sm:left-[var(--nav-width)] sm:right-0',
        { 'p-4': !noPadding },
        className,
      )}
    >
      {children}
    </div>
  )
}
