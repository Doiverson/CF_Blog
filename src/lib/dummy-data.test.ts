import { describe, it, expect } from 'vitest'
import { 
  generateDummyPosts, 
  generateDummyPost, 
  getDummyPostBySlug,
  getDummyPostsPage 
} from './dummy-data'

describe('Dummy Data Generator', () => {
  describe('generateDummyPosts', () => {
    it('should generate specified number of dummy posts', () => {
      const posts = generateDummyPosts(5)
      
      expect(posts).toHaveLength(5)
      expect(posts[0]).toHaveProperty('id')
      expect(posts[0]).toHaveProperty('title')
      expect(posts[0]).toHaveProperty('content')
      expect(posts[0]).toHaveProperty('excerpt')
      expect(posts[0]).toHaveProperty('slug')
      expect(posts[0]).toHaveProperty('date')
    })

    it('should generate posts with unique IDs', () => {
      const posts = generateDummyPosts(10)
      const ids = posts.map(post => post.id)
      const uniqueIds = [...new Set(ids)]
      
      expect(uniqueIds).toHaveLength(10)
    })

    it('should generate posts with different dates', () => {
      const posts = generateDummyPosts(5)
      const dates = posts.map(post => post.date)
      const uniqueDates = [...new Set(dates)]
      
      expect(uniqueDates.length).toBeGreaterThan(1)
    })

    it('should generate posts with proper WordPress structure', () => {
      const posts = generateDummyPosts(1)
      const post = posts[0]!
      
      expect(post.title).toHaveProperty('rendered')
      expect(post.content).toHaveProperty('rendered')
      expect(post.excerpt).toHaveProperty('rendered')
      expect(post._links).toHaveProperty('self')
      expect(post._links).toHaveProperty('author')
      expect(post._links).toHaveProperty('wp:featuredmedia')
    })
  })

  describe('generateDummyPost', () => {
    it('should generate a single dummy post with specified ID', () => {
      const post = generateDummyPost(42)
      
      expect(post.id).toBe(42)
      expect(post.title.rendered).toBeTruthy()
      expect(post.content.rendered).toBeTruthy()
      expect(post.slug).toBeTruthy()
    })

    it('should generate posts with HTML content', () => {
      const post = generateDummyPost(1)
      
      expect(post.content.rendered).toContain('<p>')
      expect(post.content.rendered).toContain('</p>')
      expect(post.excerpt.rendered).toContain('<p>')
    })
  })

  describe('getDummyPostBySlug', () => {
    it('should return post matching the slug', () => {
      const post = getDummyPostBySlug('getting-started-with-nextjs')
      
      expect(post).toBeDefined()
      expect(post.slug).toBe('getting-started-with-nextjs')
    })

    it('should throw error for non-existent slug', () => {
      expect(() => getDummyPostBySlug('non-existent-slug')).toThrow(
        'Post not found: non-existent-slug'
      )
    })

    it('should return different posts for different slugs', () => {
      const post1 = getDummyPostBySlug('getting-started-with-nextjs')
      const post2 = getDummyPostBySlug('mastering-react-hooks')
      
      expect(post1.id).not.toBe(post2.id)
      expect(post1.title.rendered).not.toBe(post2.title.rendered)
    })
  })

  describe('getDummyPostsPage', () => {
    it('should return paginated posts response', () => {
      const response = getDummyPostsPage(1, 5)
      
      expect(response.posts).toHaveLength(5)
      expect(response.currentPage).toBe(1)
      expect(response.perPage).toBe(5)
      expect(response.total).toBeGreaterThan(0)
      expect(response.totalPages).toBeGreaterThan(0)
    })

    it('should return different posts for different pages', () => {
      const page1 = getDummyPostsPage(1, 3)
      const page2 = getDummyPostsPage(2, 3)
      
      expect(page1.posts[0]!.id).not.toBe(page2.posts[0]!.id)
      expect(page1.currentPage).toBe(1)
      expect(page2.currentPage).toBe(2)
    })

    it('should handle last page correctly', () => {
      const totalPosts = 25 // Default total in dummy data
      const perPage = 10
      const lastPage = Math.ceil(totalPosts / perPage)
      
      const response = getDummyPostsPage(lastPage, perPage)
      
      expect(response.currentPage).toBe(lastPage)
      expect(response.posts.length).toBeLessThanOrEqual(perPage)
      expect(response.totalPages).toBe(lastPage)
    })

    it('should return empty array for page beyond total pages', () => {
      const response = getDummyPostsPage(100, 10)
      
      expect(response.posts).toHaveLength(0)
      expect(response.currentPage).toBe(100)
    })
  })
})