import Link from 'next/link'
import type { BreadcrumbItem } from '@/types'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav 
      aria-label="パンくずリスト" 
      className={`flex items-center space-x-2 text-sm ${className}`}
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              
              {isLast ? (
                // Current page - not a link
                <span 
                  className="text-gray-900 font-medium truncate max-w-xs"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                // Breadcrumb link
                <Link
                  href={item.href || '/'}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 truncate max-w-xs hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Helper function to generate breadcrumbs for blog posts
export function generatePostBreadcrumbs(
  postTitle: string,
  categoryName?: string,
  categorySlug?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      name: 'ホーム',
      href: '/'
    }
  ]

  if (categoryName && categorySlug) {
    items.push({
      name: categoryName,
      href: `/category/${categorySlug}`
    })
  }

  items.push({
    name: postTitle,
    href: '#' // Current page, href not used
  })

  return items
}

// Helper function to generate breadcrumbs for categories
export function generateCategoryBreadcrumbs(categoryName: string): BreadcrumbItem[] {
  return [
    {
      name: 'ホーム',
      href: '/'
    },
    {
      name: 'カテゴリ',
      href: '/categories'
    },
    {
      name: categoryName,
      href: '#' // Current page
    }
  ]
}

// Helper function to generate breadcrumbs for tags
export function generateTagBreadcrumbs(tagName: string): BreadcrumbItem[] {
  return [
    {
      name: 'ホーム',
      href: '/'
    },
    {
      name: 'タグ',
      href: '/tags'
    },
    {
      name: tagName,
      href: '#' // Current page
    }
  ]
}