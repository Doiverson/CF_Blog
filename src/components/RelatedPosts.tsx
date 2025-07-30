import Link from 'next/link'
import type { BlogPost } from '@/types'
import { formatPostDate, stripHtmlTags, calculateReadingTime } from '@/lib/data-utils'
import { Card } from './ui/Card'

interface RelatedPostsProps {
  posts: BlogPost[]
  currentPostId: number
  title?: string
  className?: string
}

export function RelatedPosts({ 
  posts, 
  currentPostId, 
  title = "関連記事",
  className = "" 
}: RelatedPostsProps) {
  // Filter out current post and limit to 3
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className={`space-y-6 ${className}`}>
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>

      {/* Related Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => {
          const excerpt = stripHtmlTags(post.excerpt.rendered)
          const formattedDate = formatPostDate(post.date)
          const readingTime = calculateReadingTime(post.content.rendered)
          const postUrl = `/posts/${post.slug}`

          return (
            <Card 
              key={post.id}
              variant="elevated"
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Post Meta */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <time 
                    dateTime={post.date}
                    className="font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full"
                  >
                    {formattedDate}
                  </time>
                  <div className="flex items-center gap-1 text-gray-500">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-xs">{readingTime}分</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 line-clamp-2">
                  <Link href={postUrl} className="hover:underline">
                    {post.title.rendered}
                  </Link>
                </h3>

                {/* Excerpt */}
                <div className="flex-1 mb-4">
                  {excerpt && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {excerpt}
                    </p>
                  )}
                </div>

                {/* Read More Link */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Link
                    href={postUrl}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 group/link"
                  >
                    <span>続きを読む</span>
                    <svg
                      className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200"
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
                  </Link>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            </Card>
          )
        })}
      </div>

      {/* View All Link */}
      {posts.length > 3 && (
        <div className="text-center pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>すべての記事を見る</span>
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}
    </section>
  )
}