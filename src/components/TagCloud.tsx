import type { Tag as TagType, BadgeVariant } from '@/types'
import { Tag } from './Tag'
import { sortTagsByPopularity, filterTagsByMinCount } from '../lib/data-utils'

interface TagCloudProps {
  tags: TagType[]
  minCount?: number
  maxTags?: number
  showCount?: boolean
  generateHref?: (slug: string) => string
  variant?: BadgeVariant
  className?: string
}

export function TagCloud({ 
  tags, 
  minCount = 0, 
  maxTags,
  showCount = false,
  generateHref,
  variant = 'default',
  className = 'flex flex-wrap gap-2'
}: TagCloudProps) {
  let processedTags = filterTagsByMinCount(tags, minCount)
  processedTags = sortTagsByPopularity(processedTags)
  
  if (maxTags) {
    processedTags = processedTags.slice(0, maxTags)
  }

  return (
    <div className={className} data-testid="tag-cloud">
      {processedTags.map((tag) => (
        <Tag
          key={tag.id}
          tag={tag}
          {...(generateHref && { href: generateHref(tag.slug) })}
          showCount={showCount}
          variant={variant}
        />
      ))}
    </div>
  )
}