import cron from 'node-cron';
import * as fs from 'fs';
import * as path from 'path';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';

const STATE_FILE_PATH = path.join(process.cwd(), 'config', 'indexing-state.json');
const LOGS_DIR = path.join(process.cwd(), 'logs');
const CANONICAL_FAILURES_LOG = path.join(LOGS_DIR, 'canonical-failures.txt');
const CREDENTIALS_PATH = path.join(process.cwd(), 'config', 'google-credentials.json');
const SITE_URL = 'https://swiftcodedir.com/';

const DAILY_QUOTA_LIMIT = 1900;
const BATCH_SIZE = 300;

interface IndexingState {
  lastResetDate: string;
  dailyCount: number;
}

/**
 * Halts execution for a designated duration to prevent API rate limiting.
 */
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulates a database extraction queue that pulls explicitly 300
 * unindexed structural pages focusing on US and UK high-impression nodes.
 */
async function getUnindexedUrlsBatch(limit: number): Promise<string[]> {
  // In a robust application, this connects to Prisma/PostgreSQL to pull records where indexed = false
  const mockUrls: string[] = [];
  for (let i = 0; i < limit; i++) {
    const country = i % 2 === 0 ? 'united-kingdom' : 'united-states';
    mockUrls.push(`${SITE_URL}swift/${country}/bank-routing-node-verify-${Date.now()}-${i}`);
  }
  return mockUrls;
}

/**
 * Simulates updating the core database once Google confirms indexation coverage.
 */
async function markUrlAsIndexed(url: string): Promise<void> {
  // e.g., await db.pages.update({ where: { url }, data: { indexed: true } })
  console.log(`  [✅] DB SYNCHRONIZED: Successfully marked as indexed in database -> ${url}`);
}

/**
 * Reads the current daily request tally from standard file storage.
 */
function getState(): IndexingState {
  if (!fs.existsSync(STATE_FILE_PATH)) {
    return { lastResetDate: new Date().toISOString().split('T')[0], dailyCount: 0 };
  }
  try {
    const rawData = fs.readFileSync(STATE_FILE_PATH, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('[State Error] Failed to parse indexing-state.json:', error);
    return { lastResetDate: new Date().toISOString().split('T')[0], dailyCount: 0 };
  }
}

/**
 * Persists the current inspection tally.
 */
function saveState(state: IndexingState): void {
  const dir = path.dirname(STATE_FILE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STATE_FILE_PATH, JSON.stringify(state, null, 2), 'utf-8');
}

/**
 * Tracks and logs any URLs returning duplicate canonical penalty flags.
 */
function logCanonicalFailure(url: string, coverageState: string): void {
  if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true });
  const logBlock = `[${new Date().toISOString()}] URL: ${url} | State: ${coverageState}\n`;
  fs.appendFileSync(CANONICAL_FAILURES_LOG, logBlock, 'utf-8');
}

/**
 * Core Batch Engine Processing Logic
 */
async function processBatch() {
  console.log('\n[Cron Engine] Starting scheduled indexation batch process.');

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`[Fatal Constraint] Service account credentials missing at: ${CREDENTIALS_PATH}`);
    console.error(`Cannot continue automation runs without authentication configuration.`);
    return;
  }

  let state = getState();
  const currentDate = new Date().toISOString().split('T')[0];

  // Safely enforce rolling 24-hour reset windows
  if (state.lastResetDate !== currentDate) {
    state = { lastResetDate: currentDate, dailyCount: 0 };
    saveState(state);
    console.log(`[State Tracker] Transferred to new 24h window. Reset quota remaining: ${DAILY_QUOTA_LIMIT}`);
  }

  // Check Quota Ceiling State
  if (state.dailyCount >= DAILY_QUOTA_LIMIT) {
    console.warn(`[Cool Down Engaged] Reached max permitted boundary of ${DAILY_QUOTA_LIMIT} today.`);
    console.warn(`Suspending search console runs until the next daily window reset to preserve API health.`);
    return;
  }

  const urlsToProcess = await getUnindexedUrlsBatch(BATCH_SIZE);
  console.log(`[DB Extraction] Loaded ${urlsToProcess.length} URLs for continuous processing.`);

  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  for (let i = 0; i < urlsToProcess.length; i++) {
    // Real-time secondary safeguard checking current count bounds
    state = getState();
    if (state.dailyCount >= DAILY_QUOTA_LIMIT) {
      console.warn(`[Cool Down Engaged] Tripped 1,900 threshold ceiling mid-process. Halting loop instantly.`);
      break;
    }

    const targetUrl = urlsToProcess[i];
    console.log(`\n[Queue Pos: ${i + 1}/${urlsToProcess.length} | Quota Used: ${state.dailyCount}/${DAILY_QUOTA_LIMIT}] Inspecting: ${targetUrl}`);

    try {
      const response = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: targetUrl,
          siteUrl: SITE_URL,
          languageCode: 'en-US',
        },
      });

      // Increment tracking telemetry explicitly post API hit
      state.dailyCount += 1;
      saveState(state);

      const inspectionResult = response.data.inspectionResult;
      const coverageState = inspectionResult?.indexStatusResult?.coverageState || 'UNKNOWN';

      if (coverageState.toLowerCase().includes('indexed')) {
        await markUrlAsIndexed(targetUrl);
      } else if (
        coverageState.includes('Duplicate without user-selected canonical') ||
        coverageState === 'DUPLICATE_WITHOUT_USER_SELECTED_CANONICAL'
      ) {
        console.warn(`  [🚨 CANONICAL VIOLATION] Canonical override failed for URL. Routing to failure log.`);
        logCanonicalFailure(targetUrl, coverageState);
      } else {
        console.log(`  └─ Current Return Parameter: ${coverageState}`);
      }

    } catch (error: any) {
      console.error(`  [X] HTTP Exception resolving URL ${targetUrl}: ${error.message}`);
    }

    // Required defensive pacing limit resolving 2.5sec minimum latency
    if (i < urlsToProcess.length - 1) {
      await delay(2500);
    }
  }

  console.log('[Cron Engine] Systematic indexation sweep concluded safely.');
}

/**
 * Initializes continuous background execution engine.
 */
export function startScheduler() {
  console.log('[System Boot] Generating node-cron architectural framework.');
  console.log('[System Boot] Pipeline activated: Cycling telemetry block exactly every 4 hours (0 */4 * * *)');

  cron.schedule('0 */4 * * *', async () => {
    try {
      await processBatch();
    } catch (error: any) {
      console.error('[Critical Engine Failure] Root cron block panicked limits:', error.message);
    }
  });
}

// Bind to explicit Node execution triggers if invoked directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  startScheduler();
  
  // Instigate immediate primary run to validate node environments on activation
  console.log('[System Boot] Initializing primary boot batch immediately...\n');
  processBatch().catch(console.error);
}
