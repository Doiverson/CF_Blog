import React from 'react'
import { type CardVariant, type CardPadding } from '@/types'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: CardVariant
  hover?: boolean
  padding?: CardPadding
}

const cardVariants = {
  default: 'bg-white shadow-soft border border-gray-100',
  elevated: 'bg-white shadow-elegant',
  bordered: 'bg-white border-2 border-gray-200',
  gradient: 'bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 shadow-md border border-gray-100',
  glass: 'glass-morphism shadow-soft',
}

const cardPadding = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
}

const hoverEffects = {
  default: 'hover:shadow-elegant hover:-translate-y-1 hover:scale-[1.01]',
  elevated: 'hover:shadow-dramatic hover:-translate-y-2 hover:scale-[1.02]',
  bordered: 'hover:border-primary-300 hover:shadow-elegant hover:-translate-y-1',
  gradient: 'hover:shadow-elegant hover:-translate-y-1 hover:scale-[1.01]',
  glass: 'hover:shadow-elegant hover:-translate-y-1 hover:scale-[1.01]',
}

export function Card({
  children,
  variant = 'default',
  hover = false,
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300 ease-out',
        cardVariants[variant],
        cardPadding[padding],
        {
          [hoverEffects[variant]]: hover,
        },
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Card variants for convenience
export function DefaultCard(props: Omit<CardProps, 'variant'>) {
  return <Card variant="default" {...props} />
}

export function ElevatedCard(props: Omit<CardProps, 'variant'>) {
  return <Card variant="elevated" {...props} />
}

export function BorderedCard(props: Omit<CardProps, 'variant'>) {
  return <Card variant="bordered" {...props} />
}

export function GradientCard(props: Omit<CardProps, 'variant'>) {
  return <Card variant="gradient" {...props} />
}

export function GlassCard(props: Omit<CardProps, 'variant'>) {
  return <Card variant="glass" {...props} />
}
