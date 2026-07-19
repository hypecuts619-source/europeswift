const fs = require('fs');
let content = fs.readFileSync('create-sitemap.ts', 'utf8');
content = content.replace(
    /for \(const bank of banks\) \{\n        countryUrls\.push\(formatUrl\(`\$\{rootUrl\}\/swift\/\$\{countrySlug\}\/\$\{bank\.slug\}`\, 'monthly', '0\.6'\)\);\n      \}/,
    `for (const bank of banks) {
        countryUrls.push(formatUrl(\`\${rootUrl}/swift/\${countrySlug}/\${bank.slug}\`, 'monthly', '0.6'));
        const details = countryData.bankDetails?.[bank.slug];
        if (details && Array.isArray(details.branches)) {
          for (const branch of details.branches) {
            if (branch && branch.bic) {
              countryUrls.push(formatUrl(\`\${rootUrl}/swift/\${countrySlug}/\${bank.slug}/\${branch.bic.toLowerCase()}\`, 'monthly', '0.5'));
            }
          }
        }
      }`
);
fs.writeFileSync('create-sitemap.ts', content);
