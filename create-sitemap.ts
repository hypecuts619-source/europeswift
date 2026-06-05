import fs from 'fs';
import path from 'path';
import { blogPosts } from './src/data/blogPosts';

async function generateSitemap() {
  const rootUrl = 'https://swiftcodedir.com';
  const publicDir = path.join(process.cwd(), 'public');
  const countriesDataDir = path.join(publicDir, 'data', 'countries');
  const ibanFormatsFile = path.join(process.cwd(), 'src', 'data', 'iban-formats.json');
  
  // Clean up old sitemap files
  const existingFiles = fs.readdirSync(publicDir);
  for (const file of existingFiles) {
    if (file.startsWith('sitemap') && file.endsWith('.xml')) {
      fs.unlinkSync(path.join(publicDir, file));
    }
  }

  const formatUrl = (loc: string, changefreq: string, priority: string) => {
    return `\n  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  };

  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const sitemapFooter = `\n</urlset>`;

  // 1. Generate sitemap-main.xml (Static pages, hubs, blog)
  const mainUrls: string[] = [];
  
  // Static URLs
  mainUrls.push(formatUrl(`${rootUrl}/`, 'daily', '1.0'));
  mainUrls.push(formatUrl(`${rootUrl}/swift`, 'weekly', '0.8'));
  mainUrls.push(formatUrl(`${rootUrl}/swift-checker`, 'weekly', '0.9'));
  mainUrls.push(formatUrl(`${rootUrl}/iban`, 'weekly', '0.8'));
  mainUrls.push(formatUrl(`${rootUrl}/iban/validator`, 'weekly', '0.9'));
  mainUrls.push(formatUrl(`${rootUrl}/iban/calculator`, 'weekly', '0.9'));
  mainUrls.push(formatUrl(`${rootUrl}/iban/complete-coverage`, 'weekly', '0.9'));
  mainUrls.push(formatUrl(`${rootUrl}/iban/europe`, 'weekly', '0.8'));
  mainUrls.push(formatUrl(`${rootUrl}/iban/middle-east`, 'weekly', '0.8'));
  mainUrls.push(formatUrl(`${rootUrl}/iban/africa`, 'weekly', '0.8'));
  mainUrls.push(formatUrl(`${rootUrl}/iban/caribbean`, 'weekly', '0.8'));
  mainUrls.push(formatUrl(`${rootUrl}/iban/americas`, 'weekly', '0.8'));
  mainUrls.push(formatUrl(`${rootUrl}/iban/asia`, 'weekly', '0.8'));
  mainUrls.push(formatUrl(`${rootUrl}/sort-code`, 'weekly', '0.8'));
  mainUrls.push(formatUrl(`${rootUrl}/blz`, 'weekly', '0.8'));

  // Fallback for guides
  const staticGuides = [
    '/sitemap', '/about-us', '/privacy-policy', '/terms-and-conditions', 
    '/what-is-a-swift-code', '/what-is-an-iban', '/swift-vs-iban', '/sepa-transfer-guide', '/banking-statistics'
  ];
  for (const guide of staticGuides) {
    mainUrls.push(formatUrl(`${rootUrl}${guide}`, 'monthly', '0.5'));
  }

  // Blog Posts
  mainUrls.push(formatUrl(`${rootUrl}/blog`, 'weekly', '0.8'));
  for (const post of blogPosts) {
    mainUrls.push(formatUrl(`${rootUrl}/blog/${post.slug}`, 'monthly', '0.7'));
  }

  let mainXml = sitemapHeader + mainUrls.join('') + sitemapFooter;
  fs.writeFileSync(path.join(publicDir, 'sitemap-main.xml'), mainXml);
  
  const sitemapIndexEntries: string[] = [];
  sitemapIndexEntries.push(`\n  <sitemap>\n    <loc>${rootUrl}/sitemap-main.xml</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n  </sitemap>`);

  // 2. Process Country Data manually
  const iso2ToSlugMap: Record<string, string> = {};
  const swiftDataFile = path.join(process.cwd(), 'src', 'data', 'swift.json');
  if (fs.existsSync(swiftDataFile)) {
    const swiftData = JSON.parse(fs.readFileSync(swiftDataFile, 'utf8'));
    for (const [slug, data] of Object.entries(swiftData as Record<string, any>)) {
      if (data.iso2) {
        iso2ToSlugMap[data.iso2.toLowerCase()] = slug;
      }
    }
  }

  // 3. Get IBAN Country slugs
  const iso2ToIbanSlug: Record<string, string> = {};
  const newTerritories = ['AX', 'GF', 'GP', 'MF', 'MQ', 'NC', 'PF', 'PM', 'RE', 'TF', 'WF', 'YT', 'RU', 'LC'];
  if (fs.existsSync(ibanFormatsFile)) {
    const ibanData = JSON.parse(fs.readFileSync(ibanFormatsFile, 'utf8'));
    for (const item of ibanData) {
      if (item.country && item.code) {
        const slug = item.country.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
        iso2ToIbanSlug[item.code.toLowerCase()] = slug;
      }
    }
  }

  // Generate Regional Sitemaps
  if (fs.existsSync(countriesDataDir)) {
    const files = fs.readdirSync(countriesDataDir).filter(f => f.endsWith('.json') && !f.endsWith('_branches.json'));
    console.log(`Found ${files.length} country files...`);
    
    let totalUrls = mainUrls.length;

    for (const file of files) {
      const fileIso2 = file.replace('.json', ''); // e.g. "us"
      const countrySlug = iso2ToSlugMap[fileIso2] || fileIso2;
      
      const countryUrls: string[] = [];
      
      // Add country page
      countryUrls.push(formatUrl(`${rootUrl}/swift/${countrySlug}`, 'weekly', '0.7'));
      countryUrls.push(formatUrl(`${rootUrl}/swift/${countrySlug}/branches`, 'monthly', '0.7'));
      
      // If the country has an IBAN page
      if (iso2ToIbanSlug[fileIso2]) {
        let priority = '0.8';
        if (newTerritories.includes(fileIso2.toUpperCase())) {
            priority = '0.9';
        }
        countryUrls.push(formatUrl(`${rootUrl}/iban/${iso2ToIbanSlug[fileIso2]}`, 'weekly', priority));
      }

      let countryData;
      try {
        countryData = JSON.parse(fs.readFileSync(path.join(countriesDataDir, file), 'utf8'));
      } catch (e) {
        console.error(`Error parsing ${file}:`, e);
        continue;
      }
      
      const banks = countryData.banks || [];
      for (const bank of banks) {
        countryUrls.push(formatUrl(`${rootUrl}/swift/${countrySlug}/${bank.slug}`, 'monthly', '0.6'));
      }

      // If a single country has >40,000 URLs, we need to chunk the country itself.
      // But typically banks are ~10,000 max. Just in case:
      const MAX_URLS_PER_SITEMAP = 40000;
      for (let i = 0; i < countryUrls.length; i += MAX_URLS_PER_SITEMAP) {
        const chunk = countryUrls.slice(i, i + MAX_URLS_PER_SITEMAP);
        const postfix = i === 0 ? '' : `-${Math.floor(i / MAX_URLS_PER_SITEMAP) + 1}`;
        const sitemapName = `sitemap-${fileIso2}${postfix}.xml`;
        
        const xmlContent = sitemapHeader + chunk.join('') + sitemapFooter;
        fs.writeFileSync(path.join(publicDir, sitemapName), xmlContent);
        
        sitemapIndexEntries.push(`\n  <sitemap>\n    <loc>${rootUrl}/${sitemapName}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n  </sitemap>`);
      }
      
      totalUrls += countryUrls.length;
    }
    
    // Write Sitemap Index
    const indexHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    const indexFooter = `\n</sitemapindex>`;
    const indexContent = indexHeader + sitemapIndexEntries.join('') + indexFooter;
    
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexContent);
    console.log(`Generated sitemap index sitemap.xml with ${sitemapIndexEntries.length} sitemaps and a total of ${totalUrls} URLs.`);
  }
}

generateSitemap().catch(console.error);

