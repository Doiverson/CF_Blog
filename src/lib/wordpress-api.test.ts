import { describe, it, expect, vi, beforeEach } from 'vitest'
import { WordPressApi } from './wordpress-api'
import type { BlogPost } from './types'

// Mock dummy data module
vi.mock('./dummy-data', () => ({
  getDummyPostsPage: vi.fn(),
  getDummyPostBySlug: vi.fn()
}))

// Mock fetch globally
global.fetch = vi.fn()

const mockFetch = vi.mocked(fetch)

// Import mocked dummy data functions
import { getDummyPostsPage, getDummyPostBySlug } from './dummy-data'
const mockGetDummyPostsPage = vi.mocked(getDummyPostsPage)
const mockGetDummyPostBySlug = vi.mocked(getDummyPostBySlug)

describe('WordPressApi', () => {
  let api: WordPressApi

  beforeEach(() => {
    vi.clearAllMocks()
    api = new WordPressApi('https://example.com/wp-json/wp/v2', false) // Disable fallback for existing tests
  })

  describe('getPosts', () => {
    it('should fetch posts successfully', async () => {
      const mockPosts: BlogPost[] = [
        {
          id: 1,
          title: { rendered: 'Test Post' },
          content: { rendered: '<p>Test content</p>' },
          excerpt: { rendered: '<p>Test excerpt</p>' },
          slug: 'test-post',
          date: '2023-01-01T00:00:00',
          modified: '2023-01-01T00:00:00',
          author: 1,
          featured_media: 0,
          categories: [1],
          tags: [],
          _links: {
            self: [{ href: 'https://example.com/wp-json/wp/v2/posts/1' }],
            author: [{ href: 'https://example.com/wp-json/wp/v2/users/1' }],
            'wp:featuredmedia': [{ href: 'https://example.com/wp-json/wp/v2/media/0' }]
          }
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({
          'X-WP-Total': '10',
          'X-WP-TotalPages': '2'
        }),
        json: async () => mockPosts,
      } as Response)

      const result = await api.getPosts()

      expect(mockFetch).toHaveBeenCalledWith(
        'https://example.com/wp-json/wp/v2/posts?per_page=10&page=1'
      )
      expect(result).toEqual({
        posts: mockPosts,
        total: 10,
        totalPages: 2,
        currentPage: 1,
        perPage: 10
      })
    })

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response)

      await expect(api.getPosts()).rejects.toThrow('WordPress API error: 404 Not Found')
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(api.getPosts()).rejects.toThrow('Network error')
    })

    it('should accept pagination parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({
          'X-WP-Total': '50',
          'X-WP-TotalPages': '5'
        }),
        json: async () => [],
      } as Response)

      await api.getPosts({ page: 2, perPage: 5 })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://example.com/wp-json/wp/v2/posts?per_page=5&page=2'
      )
    })
  })

  describe('getPost', () => {
    it('should fetch a single post by ID', async () => {
      const mockPost: BlogPost = {
        id: 1,
        title: { rendered: 'Test Post' },
        content: { rendered: '<p>Test content</p>' },
        excerpt: { rendered: '<p>Test excerpt</p>' },
        slug: 'test-post',
        date: '2023-01-01T00:00:00',
        modified: '2023-01-01T00:00:00',
        author: 1,
        featured_media: 0,
        categories: [1],
        tags: [],
        _links: {
          self: [{ href: 'https://example.com/wp-json/wp/v2/posts/1' }],
          author: [{ href: 'https://example.com/wp-json/wp/v2/users/1' }],
          'wp:featuredmedia': [{ href: 'https://example.com/wp-json/wp/v2/media/0' }]
        }
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPost,
      } as Response)

      const result = await api.getPost(1)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://example.com/wp-json/wp/v2/posts/1'
      )
      expect(result).toEqual(mockPost)
    })

    it('should fetch a single post by slug', async () => {
      const mockPosts: BlogPost[] = [{
        id: 1,
        title: { rendered: 'Test Post' },
        content: { rendered: '<p>Test content</p>' },
        excerpt: { rendered: '<p>Test excerpt</p>' },
        slug: 'test-post',
        date: '2023-01-01T00:00:00',
        modified: '2023-01-01T00:00:00',
        author: 1,
        featured_media: 0,
        categories: [1],
        tags: [],
        _links: {
          self: [{ href: 'https://example.com/wp-json/wp/v2/posts/1' }],
          author: [{ href: 'https://example.com/wp-json/wp/v2/users/1' }],
          'wp:featuredmedia': [{ href: 'https://example.com/wp-json/wp/v2/media/0' }]
        }
      }]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPosts,
      } as Response)

      const result = await api.getPost('test-post')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://example.com/wp-json/wp/v2/posts?slug=test-post'
      )
      expect(result).toEqual(mockPosts[0])
    })

    it('should throw error when post is not found by slug', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response)

      await expect(api.getPost('nonexistent-post')).rejects.toThrow(
        'Post not found: nonexistent-post'
      )
    })
  })

  describe('Fallback functionality', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    describe('getPosts fallback', () => {
      it('should fall back to dummy data when API fails', async () => {
        const apiWithFallback = new WordPressApi('https://example.com/wp-json/wp/v2', true)
        
        const mockDummyResponse = {
          posts: [{ id: 1, title: { rendered: 'Dummy Post' } }] as BlogPost[],
          total: 25,
          totalPages: 3,
          currentPage: 1,
          perPage: 10
        }
        
        mockFetch.mockRejectedValueOnce(new Error('Network error'))
        mockGetDummyPostsPage.mockReturnValueOnce(mockDummyResponse)
        
        const result = await apiWithFallback.getPosts()
        
        expect(mockGetDummyPostsPage).toHaveBeenCalledWith(1, 10)
        expect(result).toEqual(mockDummyResponse)
      })

      it('should fall back to dummy data with custom pagination params', async () => {
        const apiWithFallback = new WordPressApi('https://example.com/wp-json/wp/v2', true)
        
        const mockDummyResponse = {
          posts: [] as BlogPost[],
          total: 25,
          totalPages: 5,
          currentPage: 2,
          perPage: 5
        }
        
        mockFetch.mockRejectedValueOnce(new Error('404 Not Found'))
        mockGetDummyPostsPage.mockReturnValueOnce(mockDummyResponse)
        
        const result = await apiWithFallback.getPosts({ page: 2, perPage: 5 })
        
        expect(mockGetDummyPostsPage).toHaveBeenCalledWith(2, 5)
        expect(result).toEqual(mockDummyResponse)
      })

      it('should not fall back when fallback is disabled', async () => {
        const apiWithoutFallback = new WordPressApi('https://example.com/wp-json/wp/v2', false)
        
        mockFetch.mockRejectedValueOnce(new Error('Network error'))
        
        await expect(apiWithoutFallback.getPosts()).rejects.toThrow('Network error')
        expect(mockGetDummyPostsPage).not.toHaveBeenCalled()
      })
    })

    describe('getPost fallback', () => {
      it('should fall back to dummy data when fetching post by slug fails', async () => {
        const apiWithFallback = new WordPressApi('https://example.com/wp-json/wp/v2', true)
        
        const mockDummyPost = {
          id: 1,
          title: { rendered: 'Dummy Post' },
          slug: 'test-slug'
        } as BlogPost
        
        mockFetch.mockRejectedValueOnce(new Error('404 Not Found'))
        mockGetDummyPostBySlug.mockReturnValueOnce(mockDummyPost)
        
        const result = await apiWithFallback.getPost('test-slug')
        
        expect(mockGetDummyPostBySlug).toHaveBeenCalledWith('test-slug')
        expect(result).toEqual(mockDummyPost)
      })

      it('should not fall back when fetching post by ID fails', async () => {
        const apiWithFallback = new WordPressApi('https://example.com/wp-json/wp/v2', true)
        
        mockFetch.mockRejectedValueOnce(new Error('404 Not Found'))
        
        await expect(apiWithFallback.getPost(123)).rejects.toThrow('404 Not Found')
        expect(mockGetDummyPostBySlug).not.toHaveBeenCalled()
      })

      it('should not fall back when fallback is disabled', async () => {
        const apiWithoutFallback = new WordPressApi('https://example.com/wp-json/wp/v2', false)
        
        mockFetch.mockRejectedValueOnce(new Error('Network error'))
        
        await expect(apiWithoutFallback.getPost('test-slug')).rejects.toThrow('Network error')
        expect(mockGetDummyPostBySlug).not.toHaveBeenCalled()
      })
    })
  })
})