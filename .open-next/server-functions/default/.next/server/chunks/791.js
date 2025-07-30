exports.id=791,exports.ids=[791],exports.modules={440:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});var o=s(1658);let r=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,o.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},878:(e,t,s)=>{"use strict";s.d(t,{a:()=>i});let o=[{id:1,count:8,description:"JavaScript programming language and related technologies",link:"https://example.com/tag/javascript",name:"JavaScript",slug:"javascript",taxonomy:"post_tag",meta:[]},{id:2,count:6,description:"React.js library for building user interfaces",link:"https://example.com/tag/react",name:"React",slug:"react",taxonomy:"post_tag",meta:[]},{id:3,count:5,description:"TypeScript language for type-safe JavaScript",link:"https://example.com/tag/typescript",name:"TypeScript",slug:"typescript",taxonomy:"post_tag",meta:[]},{id:4,count:7,description:"Next.js React framework for production",link:"https://example.com/tag/nextjs",name:"Next.js",slug:"nextjs",taxonomy:"post_tag",meta:[]},{id:5,count:4,description:"CSS styling and layout techniques",link:"https://example.com/tag/css",name:"CSS",slug:"css",taxonomy:"post_tag",meta:[]},{id:6,count:3,description:"Web development best practices and techniques",link:"https://example.com/tag/web-development",name:"Web Development",slug:"web-development",taxonomy:"post_tag",meta:[]},{id:7,count:2,description:"Frontend development technologies and frameworks",link:"https://example.com/tag/frontend",name:"Frontend",slug:"frontend",taxonomy:"post_tag",meta:[]},{id:8,count:3,description:"Responsive web design techniques",link:"https://example.com/tag/responsive-design",name:"Responsive Design",slug:"responsive-design",taxonomy:"post_tag",meta:[]}],r=[{title:"Getting Started with Next.js",slug:"getting-started-with-nextjs",tags:[4,2,3,6],content:`
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
    `,excerpt:"<p>Learn how to get started with Next.js, a powerful React framework for building modern web applications.</p>"},{title:"Mastering React Hooks",slug:"mastering-react-hooks",tags:[2,1,7],content:`
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
    `,excerpt:"<p>Deep dive into React Hooks and learn how to use them effectively in your React applications.</p>"},{title:"TypeScript Best Practices",slug:"typescript-best-practices",tags:[3,1,6],content:`
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
    `,excerpt:"<p>Learn the essential best practices for writing clean, maintainable TypeScript code.</p>"},{title:"Building Responsive Web Design",slug:"building-responsive-web-design",tags:[5,8,7,6],content:`
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
    `,excerpt:"<p>Master the art of responsive web design and create websites that work perfectly on all devices.</p>"},{title:"Modern CSS Techniques",slug:"modern-css-techniques",tags:[5,7,6],content:`
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
    `,excerpt:"<p>Explore modern CSS techniques including Grid, custom properties, and container queries.</p>"}];function a(e){let t=(e-1)%r.length,s=r[t],o=new Date(new Date("2023-12-01").getTime()+(e-1)*1728e5),a=new Date(o.getTime()+24*Math.random()*36e5);return{id:e,title:{rendered:s.title},content:{rendered:s.content},excerpt:{rendered:s.excerpt},slug:s.slug,date:o.toISOString(),modified:a.toISOString(),author:1,featured_media:100*e,categories:[1,2],tags:s.tags,_links:{self:[{href:`https://example.com/wp-json/wp/v2/posts/${e}`}],author:[{href:"https://example.com/wp-json/wp/v2/users/1"}],"wp:featuredmedia":[{href:`https://example.com/wp-json/wp/v2/media/${100*e}`}]}}}function n(e,t){let s=(e-1)*t,o=Math.ceil(25/t),r=[];if(e<=o){let e=Math.min(s+t,25);for(let t=s;t<e;t++)r.push(a(t+1))}return{posts:r,currentPage:e,perPage:t,total:25,totalPages:o}}class i{constructor(e,t=!0){this.baseUrl=e.replace(/\/$/,""),this.useFallback=t}async getPosts(e={}){let{page:t=1,perPage:s=10}=e,o=`${this.baseUrl}/posts?per_page=${s}&page=${t}`;try{let e=await fetch(o);if(!e.ok){let t=Error(`WordPress API error: ${e.status} ${e.statusText}`);throw t.status=e.status,t.statusText=e.statusText,t}let r=await e.json(),a=parseInt(e.headers.get("X-WP-Total")||"0",10),n=parseInt(e.headers.get("X-WP-TotalPages")||"0",10);return{posts:r,total:a,totalPages:n,currentPage:t,perPage:s}}catch(e){if(this.useFallback)return console.warn("WordPress API unavailable, falling back to dummy data:",e),n(t,s);if(e instanceof Error)throw e;throw Error("Unknown error occurred while fetching posts")}}async getPost(e){let t;t="number"==typeof e?`${this.baseUrl}/posts/${e}`:`${this.baseUrl}/posts?slug=${e}`;try{let s=await fetch(t);if(!s.ok){let e=Error(`WordPress API error: ${s.status} ${s.statusText}`);throw e.status=s.status,e.statusText=s.statusText,e}if("string"!=typeof e)return await s.json();{let t=await s.json();if(0===t.length)throw Error(`Post not found: ${e}`);return t[0]}}catch(t){if(this.useFallback&&"string"==typeof e){console.warn("WordPress API unavailable, falling back to dummy data:",t);let s=r.find(t=>t.slug===e);if(!s)throw Error(`Post not found: ${e}`);return a(r.indexOf(s)+1)}if(t instanceof Error)throw t;throw Error("Unknown error occurred while fetching post")}}async getTags(){let e=`${this.baseUrl}/tags?per_page=100`;try{let t=await fetch(e,{headers:{"Content-Type":"application/json"}});if(!t.ok)throw Error(`Failed to fetch tags: ${t.status} ${t.statusText}`);return await t.json()}catch(e){if(this.useFallback)return console.warn("WordPress API unavailable, falling back to dummy tags:",e),o;if(e instanceof Error)throw e;throw Error("Unknown error occurred while fetching tags")}}async getTagById(e){let t=`${this.baseUrl}/tags/${e}`;try{let e=await fetch(t,{headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error(`Failed to fetch tag: ${e.status} ${e.statusText}`);return await e.json()}catch(t){if(this.useFallback){console.warn("WordPress API unavailable, falling back to dummy tag:",t);let s=o.find(t=>t.id===e);if(!s)throw Error(`Tag not found: ${e}`);return s}if(t instanceof Error)throw t;throw Error("Unknown error occurred while fetching tag")}}async getPostsByTag(e,t={}){let{page:s=1,perPage:r=10}=t;try{let t=await fetch(`${this.baseUrl}/tags?slug=${e}`,{headers:{"Content-Type":"application/json"}});if(!t.ok)throw Error(`Failed to fetch tag: ${t.status} ${t.statusText}`);let o=await t.json();if(0===o.length)throw Error(`Tag with slug "${e}" not found`);let a=o[0].id,n=`${this.baseUrl}/posts?tags=${a}&page=${s}&per_page=${r}`,i=await fetch(n,{headers:{"Content-Type":"application/json"}});if(!i.ok)throw Error(`Failed to fetch posts: ${i.status} ${i.statusText}`);let l=await i.json(),p=parseInt(i.headers.get("X-WP-Total")||"0",10),c=parseInt(i.headers.get("X-WP-TotalPages")||"0",10);return{posts:l,total:p,totalPages:c,currentPage:s,perPage:r}}catch(t){if(this.useFallback){console.warn("WordPress API unavailable, falling back to dummy data for tag filtering:",t);let a=o.find(t=>t.slug===e);if(!a)throw Error(`Tag with slug "${e}" not found`);let i=n(1,100).posts.filter(e=>e.tags.includes(a.id)),l=(s-1)*r;return{posts:i.slice(l,l+r),total:i.length,totalPages:Math.ceil(i.length/r),currentPage:s,perPage:r}}if(t instanceof Error)throw t;throw Error("Unknown error occurred while fetching posts by tag")}}async getTagsByIds(e){if(0===e.length)return[];let t=`${this.baseUrl}/tags?include=${e.join(",")}&per_page=100`;try{let e=await fetch(t,{headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error(`Failed to fetch tags: ${e.status} ${e.statusText}`);return await e.json()}catch(t){if(this.useFallback)return console.warn("WordPress API unavailable, falling back to dummy tags:",t),o.filter(t=>e.includes(t.id));if(t instanceof Error)throw t;throw Error("Unknown error occurred while fetching tags")}}}},1135:()=>{},3348:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,6444,23)),Promise.resolve().then(s.t.bind(s,6042,23)),Promise.resolve().then(s.t.bind(s,8170,23)),Promise.resolve().then(s.t.bind(s,9477,23)),Promise.resolve().then(s.t.bind(s,9345,23)),Promise.resolve().then(s.t.bind(s,2089,23)),Promise.resolve().then(s.t.bind(s,6577,23)),Promise.resolve().then(s.t.bind(s,1307,23))},4431:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>p,metadata:()=>l});var o=s(7413),r=s(2202),a=s.n(r),n=s(4988),i=s.n(n);s(1135);let l={title:"Create Next App",description:"Generated by create next app"};function p({children:e}){return(0,o.jsx)("html",{lang:"en",children:(0,o.jsx)("body",{className:`${a().variable} ${i().variable} antialiased`,children:e})})}},6500:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,6346,23)),Promise.resolve().then(s.t.bind(s,7924,23)),Promise.resolve().then(s.t.bind(s,5656,23)),Promise.resolve().then(s.t.bind(s,99,23)),Promise.resolve().then(s.t.bind(s,8243,23)),Promise.resolve().then(s.t.bind(s,8827,23)),Promise.resolve().then(s.t.bind(s,2763,23)),Promise.resolve().then(s.t.bind(s,7173,23))},6922:()=>{},7090:()=>{}};