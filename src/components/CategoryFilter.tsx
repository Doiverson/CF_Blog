'use client'

import React from 'react'
import type { Category } from '@/types'
import { Button } from './ui/Button'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategories: number[]
  onCategoryChange: (categoryIds: number[]) => void
  className?: string
}

export function CategoryFilter({ 
  categories, 
  selectedCategories, 
  onCategoryChange,
  className = "" 
}: CategoryFilterProps) {
  const handleCategoryToggle = (categoryId: number) => {
    const isSelected = selectedCategories.includes(categoryId)
    
    if (isSelected) {
      // Remove category
      onCategoryChange(selectedCategories.filter(id => id !== categoryId))
    } else {
      // Add category
      onCategoryChange([...selectedCategories, categoryId])
    }
  }

  const handleClearAll = () => {
    onCategoryChange([])
  }

  const handleSelectAll = () => {
    onCategoryChange(categories.map(cat => cat.id))
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <svg 
            className="w-5 h-5 text-blue-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 11H5m14-4H9m4 8H5m6-4h2" 
            />
          </svg>
          カテゴリ
        </h3>
        
        {/* Control Buttons */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
            className="text-xs px-2"
          >
            すべて選択
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-xs px-2"
          >
            クリア
          </Button>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 gap-3">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id)
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryToggle(category.id)}
              className={`
                group relative p-3 rounded-lg border transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              `}
              aria-pressed={isSelected}
              aria-label={`${category.name}カテゴリを${isSelected ? '除外' : '選択'}`}
            >
              {/* Selection Indicator */}
              <div className={`
                absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-300 group-hover:border-gray-400'
                }
              `}>
                {isSelected && (
                  <svg 
                    className="w-3 h-3 text-white absolute top-0.5 left-0.5" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </div>

              {/* Category Content */}
              <div className="flex items-center justify-between pr-8">
                <h4 className={`
                  font-medium text-sm transition-colors duration-200
                  ${isSelected ? 'text-blue-900' : 'text-gray-900 group-hover:text-gray-800'}
                `}>
                  {category.name}
                </h4>
                
                <span className={`
                  text-xs font-medium transition-colors duration-200
                  ${isSelected ? 'text-blue-600' : 'text-gray-500'}
                `}>
                  {category.count}
                </span>
              </div>

              {/* Hover Effect */}
              <div className={`
                absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 pointer-events-none
                ${isSelected 
                  ? 'bg-gradient-to-br from-blue-100/50 to-indigo-100/50' 
                  : 'bg-gradient-to-br from-gray-50/50 to-blue-50/50 group-hover:opacity-100'
                }
              `} />
            </button>
          )
        })}
      </div>

      {/* Selected Count */}
      {selectedCategories.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <div className="text-sm text-blue-800 font-medium">
            {selectedCategories.length}個のカテゴリが選択されています
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {selectedCategories.map((categoryId) => {
              const category = categories.find(cat => cat.id === categoryId)
              return category ? (
                <span 
                  key={categoryId}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-md"
                >
                  {category.name}
                  <button
                    onClick={() => handleCategoryToggle(categoryId)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label={`${category.name}を除外`}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}