import Link from 'next/link';
import type { BlogPost, Tag as TagType } from '@/types';
import { formatPostDate, stripHtmlTags, calculateReadingTime, generateTagHref } from '@/lib/data-utils';
import { Tag } from './Tag';

interface BlogPostListProps {
  posts: BlogPost[];
  postTags?: Record<number, TagType[]>;
}

export function BlogPostList({ posts, postTags }: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 text-gray-300">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">記事が見つかりません</h3>
          <p className="text-gray-500">新しいコンテンツをお待ちください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => {
            const excerpt = stripHtmlTags(post.excerpt.rendered);
            const formattedDate = formatPostDate(post.date);
            const readingTime = calculateReadingTime(post.content.rendered);
            const postUrl = `/posts/${post.slug}`;
            const tags = postTags?.[post.id] || [];

            return (
              <article
                key={post.id}
                className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-gray-200/50 border border-white/50 overflow-hidden hover:shadow-2xl hover:shadow-blue-200/30 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
              >
                {/* Gradient Header */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600"></div>
                
                {/* Card Content */}
                <div className="p-8 h-full flex flex-col">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-6">
                    <time
                      dateTime={post.date}
                      className="text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full shadow-lg"
                    >
                      {formattedDate}
                    </time>
                    <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
                      <svg
                        className="w-4 h-4 mr-2"
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
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 line-clamp-2">
                    <Link
                      href={postUrl}
                      className="stretched-link"
                    >
                      {post.title.rendered}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <div className="flex-1 mb-6">
                    {excerpt && (
                      <p className="text-gray-600 leading-relaxed text-base font-light tracking-wide line-clamp-3">
                        {excerpt}
                      </p>
                    )}
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
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
                        <span className="text-xs text-gray-500 bg-gradient-to-r from-gray-100 to-blue-50 px-3 py-1 rounded-full font-medium">
                          +{tags.length - 3}個のタグ
                        </span>
                      )}
                    </div>
                  )}

                  {/* Read More */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-indigo-600 transition-all">
                      記事を読む
                    </span>
                    <div className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
                      <svg
                        className="w-4 h-4 text-blue-600 group-hover:text-purple-600 group-hover:translate-x-1 transition-all"
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none backdrop-blur-[1px]" />
                
                {/* Decorative Corner Element */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              </article>
            );
          })}
      </div>
    </div>
  );
}
