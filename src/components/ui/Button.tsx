import React from 'react'
import { type ButtonVariant, type ButtonSize } from '@/types'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
}

const buttonVariants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 shadow-sm hover:shadow-md',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white active:bg-primary-700 active:border-primary-700',
  ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
  link: 'text-primary-600 hover:text-primary-700 active:text-primary-800 underline-offset-4 hover:underline',
  destructive: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800 shadow-sm hover:shadow-md',
}

const buttonSizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const isDisabled = disabled || loading

  return (
    <button
      className={cn(
        baseStyles,
        buttonVariants[variant],
        buttonSizes[size],
        {
          'cursor-not-allowed opacity-50': isDisabled,
          'gap-2': leftIcon || rightIcon,
        },
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  )
}

// Button component variants for convenience
export function PrimaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="primary" {...props} />
}

export function SecondaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="secondary" {...props} />
}

export function OutlineButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="outline" {...props} />
}

export function GhostButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="ghost" {...props} />
}

export function LinkButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="link" {...props} />
}

export function DestructiveButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="destructive" {...props} />
}
