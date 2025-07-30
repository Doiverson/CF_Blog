import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { WordPressApi } from '@/lib/wordpress-api'
import { formatPostDate, calculateReadingTime, stripHtmlTags, generateTagHref } from '@/lib/data-utils'
import { HTMLContent } from '@/components/HTMLContent'
import { Tag } from '@/components/Tag'
import { Breadcrumbs, generatePostBreadcrumbs } from '@/components/Breadcrumbs'
import { TableOfContents } from '@/components/TableOfContents'
import { PostActions } from '@/components/PostActions'
import { RelatedPosts } from '@/components/RelatedPosts'
import { CommentSection } from '@/components/CommentSection'
import type { BlogPost, Tag as TagType } from '@/types'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

async function fetchPost(slug: string): Promise<BlogPost> {
  try {
    const api = new WordPressApi(
      process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2'
    )
    return await api.getPost(slug)
  } catch (error) {
    console.error('Failed to fetch post:', error)
    throw error
  }
}

async function fetchPostTags(post: BlogPost): Promise<TagType[]> {
  try {
    if (post.tags.length === 0) {
      return []
    }
    
    const api = new WordPressApi(
      process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2'
    )
    return await api.getTagsByIds(post.tags)
  } catch (error) {
    console.error('Failed to fetch post tags:', error)
    return []
  }
}

export async function generateMetadata(
  { params }: PostPageProps
): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await fetchPost(slug)
    
    const title = post.title.rendered
    const description = stripHtmlTags(post.excerpt.rendered) || 
      stripHtmlTags(post.content.rendered).slice(0, 160) + '...'
    
    return {
      title: `${title} | Next.js WordPress Blog`,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.modified,
        authors: [`Author ${post.author}`],
        url: `/posts/${post.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: `/posts/${post.slug}`,
      },
    }
  } catch {
    return {
      title: 'Post Not Found | Next.js WordPress Blog',
      description: 'The requested blog post could not be found.',
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params

  try {
    const post = await fetchPost(slug)
    const tags = await fetchPostTags(post)
    
    const formattedDate = formatPostDate(post.date)
    const readingTime = calculateReadingTime(post.content.rendered)
    const titleId = `post-title-${post.id}`
    const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/posts/${post.slug}`
    
    // Generate breadcrumbs - using the first category if available
    const breadcrumbs = generatePostBreadcrumbs(
      post.title.rendered,
      post.categories?.[0] ? 'Web開発' : undefined, // We'd normally fetch category name
      post.categories?.[0] ? 'web-development' : undefined
    )

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Container */}
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Table of Contents - Desktop Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-8">
                <TableOfContents content={post.content.rendered} />
              </div>
            </aside>

            {/* Main Article */}
            <main className="lg:col-span-3" role="main">
              <article 
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                aria-labelledby={titleId}
              >
                {/* Article Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 lg:p-12">
                  <header>
                    <h1 
                      id={titleId}
                      className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                    >
                      {post.title.rendered}
                    </h1>
                    
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                      <time dateTime={post.date} className="flex items-center gap-2 font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formattedDate}
                      </time>
                      <span className="text-gray-400">•</span>
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {readingTime} min read
                      </span>
                      {post.date !== post.modified && (
                        <>
                          <span className="text-gray-400">•</span>
                          <time dateTime={post.modified} className="text-gray-500">
                            Updated {formatPostDate(post.modified)}
                          </time>
                        </>
                      )}
                    </div>

                    {/* Post Actions */}
                    <PostActions
                      postId={post.id}
                      postTitle={post.title.rendered}
                      postUrl={postUrl}
                      initialLikes={Math.floor(Math.random() * 50) + 10}
                    />
                  </header>
                </div>

                {/* Table of Contents - Mobile */}
                <div className="lg:hidden p-6 border-b border-gray-100">
                  <TableOfContents content={post.content.rendered} />
                </div>

                {/* Article Content */}
                <div className="p-6 lg:p-8">
                  <div className="prose prose-lg max-w-none">
                    <HTMLContent 
                      content={post.content.rendered}
                      className="text-gray-800 leading-relaxed"
                    />
                  </div>

                  {/* Tags Section */}
                  {tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          Tags:
                        </span>
                        {tags.map((tag) => (
                          <Tag
                            key={tag.id}
                            tag={tag}
                            href={generateTagHref(tag.slug)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>

              {/* Related Posts */}
              <div className="mt-12">
                <RelatedPosts
                  currentPostId={post.id}
                  posts={[]} // We would normally fetch related posts here
                />
              </div>

              {/* Comments Section */}
              <div className="mt-12">
                <CommentSection
                  postId={post.id}
                  allowComments={true}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}