// Dummy data barrel file

// Internal imports for utility functions
import { getDummyPostById as _getDummyPostById, dummyPosts as _dummyPosts } from './dummy-posts'
import { getAuthorById as _getAuthorById } from './dummy-authors'
import { getCategoriesByIds as _getCategoriesByIds } from './dummy-categories'
import { getTagsByIds as _getTagsByIds } from './dummy-tags'

// Authors
export { 
  dummyAuthors, 
  getAuthorById, 
  getAuthorBySlug 
} from './dummy-authors'

// Categories
export { 
  dummyCategories, 
  getCategoryById, 
  getCategoryBySlug, 
  getCategoriesByIds 
} from './dummy-categories'

// Tags
export { 
  dummyTags, 
  getTagById, 
  getTagBySlug, 
  getTagsByIds 
} from './dummy-tags'

// Posts
export { 
  dummyPosts, 
  getDummyPostsPage, 
  getDummyPostBySlug, 
  getDummyPostById 
} from './dummy-posts'

// Utility functions for enriched data
export const getEnrichedPost = (postId: number) => {
  const post = _getDummyPostById(postId)
  if (!post) return null
  
  const authorDetails = _getAuthorById(post.author)
  const categoriesDetails = _getCategoriesByIds(post.categories)
  const tagsDetails = _getTagsByIds(post.tags)
  
  return {
    ...post,
    authorDetails,
    categoriesDetails,
    tagsDetails,
    readingTime: calculateReadingTime(post.content.rendered),
    wordCount: countWords(post.content.rendered)
  }
}

export const getRelatedPosts = (postId: number, limit: number = 3) => {
  const currentPost = _getDummyPostById(postId)
  if (!currentPost) return []
  
  // Find posts with similar categories or tags
  const relatedPosts = _dummyPosts
    .filter(post => post.id !== postId)
    .filter(post => 
      post.categories.some(cat => currentPost.categories.includes(cat)) ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit)
    
  return relatedPosts
}

// Utility functions
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200
  const wordCount = countWords(content)
  return Math.ceil(wordCount / wordsPerMinute)
}

const countWords = (text: string): number => {
  // Remove HTML tags and count words
  const plainText = text.replace(/<[^>]*>/g, '')
  return plainText.trim().split(/\s+/).filter(word => word.length > 0).length
}

// Re-export all dummy data functions
export * from './dummy-authors'
export * from './dummy-categories' 
export * from './dummy-tags'
export * from './dummy-posts'