import fs from 'fs';
import path from 'path';
import { blogPosts } from './src/data/blogPosts';

const MAX_URLS_PER_SITEMAP = 40000;

async function generateSitemap() {
  const rootUrl = 'https://swiftcodedir.com';
  const publicDir = path.join(process.cwd(), 'public');
  const countriesDataDir = path.join(publicDir, 'data', 'countries');
  const ibanFormatsFile = path.join(process.cwd(), 'src', 'data', 'iban-formats.json');
  
  const urls: {loc: string, priority: string, changefreq: string}[] = [];

  const addUrl = (loc: string, priority: string, changefreq: string) => {
    urls.push({ loc, priority, changefreq });
  };

  // Static URLs
  addUrl(`${rootUrl}/`, '1.0', 'daily');
  addUrl(`${rootUrl}/swift`, '0.8', 'weekly');
  addUrl(`${rootUrl}/swift-checker`, '0.9', 'weekly');
  addUrl(`${rootUrl}/iban`, '0.8', 'weekly');
  addUrl(`${rootUrl}/iban/validator`, '0.9', 'weekly');
  addUrl(`${rootUrl}/iban/calculator`, '0.9', 'weekly');
  addUrl(`${rootUrl}/iban/complete-coverage`, '0.9', 'weekly');
  addUrl(`${rootUrl}/iban/europe`, '0.8', 'weekly');
  addUrl(`${rootUrl}/iban/middle-east`, '0.8', 'weekly');
  addUrl(`${rootUrl}/iban/africa`, '0.8', 'weekly');
  addUrl(`${rootUrl}/iban/caribbean`, '0.8', 'weekly');
  addUrl(`${rootUrl}/iban/americas`, '0.8', 'weekly');
  addUrl(`${rootUrl}/iban/asia`, '0.8', 'weekly');
  
  // Dynamic IBAN country URLs
  if (fs.existsSync(ibanFormatsFile)) {
    const ibanData = JSON.parse(fs.readFileSync(ibanFormatsFile, 'utf8'));
    for (const item of ibanData) {
      if (item.country) {
        const slug = item.country.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
        // Give 0.9 to new territories, 0.8 to the rest. The new territories are AX, GF, GP, MF, MQ, NC, PF, PM, RE, TF, WF, YT, RU, LC.
        let priority = '0.8';
        if (['AX', 'GF', 'GP', 'MF', 'MQ', 'NC', 'PF', 'PM', 'RE', 'TF', 'WF', 'YT', 'RU', 'LC'].includes(item.code)) {
          priority = '0.9';
        }
        addUrl(`${rootUrl}/iban/${slug}`, priority, 'weekly');
      }
    }
  }

  addUrl(`${rootUrl}/sort-code`, '0.8', 'weekly');
  addUrl(`${rootUrl}/blz`, '0.8', 'weekly');
  
  if (fs.existsSync(countriesDataDir)) {
    const files = fs.readdirSync(countriesDataDir).filter(f => f.endsWith('.json') && !f.endsWith('_branches.json'));
    console.log(`Found ${files.length} country files...`);
    
    for (const file of files) {
      let countryData;
      try {
        countryData = JSON.parse(fs.readFileSync(path.join(countriesDataDir, file), 'utf8'));
      } catch (e) {
        console.error(`Error parsing ${file}:`, e);
        continue;
      }
      const countrySlug = file.replace('.json', ''); // e.g. "us"
      
      // Add country page
      addUrl(`${rootUrl}/swift/${countrySlug}`, '0.7', 'weekly');
      
      // Add branch list page
      addUrl(`${rootUrl}/swift/${countrySlug}/branches`, '0.7', 'monthly');
      
      const banks = countryData.banks || [];
      const bankDetails = countryData.bankDetails || {};
      
      for (const bank of banks) {
        addUrl(`${rootUrl}/swift/${countrySlug}/${bank.slug}`, '0.6', 'monthly');
        
        // Add individual branches for each bank
        const details = bankDetails[bank.slug];
        if (details && Array.isArray(details.branches)) {
          for (const branch of details.branches) {
            // Skip adding the branch URL if it's likely the same as the head office / bank overview
            // We consider it a "branch" only if it's not the primary BIC of the bank
            // and doesn't just end in XXX (or is 8 chars) which usually maps to the main office.
            if (branch.bic && branch.bic !== bank.primaryBic && !branch.bic.endsWith('XXX') && branch.bic.length === 11) {
              addUrl(`${rootUrl}/swift/${countrySlug}/${bank.slug}/${branch.bic}`, '0.4', 'monthly');
            }
          }
        }
      }
    }
  }

  // Fallback for guides
  const staticGuides = [
    '/sitemap', '/about-us', '/privacy-policy', '/terms-and-conditions', 
    '/what-is-a-swift-code', '/what-is-an-iban', '/swift-vs-iban', '/sepa-transfer-guide', '/banking-statistics'
  ];
  for (const guide of staticGuides) {
    addUrl(`${rootUrl}${guide}`, '0.5', 'monthly');
  }

  // Blog Posts
  addUrl(`${rootUrl}/blog`, '0.8', 'weekly');
  for (const post of blogPosts) {
    addUrl(`${rootUrl}/blog/${post.slug}`, '0.7', 'monthly');
  }

  // Partition URLs into chunks
  const chunks = [];
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
    chunks.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP));
  }

  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const sitemapFooter = `\n</urlset>`;

  if (chunks.length === 1) {
    // Write just sitemap.xml
    let xmlContent = sitemapHeader;
    for (const url of chunks[0]) {
      xmlContent += `\n  <url>\n    <loc>${url.loc}</loc>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`;
    }
    xmlContent += sitemapFooter;
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xmlContent);
    console.log(`Generated sitemap.xml with ${urls.length} URLs`);
  } else {
    // Write chunks and a sitemap index
    const indexHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    const indexFooter = `\n</sitemapindex>`;
    let indexContent = indexHeader;

    for (let i = 0; i < chunks.length; i++) {
        const chunkUrls = chunks[i];
        let xmlContent = sitemapHeader;
        for (const url of chunkUrls) {
          xmlContent += `\n  <url>\n    <loc>${url.loc}</loc>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`;
        }
        xmlContent += sitemapFooter;
        const sitemapName = `sitemap-${i + 1}.xml`;
        fs.writeFileSync(path.join(publicDir, sitemapName), xmlContent);
        
        indexContent += `\n  <sitemap>\n    <loc>${rootUrl}/${sitemapName}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n  </sitemap>`;
    }
    indexContent += indexFooter;
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexContent);
    console.log(`Generated sitemap index sitemap.xml and ${chunks.length} child sitemaps with a total of ${urls.length} URLs`);
  }
}

generateSitemap().catch(console.error);
