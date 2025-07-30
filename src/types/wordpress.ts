// WordPress REST API Types - Enhanced for modern blog requirements

export interface WordPressRenderedField {
  rendered: string
  protected: boolean
}

export interface WordPressGuid {
  rendered: string
}

export interface Author {
  id: number
  name: string
  slug: string
  description: string
  url: string
  link: string
  avatar_urls: {
    '24': string
    '48': string
    '96': string
  }
  meta: {
    persisted_preferences: Array<Record<string, unknown>>
  }
  _links: {
    self: Array<{ href: string }>
    collection: Array<{ href: string }>
  }
}

export interface Category {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: 'category'
  parent: number
  meta: Record<string, unknown>[]
  _links: {
    self: Array<{ href: string }>
    collection: Array<{ href: string }>
    about: Array<{ href: string }>
    'wp:post_type': Array<{ href: string }>
    curies: Array<{ name: string; href: string; templated: boolean }>
  }
}

export interface Tag {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: 'post_tag'
  meta: Record<string, unknown>[]
  _links: {
    self: Array<{ href: string }>
    collection: Array<{ href: string }>
    about: Array<{ href: string }>
    'wp:post_type': Array<{ href: string }>
    curies: Array<{ name: string; href: string; templated: boolean }>
  }
}

export interface MediaObject {
  id: number
  date: string
  date_gmt: string
  guid: WordPressGuid
  modified: string
  modified_gmt: string
  slug: string
  status: 'inherit' | 'private' | 'publish'
  type: 'attachment'
  link: string
  title: WordPressRenderedField
  author: number
  comment_status: 'open' | 'closed'
  ping_status: 'open' | 'closed'
  template: string
  meta: Record<string, unknown>[]
  description: WordPressRenderedField
  caption: WordPressRenderedField
  alt_text: string
  media_type: 'image' | 'video' | 'audio' | 'file'
  mime_type: string
  media_details: {
    width: number
    height: number
    file: string
    filesize: number
    sizes: Record<string, {
      file: string
      width: number
      height: number
      mime_type: string
      source_url: string
    }>
    image_meta: {
      aperture: string
      credit: string
      camera: string
      caption: string
      created_timestamp: string
      copyright: string
      focal_length: string
      iso: string
      shutter_speed: string
      title: string
      orientation: string
      keywords: string[]
    }
  }
  source_url: string
  _links: {
    self: Array<{ href: string }>
    collection: Array<{ href: string }>
    about: Array<{ href: string }>
    author: Array<{ embeddable: boolean; href: string }>
    replies: Array<{ embeddable: boolean; href: string }>
  }
}

export interface BlogPost {
  id: number
  date: string
  date_gmt: string
  guid: WordPressGuid
  modified: string
  modified_gmt: string
  slug: string
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private'
  type: 'post'
  link: string
  title: WordPressRenderedField
  content: WordPressRenderedField
  excerpt: WordPressRenderedField
  author: number
  featured_media: number
  comment_status: 'open' | 'closed'
  ping_status: 'open' | 'closed'
  sticky: boolean
  template: string
  format: 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio'
  meta: {
    footnotes: string
  }
  categories: number[]
  tags: number[]
  class_list: string[]
  _links: {
    self: Array<{ href: string }>
    collection: Array<{ href: string }>
    about: Array<{ href: string }>
    author: Array<{ embeddable: boolean; href: string }>
    replies: Array<{ embeddable: boolean; href: string }>
    'version-history': Array<{ count: number; href: string }>
    'predecessor-version': Array<{ id: number; href: string }>
    'wp:featuredmedia': Array<{ embeddable: boolean; href: string }>
    'wp:attachment': Array<{ href: string }>
    'wp:term': Array<{ taxonomy: string; embeddable: boolean; href: string }>
    curies: Array<{ name: string; href: string; templated: boolean }>
  }
}

// Enhanced response types
export interface BlogPostsResponse {
  posts: BlogPost[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface CategoriesResponse {
  categories: Category[]
  total: number
}

export interface TagsResponse {
  tags: Tag[]
  total: number
}

export interface AuthorsResponse {
  authors: Author[]
  total: number
}

// API parameter types
export interface PaginationParams {
  page?: number
  perPage?: number
  orderBy?: 'date' | 'id' | 'include' | 'title' | 'slug'
  order?: 'asc' | 'desc'
}

export interface PostQueryParams extends PaginationParams {
  author?: number[]
  authorExclude?: number[]
  before?: string
  after?: string
  categories?: number[]
  categoriesExclude?: number[]
  tags?: number[]
  tagsExclude?: number[]
  include?: number[]
  exclude?: number[]
  offset?: number
  search?: string
  slug?: string[]
  status?: ('publish' | 'future' | 'draft' | 'pending' | 'private')[]
  sticky?: boolean
}

export interface CategoryQueryParams extends PaginationParams {
  include?: number[]
  exclude?: number[]
  hideEmpty?: boolean
  parent?: number
  post?: number
  slug?: string[]
}

export interface TagQueryParams extends PaginationParams {
  include?: number[]
  exclude?: number[]
  hideEmpty?: boolean
  post?: number
  slug?: string[]
}

// Error types
export interface WordPressApiError extends Error {
  status?: number
  statusText?: string
  code?: string
  data?: {
    status: number
    params?: Record<string, unknown>
  }
}

// Utility types
export type PostStatus = BlogPost['status']
export type PostFormat = BlogPost['format']
export type MediaType = MediaObject['media_type']

// Extended types for application use
export interface EnrichedBlogPost extends BlogPost {
  authorDetails?: Author
  categoriesDetails?: Category[]
  tagsDetails?: Tag[]
  featuredMediaDetails?: MediaObject
  readingTime?: number
  wordCount?: number
  relatedPosts?: BlogPost[]
}

export interface BlogPostWithMeta extends BlogPost {
  readingTime: number
  wordCount: number
  publishedTimeAgo: string
  formattedDate: string
}