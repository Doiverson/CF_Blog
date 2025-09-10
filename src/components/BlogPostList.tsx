import Link from 'next/link'
import type { BlogPost, Tag as TagType, Category } from '@/types'
import {
  formatPostDate,
  stripHtmlTags,
  calculateReadingTime,
  generateTagHref,
} from '@/lib/data-utils'
import { Tag } from './Tag'

interface BlogPostListProps {
  posts: BlogPost[]
  postTags?: Record<number, TagType[]>
  postCategories?: Record<number, Category[]>
}

export function BlogPostList({ posts, postTags, postCategories }: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 h-20 w-20 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h3 className="mb-3 text-xl font-semibold text-gray-800">記事が見つかりません</h3>
          <p className="text-gray-500">新しいコンテンツをお待ちください</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
        {posts.map((post) => {
          const excerpt = stripHtmlTags(post.excerpt.rendered)
          const formattedDate = formatPostDate(post.date)
          const readingTime = calculateReadingTime(post.content.rendered)
          const postUrl = `/posts/${post.slug}`
          const tags = postTags?.[post.id] || []
          const categories = postCategories?.[post.id] || []

          return (
            <article
              key={post.id}
              className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/90 shadow-xl shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-200/30"
            >
              {/* Gradient Header */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600"></div>

              {/* Card Content */}
              <div className="flex h-full flex-col p-8">
                {/* Meta Info */}
                <div className="mb-6 flex items-center justify-between">
                  <time
                    dateTime={post.date}
                    className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg"
                  >
                    {formattedDate}
                  </time>
                  <div className="flex items-center rounded-full bg-gray-50 px-3 py-2 text-sm text-gray-500">
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">{readingTime}分</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="mb-4 line-clamp-2 text-xl font-bold leading-tight text-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent lg:text-2xl">
                  <Link href={postUrl} className="stretched-link">
                    {post.title.rendered}
                  </Link>
                </h2>

                {/* Excerpt */}
                <div className="mb-6 flex-1">
                  {excerpt && (
                    <p className="line-clamp-3 text-base font-light leading-relaxed tracking-wide text-gray-600">
                      {excerpt}
                    </p>
                  )}
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {categories.slice(0, 2).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${encodeURIComponent(cat.slug)}`}
                        className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-100"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    {categories.length > 2 && (
                      <span className="rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
                        +{categories.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                      <Tag
                        key={tag.id}
                        tag={tag}
                        href={generateTagHref(tag.slug)}
                        variant="secondary"
                        size="sm"
                      />
                    ))}
                    {tags.length > 3 && (
                      <span className="rounded-full bg-gradient-to-r from-gray-100 to-blue-50 px-3 py-1 text-xs font-medium text-gray-500">
                        +{tags.length - 3}個のタグ
                      </span>
                    )}
                  </div>
                )}

                {/* Read More */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-sm font-bold text-transparent transition-all group-hover:from-purple-600 group-hover:to-indigo-600">
                    記事を読む
                  </span>
                  <div className="rounded-full bg-gradient-to-r from-blue-100 to-purple-100 p-2 transition-all group-hover:from-blue-200 group-hover:to-purple-200">
                    <svg
                      className="h-4 w-4 text-blue-600 transition-all group-hover:translate-x-1 group-hover:text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Enhanced Hover Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 opacity-0 transition-all duration-500 group-hover:opacity-100" />

              {/* Decorative Corner Element */}
              <div className="absolute right-4 top-4 h-12 w-12 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100"></div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
