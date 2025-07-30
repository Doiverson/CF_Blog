import React from 'react'
import { type AvatarSize } from '@/types'
import { cn, getInitials } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  fallback?: React.ReactNode
  ring?: boolean
}

const avatarSizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  fallback,
  ring = false,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const showImage = src && !imageError
  const displayName = name || alt || 'User'
  const initials = getInitials(displayName)

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-white font-medium transition-all duration-200',
        avatarSizes[size],
        {
          'ring-2 ring-primary-500 ring-offset-2': ring,
        },
        className
      )}
      {...props}
    >
      {showImage ? (
        <>
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className={cn(
              'w-full h-full object-cover rounded-full transition-opacity duration-200',
              {
                'opacity-0': !imageLoaded,
                'opacity-100': imageLoaded,
              }
            )}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full">
              <div className="animate-pulse text-white font-medium">
                {initials}
              </div>
            </div>
          )}
        </>
      ) : (
        <span className="font-medium">
          {fallback || initials}
        </span>
      )}
    </div>
  )
}

// Avatar group component for displaying multiple avatars
interface AvatarGroupProps {
  children: React.ReactNode
  max?: number
  size?: AvatarSize
  className?: string
}

export function AvatarGroup({ children, max = 4, size = 'md', className }: AvatarGroupProps) {
  const avatars = React.Children.toArray(children)
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleAvatars.map((avatar, index) =>
        React.cloneElement(avatar as React.ReactElement<AvatarProps>, {
          key: index,
          size,
          className: cn(
            'border-2 border-white',
            (avatar as React.ReactElement<AvatarProps>).props.className
          ),
        })
      )}
      {remainingCount > 0 && (
        <Avatar
          size={size}
          name={`+${remainingCount}`}
          className="border-2 border-white bg-gray-500"
        />
      )}
    </div>
  )
}
