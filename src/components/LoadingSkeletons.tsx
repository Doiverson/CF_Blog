export function BlogPostSkeleton() {
  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-gray-200/50 border border-white/50 overflow-hidden animate-pulse">
      {/* Gradient Header */}
      <div className="h-2 bg-gradient-to-r from-gray-300 to-gray-400"></div>
      
      {/* Card Content */}
      <div className="p-8 h-full flex flex-col">
        {/* Meta Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
          <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-4">
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>

        {/* Content */}
        <div className="flex-1 mb-6 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
        </div>

        {/* Read More */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export function BlogPostListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {Array.from({ length: count }).map((_, i) => (
            <BlogPostSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SearchSkeleton() {
  return (
    <div className="relative max-w-md mx-auto animate-pulse">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 z-10">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
        </div>

        {/* Input Field */}
        <div className="w-full h-12 pl-12 pr-12 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  )
}

export function CategoryFilterSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-20 bg-gray-300 rounded"></div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
          <div className="h-6 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 bg-gray-100 rounded-xl border-2 border-gray-200">
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PaginationSkeleton() {
  return (
    <nav className="flex items-center justify-center space-x-2 animate-pulse">
      {/* Previous Button */}
      <div className="h-10 w-20 bg-gray-200 rounded-md"></div>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-10 bg-gray-200 rounded-md"></div>
        ))}
      </div>

      {/* Next Button */}
      <div className="h-10 w-16 bg-gray-200 rounded-md"></div>

      {/* Page Info */}
      <div className="ml-4 h-4 w-24 bg-gray-200 rounded"></div>
    </nav>
  )
}

export function TagCloudSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div 
          key={i} 
          className="h-6 bg-gray-200 rounded-full"
          style={{ width: `${Math.random() * 60 + 40}px` }}
        ></div>
      ))}
    </div>
  )
}

export function SortSelectorSkeleton() {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
      </div>
      <div className="w-4 h-4 bg-gray-300 rounded"></div>
    </div>
  )
}