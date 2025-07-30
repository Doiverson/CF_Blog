'use client'

import React from 'react'

export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'popular' | 'random'

interface SortSelectorProps {
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
  className?: string
}

const sortOptions: { value: SortOption; label: string; icon: string; description: string }[] = [
  {
    value: 'date-desc',
    label: '新しい順',
    icon: '🕒',
    description: '最新の記事から表示'
  },
  {
    value: 'date-asc',
    label: '古い順',
    icon: '📅',
    description: '古い記事から表示'
  },
  {
    value: 'title-asc',
    label: 'タイトル昇順',
    icon: '🔤',
    description: 'タイトルのアルファベット順'
  },
  {
    value: 'title-desc',
    label: 'タイトル降順',
    icon: '🔡',
    description: 'タイトルの逆アルファベット順'
  },
  {
    value: 'popular',
    label: '人気順',
    icon: '🔥',
    description: '人気の記事から表示'
  },
  {
    value: 'random',
    label: 'ランダム',
    icon: '🎲',
    description: 'ランダムな順序で表示'
  }
]

export function SortSelector({ currentSort, onSortChange, className = "" }: SortSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const currentOption = sortOptions.find(opt => opt.value === currentSort) ?? sortOptions[0]!

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full inline-flex items-center justify-between gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="並び順を選択"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg" role="img" aria-hidden="true">
            {currentOption.icon}
          </span>
          <span className="font-medium text-gray-900">
            {currentOption.label}
          </span>
        </div>
        
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu */}
          <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
            <div className="p-2">
              <div className="mb-2 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                並び順を選択
              </div>
              
              <div className="space-y-1" role="listbox">
                {sortOptions.map((option) => {
                  const isSelected = option.value === currentSort
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value)
                        setIsOpen(false)
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200
                        ${isSelected 
                          ? 'bg-blue-50 text-blue-900 border-2 border-blue-200' 
                          : 'hover:bg-gray-50 border-2 border-transparent'
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      `}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span className="text-lg flex-shrink-0" role="img" aria-hidden="true">
                        {option.icon}
                      </span>
                      
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                          {option.label}
                        </div>
                        <div className={`text-sm ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                          {option.description}
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="flex-shrink-0">
                          <svg 
                            className="w-5 h-5 text-blue-600" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                              clipRule="evenodd" 
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}