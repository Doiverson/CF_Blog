import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CategoryPage from './page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('Not Found')
  }),
}))

// Mock WordPressApi
vi.mock('@/lib/wordpress-api', () => ({
  WordPressApi: vi.fn().mockImplementation(() => ({
    getPosts: vi.fn().mockResolvedValue({
      posts: [
        {
          id: 1,
          title: { rendered: 'Test Post' },
          slug: 'test-post',
          date: '2024-01-01T00:00:00Z',
          excerpt: { rendered: 'Test excerpt' },
          content: { rendered: 'Test content' },
          tags: [],
        },
      ],
      total: 1,
      totalPages: 1,
      currentPage: 1,
      perPage: 10,
      hasNextPage: false,
      hasPreviousPage: false,
    }),
    getTagsByIds: vi.fn().mockResolvedValue([]),
  })),
}))

// Mock components
vi.mock('@/components/Header', () => ({
  Header: ({ categories }: { categories: unknown[] }) => (
    <header data-testid="header">
      Header with {categories.length} categories
    </header>
  ),
}))

vi.mock('@/components/BlogListContainer', () => ({
  BlogListContainer: ({ initialData }: { initialData: { posts: unknown[] } }) => (
    <div data-testid="blog-list">
      Blog List with {initialData.posts.length} posts
    </div>
  ),
}))

vi.mock('@/components/BlogControlsSection', () => ({
  BlogControlsSection: () => <div data-testid="blog-controls">Blog Controls</div>,
}))

describe('CategoryPage', () => {
  it('renders category page with valid category', async () => {
    const params = { slug: 'javascript' }
    const searchParams = Promise.resolve({})
    
    const CategoryPageComponent = await CategoryPage({ params, searchParams })
    render(CategoryPageComponent)
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('JavaScript技術に関する記事')).toBeInTheDocument()
    expect(screen.getByTestId('blog-list')).toBeInTheDocument()
    expect(screen.getByTestId('blog-controls')).toBeInTheDocument()
  })

  it('renders not found page for invalid category', async () => {
    const params = { slug: 'invalid-category' }
    const searchParams = Promise.resolve({})
    
    const CategoryPageComponent = await CategoryPage({ params, searchParams })
    render(CategoryPageComponent)
    
    expect(screen.getByText('カテゴリーが見つかりません')).toBeInTheDocument()
    expect(screen.getByText('ホームに戻る →')).toBeInTheDocument()
  })

  it('displays correct category information', async () => {
    const params = { slug: 'react' }
    const searchParams = Promise.resolve({})
    
    const CategoryPageComponent = await CategoryPage({ params, searchParams })
    render(CategoryPageComponent)
    
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Reactに関する記事')).toBeInTheDocument()
    expect(screen.getByText('10 件の記事')).toBeInTheDocument()
  })

  it('handles pagination correctly', async () => {
    const params = { slug: 'javascript' }
    const searchParams = Promise.resolve({ page: '2' })
    
    const CategoryPageComponent = await CategoryPage({ params, searchParams })
    render(CategoryPageComponent)
    
    expect(screen.getByTestId('blog-list')).toBeInTheDocument()
  })

  it('renders breadcrumb navigation', async () => {
    const params = { slug: 'typescript' }
    const searchParams = Promise.resolve({})
    
    const CategoryPageComponent = await CategoryPage({ params, searchParams })
    render(CategoryPageComponent)
    
    expect(screen.getByText('ホーム')).toBeInTheDocument()
    expect(screen.getByText('カテゴリー')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })
})