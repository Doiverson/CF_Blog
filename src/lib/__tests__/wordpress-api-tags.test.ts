import { describe, it, expect, vi, beforeEach } from 'vitest'
import { WordPressApi } from '../wordpress-api'
import type { Tag } from '../types'

// Mock fetch globally
global.fetch = vi.fn()

describe('WordPressApi - Tag Methods', () => {
  let api: WordPressApi
  const mockFetch = global.fetch as ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    api = new WordPressApi('https://example.com/wp-json/wp/v2')
  })

  describe('getTags', () => {
    it('should fetch all tags', async () => {
      const mockTags: Tag[] = [
        {
          id: 1,
          count: 5,
          description: 'JavaScript related posts',
          link: 'https://example.com/tag/javascript',
          name: 'JavaScript',
          slug: 'javascript',
          taxonomy: 'post_tag',
          meta: []
        },
        {
          id: 2,
          count: 3,
          description: 'React framework posts',
          link: 'https://example.com/tag/react',
          name: 'React',
          slug: 'react',
          taxonomy: 'post_tag',
          meta: []
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTags,
        headers: new Headers({
          'X-WP-Total': '2',
          'X-WP-TotalPages': '1'
        })
      })

      const result = await api.getTags()

      expect(mockFetch).toHaveBeenCalledWith(
        'https://example.com/wp-json/wp/v2/tags?per_page=100',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
      expect(result).toEqual(mockTags)
    })

    it('should handle API errors when fetching tags', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      })

      // Since fallback is enabled by default, it should return dummy tags
      const result = await api.getTags()
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBeGreaterThan(0)
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('slug')
    })

    it('should throw error when API fails and fallback is disabled', async () => {
      const apiNoFallback = new WordPressApi('https://example.com/wp-json/wp/v2', false)
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      })

      await expect(apiNoFallback.getTags()).rejects.toThrow('Failed to fetch tags: 500 Internal Server Error')
    })
  })

  describe('getTagById', () => {
    it('should fetch a single tag by ID', async () => {
      const mockTag: Tag = {
        id: 1,
        count: 5,
        description: 'JavaScript related posts',
        link: 'https://example.com/tag/javascript',
        name: 'JavaScript',
        slug: 'javascript',
        taxonomy: 'post_tag',
        meta: []
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTag
      })

      const result = await api.getTagById(1)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://example.com/wp-json/wp/v2/tags/1',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
      expect(result).toEqual(mockTag)
    })

    it('should handle 404 when tag not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      })

      // With fallback enabled, it should try to find in dummy data and throw if not found
      await expect(api.getTagById(999)).rejects.toThrow('Tag not found: 999')
    })

    it('should throw error when tag not found and fallback is disabled', async () => {
      const apiNoFallback = new WordPressApi('https://example.com/wp-json/wp/v2', false)
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      })

      await expect(apiNoFallback.getTagById(999)).rejects.toThrow('Failed to fetch tag: 404 Not Found')
    })
  })

  describe('getPostsByTag', () => {
    it('should fetch posts filtered by tag slug', async () => {
      // First mock: tag lookup
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [{
          id: 1,
          count: 5,
          description: 'JavaScript related posts',
          link: 'https://example.com/tag/javascript',
          name: 'JavaScript',
          slug: 'javascript',
          taxonomy: 'post_tag',
          meta: []
        }]
      })

      const mockPosts = [
        {
          id: 1,
          title: { rendered: 'JavaScript Tips' },
          content: { rendered: '<p>Content</p>' },
          excerpt: { rendered: '<p>Excerpt</p>' },
          slug: 'javascript-tips',
          date: '2024-01-01T00:00:00',
          modified: '2024-01-01T00:00:00',
          author: 1,
          featured_media: 0,
          categories: [1],
          tags: [1],
          _links: {
            self: [{ href: 'https://example.com/wp-json/wp/v2/posts/1' }],
            author: [{ href: 'https://example.com/wp-json/wp/v2/users/1' }],
            'wp:featuredmedia': [{ href: 'https://example.com/wp-json/wp/v2/media/0' }]
          }
        }
      ]

      // Second mock: posts lookup
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPosts,
        headers: new Headers({
          'X-WP-Total': '1',
          'X-WP-TotalPages': '1'
        })
      })

      const result = await api.getPostsByTag('javascript', { page: 1, perPage: 10 })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://example.com/wp-json/wp/v2/tags?slug=javascript',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
      expect(mockFetch).toHaveBeenCalledWith(
        'https://example.com/wp-json/wp/v2/posts?tags=1&page=1&per_page=10',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
      expect(result.posts).toEqual(mockPosts)
      expect(result.total).toBe(1)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)
      expect(result.perPage).toBe(10)
    })

    it('should handle tag slug not found', async () => {
      // First, mock tag lookup failure
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
        headers: new Headers({
          'X-WP-Total': '0',
          'X-WP-TotalPages': '0'
        })
      })

      await expect(api.getPostsByTag('nonexistent', { page: 1, perPage: 10 }))
        .rejects.toThrow('Tag with slug "nonexistent" not found')
    })
  })

  describe('getTagsByIds', () => {
    it('should fetch multiple tags by their IDs', async () => {
      const mockTags: Tag[] = [
        {
          id: 1,
          count: 5,
          description: 'JavaScript related posts',
          link: 'https://example.com/tag/javascript',
          name: 'JavaScript',
          slug: 'javascript',
          taxonomy: 'post_tag',
          meta: []
        },
        {
          id: 2,
          count: 3,
          description: 'React framework posts',
          link: 'https://example.com/tag/react',
          name: 'React',
          slug: 'react',
          taxonomy: 'post_tag',
          meta: []
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTags,
        headers: new Headers({
          'X-WP-Total': '2',
          'X-WP-TotalPages': '1'
        })
      })

      const result = await api.getTagsByIds([1, 2])

      expect(mockFetch).toHaveBeenCalledWith(
        'https://example.com/wp-json/wp/v2/tags?include=1,2&per_page=100',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
      expect(result).toEqual(mockTags)
    })

    it('should return empty array for empty ID list', async () => {
      const result = await api.getTagsByIds([])
      expect(result).toEqual([])
      expect(mockFetch).not.toHaveBeenCalled()
    })
  })
})