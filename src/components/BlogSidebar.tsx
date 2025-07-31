'use client'

import { useState } from 'react';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SortSelector } from '@/components/SortSelector';
import type { Category } from '@/types';
import type { SortOption } from '@/components/SortSelector';

interface BlogSidebarProps {
  categories: Category[]
  selectedCategories?: number[]
  onCategoryChange?: (categoryIds: number[]) => void
}

export function BlogSidebar({ categories, selectedCategories: propSelectedCategories, onCategoryChange: propOnCategoryChange }: BlogSidebarProps) {
  const [localSelectedCategories, setLocalSelectedCategories] = useState<number[]>([]);
  
  // Use prop values if provided, otherwise use local state
  const selectedCategories = propSelectedCategories !== undefined ? propSelectedCategories : localSelectedCategories;
  const handleCategoryChange = propOnCategoryChange || ((categoryIds: number[]) => {
    setLocalSelectedCategories(categoryIds);
    console.log('Selected categories:', categoryIds);
  });

  const handleSortChange = (sort: SortOption) => {
    // This would normally update URL params
    console.log('Sort changed:', sort);
  };

  return (
    <aside className="space-y-6">
      {/* Sidebar Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
        <div className="space-y-8">
          {/* Category Filter Section */}
          <div>
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Sort Selector Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg 
                className="w-5 h-5 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" 
                />
              </svg>
              並び順
            </h3>
            <SortSelector
              currentSort="date-desc"
              onSortChange={handleSortChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}