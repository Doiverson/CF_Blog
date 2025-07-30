import type { BlogPost as BlogPostType, Tag as TagType } from '@/types';
import { formatPostDate, stripHtmlTags, calculateReadingTime } from '@/lib/data-utils';
import { Tag } from './Tag';
import { Avatar } from './ui/Avatar';
import { Card } from './ui/Card';

interface BlogPostProps {
  post: BlogPostType;
  tags?: TagType[];
  generateTagHref?: (slug: string) => string;
}

export function BlogPost({ post, tags, generateTagHref }: BlogPostProps) {
  const title = post.title.rendered;
  const content = stripHtmlTags(post.content.rendered);
  const formattedDate = formatPostDate(post.date);
  const readingTime = calculateReadingTime(post.content.rendered);
  const titleId = `post-title-${post.id}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card
          variant="elevated"
          padding="none"
          className="overflow-hidden backdrop-blur-sm bg-white/90 border-0 shadow-xl"
        >
          <article aria-labelledby={titleId}>
            {/* Hero Header with Gradient Background */}
            <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              
              <div className="relative px-8 py-16 sm:px-12 sm:py-20">
                <div className="flex items-center gap-4 mb-8">
                  <Avatar
                    name="Author"
                    size="lg"
                    className="ring-4 ring-white/30"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white/90 mb-1">執筆者</div>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <time
                        dateTime={post.date}
                        className="font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
                      >
                        {formattedDate}
                      </time>
                      <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
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
                        <span className="font-medium">{readingTime}分で読める</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h1
                  id={titleId}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
                >
                  {title}
                </h1>
              </div>
            </header>

            {/* Modern Content Section */}
            <div className="px-8 py-12 sm:px-12">
              <div className="prose prose-xl max-w-none">
                <div className="text-gray-700 leading-relaxed text-lg font-light tracking-wide">
                  {content}
                </div>
              </div>
            </div>

            {/* Enhanced Tags Section */}
            {tags && tags.length > 0 && (
              <footer
                className="px-8 py-8 sm:px-12 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100"
                data-testid="tags-section"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <h3 className="text-sm font-semibold">関連タグ</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <Tag
                        key={tag.id}
                        tag={tag}
                        variant="default"
                        size="md"
                        {...(generateTagHref && { href: generateTagHref(tag.slug) })}
                      />
                    ))}
                  </div>
                </div>
              </footer>
            )}
          </article>
        </Card>
      </div>
    </div>
  );
}
