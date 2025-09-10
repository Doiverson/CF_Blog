import { WordPressApi } from '@/lib/wordpress-api'
import { BlogListContainer } from '@/components/BlogListContainer'
import { BlogControlsSection } from '@/components/BlogControlsSection'
import { Header } from '@/components/Header'
import Link from 'next/link'
import type { Tag } from '@/types'
import { dummyCategories } from '@/data/dummy-categories'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    page?: string
    search?: string
    sort?: string
  }>
}

async function fetchCategoryPosts(categorySlug: string, page: number = 1) {
  try {
    const api = new WordPressApi(
      process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2'
    )

    // Find category by slug
    const category = dummyCategories.find((cat) => cat.slug === categorySlug)
    if (!category) {
      throw new Error('Category not found')
    }

    // In real implementation, filter posts by category
    // For now, return all posts
    return await api.getPosts({ page, perPage: 10 })
  } catch (error) {
    console.error('Failed to fetch category posts:', error)
    throw error
  }
}

async function fetchPostTags(posts: { id: number; tags: number[] }[]) {
  try {
    const api = new WordPressApi(
      process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2'
    )

    const allTagIds = [...new Set(posts.flatMap((post) => post.tags))]

    if (allTagIds.length === 0) {
      return {}
    }

    const tags = await api.getTagsByIds(allTagIds)
    const tagMap = new Map(tags.map((tag) => [tag.id, tag]))

    const postTags: Record<number, Tag[]> = {}
    posts.forEach((post) => {
      postTags[post.id] = post.tags
        .map((tagId: number) => tagMap.get(tagId))
        .filter((tag): tag is Tag => Boolean(tag))
    })

    return postTags
  } catch (error) {
    console.error('Failed to fetch tags:', error)
    return {}
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const resolvedSearchParams = (await searchParams) || {}
  const currentPage = Number(resolvedSearchParams.page) || 1
  const { slug } = await params

  const category = dummyCategories.find((cat) => cat.slug === slug)

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header categories={dummyCategories} />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">カテゴリーが見つかりません</h1>
            <p className="mb-6 text-gray-600">
              お探しのカテゴリーは存在しないか、削除された可能性があります。
            </p>
            <Link href="/" className="font-medium text-blue-600 hover:text-blue-700">
              ホームに戻る →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  try {
    const blogData = await fetchCategoryPosts(slug, currentPage)
    const postTags = await fetchPostTags(blogData.posts)

    return (
      <div className="min-h-screen bg-white">
        <Header categories={dummyCategories} />

        {/* Category Header */}
        <div className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                <Link href="/" className="transition-colors hover:text-blue-600">
                  ホーム
                </Link>
                <span className="text-gray-400">/</span>
                <span className="font-medium text-gray-900">カテゴリー</span>
                <span className="text-gray-400">/</span>
                <span className="font-medium text-blue-600">{category.name}</span>
              </nav>

              <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{category.name}</h1>

              {category.description && (
                <p className="mb-6 text-lg text-gray-600">{category.description}</p>
              )}

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                    />
                  </svg>
                  <span className="text-gray-700">
                    <span className="font-semibold">{category.count}</span> 件の記事
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BlogControlsSection />
        <BlogListContainer
          initialData={blogData}
          currentPage={currentPage}
          postTags={postTags}
          categories={dummyCategories}
        />
      </div>
    )
  } catch {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header categories={dummyCategories} />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-6 h-20 w-20 text-red-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">エラーが発生しました</h2>
            <p className="mb-8 text-gray-600">
              記事を読み込めませんでした。ページを再読み込みしてください。
            </p>
            <form action="" method="get">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                再読み込み
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
