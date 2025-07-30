import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TagCloud } from '../TagCloud'
import type { Tag } from '../../lib/types'

const mockTags: Tag[] = [
  {
    id: 1,
    count: 10,
    description: 'JavaScript related posts',
    link: 'https://example.com/tag/javascript',
    name: 'JavaScript',
    slug: 'javascript',
    taxonomy: 'post_tag',
    meta: []
  },
  {
    id: 2,
    count: 5,
    description: 'React framework posts',
    link: 'https://example.com/tag/react',
    name: 'React',
    slug: 'react',
    taxonomy: 'post_tag',
    meta: []
  },
  {
    id: 3,
    count: 1,
    description: 'Vue.js framework posts',
    link: 'https://example.com/tag/vue',
    name: 'Vue.js',
    slug: 'vue',
    taxonomy: 'post_tag',
    meta: []
  },
  {
    id: 4,
    count: 0,
    description: 'Empty tag',
    link: 'https://example.com/tag/empty',
    name: 'Empty',
    slug: 'empty',
    taxonomy: 'post_tag',
    meta: []
  }
]

describe('TagCloud Component', () => {
  it('should render all tags by default', () => {
    render(<TagCloud tags={mockTags} />)
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
    expect(screen.getByText('Empty')).toBeInTheDocument()
  })

  it('should filter tags by minimum count', () => {
    render(<TagCloud tags={mockTags} minCount={2} />)
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.queryByText('Vue.js')).not.toBeInTheDocument()
    expect(screen.queryByText('Empty')).not.toBeInTheDocument()
  })

  it('should limit number of tags displayed', () => {
    render(<TagCloud tags={mockTags} maxTags={2} />)
    
    // Should show the top 2 most popular tags
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.queryByText('Vue.js')).not.toBeInTheDocument()
    expect(screen.queryByText('Empty')).not.toBeInTheDocument()
  })

  it('should render tags as links when generateHref is provided', () => {
    const generateHref = (slug: string) => `/tags/${slug}`
    render(<TagCloud tags={mockTags} generateHref={generateHref} />)
    
    const jsLink = screen.getByRole('link', { name: /javascript/i })
    expect(jsLink).toBeInTheDocument()
    expect(jsLink).toHaveAttribute('href', '/tags/javascript')
  })

  it('should show post counts when showCount is true', () => {
    render(<TagCloud tags={mockTags} showCount />)
    
    expect(screen.getByText('(10)')).toBeInTheDocument()
    expect(screen.getByText('(5)')).toBeInTheDocument()
    expect(screen.getByText('(1)')).toBeInTheDocument()
    expect(screen.getByText('(0)')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<TagCloud tags={mockTags} className="custom-tag-cloud" />)
    
    const tagCloud = screen.getByTestId('tag-cloud')
    expect(tagCloud).toHaveClass('custom-tag-cloud')
  })

  it('should handle empty tags array', () => {
    render(<TagCloud tags={[]} />)
    
    const tagCloud = screen.getByTestId('tag-cloud')
    expect(tagCloud).toBeInTheDocument()
    expect(tagCloud).toBeEmptyDOMElement()
  })

  it('should sort tags by popularity by default', () => {
    render(<TagCloud tags={mockTags} />)
    
    const tagElements = screen.getAllByText(/JavaScript|React|Vue\.js|Empty/)
    // First tag should be JavaScript (highest count: 10)
    expect(tagElements[0]).toHaveTextContent('JavaScript')
    // Second tag should be React (count: 5)
    expect(tagElements[1]).toHaveTextContent('React')
  })

  it('should support different tag variants', () => {
    render(<TagCloud tags={mockTags} variant="outline" />)
    
    const jsTag = screen.getByText('JavaScript')
    expect(jsTag.closest('span, a')).toHaveClass('border', 'border-blue-200')
  })

  it('should combine minCount and maxTags correctly', () => {
    render(<TagCloud tags={mockTags} minCount={1} maxTags={2} />)
    
    // Should filter by minCount first, then limit to maxTags
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.queryByText('Vue.js')).not.toBeInTheDocument() // Excluded by maxTags
    expect(screen.queryByText('Empty')).not.toBeInTheDocument() // Excluded by minCount
  })
})