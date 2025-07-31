import { WordPressApi } from '@/lib/wordpress-api'
import { BlogListContainer } from '@/components/BlogListContainer'
import { BlogControlsSection } from '@/components/BlogControlsSection'
import { Header } from '@/components/Header'
import type { Tag, Category } from '@/types'

interface HomeProps {
  searchParams?: Promise<{
    page?: string
    search?: string
    category?: string
    categories?: string
    sort?: string
  }>
}

async function fetchBlogPosts(page: number = 1) {
  try {
    const api = new WordPressApi(
      process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2'
    )
    return await api.getPosts({ page, perPage: 10 })
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    throw error
  }
}

async function fetchPostTags(posts: { id: number; tags: number[] }[]) {
  try {
    const api = new WordPressApi(
      process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2'
    )

    // Get all unique tag IDs from posts
    const allTagIds = [...new Set(posts.flatMap((post) => post.tags))]

    if (allTagIds.length === 0) {
      return {}
    }

    // Fetch all tags at once
    const tags = await api.getTagsByIds(allTagIds)

    // Create a map of tag ID to tag object
    const tagMap = new Map(tags.map((tag) => [tag.id, tag]))

    // Create post tags mapping
    const postTags: Record<number, Tag[]> = {}
    posts.forEach((post) => {
      postTags[post.id] = post.tags
        .map((tagId: number) => tagMap.get(tagId))
        .filter((tag): tag is Tag => Boolean(tag))
    })

    return postTags
  } catch (error) {
    console.error('Failed to fetch tags:', error)
    // Return empty tags mapping for each post instead of empty object
    const postTags: Record<number, Tag[]> = {}
    posts.forEach((post) => {
      postTags[post.id] = []
    })
    return postTags
  }
}

function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-gradient-to-r from-indigo-400/5 to-cyan-400/5 blur-3xl"></div>
        <div className="from-purple-400/3 to-pink-400/3 absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r blur-2xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl py-16 text-center sm:py-20 lg:py-24">
            {/* Main Title */}
            <div className="mb-6">
              <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Amazing Stories
                </span>
              </h1>
              <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
            </div>

            {/* Subtitle */}
            <div className="mb-10">
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl md:text-2xl">
                Web開発、技術、デジタルイノベーションに関する
                <br className="hidden sm:block" />
                <span className="font-semibold text-blue-600">厳選されたコンテンツ</span>
                をお届けします
              </p>
            </div>

            {/* Feature Pills */}
            <div className="mb-12">
              <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-700">毎週更新</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-gray-700">読みやすい構成</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium text-gray-700">実践的な内容</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mx-auto max-w-lg">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="group text-center">
                  <div className="rounded-xl border border-white/20 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                    <div className="mb-1 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 lg:text-3xl">
                      50+
                    </div>
                    <div className="text-sm font-medium text-gray-600">記事</div>
                  </div>
                </div>
                <div className="group text-center">
                  <div className="rounded-xl border border-white/20 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                    <div className="mb-1 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 lg:text-3xl">
                      10k+
                    </div>
                    <div className="text-sm font-medium text-gray-600">読者</div>
                  </div>
                </div>
                <div className="group text-center">
                  <div className="rounded-xl border border-white/20 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                    <div className="mb-1 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 lg:text-3xl">
                      5+
                    </div>
                    <div className="text-sm font-medium text-gray-600">カテゴリ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ErrorState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md px-4 text-center">
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
  )
}

// Dummy categories for demo
const dummyCategories: Category[] = [
  {
    id: 1,
    name: 'Web開発',
    slug: 'web-development',
    count: 15,
    description: 'Web開発に関する記事',
    link: 'https://example.com/category/web-development',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/1' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=1' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }],
    },
  },
  {
    id: 2,
    name: 'JavaScript',
    slug: 'javascript',
    count: 12,
    description: 'JavaScript技術に関する記事',
    link: 'https://example.com/category/javascript',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/2' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=2' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }],
    },
  },
  {
    id: 3,
    name: 'TypeScript',
    slug: 'typescript',
    count: 8,
    description: 'TypeScriptに関する記事',
    link: 'https://example.com/category/typescript',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/3' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=3' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }],
    },
  },
  {
    id: 4,
    name: 'React',
    slug: 'react',
    count: 10,
    description: 'Reactに関する記事',
    link: 'https://example.com/category/react',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/4' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=4' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }],
    },
  },
  {
    id: 5,
    name: 'Next.js',
    slug: 'nextjs',
    count: 6,
    description: 'Next.jsに関する記事',
    link: 'https://example.com/category/nextjs',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/5' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=5' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }],
    },
  },
  {
    id: 6,
    name: 'UI/UX',
    slug: 'ui-ux',
    count: 7,
    description: 'UI/UXデザインに関する記事',
    link: 'https://example.com/category/ui-ux',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/6' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=6' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }],
    },
  },
]

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = (await searchParams) || {}
  const currentPage = Number(resolvedSearchParams.page) || 1

  // Parse categories from URL parameters
  const selectedCategoryIds = resolvedSearchParams.categories
    ? resolvedSearchParams.categories
        .split(',')
        .map((id: string) => parseInt(id, 10))
        .filter((id: number) => !isNaN(id))
    : []

  try {
    const blogData = await fetchBlogPosts(currentPage)
    const postTags = await fetchPostTags(blogData.posts)

    // Filter posts server-side if categories are selected
    let filteredPosts = blogData.posts
    if (selectedCategoryIds.length > 0) {
      filteredPosts = blogData.posts.filter((post) =>
        post.categories.some((categoryId) => selectedCategoryIds.includes(categoryId))
      )
    }

    // Create filtered blog data
    const filteredBlogData = {
      ...blogData,
      posts: filteredPosts,
      total: filteredPosts.length,
      totalPages: Math.ceil(filteredPosts.length / 10),
    }

    return (
      <div className="min-h-screen bg-white">
        <Header categories={dummyCategories} />
        <HeroSection />
        <BlogControlsSection />
        <BlogListContainer
          initialData={filteredBlogData}
          currentPage={currentPage}
          postTags={postTags}
          categories={dummyCategories}
        />
      </div>
    )
  } catch {
    return (
      <div className="min-h-screen bg-white">
        <Header categories={dummyCategories} />
        <ErrorState />
      </div>
    )
  }
}
