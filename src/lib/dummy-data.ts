import type { BlogPost, BlogPostsResponse, Tag } from '@/types'

const DUMMY_POSTS_TOTAL = 25

// Dummy tags data
const dummyTagsData: Tag[] = [
  {
    id: 1,
    count: 8,
    description: 'JavaScript programming language and related technologies',
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
    count: 6,
    description: 'React.js library for building user interfaces',
    link: 'https://example.com/tag/react',
    name: 'React',
    slug: 'react',
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
    count: 5,
    description: 'TypeScript language for type-safe JavaScript',
    link: 'https://example.com/tag/typescript',
    name: 'TypeScript',
    slug: 'typescript',
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
    count: 7,
    description: 'Next.js React framework for production',
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
    count: 4,
    description: 'CSS styling and layout techniques',
    link: 'https://example.com/tag/css',
    name: 'CSS',
    slug: 'css',
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
  {
    id: 6,
    count: 3,
    description: 'Web development best practices and techniques',
    link: 'https://example.com/tag/web-development',
    name: 'Web Development',
    slug: 'web-development',
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
    count: 2,
    description: 'Frontend development technologies and frameworks',
    link: 'https://example.com/tag/frontend',
    name: 'Frontend',
    slug: 'frontend',
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
    count: 3,
    description: 'Responsive web design techniques',
    link: 'https://example.com/tag/responsive-design',
    name: 'Responsive Design',
    slug: 'responsive-design',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [{ href: 'https://example.com/wp-json/wp/v2/tags/8' }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/tags' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/taxonomies/post_tag' }],
      'wp:post_type': [{ href: 'https://example.com/wp-json/wp/v2/posts?tags=8' }],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  }
]

