import { Tag } from '@/types'

export const dummyTags: Tag[] = [
  // Frontend関連
  {
    id: 1,
    count: 12,
    description: 'JavaScriptプログラミング言語に関する記事',
    link: 'https://example.com/tag/javascript',
    name: 'JavaScript',
    slug: 'javascript',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/1' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=1' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 2,
    count: 10,
    description: 'TypeScriptによる型安全な開発',
    link: 'https://example.com/tag/typescript',
    name: 'TypeScript',
    slug: 'typescript',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/2' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=2' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 3,
    count: 15,
    description: 'Reactライブラリを使ったフロントエンド開発',
    link: 'https://example.com/tag/react',
    name: 'React',
    slug: 'react',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/3' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=3' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 4,
    count: 8,
    description: 'Next.jsフレームワークによるReactアプリケーション開発',
    link: 'https://example.com/tag/nextjs',
    name: 'Next.js',
    slug: 'nextjs',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/4' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=4' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 5,
    count: 6,
    description: 'TailwindCSSを使ったユーティリティファーストCSS',
    link: 'https://example.com/tag/tailwindcss',
    name: 'TailwindCSS',
    slug: 'tailwindcss',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/5' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=5' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  
  // Backend関連
  {
    id: 6,
    count: 9,
    description: 'Node.jsによるサーバーサイドJavaScript開発',
    link: 'https://example.com/tag/nodejs',
    name: 'Node.js',
    slug: 'nodejs',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/6' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=6' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 7,
    count: 7,
    description: 'Pythonプログラミング言語とその応用',
    link: 'https://example.com/tag/python',
    name: 'Python',
    slug: 'python',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/7' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=7' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 8,
    count: 5,
    description: 'REST APIの設計と実装',
    link: 'https://example.com/tag/api',
    name: 'API',
    slug: 'api',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/8' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=8' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 9,
    count: 4,
    description: 'データベース設計と最適化',
    link: 'https://example.com/tag/database',
    name: 'データベース',
    slug: 'database',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/9' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=9' }],
      curies: [{ name: 'wp', href: 'https://api.w,org/{rel}', templated: true }]
    }
  },

  // DevOps・クラウド関連
  {
    id: 10,
    count: 8,
    description: 'Dockerコンテナ技術とコンテナ化',
    link: 'https://example.com/tag/docker',
    name: 'Docker',
    slug: 'docker',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/10' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=10' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 11,
    count: 6,
    description: 'Amazon Web Servicesクラウドプラットフォーム',
    link: 'https://example.com/tag/aws',
    name: 'AWS',
    slug: 'aws',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/11' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=11' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 12,
    count: 3,
    description: 'CI/CDパイプラインとデプロイメント自動化',
    link: 'https://example.com/tag/cicd',
    name: 'CI/CD',
    slug: 'cicd',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/12' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=12' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },

  // デザイン関連
  {
    id: 13,
    count: 7,
    description: 'ユーザーインターフェース設計とユーザビリティ',
    link: 'https://example.com/tag/ui-ux',
    name: 'UI/UX',
    slug: 'ui-ux',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/13' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=13' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 14,
    count: 4,
    description: '一貫性のあるデザインシステムの構築',
    link: 'https://example.com/tag/design-system',
    name: 'デザインシステム',
    slug: 'design-system',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/14' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=14' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },

  // AI・機械学習関連
  {
    id: 15,
    count: 5,
    description: '機械学習アルゴリズムとモデル構築',
    link: 'https://example.com/tag/machine-learning',
    name: '機械学習',
    slug: 'machine-learning',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/15' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=15' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 16,
    count: 3,
    description: 'ChatGPTやGPT-4などの大規模言語モデル',
    link: 'https://example.com/tag/llm',
    name: 'LLM',
    slug: 'llm',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/16' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=16' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },

  // パフォーマンス関連
  {
    id: 17,
    count: 6,
    description: 'Webサイトのパフォーマンス最適化技術',
    link: 'https://example.com/tag/performance',
    name: 'パフォーマンス',
    slug: 'performance',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/17' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=17' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 18,
    count: 4,
    description: 'Webアクセシビリティの向上と実装',
    link: 'https://example.com/tag/accessibility',
    name: 'アクセシビリティ',
    slug: 'accessibility',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/18' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=18' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },

  // ツール・ライブラリ関連
  {
    id: 19,
    count: 5,
    description: 'Vitestやお使ったJavaScriptテスティング',
    link: 'https://example.com/tag/testing',
    name: 'テスト',
    slug: 'testing',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/19' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=19' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 20,
    count: 3,
    description: 'Webセキュリティとセキュアコーディング',
    link: 'https://example.com/tag/security',
    name: 'セキュリティ',
    slug: 'security',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/20' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=20' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  }
]

export const getTagById = (id: number): Tag | undefined => {
  return dummyTags.find(tag => tag.id === id)
}

export const getTagBySlug = (slug: string): Tag | undefined => {
  return dummyTags.find(tag => tag.slug === slug)
}

export const getTagsByIds = (ids: number[]): Tag[] => {
  return dummyTags.filter(tag => ids.includes(tag.id))
}