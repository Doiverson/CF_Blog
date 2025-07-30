import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlogPost } from './BlogPost'
import type { BlogPost as BlogPostType } from '@/types'

const mockPost: BlogPostType = {
  id: 1,
  title: { rendered: 'Test Blog Post Title' },
  content: { rendered: '<p>This is the <strong>main content</strong> of the blog post.</p>' },
  excerpt: { rendered: '<p>This is the excerpt of the post.</p>' },
  slug: 'test-blog-post-title',
  date: '2023-12-25T10:30:00',
  modified: '2023-12-25T10:30:00',
  author: 1,
  featured_media: 0,
  categories: [1],
  tags: [1, 2],
  _links: {
    self: [{ href: 'https://example.com/wp-json/wp/v2/posts/1' }],
    author: [{ href: 'https://example.com/wp-json/wp/v2/users/1' }],
    'wp:featuredmedia': [{ href: 'https://example.com/wp-json/wp/v2/media/0' }]
  }
}

describe('BlogPost', () => {
  it('should render post title correctly', () => {
    render(<BlogPost post={mockPost} />)
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Blog Post Title')
  })

  it('should render post content without HTML tags', () => {
    render(<BlogPost post={mockPost} />)
    
    expect(screen.getByText('This is the main content of the blog post.')).toBeInTheDocument()
    expect(screen.queryByText('<p>')).not.toBeInTheDocument()
    expect(screen.queryByText('<strong>')).not.toBeInTheDocument()
  })

  it('should render formatted publication date', () => {
    render(<BlogPost post={mockPost} />)
    
    expect(screen.getByText('December 25, 2023')).toBeInTheDocument()
  })

  it('should render reading time estimation', () => {
    render(<BlogPost post={mockPost} />)
    
    expect(screen.getByText(/1 min read/)).toBeInTheDocument()
  })

  it('should have proper semantic HTML structure', () => {
    render(<BlogPost post={mockPost} />)
    
    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should handle post with longer content for reading time', () => {
    const longContentPost: BlogPostType = {
      ...mockPost,
      content: {
        rendered: '<p>' + Array(500).fill('word').join(' ') + '</p>'
      }
    }
    
    render(<BlogPost post={longContentPost} />)
    
    expect(screen.getByText(/3 min read/)).toBeInTheDocument()
  })

  it('should be accessible with proper ARIA attributes', () => {
    render(<BlogPost post={mockPost} />)
    
    const article = screen.getByRole('article')
    expect(article).toHaveAttribute('aria-labelledby')
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveAttribute('id')
  })

  it('should handle missing excerpt gracefully', () => {
    const postWithoutExcerpt: BlogPostType = {
      ...mockPost,
      excerpt: { rendered: '' }
    }
    
    render(<BlogPost post={postWithoutExcerpt} />)
    
    // Should still render without errors
    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('should render tags when provided', () => {
    const mockTags = [
      {
        id: 1,
        count: 5,
        description: 'JavaScript related posts',
        link: 'https://example.com/tag/javascript',
        name: 'JavaScript',
        slug: 'javascript',
        taxonomy: 'post_tag' as const,
        meta: []
      },
      {
        id: 2,
        count: 3,
        description: 'React framework posts',
        link: 'https://example.com/tag/react',
        name: 'React',
        slug: 'react',
        taxonomy: 'post_tag' as const,
        meta: []
      }
    ]
    
    render(<BlogPost post={mockPost} tags={mockTags} />)
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('should render without tags section when no tags provided', () => {
    render(<BlogPost post={mockPost} />)
    
    expect(screen.queryByText('Tags:')).not.toBeInTheDocument()
    expect(screen.queryByTestId('tags-section')).not.toBeInTheDocument()
  })

  it('should render tags as links when href generator is provided', () => {
    const mockTags = [
      {
        id: 1,
        count: 5,
        description: 'JavaScript related posts',
        link: 'https://example.com/tag/javascript',
        name: 'JavaScript',
        slug: 'javascript',
        taxonomy: 'post_tag' as const,
        meta: []
      }
    ]
    
    const generateTagHref = (slug: string) => `/tags/${slug}`
    
    render(<BlogPost post={mockPost} tags={mockTags} generateTagHref={generateTagHref} />)
    
    const tagLink = screen.getByRole('link', { name: /javascript/i })
    expect(tagLink).toBeInTheDocument()
    expect(tagLink).toHaveAttribute('href', '/tags/javascript')
  })

  it('should handle empty tags array', () => {
    render(<BlogPost post={mockPost} tags={[]} />)
    
    expect(screen.queryByText('Tags:')).not.toBeInTheDocument()
    expect(screen.queryByTestId('tags-section')).not.toBeInTheDocument()
  })
})