import type { BlogPost, BlogPostsResponse, PaginationParams, WordPressApiError, Tag } from '@/types'
import { getDummyPostsPage, getDummyPostBySlug, getDummyTags, getDummyTagById, getDummyTagsByIds, getDummyTagBySlug } from './dummy-data'

export class WordPressApi {
  private baseUrl: string
  private useFallback: boolean

  constructor(baseUrl: string, useFallback: boolean = true) {
    this.baseUrl = baseUrl.replace(/\/$/, '') // Remove trailing slash
    this.useFallback = useFallback
  }

  async getPosts(params: PaginationParams = {}): Promise<BlogPostsResponse> {
    const { page = 1, perPage = 10 } = params
    const url = `${this.baseUrl}/posts?per_page=${perPage}&page=${page}`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        const error: WordPressApiError = new Error(
          `WordPress API error: ${response.status} ${response.statusText}`
        )
        error.status = response.status
        error.statusText = response.statusText
        throw error
      }

      const posts = await response.json() as BlogPost[]
      const total = parseInt(response.headers.get('X-WP-Total') || '0', 10)
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10)

      return {
        posts,
        total,
        totalPages,
        currentPage: page,
        perPage,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    } catch (error) {
      if (this.useFallback) {
        console.warn('WordPress API unavailable, falling back to dummy data:', error)
        return getDummyPostsPage(page, perPage)
      }
      
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Unknown error occurred while fetching posts')
    }
  }

  async getPost(identifier: number | string): Promise<BlogPost> {
    let url: string

    if (typeof identifier === 'number') {
      url = `${this.baseUrl}/posts/${identifier}`
    } else {
      url = `${this.baseUrl}/posts?slug=${identifier}`
    }

    try {
      const response = await fetch(url)

      if (!response.ok) {
        const error: WordPressApiError = new Error(
          `WordPress API error: ${response.status} ${response.statusText}`
        )
        error.status = response.status
        error.statusText = response.statusText
        throw error
      }

      if (typeof identifier === 'string') {
        const posts = await response.json() as BlogPost[]
        if (posts.length === 0) {
          throw new Error(`Post not found: ${identifier}`)
        }
        return posts[0]!
      } else {
        return await response.json() as BlogPost
      }
    } catch (error) {
      if (this.useFallback && typeof identifier === 'string') {
        console.warn('WordPress API unavailable, falling back to dummy data:', error)
        return getDummyPostBySlug(identifier)
      }
      
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Unknown error occurred while fetching post')
    }
  }

  async getTags(): Promise<Tag[]> {
    const url = `${this.baseUrl}/tags?per_page=100`

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch tags: ${response.status} ${response.statusText}`)
      }

      return await response.json() as Tag[]
    } catch (error) {
      if (this.useFallback) {
        console.warn('WordPress API unavailable, falling back to dummy tags:', error)
        return getDummyTags()
      }
      
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Unknown error occurred while fetching tags')
    }
  }

  async getTagById(id: number): Promise<Tag> {
    const url = `${this.baseUrl}/tags/${id}`

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch tag: ${response.status} ${response.statusText}`)
      }

      return await response.json() as Tag
    } catch (error) {
      if (this.useFallback) {
        console.warn('WordPress API unavailable, falling back to dummy tag:', error)
        const tag = getDummyTagById(id)
        if (!tag) {
          throw new Error(`Tag not found: ${id}`)
        }
        return tag
      }
      
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Unknown error occurred while fetching tag')
    }
  }

  async getPostsByTag(tagSlug: string, params: PaginationParams = {}): Promise<BlogPostsResponse> {
    const { page = 1, perPage = 10 } = params

    try {
      // First, get the tag ID from the slug
      const tagsResponse = await fetch(`${this.baseUrl}/tags?slug=${tagSlug}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!tagsResponse.ok) {
        throw new Error(`Failed to fetch tag: ${tagsResponse.status} ${tagsResponse.statusText}`)
      }

      const tags = await tagsResponse.json() as Tag[]
      if (tags.length === 0) {
        throw new Error(`Tag with slug "${tagSlug}" not found`)
      }

      const tagId = tags[0]!.id
      const url = `${this.baseUrl}/posts?tags=${tagId}&page=${page}&per_page=${perPage}`

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`)
      }

      const posts = await response.json() as BlogPost[]
      const total = parseInt(response.headers.get('X-WP-Total') || '0', 10)
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10)

      return {
        posts,
        total,
        totalPages,
        currentPage: page,
        perPage,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    } catch (error) {
      if (this.useFallback) {
        console.warn('WordPress API unavailable, falling back to dummy data for tag filtering:', error)
        
        // Find the tag in dummy data
        const tag = getDummyTagBySlug(tagSlug)
        if (!tag) {
          throw new Error(`Tag with slug "${tagSlug}" not found`)
        }

        // Filter dummy posts by tag ID
        const allPosts = getDummyPostsPage(1, 100).posts
        const filteredPosts = allPosts.filter(post => post.tags.includes(tag.id))
        
        // Apply pagination
        const startIndex = (page - 1) * perPage
        const endIndex = startIndex + perPage
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex)
        
        return {
          posts: paginatedPosts,
          total: filteredPosts.length,
          totalPages: Math.ceil(filteredPosts.length / perPage),
          currentPage: page,
          perPage,
          hasNextPage: page < Math.ceil(filteredPosts.length / perPage),
          hasPreviousPage: page > 1
        }
      }
      
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Unknown error occurred while fetching posts by tag')
    }
  }

  async getTagsByIds(ids: number[]): Promise<Tag[]> {
    if (ids.length === 0) {
      return []
    }

    const url = `${this.baseUrl}/tags?include=${ids.join(',')}&per_page=100`

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch tags: ${response.status} ${response.statusText}`)
      }

      return await response.json() as Tag[]
    } catch (error) {
      if (this.useFallback) {
        console.warn('WordPress API unavailable, falling back to dummy tags:', error)
        return getDummyTagsByIds(ids)
      }
      
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Unknown error occurred while fetching tags')
    }
  }
}