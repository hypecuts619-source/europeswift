import fs from 'fs';
import path from 'path';
import { blogPosts } from '../src/data/blogPosts';

const INDEXNOW_KEY = '3c8f1e58a2d44b55928d1502476e316a';
const HOST = 'swiftcodedir.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const BATCH_SIZE = 10000;

async function collectAllUrls(): Promise<string[]> {
  const rootUrl = `https://${HOST}`;
  const urls = new Set<string>();
  const publicDir = path.join(process.cwd(), 'public');
  const countriesDataDir = path.join(publicDir, 'data', 'countries');
  const ibanFormatsFile = path.join(process.cwd(), 'src', 'data', 'iban-formats.json');

  // Static URLs
  urls.add(`${rootUrl}/`);
  urls.add(`${rootUrl}/swift`);
  urls.add(`${rootUrl}/swift-checker`);
  urls.add(`${rootUrl}/iban`);
  urls.add(`${rootUrl}/iban/validator`);
  urls.add(`${rootUrl}/iban/calculator`);
  urls.add(`${rootUrl}/iban/complete-coverage`);
  urls.add(`${rootUrl}/iban/europe`);
  urls.add(`${rootUrl}/iban/middle-east`);
  urls.add(`${rootUrl}/iban/africa`);
  urls.add(`${rootUrl}/iban/caribbean`);
  urls.add(`${rootUrl}/iban/americas`);
  urls.add(`${rootUrl}/iban/asia-pacific`);
  urls.add(`${rootUrl}/routing-number`);
  urls.add(`${rootUrl}/banks`);
  urls.add(`${rootUrl}/blog`);
  urls.add(`${rootUrl}/about`);
  urls.add(`${rootUrl}/privacy`);
  urls.add(`${rootUrl}/terms`);
  urls.add(`${rootUrl}/contact`);

  // Blog posts
  for (const post of blogPosts) {
    urls.add(`${rootUrl}/blog/${post.slug.toLowerCase()}`);
  }

  // Load countries map
  const countriesFile = path.join(process.cwd(), 'src', 'data', 'countries.json');
  const iso2ToSlugMap: Record<string, string> = {};
  if (fs.existsSync(countriesFile)) {
    const countriesData = JSON.parse(fs.readFileSync(countriesFile, 'utf8'));
    for (const c of countriesData) {
      if (c.code && c.slug) {
        iso2ToSlugMap[c.code.toLowerCase()] = c.slug.toLowerCase();
      }
    }
  }

  // Load IBAN map
  const iso2ToIbanSlug: Record<string, string> = {};
  if (fs.existsSync(ibanFormatsFile)) {
    const ibanData = JSON.parse(fs.readFileSync(ibanFormatsFile, 'utf8'));
    for (const item of ibanData) {
      if (item.country && item.code) {
        const slug = item.country.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
        iso2ToIbanSlug[item.code.toLowerCase()] = slug;
      }
    }
  }

  // Collect country, bank, and branch URLs
  if (fs.existsSync(countriesDataDir)) {
    const files = fs.readdirSync(countriesDataDir).filter(f => f.endsWith('.json') && !f.endsWith('_branches.json'));
    console.log(`Found ${files.length} country data files...`);

    for (const file of files) {
      const fileIso2 = file.replace('.json', '').toLowerCase();
      const countrySlug = (iso2ToSlugMap[fileIso2] || fileIso2).toLowerCase();

      urls.add(`${rootUrl}/swift/${countrySlug}`);
      urls.add(`${rootUrl}/swift/${countrySlug}/branches`);

      if (iso2ToIbanSlug[fileIso2]) {
        urls.add(`${rootUrl}/iban/${iso2ToIbanSlug[fileIso2]}`);
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
        if (!bank || !bank.slug) continue;
        const cleanBankSlug = bank.slug.toLowerCase().replace(/-+/g, '-').replace(/-$/, '');
        urls.add(`${rootUrl}/swift/${countrySlug}/${cleanBankSlug}`);

        const details = countryData.bankDetails?.[bank.slug] || countryData.bankDetails?.[cleanBankSlug];
        if (details && Array.isArray(details.branches)) {
          if (details.branches.length > 1) {
            for (const branch of details.branches) {
              if (branch && branch.bic) {
                urls.add(`${rootUrl}/swift/${countrySlug}/${cleanBankSlug}/${branch.bic.toLowerCase()}`);
              }
            }
          }
        }
      }
    }
  }

  return Array.from(urls);
}

async function submitIndexNowBatch(urlList: string[], batchNumber: number, totalBatches: number) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  console.log(`Submitting batch ${batchNumber}/${totalBatches} (${urlList.length} URLs) to IndexNow endpoint...`);

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      console.log(`✓ Batch ${batchNumber}/${totalBatches} submitted successfully! (Status: ${res.status})`);
    } else {
      const text = await res.text();
      console.warn(`! Batch ${batchNumber} returned HTTP ${res.status}: ${text}`);
    }
  } catch (err) {
    console.error(`Failed to submit batch ${batchNumber}:`, err);
  }
}

async function main() {
  console.log('--- SwiftCodeDir IndexNow Bulk Dispatcher ---');
  const allUrls = await collectAllUrls();
  console.log(`Total URLs to submit: ${allUrls.length}`);

  const totalBatches = Math.ceil(allUrls.length / BATCH_SIZE);

  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const chunk = allUrls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    await submitIndexNowBatch(chunk, batchNum, totalBatches);
    // Small delay between batch calls
    await new Promise(r => setTimeout(r, 1200));
  }

  console.log('--- IndexNow submission complete ---');
}

main().catch(err => {
  console.error('Error running submit-indexnow:', err);
  process.exit(1);
});
