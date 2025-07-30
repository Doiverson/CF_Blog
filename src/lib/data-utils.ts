/**
 * Format ISO date string to readable format
 */
export function formatPostDate(dateString: string): string {
  const date = new Date(dateString)
  
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format')
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

/**
 * Remove HTML tags and decode HTML entities from content
 */
export function stripHtmlTags(html: string): string {
  if (!html) return ''
  
  // First decode HTML entities
  const decodedHtml = html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
  
  // Remove HTML tags
  return decodedHtml.replace(/<[^>]*>/g, '').trim()
}

/**
 * Convert title to URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Replace accented characters
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace non-alphanumeric characters (except Japanese/Chinese characters) with hyphens
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]+/g, '-')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-|-$/g, '')
}

/**
 * Calculate estimated reading time in minutes
 * Assumes average reading speed of 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  if (!content) return 1
  
  // Strip HTML tags first
  const textContent = stripHtmlTags(content)
  
  // Count words (split by whitespace and filter out empty strings)
  const wordCount = textContent
    .split(/\s+/)
    .filter(word => word.length > 0)
    .length
  
  // Calculate reading time (200 words per minute)
  const readingTime = Math.ceil(wordCount / 200)
  
  // Minimum 1 minute
  return Math.max(1, readingTime)
}

/**
 * Generate a standardized URL for tag pages
 */
export function generateTagHref(slug: string): string {
  return `/tags/${encodeURIComponent(slug)}`
}

/**
 * Group tags by their first letter for tag cloud display
 */
export function groupTagsByLetter(tags: { name: string; slug: string }[]): Record<string, { name: string; slug: string }[]> {
  return tags.reduce((groups, tag) => {
    const firstLetter = tag.name.charAt(0).toUpperCase()
    if (!groups[firstLetter]) {
      groups[firstLetter] = []
    }
    groups[firstLetter]!.push(tag)
    return groups
  }, {} as Record<string, { name: string; slug: string }[]>)
}

/**
 * Sort tags by popularity (post count) descending
 */
export function sortTagsByPopularity<T extends { count: number }>(tags: T[]): T[] {
  return [...tags].sort((a, b) => b.count - a.count)
}

/**
 * Filter tags by minimum post count
 */
export function filterTagsByMinCount<T extends { count: number }>(tags: T[], minCount: number = 1): T[] {
  return tags.filter(tag => tag.count >= minCount)
}