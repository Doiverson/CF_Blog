// Application-specific types

import { BlogPost, Category, Tag, Author } from './wordpress'

// Navigation types
export interface NavItem {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

export interface BreadcrumbItem {
  name: string
  href?: string
  current?: boolean
}

// Search and filtering types
export interface SearchFilters {
  query?: string
  categories?: number[]
  tags?: number[]
  authors?: number[]
  dateRange?: {
    start: Date
    end: Date
  }
  sortBy?: 'date' | 'title' | 'popularity'
  sortOrder?: 'asc' | 'desc'
}

export interface SearchResults {
  posts: BlogPost[]
  categories: Category[]
  tags: Tag[]
  authors: Author[]
  total: number
  query: string
}

// UI Component types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'gradient' | 'glass'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type BadgeSize = 'sm' | 'md' | 'lg'

// Theme types
export type Theme = 'light' | 'dark' | 'system'

export interface ThemeConfig {
  theme: Theme
  primaryColor: string
  borderRadius: number
  fontFamily: string
}

// Layout types
export type LayoutVariant = 'default' | 'centered' | 'sidebar' | 'full-width'

export interface LayoutProps {
  children: React.ReactNode
  variant?: LayoutVariant
  showSidebar?: boolean
  showBreadcrumbs?: boolean
  title?: string
  description?: string
}

// SEO and Meta types
export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'blog'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

export interface StructuredData {
  '@context': 'https://schema.org'
  '@type': string
  [key: string]: unknown
}

// Blog-specific types
export interface BlogStats {
  totalPosts: number
  totalCategories: number
  totalTags: number
  totalAuthors: number
  totalViews?: number
  averageReadingTime: number
}

export interface PostMeta {
  readingTime: number
  wordCount: number
  publishedAt: string
  updatedAt: string
  viewCount?: number
  likeCount?: number
  shareCount?: number
}

export interface RelatedPost {
  id: number
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readingTime: number
  featuredImage?: string
  similarity?: number
}

// Comment types (for future implementation)
export interface Comment {
  id: number
  postId: number
  parentId?: number
  author: {
    name: string
    email: string
    url?: string
    avatar?: string
  }
  content: string
  status: 'approved' | 'pending' | 'spam' | 'trash'
  createdAt: string
  replies?: Comment[]
}

// Pagination types
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage?: number
  previousPage?: number
}

// API Response wrappers
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
  meta?: {
    timestamp: string
    version: string
    [key: string]: unknown
  }
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: PaginationInfo
}

// Form types
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface NewsletterForm {
  email: string
  preferences?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    categories: string[]
  }
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: string
}

export type ErrorBoundaryFallback = React.ComponentType<{
  error: Error
  resetErrorBoundary: () => void
}>

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: AppError | null
  lastFetch?: string
}

// Feature flags
export interface FeatureFlags {
  enableComments: boolean
  enableSearch: boolean
  enableDarkMode: boolean
  enableAnalytics: boolean
  enableNewsletter: boolean
  enableSocialSharing: boolean
  enableRelatedPosts: boolean
  enableReadingProgress: boolean
}

// Configuration
export interface AppConfig {
  site: {
    name: string
    description: string
    url: string
    logo?: string
    favicon?: string
    language: string
    locale: string
  }
  wordpress: {
    apiUrl: string
    timeout: number
    retries: number
    cacheTimeout: number
  }
  features: FeatureFlags
  theme: ThemeConfig
  analytics?: {
    googleAnalyticsId?: string
    cloudflareAnalyticsToken?: string
  }
  social?: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
    github?: string
  }
}