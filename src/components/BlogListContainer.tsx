'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BlogPostList } from './BlogPostList';
import { Pagination } from './Pagination';
import { BlogSidebar } from './BlogSidebar';
import type { BlogPostsResponse, Tag, Category } from '@/types';

interface BlogListContainerProps {
  initialData: BlogPostsResponse;
  currentPage: number;
  postTags?: Record<number, Tag[]>;
  categories: Category[];
}

export function BlogListContainer({ initialData, currentPage, postTags, categories }: BlogListContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : '/';

    router.push(newUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">最新の記事</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Web開発、技術、デジタルイノベーションに関する最新の洞察とチュートリアル
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Blog Posts - Flexible width */}
          <div className="flex-1">
            <div className="mb-20">
              <BlogPostList
                posts={initialData.posts}
                postTags={postTags || {}}
              />
            </div>
          </div>

          {/* Sidebar - Fixed 300px width */}
          <div className="w-full lg:w-80">
            <BlogSidebar categories={categories} />
          </div>
        </div>

        {/* Pagination */}
        {initialData.totalPages > 1 && (
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
              <Pagination
                currentPage={currentPage}
                totalPages={initialData.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}

        {/* Stats */}
        {initialData.posts.length > 0 && (
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                {initialData.posts.length}件の記事を表示中（全{initialData.total}件）
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
