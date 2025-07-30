import { describe, it, expect } from 'vitest'
import { 
  generateTagHref, 
  groupTagsByLetter, 
  sortTagsByPopularity, 
  filterTagsByMinCount 
} from '../data-utils'

describe('Tag Data Utils', () => {
  describe('generateTagHref', () => {
    it('should generate proper tag URLs', () => {
      expect(generateTagHref('javascript')).toBe('/tags/javascript')
      expect(generateTagHref('react-native')).toBe('/tags/react-native')
    })

    it('should encode special characters in URLs', () => {
      expect(generateTagHref('C++')).toBe('/tags/C%2B%2B')
      expect(generateTagHref('Vue.js')).toBe('/tags/Vue.js')
      expect(generateTagHref('AI/ML')).toBe('/tags/AI%2FML')
    })

    it('should handle Japanese characters', () => {
      expect(generateTagHref('JavaScript入門')).toBe('/tags/JavaScript%E5%85%A5%E9%96%80')
    })
  })

  describe('groupTagsByLetter', () => {
    const mockTags = [
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'Java', slug: 'java' },
      { name: 'React', slug: 'react' },
      { name: 'Angular', slug: 'angular' },
      { name: 'Vue.js', slug: 'vue-js' }
    ]

    it('should group tags by first letter', () => {
      const result = groupTagsByLetter(mockTags)
      
      expect(result['J']).toEqual([
        { name: 'JavaScript', slug: 'javascript' },
        { name: 'Java', slug: 'java' }
      ])
      expect(result['R']).toEqual([
        { name: 'React', slug: 'react' }
      ])
      expect(result['A']).toEqual([
        { name: 'Angular', slug: 'angular' }
      ])
      expect(result['V']).toEqual([
        { name: 'Vue.js', slug: 'vue-js' }
      ])
    })

    it('should handle empty array', () => {
      const result = groupTagsByLetter([])
      expect(result).toEqual({})
    })

    it('should handle lowercase first letters', () => {
      const tags = [{ name: 'javascript', slug: 'javascript' }]
      const result = groupTagsByLetter(tags)
      expect(result['J']).toEqual([{ name: 'javascript', slug: 'javascript' }])
    })
  })

  describe('sortTagsByPopularity', () => {
    const mockTags = [
      { name: 'JavaScript', count: 5 },
      { name: 'React', count: 10 },
      { name: 'Vue.js', count: 3 },
      { name: 'Angular', count: 7 }
    ]

    it('should sort tags by count descending', () => {
      const result = sortTagsByPopularity(mockTags)
      
      expect(result[0]!.name).toBe('React')
      expect(result[0]!.count).toBe(10)
      expect(result[1]!.name).toBe('Angular')
      expect(result[1]!.count).toBe(7)
      expect(result[2]!.name).toBe('JavaScript')
      expect(result[2]!.count).toBe(5)
      expect(result[3]!.name).toBe('Vue.js')
      expect(result[3]!.count).toBe(3)
    })

    it('should not mutate original array', () => {
      const original = [...mockTags]
      sortTagsByPopularity(mockTags)
      expect(mockTags).toEqual(original)
    })

    it('should handle empty array', () => {
      const result = sortTagsByPopularity([])
      expect(result).toEqual([])
    })

    it('should handle tags with same count', () => {
      const tags = [
        { name: 'A', count: 5 },
        { name: 'B', count: 5 },
        { name: 'C', count: 5 }
      ]
      const result = sortTagsByPopularity(tags)
      expect(result).toHaveLength(3)
      expect(result.every(tag => tag.count === 5)).toBe(true)
    })
  })

  describe('filterTagsByMinCount', () => {
    const mockTags = [
      { name: 'JavaScript', count: 5 },
      { name: 'React', count: 0 },
      { name: 'Vue.js', count: 3 },
      { name: 'Angular', count: 1 }
    ]

    it('should filter tags by minimum count', () => {
      const result = filterTagsByMinCount(mockTags, 3)
      
      expect(result).toHaveLength(2)
      expect(result.map(tag => tag.name)).toEqual(['JavaScript', 'Vue.js'])
    })

    it('should use default minimum count of 1', () => {
      const result = filterTagsByMinCount(mockTags)
      
      expect(result).toHaveLength(3)
      expect(result.map(tag => tag.name)).toEqual(['JavaScript', 'Vue.js', 'Angular'])
    })

    it('should handle empty array', () => {
      const result = filterTagsByMinCount([])
      expect(result).toEqual([])
    })

    it('should include tags with exactly minimum count', () => {
      const result = filterTagsByMinCount(mockTags, 5)
      
      expect(result).toHaveLength(1)
      expect(result[0]!.name).toBe('JavaScript')
    })

    it('should return empty array when no tags meet criteria', () => {
      const result = filterTagsByMinCount(mockTags, 10)
      expect(result).toEqual([])
    })
  })
})