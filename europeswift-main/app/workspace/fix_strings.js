const fs = require('fs');
const files = ['src/pages/Home.tsx', 'src/pages/BlogIndex.tsx', 'src/pages/BankingStatistics.tsx'];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace("`${}/icon-512.png`", '"https://swiftcodedir.com/icon-512.png"');
  content = content.replace("`${}/swift/{search_term_string}`", '"https://swiftcodedir.com/swift/{search_term_string}"');
  fs.writeFileSync(file, content);
}
console.log('Fixed exactly matching empty string interpolation.');
