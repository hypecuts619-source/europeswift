import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Edge Caching Optimization Engine
 * Establishing an automated Crawl Budget Defense and Indexation Telemetry Route.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const response = NextResponse.next();

  // Check if the pathway belongs to our dynamic banking directories
  const isDynamicBankingDirectory = 
    pathname.startsWith('/iban/') || 
    pathname.startsWith('/swift/') ||
    pathname.startsWith('/sort-code/');

  if (isDynamicBankingDirectory) {
    // 1. Edge Caching Optimization Engine
    // Inject standardized, highly aggressive CDN caching instructions
    response.headers.set(
      'Cache-Control',
      'public, max-age=86400, stale-while-revalidate=604800'
    );

    // 2. Core Node Validation Header Integration
    // Explicit robots processing directives ensuring rich search presentation
    response.headers.set(
      'X-Robots-Tag',
      'index, follow, max-snippet:-1, max-image-preview:large'
    );

    // 3. Automated Last-Modified tracking hooks
    // Calculating the database refresh timeline. (E.g., start of active database state)
    const now = new Date();
    // Setting last refresh point to a deterministic marker to prevent cache churn (e.g. start of today UTC)
    const lastRefresh = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    
    response.headers.set('Last-Modified', lastRefresh.toUTCString());
  }

  return response;
}

export const config = {
  // We explicitly match our deep-level dynamic variants
  matcher: [
    '/iban/:path*',
    '/swift/:path*',
    '/sort-code/:path*',
  ],
};
