'use client'

import { SearchBar } from '@/components/SearchBar';

export function BlogControlsSection() {
  const handleSearch = (query: string) => {
    // This would normally update URL params
    console.log('Search query:', query);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Search Section */}
          <div className="text-center space-y-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">記事を探す</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                キーワード、カテゴリ、並び順で記事を絞り込んで、
                あなたにぴったりの記事を見つけましょう
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}