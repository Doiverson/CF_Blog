# Tag Functionality Usage Guide

This guide shows how to use the new tag functionality that has been added to the WordPress blog system.

## Overview

The tag system includes:
- **Tag Interface**: TypeScript definitions for WordPress tag data
- **WordPress API Methods**: Functions to fetch tags and filter posts by tags
- **Tag Component**: Reusable UI component for displaying individual tags
- **BlogPost Component**: Updated to display tags on blog posts
- **TagCloud Component**: Component for displaying multiple tags in a cloud format
- **Utility Functions**: Helper functions for tag operations

## Usage Examples

### 1. Displaying Tags on a Blog Post

```tsx
import { BlogPost } from '@/components/BlogPost'
import { WordPressApi } from '@/lib/wordpress-api'
import { generateTagHref } from '@/lib/data-utils'

// Fetch post and its tags
const api = new WordPressApi('https://your-site.com/wp-json/wp/v2')
const post = await api.getPost('post-slug')
const tags = await api.getTagsByIds(post.tags)

// Render with tags
<BlogPost 
  post={post} 
  tags={tags}
  generateTagHref={generateTagHref}
/>
```

### 2. Creating a Tag Cloud

```tsx
import { TagCloud } from '@/components/TagCloud'
import { WordPressApi } from '@/lib/wordpress-api'
import { generateTagHref } from '@/lib/data-utils'

// Fetch all tags
const api = new WordPressApi('https://your-site.com/wp-json/wp/v2')
const tags = await api.getTags()

// Render tag cloud with filtering
<TagCloud 
  tags={tags}
  minCount={2}           // Only show tags with 2+ posts
  maxTags={20}           // Limit to 20 most popular tags
  showCount={true}       // Display post counts
  generateHref={generateTagHref}
  variant="outline"      // Use outline style
/>
```

### 3. Individual Tag Component

```tsx
import { Tag } from '@/components/Tag'

const tag = {
  id: 1,
  name: 'JavaScript',
  slug: 'javascript',
  count: 15,
  // ... other properties
}

// As a link
<Tag 
  tag={tag} 
  href="/tags/javascript" 
  showCount={true}
  variant="outline" 
/>

// As plain text
<Tag tag={tag} />
```

### 4. Filtering Posts by Tag

```tsx
import { WordPressApi } from '@/lib/wordpress-api'

const api = new WordPressApi('https://your-site.com/wp-json/wp/v2')

// Get posts tagged with 'javascript'
const postsResponse = await api.getPostsByTag('javascript', {
  page: 1,
  perPage: 10
})

console.log('Posts:', postsResponse.posts)
console.log('Total:', postsResponse.total)
```

### 5. Working with Tag Data

```tsx
import { 
  sortTagsByPopularity, 
  filterTagsByMinCount,
  groupTagsByLetter 
} from '@/lib/data-utils'

// Sort tags by popularity
const popularTags = sortTagsByPopularity(tags)

// Filter out tags with less than 3 posts
const activeTags = filterTagsByMinCount(tags, 3)

// Group tags alphabetically
const groupedTags = groupTagsByLetter(tags)
// Result: { 'A': [angular], 'J': [javascript, java], 'R': [react] }
```

## API Reference

### WordPress API Methods

#### `getTags(): Promise<Tag[]>`
Fetches all available tags from WordPress.

#### `getTagById(id: number): Promise<Tag>`
Fetches a specific tag by its ID.

#### `getTagsByIds(ids: number[]): Promise<Tag[]>`
Fetches multiple tags by their IDs.

#### `getPostsByTag(tagSlug: string, params?: PaginationParams): Promise<BlogPostsResponse>`
Fetches posts filtered by a specific tag slug.

### Components

#### `<Tag>` Props
- `tag: Tag` - The tag object
- `href?: string` - Optional link URL
- `showCount?: boolean` - Whether to show post count
- `variant?: 'default' | 'outline'` - Visual style
- `className?: string` - Custom CSS classes

#### `<TagCloud>` Props
- `tags: Tag[]` - Array of tags to display
- `minCount?: number` - Minimum post count filter
- `maxTags?: number` - Maximum tags to display
- `showCount?: boolean` - Whether to show post counts
- `generateHref?: (slug: string) => string` - Function to generate tag URLs
- `variant?: 'default' | 'outline'` - Visual style
- `className?: string` - Custom CSS classes

#### `<BlogPost>` Updated Props
- `post: BlogPost` - The blog post
- `tags?: Tag[]` - Optional array of tag objects
- `generateTagHref?: (slug: string) => string` - Function to generate tag URLs

### Utility Functions

#### `generateTagHref(slug: string): string`
Generates a standardized URL for tag pages (`/tags/{slug}`).

#### `sortTagsByPopularity<T extends { count: number }>(tags: T[]): T[]`
Sorts tags by post count in descending order.

#### `filterTagsByMinCount<T extends { count: number }>(tags: T[], minCount: number): T[]`
Filters tags to only include those with a minimum post count.

#### `groupTagsByLetter(tags: { name: string; slug: string }[]): Record<string, { name: string; slug: string }[]>`
Groups tags alphabetically by their first letter.

## Japanese Language Support

The tag system fully supports Japanese characters:

```tsx
// Tags with Japanese names work seamlessly
const japaneseTag = {
  id: 1,
  name: 'JavaScript入門',
  slug: 'javascript-nyumon',
  // ...
}

// URLs are properly encoded
const href = generateTagHref('javascript-入門')
// Result: /tags/javascript-%E5%85%A5%E9%96%80
```

## Styling

Tags use Tailwind CSS classes and can be customized:

```tsx
// Default blue styling
<Tag tag={tag} />

// Outline variant
<Tag tag={tag} variant="outline" />

// Custom styling
<Tag tag={tag} className="bg-green-100 text-green-800 hover:bg-green-200" />
```

## Performance Considerations

- Tags are fetched separately from posts to allow for flexible caching
- The `TagCloud` component automatically sorts and filters tags client-side
- Use `minCount` filtering to avoid displaying empty or rarely-used tags
- Consider implementing tag caching for better performance with many tags