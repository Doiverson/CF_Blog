import { WordPressApi } from '@/lib/wordpress-api'
import { BlogListContainer } from '@/components/BlogListContainer'
import { BlogControlsSection } from '@/components/BlogControlsSection'
import { Header } from '@/components/Header'
import Link from 'next/link'
import type { Tag, Category } from '@/types'

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

// Dummy categories for now
const dummyCategories: Category[] = [
  { 
    id: 1, 
    name: 'Web開発', 
    slug: 'web-development', 
    count: 15, 
    description: 'Web開発に関する記事', 
    link: '', 
    taxonomy: 'category', 
    parent: 0, 
    meta: [], 
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/1' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=1' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  { 
    id: 2, 
    name: 'JavaScript', 
    slug: 'javascript', 
    count: 12, 
    description: 'JavaScript技術に関する記事', 
    link: '', 
    taxonomy: 'category', 
    parent: 0, 
    meta: [], 
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/2' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=2' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  { 
    id: 3, 
    name: 'TypeScript', 
    slug: 'typescript', 
    count: 8, 
    description: 'TypeScriptに関する記事', 
    link: '', 
    taxonomy: 'category', 
    parent: 0, 
    meta: [], 
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/3' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=3' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  { 
    id: 4, 
    name: 'React', 
    slug: 'react', 
    count: 10, 
    description: 'Reactに関する記事', 
    link: '', 
    taxonomy: 'category', 
    parent: 0, 
    meta: [], 
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/4' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=4' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  { 
    id: 5, 
    name: 'Next.js', 
    slug: 'nextjs', 
    count: 6, 
    description: 'Next.jsに関する記事', 
    link: '', 
    taxonomy: 'category', 
    parent: 0, 
    meta: [], 
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/5' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=5' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  { 
    id: 6, 
    name: 'UI/UX', 
    slug: 'ui-ux', 
    count: 7, 
    description: 'UI/UXデザインに関する記事', 
    link: '', 
    taxonomy: 'category', 
    parent: 0, 
    meta: [], 
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/6' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=6' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  }
]

async function fetchCategoryPosts(categorySlug: string, page: number = 1) {
  try {
    const api = new WordPressApi(process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2')
    
    // Find category by slug
    const category = dummyCategories.find(cat => cat.slug === categorySlug)
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
    const api = new WordPressApi(process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2')
    
    const allTagIds = [...new Set(posts.flatMap((post) => post.tags))]
    
    if (allTagIds.length === 0) {
      return {}
    }

    const tags = await api.getTagsByIds(allTagIds)
    const tagMap = new Map(tags.map((tag) => [tag.id, tag]))
    
    const postTags: Record<number, Tag[]> = {}
    posts.forEach((post) => {
      postTags[post.id] = post.tags.map((tagId: number) => tagMap.get(tagId)).filter((tag): tag is Tag => Boolean(tag))
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

  const category = dummyCategories.find(cat => cat.slug === slug)
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header categories={dummyCategories} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              カテゴリーが見つかりません
            </h1>
            <p className="text-gray-600 mb-6">
              お探しのカテゴリーは存在しないか、削除された可能性があります。
            </p>
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
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
        <div className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  ホーム
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">カテゴリー</span>
                <span className="text-gray-400">/</span>
                <span className="text-blue-600 font-medium">{category.name}</span>
              </nav>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              
              {category.description && (
                <p className="text-lg text-gray-600 mb-6">
                  {category.description}
                </p>
              )}
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
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
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 text-red-400">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">エラーが発生しました</h2>
            <p className="text-gray-600 mb-8">記事を読み込めませんでした。ページを再読み込みしてください。</p>
            <form action="" method="get">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
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