import { describe, it, expect } from 'vitest'
import { formatPostDate, stripHtmlTags, generateSlug, calculateReadingTime } from './data-utils'

describe('Data Utils', () => {
  describe('formatPostDate', () => {
    it('should format ISO date string to readable format', () => {
      const result = formatPostDate('2023-12-25T10:30:00')
      expect(result).toBe('December 25, 2023')
    })

    it('should handle different date formats', () => {
      const result = formatPostDate('2023-01-01T00:00:00Z')
      expect(result).toBe('January 1, 2023')
    })

    it('should throw error for invalid date', () => {
      expect(() => formatPostDate('invalid-date')).toThrow('Invalid date format')
    })
  })

  describe('stripHtmlTags', () => {
    it('should remove HTML tags from content', () => {
      const html = '<p>This is <strong>bold</strong> text.</p>'
      const result = stripHtmlTags(html)
      expect(result).toBe('This is bold text.')
    })

    it('should handle nested HTML tags', () => {
      const html = '<div><p>Hello <span><em>world</em></span></p></div>'
      const result = stripHtmlTags(html)
      expect(result).toBe('Hello world')
    })

    it('should handle empty content', () => {
      const result = stripHtmlTags('')
      expect(result).toBe('')
    })

    it('should handle content without HTML tags', () => {
      const result = stripHtmlTags('Plain text')
      expect(result).toBe('Plain text')
    })

    it('should decode HTML entities', () => {
      const html = '&lt;p&gt;Hello &amp; goodbye&lt;/p&gt;'
      const result = stripHtmlTags(html)
      expect(result).toBe('Hello & goodbye')
    })
  })

  describe('generateSlug', () => {
    it('should convert title to URL-friendly slug', () => {
      const result = generateSlug('This Is A Test Title')
      expect(result).toBe('this-is-a-test-title')
    })

    it('should handle special characters', () => {
      const result = generateSlug('Hello, World! How are you?')
      expect(result).toBe('hello-world-how-are-you')
    })

    it('should handle accented characters', () => {
      const result = generateSlug('Café & Résumé')
      expect(result).toBe('cafe-resume')
    })

    it('should handle Japanese characters', () => {
      const result = generateSlug('こんにちは世界')
      expect(result).toBe('こんにちは世界')
    })

    it('should remove multiple consecutive dashes', () => {
      const result = generateSlug('Multiple   ---   Dashes')
      expect(result).toBe('multiple-dashes')
    })
  })

  describe('calculateReadingTime', () => {
    it('should calculate reading time for short content', () => {
      const content = 'This is a short piece of content with about twenty words in total.'
      const result = calculateReadingTime(content)
      expect(result).toBe(1) // Should round up to 1 minute minimum
    })

    it('should calculate reading time for longer content', () => {
      // Generate content with approximately 400 words (should be ~2 minutes at 200 WPM)
      const words = Array(400).fill('word').join(' ')
      const result = calculateReadingTime(words)
      expect(result).toBe(2)
    })

    it('should handle HTML content', () => {
      const htmlContent = '<p>This is <strong>HTML</strong> content with <em>about twenty</em> words in total.</p>'
      const result = calculateReadingTime(htmlContent)
      expect(result).toBe(1)
    })

    it('should handle empty content', () => {
      const result = calculateReadingTime('')
      expect(result).toBe(1) // Minimum 1 minute
    })
  })
})