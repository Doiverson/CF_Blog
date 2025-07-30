'use client'

import React, { useState, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  defaultValue?: string
  className?: string
}

export function SearchBar({ 
  onSearch, 
  placeholder = "記事を検索...", 
  defaultValue = "",
  className = "" 
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const [isFocused, setIsFocused] = useState(false)

  // Debounced search function
  const debouncedSearch = React.useMemo(
    () => {
      let timeout: NodeJS.Timeout | null = null
      return (searchQuery: string) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => onSearch(searchQuery), 300)
      }
    },
    [onSearch]
  )

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className={`relative max-w-md mx-auto ${className}`}>
      <div className={`
        relative flex items-center transition-all duration-200 
        ${isFocused ? 'transform scale-105' : ''}
      `}>
        {/* Search Icon */}
        <div className="absolute left-4 z-10">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full pl-12 pr-12 py-3 rounded-2xl border-2 transition-all duration-200
            bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500
            ${isFocused 
              ? 'border-blue-500 shadow-lg shadow-blue-200/50 bg-white' 
              : 'border-gray-200 hover:border-gray-300 shadow-sm'
            }
            focus:outline-none focus:ring-0
          `}
          aria-label="記事を検索"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
            aria-label="検索をクリア"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Indicator */}
      {query && (
        <div className="mt-2 text-sm text-gray-600 text-center">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            &ldquo;{query}&rdquo; で検索中...
          </span>
        </div>
      )}
    </div>
  )
}