const dummyPostsData = [
  {
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-nextjs',
    tags: [4, 2, 3, 6], // Next.js, React, TypeScript, Web Development
    content: `
      <h2>Introduction to Next.js</h2>
      <p>Next.js is a powerful React framework that makes building full-stack web applications easy. It provides many features out of the box including server-side rendering, static site generation, and API routes.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Server-side rendering (SSR)</li>
        <li>Static site generation (SSG)</li>
        <li>Automatic code splitting</li>
        <li>Built-in CSS support</li>
        <li>API routes</li>
        <li>TypeScript support</li>
      </ul>
      
      <p>In this comprehensive guide, we'll explore how to get started with Next.js and build your first application.</p>
      
      <h3>Installation</h3>
      <p>To create a new Next.js application, you can use the following command:</p>
      <code>npx create-next-app@latest my-app</code>
      
      <p>This will set up a new Next.js project with all the necessary dependencies and a basic project structure.</p>
    `,
    excerpt: '<p>Learn how to get started with Next.js, a powerful React framework for building modern web applications.</p>'
  },
  {
    title: 'Mastering React Hooks',
    slug: 'mastering-react-hooks',
    tags: [2, 1, 7], // React, JavaScript, Frontend
    content: `
      <h2>Understanding React Hooks</h2>
      <p>React Hooks revolutionized the way we write React components by allowing us to use state and other React features in functional components.</p>
      
      <h3>useState Hook</h3>
      <p>The useState hook allows you to add state to functional components:</p>
      <code>const [count, setCount] = useState(0)</code>
      
      <h3>useEffect Hook</h3>
      <p>The useEffect hook lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in React classes.</p>
      
      <h3>Custom Hooks</h3>
      <p>You can also create your own custom hooks to share stateful logic between components. Custom hooks are JavaScript functions whose names start with "use" and that may call other hooks.</p>
      
      <p>Mastering React Hooks is essential for modern React development.</p>
    `,
    excerpt: '<p>Deep dive into React Hooks and learn how to use them effectively in your React applications.</p>'
  },
  {
    title: 'TypeScript Best Practices',
    slug: 'typescript-best-practices',
    tags: [3, 1, 6], // TypeScript, JavaScript, Web Development
    content: `
      <h2>Writing Better TypeScript Code</h2>
      <p>TypeScript adds static type checking to JavaScript, helping you catch errors early and write more maintainable code.</p>
      
      <h3>Use Strict Mode</h3>
      <p>Always enable strict mode in your TypeScript configuration to catch more potential errors:</p>
      <code>"strict": true</code>
      
      <h3>Define Proper Types</h3>
      <p>Create clear and specific type definitions for your data structures. Use interfaces for object shapes and type aliases for unions and primitives.</p>
      
      <h3>Avoid 'any' Type</h3>
      <p>The 'any' type defeats the purpose of TypeScript. Instead, use proper types or 'unknown' when the type is truly unknown.</p>
      
      <h3>Use Type Guards</h3>
      <p>Type guards help you narrow down types at runtime, making your code safer and more predictable.</p>
      
      <p>Following these best practices will help you write more robust TypeScript applications.</p>
    `,
    excerpt: '<p>Learn the essential best practices for writing clean, maintainable TypeScript code.</p>'
  },
  {
    title: 'Building Responsive Web Design',
    slug: 'building-responsive-web-design',
    tags: [5, 8, 7, 6], // CSS, Responsive Design, Frontend, Web Development
    content: `
      <h2>Creating Responsive Layouts</h2>
      <p>Responsive web design ensures your website looks great and functions well on all devices, from mobile phones to desktop computers.</p>
      
      <h3>Mobile-First Approach</h3>
      <p>Start designing for mobile devices first, then progressively enhance for larger screens. This approach ensures better performance and user experience on mobile devices.</p>
      
      <h3>Flexible Grid Systems</h3>
      <p>Use CSS Grid and Flexbox to create flexible layouts that adapt to different screen sizes. These modern CSS features provide powerful tools for responsive design.</p>
      
      <h3>Media Queries</h3>
      <p>Media queries allow you to apply different styles based on device characteristics like screen width, height, and orientation.</p>
      
      <h3>Responsive Images</h3>
      <p>Use responsive images with the srcset attribute and picture element to serve appropriate image sizes for different devices.</p>
      
      <p>Mastering responsive design is crucial for modern web development.</p>
    `,
    excerpt: '<p>Master the art of responsive web design and create websites that work perfectly on all devices.</p>'
  },
  {
    title: 'Modern CSS Techniques',
    slug: 'modern-css-techniques',
    tags: [5, 7, 6], // CSS, Frontend, Web Development
    content: `
      <h2>Advanced CSS Features</h2>
      <p>Modern CSS offers powerful features that make styling more efficient and maintainable. Let's explore some of the most useful techniques.</p>
      
      <h3>CSS Grid Layout</h3>
      <p>CSS Grid is a two-dimensional layout system that allows you to create complex layouts with ease. It's perfect for creating card layouts, complex page structures, and responsive designs.</p>
      
      <h3>CSS Custom Properties (Variables)</h3>
      <p>CSS custom properties allow you to store values that you want to reuse throughout your stylesheet. They're particularly useful for creating consistent color schemes and spacing systems.</p>
      
      <h3>Container Queries</h3>
      <p>Container queries allow you to apply styles based on the size of a containing element, not just the viewport. This enables truly modular component design.</p>
      
      <h3>CSS Logical Properties</h3>
      <p>Logical properties provide better internationalization support by using logical directions (inline/block) instead of physical directions (left/right).</p>
      
      <p>These modern CSS techniques will help you write more maintainable and flexible stylesheets.</p>
    `,
    excerpt: '<p>Explore modern CSS techniques including Grid, custom properties, and container queries.</p>'
  }
]

export function generateDummyPosts(count: number): BlogPost[] {
  const posts: BlogPost[] = []
  
  for (let i = 0; i < count; i++) {
    posts.push(generateDummyPost(i + 1))
  }
  
  return posts
}

