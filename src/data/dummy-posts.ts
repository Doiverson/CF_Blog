import { BlogPost } from '@/types'

export const dummyPosts: BlogPost[] = [
  {
    id: 1,
    date: '2024-01-28T10:00:00',
    date_gmt: '2024-01-28T01:00:00',
    guid: { rendered: 'https://example.com/2024/01/28/next-js-15-features/' },
    modified: '2024-01-28T10:00:00',
    modified_gmt: '2024-01-28T01:00:00',
    slug: 'next-js-15-new-features',
    status: 'publish',
    type: 'post',
    link: 'https://example.com/2024/01/28/next-js-15-new-features/',
    title: { rendered: 'Next.js 15の新機能を徹底解説：App Routerとサーバーコンポーネントの進化', protected: false },
    content: {
      rendered: `<p>Next.js 15がリリースされ、多くの新機能と改善が追加されました。この記事では、特にApp RouterとReactサーバーコンポーネントの進化について詳しく解説します。</p>

<h2>主な新機能</h2>

<h3>1. 改良されたApp Router</h3>
<p>App Routerがさらに安定し、パフォーマンスが向上しました。新しいルーティングシステムにより、より直感的なファイル構造でアプリケーションを構築できます。</p>

<pre><code>// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    &lt;div&gt;
      &lt;h1&gt;{params.slug}&lt;/h1&gt;
    &lt;/div&gt;
  )
}</code></pre>

<h3>2. Turbopackの統合</h3>
<p>Turbopackがより深く統合され、開発時のビルド速度が大幅に向上しています。従来のWebpackと比較して、最大700%の高速化を実現しています。</p>

<h3>3. Server Actions の改善</h3>
<p>Server Actionsがより使いやすくなり、フォーム処理やデータ更新が簡潔に書けるようになりました。</p>

<p>これらの新機能により、Next.jsアプリケーションの開発体験が大幅に向上しています。</p>`,
      protected: false
    },
    excerpt: {
      rendered: '<p>Next.js 15の新機能について詳しく解説します。App Router、Turbopack、Server Actionsの改善点を中心に、実際のコード例を交えて説明します。</p>',
      protected: false
    },
    author: 1,
    featured_media: 101,
    comment_status: 'open',
    ping_status: 'open',
    sticky: false,
    template: '',
    format: 'standard',
    meta: { footnotes: '' },
    categories: [1, 5],
    tags: [3, 4, 2],
    class_list: ['post-1', 'post', 'type-post', 'status-publish', 'format-standard', 'hentry', 'category-frontend'],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/posts/1' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/posts' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/types/post' }],
      author: [{ embeddable: true, href: 'https://example.com/wp-json/wp/v2/users/1' }],
      replies: [{ embeddable: true, href: 'https://example.com/wp-json/wp/v2/comments?post=1' }],
      'version-history': [{ count: 1, href: 'https://example.com/wp-json/wp/v2/posts/1/revisions' }],
      'predecessor-version': [{ id: 2, href: 'https://example.com/wp-json/wp/v2/posts/1/revisions/2' }],
      'wp:featuredmedia': [{ embeddable: true, href: 'https://example.com/wp-json/wp/v2/media/101' }],
      'wp:attachment': [{ href: 'https://example.com/wp-json/wp/v2/media?parent=1' }],
      'wp:term': [
        { taxonomy: 'category', embeddable: true, href: 'https://example.com/wp-json/wp/v2/categories?post=1' },
        { taxonomy: 'post_tag', embeddable: true, href: 'https://example.com/wp-json/wp/v2/tags?post=1' }
      ],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 2,
    date: '2024-01-26T15:30:00',
    date_gmt: '2024-01-26T06:30:00',
    guid: { rendered: 'https://example.com/2024/01/26/typescript-best-practices/' },
    modified: '2024-01-26T15:30:00',
    modified_gmt: '2024-01-26T06:30:00',
    slug: 'typescript-best-practices-2024',
    status: 'publish',
    type: 'post',
    link: 'https://example.com/2024/01/26/typescript-best-practices-2024/',
    title: { rendered: 'TypeScript開発者が知っておくべき2024年のベストプラクティス', protected: false },
    content: {
      rendered: `<p>TypeScriptは急速に進化しており、2024年も多くの新機能と改善が追加されています。この記事では、現代のTypeScript開発で採用すべきベストプラクティスを紹介します。</p>

<h2>1. 厳密な型定義の活用</h2>

<p>TypeScript 5.0以降では、より厳密な型チェックが可能になっています。</p>

<pre><code>// 良い例：厳密な型定義
interface User {
  readonly id: string
  name: string
  email: string
  createdAt: Date
}

// さらに良い例：ブランド型の活用
type UserId = string & { __brand: 'UserId' }
type Email = string & { __brand: 'Email' }

interface StrictUser {
  readonly id: UserId
  name: string
  email: Email
  createdAt: Date
}</code></pre>

<h2>2. ユーティリティ型の効果的な使用</h2>

<p>TypeScriptの組み込みユーティリティ型を活用することで、型安全性を保ちながらコードの重複を避けることができます。</p>

<pre><code>// Partialを使った更新用の型
type UpdateUser = Partial&lt;Pick&lt;User, 'name' | 'email'&gt;&gt; & {
  id: UserId
}

// Omitを使ったフォーム用の型
type CreateUserForm = Omit&lt;User, 'id' | 'createdAt'&gt;</code></pre>

<h2>3. 条件付き型とテンプレートリテラル型</h2>

<p>高度な型操作により、より表現力豊かな型定義が可能です。</p>

<pre><code>// イベント名から型を推論
type EventMap = {
  'user:created': { user: User }
  'user:updated': { user: User, changes: UpdateUser }
  'user:deleted': { userId: UserId }
}

type EventHandler&lt;T extends keyof EventMap&gt; = (data: EventMap[T]) =&gt; void</code></pre>

<p>これらのベストプラクティスを採用することで、より堅牢で保守性の高いTypeScriptコードを書くことができます。</p>`,
      protected: false
    },
    excerpt: {
      rendered: '<p>2024年のTypeScript開発で採用すべきベストプラクティスを紹介。厳密な型定義、ユーティリティ型、条件付き型の効果的な使い方を解説します。</p>',
      protected: false
    },
    author: 1,
    featured_media: 102,
    comment_status: 'open',
    ping_status: 'open',
    sticky: true,
    template: '',
    format: 'standard',
    meta: { footnotes: '' },
    categories: [2, 3],
    tags: [2, 1, 3],
    class_list: ['post-2', 'post', 'type-post', 'status-publish', 'format-standard', 'sticky', 'hentry'],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/posts/2' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/posts' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/types/post' }],
      author: [{ embeddable: true, href: 'https://example.com/wp-json/wp/v2/users/1' }],
      replies: [{ embeddable: true, href: 'https://example.com/wp-json/wp/v2/comments?post=2' }],
      'version-history': [{ count: 1, href: 'https://example.com/wp-json/wp/v2/posts/2/revisions' }],
      'predecessor-version': [{ id: 3, href: 'https://example.com/wp-json/wp/v2/posts/2/revisions/3' }],
      'wp:featuredmedia': [{ embeddable: true, href: 'https://example.com/wp-json/wp/v2/media/102' }],
      'wp:attachment': [{ href: 'https://example.com/wp-json/wp/v2/media?parent=2' }],
      'wp:term': [
        { taxonomy: 'category', embeddable: true, href: 'https://example.com/wp-json/wp/v2/categories?post=2' },
        { taxonomy: 'post_tag', embeddable: true, href: 'https://example.com/wp-json/wp/v2/tags?post=2' }
      ],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 3,
    date: '2024-01-24T09:15:00',
    date_gmt: '2024-01-24T00:15:00',
    guid: { rendered: 'https://example.com/2024/01/24/react-server-components/' },
    modified: '2024-01-24T09:15:00',
    modified_gmt: '2024-01-24T00:15:00',
    slug: 'react-server-components-deep-dive',
    status: 'publish',
    type: 'post',
    link: 'https://example.com/2024/01/24/react-server-components-deep-dive/',
    title: { rendered: 'React Server Components完全ガイド：サーバーサイドレンダリングの新時代', protected: false },
    content: {
      rendered: `<p>React Server Components（RSC）は、Reactアプリケーションのアーキテクチャを根本的に変える技術です。この記事では、RSCの仕組みと実際の使用方法について詳しく解説します。</p>

<h2>React Server Componentsとは</h2>

<p>React Server Componentsは、サーバー上でレンダリングされるReactコンポーネントです。従来のSSR（Server-Side Rendering）とは異なり、コンポーネントレベルでサーバーとクライアントの処理を分離できます。</p>

<h3>従来のSSRとの違い</h3>

<ul>
<li><strong>従来のSSR</strong>: ページ全体をサーバーでレンダリングし、クライアントでハイドレーション</li>
<li><strong>RSC</strong>: コンポーネント単位でサーバー・クライアントを選択可能</li>
</ul>

<h2>Server Componentsの実装例</h2>

<pre><code>// ServerComponent.tsx (サーバーコンポーネント)
import { database } from './database'

export default async function UserList() {
  // サーバーでのみ実行される
  const users = await database.users.findMany()
  
  return (
    &lt;div&gt;
      &lt;h2&gt;ユーザー一覧&lt;/h2&gt;
      {users.map(user =&gt; (
        &lt;UserCard key={user.id} user={user} /&gt;
      ))}
    &lt;/div&gt;
  )
}

// ClientComponent.tsx (クライアントコンポーネント)
'use client'

import { useState } from 'react'

export default function InteractiveButton() {
  const [count, setCount] = useState(0)
  
  return (
    &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
      クリック数: {count}
    &lt;/button&gt;
  )
}</code></pre>

<h2>パフォーマンスの利点</h2>

<p>Server Componentsを使用することで、以下のパフォーマンス改善が期待できます：</p>

<ol>
<li><strong>バンドルサイズの削減</strong>: サーバーコンポーネントのコードはクライアントに送信されない</li>
<li><strong>初期ロード時間の短縮</strong>: サーバーでデータフェッチが完了してからクライアントに送信</li>
<li><strong>SEOの改善</strong>: 完全にレンダリングされたHTMLがクローラーに送信される</li>
</ol>

<h2>注意点と制限</h2>

<p>Server Componentsを使用する際の注意点：</p>

<ul>
<li>ブラウザAPIは使用できない</li>
<li>イベントハンドラーは設定できない</li>
<li>stateやeffectは使用できない</li>
</ul>

<p>React Server Componentsは、現代のWebアプリケーション開発において重要な技術です。適切に活用することで、パフォーマンスとユーザーエクスペリエンスの両方を向上させることができます。</p>`,
      protected: false
    },
    excerpt: {
      rendered: '<p>React Server Componentsの仕組みと実装方法を詳しく解説。従来のSSRとの違い、パフォーマンス改善効果、実際のコード例を交えて説明します。</p>',
      protected: false
    },
    author: 2,
    featured_media: 103,
    comment_status: 'open',
    ping_status: 'open',
    sticky: false,
    template: '',
    format: 'standard',
    meta: { footnotes: '' },
    categories: [4, 6],
    tags: [3, 4, 17],
    class_list: ['post-3', 'post', 'type-post', 'status-publish', 'format-standard', 'hentry'],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/posts/3' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/posts' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/types/post' }],
      author: [{ embeddable: true, href: 'https://example.com/wp-json/wp/v2/users/2' }],
      replies: [{ embeddable: true, href: 'https://example.com/wp-json/wp/v2/comments?post=3' }],
      'version-history': [{ count: 1, href: 'https://example.com/wp-json/wp/v2/posts/3/revisions' }],
      'predecessor-version': [{ id: 4, href: 'https://example.com/wp-json/wp/v2/posts/3/revisions/4' }],
      'wp:featuredmedia': [{ embeddable: true, href: 'https://example.com/wp-json/wp/v2/media/103' }],
      'wp:attachment': [{ href: 'https://example.com/wp-json/wp/v2/media?parent=3' }],
      'wp:term': [
        { taxonomy: 'category', embeddable: true, href: 'https://example.com/wp-json/wp/v2/categories?post=3' },
        { taxonomy: 'post_tag', embeddable: true, href: 'https://example.com/wp-json/wp/v2/tags?post=3' }
      ],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  }
]

// ページネーション機能付きでポストを取得
export const getDummyPostsPage = (page: number = 1, perPage: number = 10) => {
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const posts = dummyPosts.slice(startIndex, endIndex)
  
  return {
    posts,
    total: dummyPosts.length,
    totalPages: Math.ceil(dummyPosts.length / perPage),
    currentPage: page,
    perPage,
    hasNextPage: endIndex < dummyPosts.length,
    hasPreviousPage: page > 1
  }
}

export const getDummyPostBySlug = (slug: string) => {
  return dummyPosts.find(post => post.slug === slug)
}

export const getDummyPostById = (id: number) => {
  return dummyPosts.find(post => post.id === id)
}