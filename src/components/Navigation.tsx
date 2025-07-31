'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import type { Category } from '@/types'

interface NavigationProps {
  categories?: Category[]
}

export function Navigation({ categories = [] }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'ホーム' },
    { href: '/about', label: 'About' },
    { href: '/archive', label: 'アーカイブ' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden items-center gap-8 lg:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive(item.href) ? 'text-blue-600' : 'text-gray-700'} `}
          >
            {item.label}
          </Link>
        ))}

        {/* Categories Dropdown */}
        {categories.length > 0 && (
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
              カテゴリー
              <svg
                className="h-4 w-4 transition-transform group-hover:rotate-180"
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
            <div className="invisible absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-100 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="py-2">
                {categories.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className="text-xs text-gray-400">{category.count}</span>
                    </div>
                  </Link>
                ))}
                {categories.length > 6 && (
                  <Link
                    href="/categories"
                    className="block border-t border-gray-100 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50"
                  >
                    すべてのカテゴリーを見る →
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="-m-2 p-2 text-gray-600 transition-colors hover:text-gray-900 lg:hidden"
        aria-label="メニューを開く"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-gray-100 bg-white shadow-lg lg:hidden">
          <div className="py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                } `}
              >
                {item.label}
              </Link>
            ))}

            {/* Categories in Mobile */}
            {categories.length > 0 && (
              <>
                <div className="mt-2 border-t border-gray-100 pt-2">
                  <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    カテゴリー
                  </div>
                  {categories.slice(0, 5).map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-xs text-gray-400">{category.count}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
