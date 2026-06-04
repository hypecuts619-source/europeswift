import fs from 'fs';

const content = fs.readFileSync('src/data/blogPosts.ts', 'utf8');
const regex = /content:\s*`([\s\S]*?)`/g;
const postsRegex = /(\{\s*slug:\s*"([^"]+)",[\s\S]*?content:\s*`)([\s\S]*?)(`\s*\})/g;

let match;
let count = 0;
while ((match = postsRegex.exec(content)) !== null) {
  count++;
  const slug = match[2];
  const postContent = match[3];
  const words = postContent.split(/\s+/).length;
  console.log(`Match ${count}: slug="${slug}", words=${words}`);
}
console.log(`Total Regex Matches: ${count}`);
