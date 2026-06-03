import { blogPosts } from './src/data/blogPosts.js';

blogPosts.forEach((post) => {
  console.log(`Date: ${post.date} | Slug: ${post.slug} | Title: ${post.title}`);
});
