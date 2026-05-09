import fs from 'fs';
import path from 'path';

// Helper to convert arbitrary strings to URL-friendly slugs
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters
    .replace(/[\s_-]+/g, '-') // Swap spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove trailing hyphens
}

async function generateSitemap() {
  const rootUrl = 'https://swiftcodedir.com';
  const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const countriesDir = path.join(process.cwd(), 'node_modules', 'swiftcodes-toolkit', 'AllCountries');
  
  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const sitemapFooter = `\n</urlset>`;
  let xmlContent = sitemapHeader;
  
  const addUrl = (loc: string, priority: string, changefreq: string) => {
    xmlContent += `
  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  };

  // Static URLs
  addUrl(`${rootUrl}/`, '1.0', 'daily');
  addUrl(`${rootUrl}/swift`, '0.8', 'weekly');
  addUrl(`${rootUrl}/swift-checker`, '0.9', 'weekly');
  addUrl(`${rootUrl}/iban`, '0.8', 'weekly');
  addUrl(`${rootUrl}/iban/validator`, '0.9', 'weekly');
  addUrl(`${rootUrl}/iban/calculator`, '0.9', 'weekly');
  addUrl(`${rootUrl}/sort-code`, '0.8', 'weekly');
  addUrl(`${rootUrl}/blz`, '0.8', 'weekly');
  
  if (fs.existsSync(countriesDir)) {
    const files = fs.readdirSync(countriesDir).filter(f => f.endsWith('.json'));
    console.log(`Found ${files.length} country files...`);
    
    for (const file of files) {
      const countryData = JSON.parse(fs.readFileSync(path.join(countriesDir, file), 'utf8'));
      const countrySlug = generateSlug(countryData.country || file.replace('.json', ''));
      
      // Add country page
      addUrl(`${rootUrl}/swift/${countrySlug}`, '0.7', 'weekly');
      
      // Group by bank names to match how the routing works (bank details)
      const uniqueBanks = Array.from(new Set(countryData.list.map((b: any) => b.bank)));
      
      for (const bankName of uniqueBanks) {
        if (!bankName) continue;
        const bankSlug = generateSlug(String(bankName));
        addUrl(`${rootUrl}/swift/${countrySlug}/${bankSlug}`, '0.6', 'monthly');
      }
    }
  }

  // Fallback for guides
  const staticGuides = [
    '/sitemap', '/about-us', '/privacy-policy', '/terms-and-conditions', 
    '/blog', '/what-is-a-swift-code', '/what-is-an-iban', '/swift-vs-iban', '/sepa-transfer-guide'
  ];
  for (const guide of staticGuides) {
    addUrl(`${rootUrl}${guide}`, '0.5', 'monthly');
  }

  xmlContent += sitemapFooter;
  
  fs.writeFileSync(outPath, xmlContent);
  console.log(`Successfully generated sitemap with URLs at ${outPath}`);
}

generateSitemap().catch(console.error);