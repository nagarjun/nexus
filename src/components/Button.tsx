import classNames from 'classnames'
import { Loader2 } from 'lucide-react'
import React from 'react'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'error' | 'text'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  variant?: ButtonVariant
  loading?: boolean
  icon?: React.ReactNode
  fluid?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  size = 'medium',
  variant = 'primary',
  loading = false,
  icon,
  fluid = false,
  disabled,
  ...props
}) => {
  const baseClasses =
    'font-semibold rounded-md transition-colors focus:outline-none inline-flex items-center justify-center relative'

  const sizeClasses = {
    small: 'px-2.5 py-1.5 text-xs',
    medium: 'px-3.5 py-2 text-sm',
    large: 'px-4.5 py-2.5 text-base',
  }

  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-slate-700 dark:hover:bg-slate-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
    outline:
      'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',
    error: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600',
    text: 'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700',
  }

  const buttonClasses = classNames(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    {
      'w-full': fluid,
      'opacity-75 cursor-not-allowed': disabled || loading,
    },
    className,
  )

  return (
    <button className={buttonClasses} disabled={disabled || loading} data-testid="button" {...props}>
      <span className={classNames('inline-flex items-center justify-center', { invisible: loading })}>
        {icon && (
          <span className="mr-2 flex items-center" data-testid="button-icon">
            {React.cloneElement(icon as React.ReactElement, {
              className: classNames('w-4 h-4', (icon as React.ReactElement).props.className),
            })}
          </span>
        )}
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="animate-spin w-4 h-4" data-testid="button-loader" />
        </span>
      )}
    </button>
  )
}

export default Button
