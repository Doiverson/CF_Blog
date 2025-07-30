import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Tag } from '../Tag'

describe('Tag Component', () => {
  const mockTag = {
    id: 1,
    count: 5,
    description: 'JavaScript related posts',
    link: 'https://example.com/tag/javascript',
    name: 'JavaScript',
    slug: 'javascript',
    taxonomy: 'post_tag',
    meta: []
  }

  it('should render tag name', () => {
    render(<Tag tag={mockTag} />)
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('should render as a link when href prop is provided', () => {
    render(<Tag tag={mockTag} href="/tags/javascript" />)
    
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/tags/javascript')
    expect(link).toHaveTextContent('JavaScript')
  })

  it('should render as a span when no href is provided', () => {
    render(<Tag tag={mockTag} />)
    
    const tagElement = screen.getByText('JavaScript')
    expect(tagElement.tagName).toBe('SPAN')
  })

  it('should apply default styling classes', () => {
    render(<Tag tag={mockTag} />)
    
    const tagElement = screen.getByText('JavaScript')
    expect(tagElement).toHaveClass('inline-block', 'px-2', 'py-1', 'text-xs', 'font-medium', 'text-blue-600', 'bg-blue-100', 'rounded-full', 'hover:bg-blue-200', 'transition-colors')
  })

  it('should allow custom className to override default styling', () => {
    render(<Tag tag={mockTag} className="custom-tag-class" />)
    
    const tagElement = screen.getByText('JavaScript')
    expect(tagElement).toHaveClass('custom-tag-class')
    expect(tagElement).not.toHaveClass('inline-block')
  })

  it('should apply clickable styles when href is provided', () => {
    render(<Tag tag={mockTag} href="/tags/javascript" />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveClass('inline-block', 'px-2', 'py-1', 'text-xs', 'font-medium', 'text-blue-600', 'bg-blue-100', 'rounded-full', 'hover:bg-blue-200', 'transition-colors', 'no-underline')
  })

  it('should display post count when showCount is true', () => {
    render(<Tag tag={mockTag} showCount />)
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('(5)')).toBeInTheDocument()
  })

  it('should not display post count by default', () => {
    render(<Tag tag={mockTag} />)
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.queryByText('(5)')).not.toBeInTheDocument()
  })

  it('should handle tag with zero count', () => {
    const zeroCountTag = { ...mockTag, count: 0 }
    render(<Tag tag={zeroCountTag} showCount />)
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('(0)')).toBeInTheDocument()
  })

  it('should be accessible with proper aria-label', () => {
    render(<Tag tag={mockTag} href="/tags/javascript" />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('aria-label', 'View posts tagged with JavaScript')
  })

  it('should support different tag variants', () => {
    render(<Tag tag={mockTag} variant="outline" />)
    
    const tagElement = screen.getByText('JavaScript')
    expect(tagElement).toHaveClass('text-blue-600', 'border', 'border-blue-200', 'bg-transparent', 'hover:bg-blue-50')
  })
})