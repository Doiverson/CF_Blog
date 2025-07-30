import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'
import { WordPressApi } from '@/lib/wordpress-api'
import type { BlogPost, BlogPostsResponse } from '@/types'

// Mock the WordPress API
vi.mock('@/lib/wordpress-api', () => ({
  WordPressApi: vi.fn()
}))

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn()
  }),
  useSearchParams: () => new URLSearchParams()
}))

const mockWordPressApi = vi.mocked(WordPressApi)

const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: { rendered: 'First Blog Post' },
    content: { rendered: '<p>This is the first blog post content.</p>' },
    excerpt: { rendered: '<p>First post excerpt.</p>' },
    slug: 'first-blog-post',
    date: '2023-12-25T10:30:00',
    modified: '2023-12-25T10:30:00',
    author: 1,
    featured_media: 0,
    categories: [1],
    tags: [1],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/posts/1' }],
      author: [{ href: 'https://example.com/wp-json/wp/v2/users/1' }],
      'wp:featuredmedia': [{ href: 'https://example.com/wp-json/wp/v2/media/0' }]
    }
  },
  {
    id: 2,
    title: { rendered: 'Second Blog Post' },
    content: { rendered: '<p>This is the second blog post content.</p>' },
    excerpt: { rendered: '<p>Second post excerpt.</p>' },
    slug: 'second-blog-post',
    date: '2023-12-24T15:45:00',
    modified: '2023-12-24T15:45:00',
    author: 1,
    featured_media: 0,
    categories: [2],
    tags: [1, 2],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/posts/2' }],
      author: [{ href: 'https://example.com/wp-json/wp/v2/users/1' }],
      'wp:featuredmedia': [{ href: 'https://example.com/wp-json/wp/v2/media/0' }]
    }
  }
]

const mockApiResponse: BlogPostsResponse = {
  posts: mockPosts,
  total: 25,
  totalPages: 3,
  currentPage: 1,
  perPage: 10
}

describe('Home Page', () => {
  let mockGetPosts: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    mockGetPosts = vi.fn()
    mockWordPressApi.mockImplementation(() => ({
      getPosts: mockGetPosts,
      getPost: vi.fn()
    }))
  })

  it('should render page title', async () => {
    mockGetPosts.mockResolvedValue(mockApiResponse)
    
    const component = await Home({})
    render(component)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Latest Blog Posts')
  })

  it('should fetch and display blog posts', async () => {
    mockGetPosts.mockResolvedValue(mockApiResponse)
    
    const component = await Home({})
    render(component)
    
    expect(screen.getByText('First Blog Post')).toBeInTheDocument()
    expect(screen.getByText('Second Blog Post')).toBeInTheDocument()
    expect(mockGetPosts).toHaveBeenCalledWith({ page: 1, perPage: 10 })
  })

  it('should display pagination when there are multiple pages', async () => {
    mockGetPosts.mockResolvedValue(mockApiResponse)
    
    const component = await Home({})
    render(component)
    
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument()
  })

  it('should handle API errors gracefully', async () => {
    mockGetPosts.mockRejectedValue(new Error('API Error'))
    
    const component = await Home({})
    render(component)
    
    expect(screen.getByText('Failed to load blog posts. Please try again later.')).toBeInTheDocument()
  })

  it('should handle empty posts response', async () => {
    mockGetPosts.mockResolvedValue({
      posts: [],
      total: 0,
      totalPages: 0,
      currentPage: 1,
      perPage: 10
    })
    
    const component = await Home({})
    render(component)
    
    expect(screen.getByText('No blog posts found.')).toBeInTheDocument()
  })

  it('should have proper SEO metadata', async () => {
    mockGetPosts.mockResolvedValue(mockApiResponse)
    
    const component = await Home({})
    render(component)
    
    // Check that the main heading exists for SEO
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    
    // Check that the page has proper semantic structure
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('should be accessible with proper ARIA structure', async () => {
    mockGetPosts.mockResolvedValue(mockApiResponse)
    
    const component = await Home({})
    render(component)
    
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Blog posts' })).toBeInTheDocument()
  })

  it('should initialize with correct WordPress API base URL', async () => {
    mockGetPosts.mockResolvedValue(mockApiResponse)
    
    const component = await Home({})
    render(component)
    
    expect(mockWordPressApi).toHaveBeenCalledWith(
      process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2'
    )
  })

  it('should handle search params for pagination', async () => {
    mockGetPosts.mockResolvedValue(mockApiResponse)
    
    const component = await Home({ searchParams: Promise.resolve({ page: '2' }) })
    render(component)
    
    expect(mockGetPosts).toHaveBeenCalledWith({ page: 2, perPage: 10 })
  })
})