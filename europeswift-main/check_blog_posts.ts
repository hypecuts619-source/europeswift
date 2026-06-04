import { blogPosts } from './src/data/blogPosts.js';

blogPosts.forEach((post, index) => {
  const words = post.content.split(/\s+/).filter(Boolean).length;
  console.log(`Post ${index + 1}: slug="${post.slug}", words=${words}, title="${post.title}"`);
});
console.log(`Total active posts dynamically imported: ${blogPosts.length}`);
