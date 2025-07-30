import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './Pagination'

const mockOnPageChange = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render current page and total pages', () => {
    render(
      <Pagination 
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )
    
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument()
  })

  it('should render Previous and Next buttons', () => {
    render(
      <Pagination 
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )
    
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('should disable Previous button on first page', () => {
    render(
      <Pagination 
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )
    
    const prevButton = screen.getByRole('button', { name: /previous/i })
    expect(prevButton).toBeDisabled()
  })

  it('should disable Next button on last page', () => {
    render(
      <Pagination 
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )
    
    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).toBeDisabled()
  })

  it('should call onPageChange with previous page when Previous clicked', () => {
    render(
      <Pagination 
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )
    
    const prevButton = screen.getByRole('button', { name: /previous/i })
    fireEvent.click(prevButton)
    
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('should call onPageChange with next page when Next clicked', () => {
    render(
      <Pagination 
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )
    
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    
    expect(mockOnPageChange).toHaveBeenCalledWith(4)
  })

  it('should render numbered page buttons for small pagination', () => {
    render(
      <Pagination 
        currentPage={2}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />
    )
    
    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 3' })).toBeInTheDocument()
  })

  it('should highlight current page button', () => {
    render(
      <Pagination 
        currentPage={2}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />
    )
    
    const currentPageButton = screen.getByRole('button', { name: 'Page 2' })
    expect(currentPageButton).toHaveAttribute('aria-current', 'page')
    expect(currentPageButton).toHaveClass('bg-blue-600', 'text-white')
  })

  it('should call onPageChange with clicked page number', () => {
    render(
      <Pagination 
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />
    )
    
    const pageThreeButton = screen.getByRole('button', { name: 'Page 3' })
    fireEvent.click(pageThreeButton)
    
    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it('should not render when totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination 
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    )
    
    expect(container.firstChild).toBeNull()
  })

  it('should render ellipsis for large pagination', () => {
    render(
      <Pagination 
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    )
    
    const ellipses = screen.getAllByText('...')
    expect(ellipses.length).toBeGreaterThan(0)
  })

  it('should be accessible with proper ARIA attributes', () => {
    render(
      <Pagination 
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Pagination')
    
    const currentPageButton = screen.getByRole('button', { name: 'Page 2' })
    expect(currentPageButton).toHaveAttribute('aria-current', 'page')
  })

  it('should handle edge case with currentPage 0', () => {
    render(
      <Pagination 
        currentPage={0}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )
    
    // Should treat as page 1
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument()
    const prevButton = screen.getByRole('button', { name: /previous/i })
    expect(prevButton).toBeDisabled()
  })

  it('should handle edge case with currentPage greater than totalPages', () => {
    render(
      <Pagination 
        currentPage={10}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )
    
    // Should treat as last page
    expect(screen.getByText('Page 5 of 5')).toBeInTheDocument()
    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).toBeDisabled()
  })
})