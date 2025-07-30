import { Category } from '@/types'

export const dummyCategories: Category[] = [
  {
    id: 1,
    count: 15,
    description: 'JavaScript、TypeScript、React、Next.jsなどのフロントエンド技術について',
    link: 'https://example.com/category/frontend',
    name: 'フロントエンド',
    slug: 'frontend',
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
    count: 12,
    description: 'Node.js、Python、データベース、API設計などのバックエンド技術',
    link: 'https://example.com/category/backend',
    name: 'バックエンド',
    slug: 'backend',
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
    count: 8,
    description: 'UI/UXデザイン、デザインシステム、プロトタイピング手法',
    link: 'https://example.com/category/design',
    name: 'デザイン',
    slug: 'design',
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
    count: 10,
    description: 'AWS、Azure、GCP、Docker、Kubernetesなどのクラウド・DevOps技術',
    link: 'https://example.com/category/devops',
    name: 'DevOps・クラウド',
    slug: 'devops',
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
    count: 6,
    description: '機械学習、深層学習、AI技術の実装と応用',
    link: 'https://example.com/category/ai-ml',
    name: 'AI・機械学習',
    slug: 'ai-ml',
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
    count: 9,
    description: 'モバイルアプリ開発、React Native、Flutter、iOS、Android',
    link: 'https://example.com/category/mobile',
    name: 'モバイル開発',
    slug: 'mobile',
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
  },
  {
    id: 7,
    count: 7,
    description: 'Web開発のベストプラクティス、コードレビュー、チーム開発',
    link: 'https://example.com/category/best-practices',
    name: 'ベストプラクティス',
    slug: 'best-practices',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/categories/7' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/categories' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/category' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?categories=7' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  }
]

export const getCategoryById = (id: number): Category | undefined => {
  return dummyCategories.find(category => category.id === id)
}

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return dummyCategories.find(category => category.slug === slug)
}

export const getCategoriesByIds = (ids: number[]): Category[] => {
  return dummyCategories.filter(category => ids.includes(category.id))
}