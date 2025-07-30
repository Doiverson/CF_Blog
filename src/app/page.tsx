import { WordPressApi } from '@/lib/wordpress-api';
import { BlogListContainer } from '@/components/BlogListContainer';
import { BlogControlsSection } from '@/components/BlogControlsSection';
import type { Tag, Category } from '@/types';

interface HomeProps {
  searchParams?: Promise<{
    page?: string;
    search?: string;
    category?: string;
    sort?: string;
  }>;
}

async function fetchBlogPosts(page: number = 1) {
  try {
    const api = new WordPressApi(process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2');
    return await api.getPosts({ page, perPage: 10 });
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    throw error;
  }
}

async function fetchPostTags(posts: { id: number; tags: number[] }[]) {
  try {
    const api = new WordPressApi(process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2');

    // Get all unique tag IDs from posts
    const allTagIds = [...new Set(posts.flatMap((post) => post.tags))];

    if (allTagIds.length === 0) {
      return {};
    }

    // Fetch all tags at once
    const tags = await api.getTagsByIds(allTagIds);

    // Create a map of tag ID to tag object
    const tagMap = new Map(tags.map((tag) => [tag.id, tag]));

    // Create post tags mapping
    const postTags: Record<number, Tag[]> = {};
    posts.forEach((post) => {
      postTags[post.id] = post.tags.map((tagId: number) => tagMap.get(tagId)).filter((tag): tag is Tag => Boolean(tag));
    });

    return postTags;
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return {};
  }
}

function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-400/5 to-cyan-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-purple-400/3 to-pink-400/3 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center py-16 sm:py-20 lg:py-24">
            {/* Main Title */}
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Amazing Stories
                </span>
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Subtitle */}
            <div className="mb-10">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Web開発、技術、デジタルイノベーションに関する
                <br className="hidden sm:block" />
                <span className="text-blue-600 font-semibold">厳選されたコンテンツ</span>をお届けします
              </p>
            </div>

            {/* Feature Pills */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/30 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">毎週更新</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/30 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">読みやすい構成</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/30 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">実践的な内容</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="max-w-lg mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center group">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      50+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">記事</div>
                  </div>
                </div>
                <div className="text-center group">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      10k+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">読者</div>
                  </div>
                </div>
                <div className="text-center group">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      5+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">カテゴリ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="w-20 h-20 mx-auto mb-6 text-red-400">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">エラーが発生しました</h2>
        <p className="text-gray-600 mb-8">記事を読み込めませんでした。ページを再読み込みしてください。</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
          再読み込み
        </button>
      </div>
    </div>
  );
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
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
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
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
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
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
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
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
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
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
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
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  }
];


export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = (await searchParams) || {};
  const currentPage = Number(resolvedSearchParams.page) || 1;

  try {
    const blogData = await fetchBlogPosts(currentPage);
    const postTags = await fetchPostTags(blogData.posts);

    return (
      <div className="min-h-screen bg-white">
        <HeroSection />
        <BlogControlsSection />
        <BlogListContainer
          initialData={blogData}
          currentPage={currentPage}
          postTags={postTags}
          categories={dummyCategories}
        />
      </div>
    );
  } catch {
    return <ErrorState />;
  }
}
