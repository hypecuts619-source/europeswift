import fs from 'fs';

const content = fs.readFileSync('src/data/blogPosts.ts', 'utf8');
const regex = /content:\s*`([\s\S]*?)(?<!\\)`/g;
let match;
let i = 1;

while ((match = regex.exec(content)) !== null) {
  const words = match[1].split(/\s+/).length;
  console.log(`Post ${i}: ${words} words`);
  i++;
}
