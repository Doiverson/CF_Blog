import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlogPostList } from './BlogPostList'
import type { BlogPost } from '@/types'

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

describe('BlogPostList', () => {
  it('should render list of blog posts', () => {
    render(<BlogPostList posts={mockPosts} />)
    
    expect(screen.getByText('First Blog Post')).toBeInTheDocument()
    expect(screen.getByText('Second Blog Post')).toBeInTheDocument()
  })

  it('should render excerpts for each post', () => {
    render(<BlogPostList posts={mockPosts} />)
    
    expect(screen.getByText('First post excerpt.')).toBeInTheDocument()
    expect(screen.getByText('Second post excerpt.')).toBeInTheDocument()
  })

  it('should render formatted dates for each post', () => {
    render(<BlogPostList posts={mockPosts} />)
    
    expect(screen.getByText('December 25, 2023')).toBeInTheDocument()
    expect(screen.getByText('December 24, 2023')).toBeInTheDocument()
  })

  it('should render reading time for each post', () => {
    render(<BlogPostList posts={mockPosts} />)
    
    const readingTimes = screen.getAllByText(/min read/)
    expect(readingTimes).toHaveLength(2)
  })

  it('should render clickable post titles as links', () => {
    render(<BlogPostList posts={mockPosts} />)
    
    const firstPostLink = screen.getByRole('link', { name: 'First Blog Post' })
    const secondPostLink = screen.getByRole('link', { name: 'Second Blog Post' })
    
    expect(firstPostLink).toHaveAttribute('href', '/posts/first-blog-post')
    expect(secondPostLink).toHaveAttribute('href', '/posts/second-blog-post')
  })

  it('should render "Read more" links for each post', () => {
    render(<BlogPostList posts={mockPosts} />)
    
    const readMoreLinks = screen.getAllByText('Read more')
    expect(readMoreLinks).toHaveLength(2)
    
    expect(readMoreLinks[0]).toHaveAttribute('href', '/posts/first-blog-post')
    expect(readMoreLinks[1]).toHaveAttribute('href', '/posts/second-blog-post')
  })

  it('should handle empty posts array', () => {
    render(<BlogPostList posts={[]} />)
    
    expect(screen.getByText('No blog posts found.')).toBeInTheDocument()
  })

  it('should have proper semantic HTML structure', () => {
    render(<BlogPostList posts={mockPosts} />)
    
    const articlesList = screen.getByRole('list')
    expect(articlesList).toBeInTheDocument()
    
    const articles = screen.getAllByRole('listitem')
    expect(articles).toHaveLength(2)
  })

  it('should render with responsive grid layout classes', () => {
    render(<BlogPostList posts={mockPosts} />)
    
    const container = screen.getByRole('list')
    expect(container).toHaveClass('grid')
    expect(container).toHaveClass('gap-8')
    expect(container).toHaveClass('md:grid-cols-2')
    expect(container).toHaveClass('lg:grid-cols-3')
  })

  it('should be accessible with proper ARIA attributes', () => {
    render(<BlogPostList posts={mockPosts} />)
    
    const container = screen.getByRole('list')
    expect(container).toHaveAttribute('aria-label', 'Blog posts')
    
    const articles = screen.getAllByRole('listitem')
    articles.forEach(article => {
      expect(article).toBeInTheDocument()
    })
  })

  it('should handle posts with missing excerpts gracefully', () => {
    const postsWithMissingExcerpt: BlogPost[] = [
      {
        ...mockPosts[0]!,
        excerpt: { rendered: '' }
      }
    ]
    
    render(<BlogPostList posts={postsWithMissingExcerpt} />)
    
    expect(screen.getByText('First Blog Post')).toBeInTheDocument()
    // Should still render without errors even with empty excerpt
    expect(screen.getByRole('link', { name: 'First Blog Post' })).toBeInTheDocument()
  })
})