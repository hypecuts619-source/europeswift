import { google } from 'googleapis';
import * as path from 'path';
import * as fs from 'fs';

// Explicit target channels from architecture logs
const TARGET_URLS: string[] = [
  'https://swiftcodedir.com/swift/united-kingdom',
  'https://swiftcodedir.com/swift/united-states',
  // In a full production run, this would map the dynamically generated array
  // of UK and US endpoints stuck in "Discovered - currently not indexed".
];

const SITE_URL = 'https://swiftcodedir.com/';
const CREDENTIALS_PATH = path.join(process.cwd(), 'config', 'google-credentials.json');

/**
 * Halts execution for a designated duration to prevent API rate limiting.
 * @param ms - Milliseconds to delay
 */
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Automates Google Search Console live inspection and indexing requests
 * to clear the "Discovered - currently not indexed" backlog.
 */
export async function runInspectionTelemetry() {
  console.log('[SEO Telemetry] Initializing Search Console Inspection Pipeline...');

  // 1. Authentication & Client Setup
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`[Error] Service account credential file missing at: ${CREDENTIALS_PATH}`);
    console.error('Please ensure the JSON credential file is placed in the required directory.');
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const searchconsole = google.searchconsole({
    version: 'v1',
    auth,
  });

  console.log(`[SEO Telemetry] Authenticated. Targeting property boundary: ${SITE_URL}`);
  console.log(`[SEO Telemetry] Commencing throttling execution... Queue length: ${TARGET_URLS.length}\n`);

  // 2. Throttled Inspection Execution
  for (let i = 0; i < TARGET_URLS.length; i++) {
    const targetUrl = TARGET_URLS[i];
    console.log(`[${i + 1}/${TARGET_URLS.length}] Inspecting: ${targetUrl}`);

    try {
      const response = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: targetUrl,
          siteUrl: SITE_URL,
          languageCode: 'en-US', // Optional parameter for localized parsing context
        },
      });

      // 3. Complete Output Structure
      const inspectionResult = response.data.inspectionResult;
      const coverageState = inspectionResult?.indexStatusResult?.coverageState || 'UNKNOWN';
      const robotsTxtState = inspectionResult?.indexStatusResult?.robotsTxtState || 'UNKNOWN';
      const indexingState = inspectionResult?.indexStatusResult?.indexingState || 'UNKNOWN';
      const lastCrawlTime = inspectionResult?.indexStatusResult?.lastCrawlTime || 'Never crawled';

      console.log(`  └─ Coverage State: ${coverageState}`);
      console.log(`  └─ Indexing State: ${indexingState}`);
      console.log(`  └─ Robots.txt:     ${robotsTxtState}`);
      console.log(`  └─ Last Crawled:   ${lastCrawlTime}`);
      
      if (coverageState === 'Discovered - currently not indexed') {
        console.warn(`  [!] Flagged: URL remains in discovered backlog.`);
      } else if (coverageState.includes('Indexed')) {
        console.log(`  [✅] Validated: URL is actively indexed.`);
      }

    } catch (error: any) {
      console.error(`  [X] Inspection failed: ${error.message}`);
    }

    // Apply explicit 2.5-second loop delay between external requests
    if (i < TARGET_URLS.length - 1) {
      console.log(`[SEO Telemetry] Applying 2500ms safety block delay...\n`);
      await delay(2500);
    }
  }
  
  console.log('\n[SEO Telemetry] Inspection run finalized. Check outputs to confirm "Discovered" transition rates.');
}

import { fileURLToPath } from 'url';

// Ensure the module executes logic when run directly via tsx/ts-node
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  runInspectionTelemetry()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('[SEO Telemetry] Unhandled fatal error:', error);
      process.exit(1);
    });
}
