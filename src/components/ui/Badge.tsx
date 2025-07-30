import React from 'react'
import { type BadgeVariant, type BadgeSize } from '@/types'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  removable?: boolean
  onRemove?: () => void
}

const badgeVariants = {
  default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  success: 'bg-success-100 text-success-800 hover:bg-success-200',
  warning: 'bg-warning-100 text-warning-800 hover:bg-warning-200',
  error: 'bg-error-100 text-error-800 hover:bg-error-200',
  info: 'bg-primary-100 text-primary-800 hover:bg-primary-200',
}

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-sm font-medium',
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  removable = false,
  onRemove,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-all duration-200',
        badgeVariants[variant],
        badgeSizes[size],
        {
          'gap-1': dot || removable,
        },
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            {
              'bg-gray-400': variant === 'default',
              'bg-white': variant === 'secondary',
              'bg-success-600': variant === 'success',
              'bg-warning-600': variant === 'warning',
              'bg-error-600': variant === 'error',
              'bg-primary-600': variant === 'info',
            }
          )}
        />
      )}
      <span>{children}</span>
      {removable && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            'ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full transition-colors',
            {
              'hover:bg-gray-300 text-gray-600': variant === 'default',
              'hover:bg-gray-500 text-white': variant === 'secondary',
              'hover:bg-success-300 text-success-900': variant === 'success',
              'hover:bg-warning-300 text-warning-900': variant === 'warning',
              'hover:bg-error-300 text-error-900': variant === 'error',
              'hover:bg-primary-300 text-primary-900': variant === 'info',
            }
          )}
        >
          <svg
            className="w-2.5 h-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  )
}

// Badge variants for convenience
export function DefaultBadge(props: Omit<BadgeProps, 'variant'>) {
  return <Badge variant="default" {...props} />
}

export function SecondaryBadge(props: Omit<BadgeProps, 'variant'>) {
  return <Badge variant="secondary" {...props} />
}

export function SuccessBadge(props: Omit<BadgeProps, 'variant'>) {
  return <Badge variant="success" {...props} />
}

export function WarningBadge(props: Omit<BadgeProps, 'variant'>) {
  return <Badge variant="warning" {...props} />
}

export function ErrorBadge(props: Omit<BadgeProps, 'variant'>) {
  return <Badge variant="error" {...props} />
}

export function InfoBadge(props: Omit<BadgeProps, 'variant'>) {
  return <Badge variant="info" {...props} />
}