export function generateDummyPost(id: number): BlogPost {
  const postIndex = (id - 1) % dummyPostsData.length
  const postData = dummyPostsData[postIndex]!
  
  const baseDate = new Date('2023-12-01')
  const daysOffset = (id - 1) * 2 // Posts every 2 days
  const postDate = new Date(baseDate.getTime() + daysOffset * 24 * 60 * 60 * 1000)
  const modifiedDate = new Date(postDate.getTime() + Math.random() * 24 * 60 * 60 * 1000)
  
  return {
    id,
    date: postDate.toISOString(),
    date_gmt: new Date(postDate.getTime() - 9 * 60 * 60 * 1000).toISOString(), // JST to GMT
    guid: { rendered: `https://example.com/post-${id}/` },
    modified: modifiedDate.toISOString(),
    modified_gmt: new Date(modifiedDate.getTime() - 9 * 60 * 60 * 1000).toISOString(),
    slug: postData.slug,
    status: 'publish' as const,
    type: 'post' as const,
    link: `https://example.com/post-${id}/`,
    title: { rendered: postData.title, protected: false },
    content: { rendered: postData.content, protected: false },
    excerpt: { rendered: postData.excerpt, protected: false },
    author: 1,
    featured_media: id * 100,
    comment_status: 'open' as const,
    ping_status: 'open' as const,
    sticky: false,
    template: '',
    format: 'standard' as const,
    meta: { footnotes: '' },
    class_list: [],
    categories: [1, 2],
    tags: postData.tags,
    _links: {
      self: [{ href: `https://example.com/wp-json/wp/v2/posts/${id}` }],
      collection: [{ href: 'https://example.com/wp-json/wp/v2/posts' }],
      about: [{ href: 'https://example.com/wp-json/wp/v2/types/post' }],
      author: [{ href: 'https://example.com/wp-json/wp/v2/users/1', embeddable: true }],
      replies: [{ href: `https://example.com/wp-json/wp/v2/comments?post=${id}`, embeddable: true }],
      'version-history': [{ count: 1, href: `https://example.com/wp-json/wp/v2/posts/${id}/revisions` }],
      'predecessor-version': [{ id: id, href: `https://example.com/wp-json/wp/v2/posts/${id}/revisions/${id}` }],
      'wp:featuredmedia': [{ href: `https://example.com/wp-json/wp/v2/media/${id * 100}`, embeddable: true }],
      'wp:attachment': [{ href: `https://example.com/wp-json/wp/v2/media?parent=${id}` }],
      'wp:term': [
        { taxonomy: 'category', embeddable: true, href: `https://example.com/wp-json/wp/v2/categories?post=${id}` },
        { taxonomy: 'post_tag', embeddable: true, href: `https://example.com/wp-json/wp/v2/tags?post=${id}` }
      ],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  }
}

export function getDummyPostBySlug(slug: string): BlogPost {
  const postData = dummyPostsData.find(post => post.slug === slug)
  
  if (!postData) {
    throw new Error(`Post not found: ${slug}`)
  }
  
  const postIndex = dummyPostsData.indexOf(postData)
  return generateDummyPost(postIndex + 1)
}

export function getDummyPostsPage(page: number, perPage: number): BlogPostsResponse {
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  
  const totalPosts = DUMMY_POSTS_TOTAL
  const totalPages = Math.ceil(totalPosts / perPage)
  
  const posts: BlogPost[] = []
  
  if (page <= totalPages) {
    const actualEndIndex = Math.min(endIndex, totalPosts)
    for (let i = startIndex; i < actualEndIndex; i++) {
      posts.push(generateDummyPost(i + 1))
    }
  }
  
  return {
    posts,
    currentPage: page,
    perPage,
    total: totalPosts,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  }
}

// Dummy tag functions
export function getDummyTags(): Tag[] {
  return dummyTagsData
}

export function getDummyTagById(id: number): Tag | undefined {
  return dummyTagsData.find(tag => tag.id === id)
}

export function getDummyTagsByIds(ids: number[]): Tag[] {
  return dummyTagsData.filter(tag => ids.includes(tag.id))
}

export function getDummyTagBySlug(slug: string): Tag | undefined {
  return dummyTagsData.find(tag => tag.slug === slug)
}