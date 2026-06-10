import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src', 'data', 'blogPosts.ts');
const draftsFile = path.join(process.cwd(), 'src', 'data', 'blog_drafts.json');

const posts = JSON.parse(fs.readFileSync(draftsFile, 'utf8'));

const fileContent = fs.readFileSync(file, 'utf8');

// Insert right before the last "];"
const blockToInsert = posts.map((p: any) => JSON.stringify(p, null, 2)).join(',\n') + '\n';

const output = fileContent.replace(/}\n\];/, '},\n' + blockToInsert + '];');
fs.writeFileSync(file, output);

console.log('Posts added successfully!');
