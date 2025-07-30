import { Author } from '@/types'

export const dummyAuthors: Author[] = [
  {
    id: 1,
    name: '田中 雄太',
    slug: 'yuta-tanaka',
    description: 'フロントエンド開発者として10年以上の経験を持つ。React、Next.js、TypeScriptを専門とし、モダンなWeb開発技術について執筆している。',
    url: 'https://yuta-tanaka.dev',
    link: 'https://example.com/author/yuta-tanaka',
    avatar_urls: {
      '24': 'https://i.pravatar.cc/24?img=1',
      '48': 'https://i.pravatar.cc/48?img=1',
      '96': 'https://i.pravatar.cc/96?img=1'
    },
    meta: {
      persisted_preferences: []
    },
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/users/1' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/users' }]
    }
  },
  {
    id: 2,
    name: '佐藤 美咲',
    slug: 'misaki-sato',
    description: 'UI/UXデザイナー兼フロントエンドエンジニア。デザインシステムの構築とアクセシビリティの向上に情熱を注いでいる。',
    url: 'https://misaki-design.com',
    link: 'https://example.com/author/misaki-sato',
    avatar_urls: {
      '24': 'https://i.pravatar.cc/24?img=2',
      '48': 'https://i.pravatar.cc/48?img=2',
      '96': 'https://i.pravatar.cc/96?img=2'
    },
    meta: {
      persisted_preferences: []
    },
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/users/2' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/users' }]
    }
  },
  {
    id: 3,
    name: '山田 健太郎',
    slug: 'kentaro-yamada',
    description: 'バックエンドエンジニアとして、スケーラブルなWebアプリケーションの設計・開発を専門としている。クラウドアーキテクチャとDevOpsに詳しい。',
    url: 'https://kentaro-tech.blog',
    link: 'https://example.com/author/kentaro-yamada',
    avatar_urls: {
      '24': 'https://i.pravatar.cc/24?img=3',
      '48': 'https://i.pravatar.cc/48?img=3',
      '96': 'https://i.pravatar.cc/96?img=3'
    },
    meta: {
      persisted_preferences: []
    },
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/users/3' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/users' }]
    }
  },
  {
    id: 4,
    name: '鈴木 花音',
    slug: 'kanon-suzuki',
    description: 'テクニカルライター兼プロダクトマネージャー。複雑な技術概念を分かりやすく伝えることを得意とし、開発者コミュニティの活性化に貢献している。',
    url: 'https://kanon-writes.com',
    link: 'https://example.com/author/kanon-suzuki',
    avatar_urls: {
      '24': 'https://i.pravatar.cc/24?img=4',
      '48': 'https://i.pravatar.cc/48?img=4',
      '96': 'https://i.pravatar.cc/96?img=4'
    },
    meta: {
      persisted_preferences: []
    },
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/users/4' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/users' }]
    }
  },
  {
    id: 5,
    name: '高橋 智也',
    slug: 'tomoya-takahashi',
    description: 'AIエンジニア・データサイエンティスト。機械学習とWeb技術の融合について研究し、実践的なAI活用方法を発信している。',
    url: 'https://ai-tomoya.dev',
    link: 'https://example.com/author/tomoya-takahashi',
    avatar_urls: {
      '24': 'https://i.pravatar.cc/24?img=5',
      '48': 'https://i.pravatar.cc/48?img=5',
      '96': 'https://i.pravatar.cc/96?img=5'
    },
    meta: {
      persisted_preferences: []
    },
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/users/5' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/users' }]
    }
  }
]

export const getAuthorById = (id: number): Author | undefined => {
  return dummyAuthors.find(author => author.id === id)
}

export const getAuthorBySlug = (slug: string): Author | undefined => {
  return dummyAuthors.find(author => author.slug === slug)
}