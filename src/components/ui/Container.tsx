import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
  center?: boolean
}

const containerSizes = {
  xs: 'max-w-xl',
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-8xl',
  full: 'max-w-full',
}

export function Container({
  children,
  size = 'lg',
  padding = true,
  center = true,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        containerSizes[size],
        {
          'mx-auto': center,
          'px-4 sm:px-6 lg:px-8': padding,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Container variants for specific use cases
export function NarrowContainer(props: Omit<ContainerProps, 'size'>) {
  return <Container size="sm" {...props} />
}

export function WideContainer(props: Omit<ContainerProps, 'size'>) {
  return <Container size="xl" {...props} />
}

export function FullContainer(props: Omit<ContainerProps, 'size'>) {
  return <Container size="full" {...props} />
}

// Section container with optional background
interface SectionProps extends ContainerProps {
  background?: 'none' | 'gray' | 'primary' | 'gradient'
  py?: boolean
}

const sectionBackgrounds = {
  none: '',
  gray: 'bg-gray-50',
  primary: 'bg-primary-50',
  gradient: 'bg-gradient-to-br from-gray-50 via-white to-primary-50',
}

export function Section({
  children,
  background = 'none',
  py = true,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        sectionBackgrounds[background],
        {
          'py-12 sm:py-16 lg:py-20': py,
        },
        className
      )}
    >
      <Container {...props}>
        {children}
      </Container>
    </section>
  )
}
