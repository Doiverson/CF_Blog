'use client'

import React, { useState, useEffect } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

export function TableOfContents({ content, className = "" }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  // Extract headings from HTML content
  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    const items: TocItem[] = []
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const text = heading.textContent || ''
      let id = heading.id
      
      // Generate ID if not present
      if (!id) {
        id = `heading-${index}-${text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`
        heading.id = id
      }
      
      items.push({ id, text, level })
    })
    
    setTocItems(items)
  }, [content])

  // Handle scroll to update active heading
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = tocItems.map(item => document.getElementById(item.id)).filter(Boolean)
      const scrollTop = window.scrollY + 100 // Offset for fixed header
      
      let currentActive = ''
      
      for (const element of headingElements) {
        if (element && element.offsetTop <= scrollTop) {
          currentActive = element.id
        }
      }
      
      setActiveId(currentActive)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    setIsOpen(false) // Close mobile menu
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className={`${className}`}>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm mb-4"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
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
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          <span className="font-semibold text-gray-900">目次</span>
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

      {/* Table of Contents */}
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <h3 className="font-semibold text-gray-900">目次</h3>
          </div>

          {/* TOC Items */}
          <nav aria-label="目次">
            <ul className="space-y-1">
              {tocItems.map((item) => {
                const isActive = activeId === item.id
                const paddingLeft = (item.level - 1) * 16 // 16px per level
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToHeading(item.id)}
                      className={`
                        w-full text-left py-2 px-3 rounded-lg transition-all duration-200 text-sm
                        ${isActive 
                          ? 'bg-blue-50 text-blue-900 border-l-4 border-blue-500 font-medium' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                      style={{ paddingLeft: `${paddingLeft + 12}px` }}
                    >
                      <span className="line-clamp-2 leading-relaxed">
                        {item.text}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Progress Indicator */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span>読み進み具合</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${activeId ? 
                    ((tocItems.findIndex(item => item.id === activeId) + 1) / tocItems.length) * 100 
                    : 0}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}