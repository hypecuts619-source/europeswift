import { MetadataRoute } from 'next';

const BASE_URL = 'https://swiftcodedir.com';
const TOTAL_BANK_RECORDS = 186000;
const RECORDS_PER_CHUNK = 45000;

/**
 * Dynamic Sitemap Generator
 * Evaluates the total volume of database records and breaks them down into
 * indexable chunks staying strictly under search engine crawl capacity bounds (50,000 URLs).
 */
export async function generateSitemaps() {
  const dataChunksCount = Math.ceil(TOTAL_BANK_RECORDS / RECORDS_PER_CHUNK);
  const sitemaps = [{ id: 0 }]; // ID 0 is strictly reserved for Core Hubs & Informational Pillars
  
  for (let i = 0; i < dataChunksCount; i++) {
    sitemaps.push({ id: i + 1 });
  }
  
  return sitemaps;
}

/**
 * Streamed Memory-Safe Execution Array
 * Resolves massive endpoint arrays dynamically by fetching specific offset/limit blocks
 * to prevent V8 memory crashing during server-side build times.
 */
export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const sitemapData: MetadataRoute.Sitemap = [];

  // ---------------------------------------------------------------------------
  // Index ID 0: Core Organizational Hubs & Informational Content
  // ---------------------------------------------------------------------------
  if (id === 0) {
    const coreRoutes = [
      '',
      '/iban',
      '/sort-code',
      '/iban/calculator',
      '/swift'
    ];

    for (const route of coreRoutes) {
      sitemapData.push({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      });
    }

    const blogGuides = [
      '/blog/swift-wire-transfer-fees',
      '/blog/iban-validation-rules',
      '/blog/intermediary-bank-routing-logic'
    ];

    for (const blog of blogGuides) {
      sitemapData.push({
        url: `${BASE_URL}${blog}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    return sitemapData;
  }

  // ---------------------------------------------------------------------------
  // Index ID 1..N: High-Volume Programmatic Verification Nodes
  // ---------------------------------------------------------------------------
  const chunkIndex = id - 1; 
  const offset = chunkIndex * RECORDS_PER_CHUNK;
  const limit = Math.min(RECORDS_PER_CHUNK, TOTAL_BANK_RECORDS - offset);

  // Example database array representations for geographic structuring
  const priorityCountries = [
    'united-kingdom', 'united-states', 'india', 'france', 
    'germany', 'netherlands', 'canada', 'saint-lucia'
  ];

  // Attach priority country pathway index nodes exclusively on the first programmatic chunk
  if (id === 1) {
    for (const country of priorityCountries) {
      sitemapData.push({
        url: `${BASE_URL}/iban/${country}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
      sitemapData.push({
        url: `${BASE_URL}/swift/${country}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  // Programmatic scaling loop fetching and returning deterministic XML nodes
  // In a production context, this block iteratively maps a real DB cursor limit/offset array.
  for (let i = 0; i < limit; i++) {
    const recordIndex = offset + i;
    const associatedCountry = priorityCountries[recordIndex % priorityCountries.length];
    const generatedBankSlug = `swift-routing-node-${recordIndex}`;
    
    sitemapData.push({
      url: `${BASE_URL}/swift/${associatedCountry}/${generatedBankSlug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  }

  return sitemapData;
}
