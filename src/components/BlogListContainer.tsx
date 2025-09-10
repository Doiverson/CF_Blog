'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { BlogPostList } from './BlogPostList'
import { Pagination } from './Pagination'
import { BlogSidebar } from './BlogSidebar'
import type { BlogPostsResponse, Tag, Category } from '@/types'
import { parseSearchParams, buildSearchParams } from '@/lib/search-params'

interface BlogListContainerProps {
  initialData: BlogPostsResponse
  currentPage: number
  postTags?: Record<number, Tag[]>
  categories: Category[]
}

export function BlogListContainer({
  initialData,
  currentPage,
  postTags,
  categories,
}: BlogListContainerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentState = useMemo(() => {
    return parseSearchParams(new URLSearchParams(searchParams.toString()))
  }, [searchParams])

  const selectedCategories = currentState.categories

  // Filter posts based on selected categories
  const filteredPosts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return initialData.posts
    }

    console.log('selectedCategories', selectedCategories)
    console.log('initialData.posts', initialData.posts)

    const filtered = initialData.posts.filter((post) =>
      post.categories.some((categoryId) => selectedCategories.includes(categoryId))
    )
    return filtered
  }, [initialData.posts, selectedCategories])

  // Calculate pagination for filtered results
  const filteredPagination = useMemo(() => {
    const perPage = 10
    const totalFiltered = filteredPosts.length
    const totalPages = Math.ceil(totalFiltered / perPage)
    const start = (currentPage - 1) * perPage
    const paginatedPosts = filteredPosts.slice(start, start + perPage)

    return {
      posts: paginatedPosts,
      totalPages,
      total: totalFiltered,
    }
  }, [filteredPosts, currentPage])

  // Map post.id -> Category[] for displayed posts
  const postCategoriesMap = useMemo(() => {
    const idToCategory = new Map(categories.map((c) => [c.id, c]))
    const mapping: Record<number, Category[]> = {}
    for (const post of filteredPagination.posts) {
      mapping[post.id] = post.categories
        .map((id) => idToCategory.get(id))
        .filter((c): c is Category => Boolean(c))
    }
    return mapping
  }, [categories, filteredPagination.posts])

  const handlePageChange = (page: number) => {
    const nextQs = buildSearchParams({ ...currentState, page })
    const newUrl = nextQs ? `/?${nextQs}` : '/'
    router.replace(newUrl, { scroll: false })
  }

  const handleCategoryChange = (categoryIds: number[]) => {
    const nextQs = buildSearchParams({ ...currentState, categories: categoryIds, page: 1 })
    const newUrl = nextQs ? `/?${nextQs}` : '/'
    router.replace(newUrl, { scroll: false })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-full px-4 py-12 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">最新の記事</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Web開発、技術、デジタルイノベーションに関する最新の洞察とチュートリアル
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Blog Posts - Flexible width */}
          <div className="flex-1">
            <div className="mb-20">
              <BlogPostList
                posts={filteredPagination.posts}
                postTags={postTags || {}}
                postCategories={postCategoriesMap}
              />
            </div>
          </div>

          {/* Sidebar - Fixed 300px width */}
          <div className="w-full lg:w-80">
            <BlogSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>

        {/* Pagination */}
        {filteredPagination.totalPages > 1 && (
          <div className="mb-12 flex justify-center">
            <div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
              <Pagination
                currentPage={currentPage}
                totalPages={filteredPagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}

        {/* Stats */}
        {filteredPagination.posts.length > 0 && (
          <div className="text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-6 py-3 shadow-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium text-gray-700">
                {filteredPagination.posts.length}件の記事を表示中
                {selectedCategories.length > 0 &&
                  `（フィルター適用: ${filteredPagination.total}件）`}
                {selectedCategories.length === 0 && `（全${initialData.total}件）`}
              </span>
            </div>
          </div>
        )}

        {/* No results message */}
        {filteredPosts.length === 0 && selectedCategories.length > 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 h-16 w-16 text-gray-300">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">該当する記事がありません</h3>
            <p className="mb-6 text-gray-600">
              選択したカテゴリーに一致する記事が見つかりませんでした
            </p>
            <button
              onClick={() => handleCategoryChange([])}
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              フィルターをクリア
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
