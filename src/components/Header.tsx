'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { SearchBar } from '@/components/SearchBar'
import type { Category } from '@/types'

interface HeaderProps {
  categories?: Category[]
}

export function Header({ categories = [] }: HeaderProps) {
  const router = useRouter()

  const handleSearch = (query: string) => {
    // Navigate to search results page
    if (query) {
      router.push(`/?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Amazing Stories
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Modern WordPress Blog
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden lg:block">
            <Navigation categories={categories} />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon (Mobile) */}
            <button
              onClick={() => {
                const searchSection = document.getElementById('mobile-search')
                searchSection?.classList.toggle('hidden')
              }}
              className="lg:hidden p-2 -m-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="検索"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:block">
              <SearchBar
                onSearch={handleSearch}
                className="w-64"
              />
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <Navigation categories={categories} />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          id="mobile-search"
          className="hidden lg:hidden pb-4 pt-2"
        >
          <SearchBar
            onSearch={handleSearch}
            className="w-full"
          />
        </div>
      </div>
    </header>
  )
}