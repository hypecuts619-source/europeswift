import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Global Bank Directory Hub | SwiftCodeDir',
  description: 'Instant access to manually verified SWIFT codes, BIC credentials, and local banking routing parameters across major global jurisdictions.',
};

const countries = [
  { name: 'United Kingdom', slug: 'united-kingdom', code: 'GB' },
  { name: 'United States', slug: 'united-states', code: 'US' },
  { name: 'India', slug: 'india', code: 'IN' },
  { name: 'Germany', slug: 'germany', code: 'DE' },
  { name: 'France', slug: 'france', code: 'FR' },
  { name: 'Canada', slug: 'canada', code: 'CA' },
  { name: 'Australia', slug: 'australia', code: 'AU' },
  { name: 'Netherlands', slug: 'netherlands', code: 'NL' },
  { name: 'Spain', slug: 'spain', code: 'ES' },
  { name: 'Italy', slug: 'italy', code: 'IT' },
  { name: 'Ireland', slug: 'ireland', code: 'IE' },
  { name: 'Singapore', slug: 'singapore', code: 'SG' },
  { name: 'United Arab Emirates', slug: 'united-arab-emirates', code: 'AE' },
  { name: 'Saudi Arabia', slug: 'saudi-arabia', code: 'SA' },
  { name: 'Switzerland', slug: 'switzerland', code: 'CH' },
  { name: 'Japan', slug: 'japan', code: 'JP' },
  { name: 'Hong Kong', slug: 'hong-kong', code: 'HK' },
  { name: 'New Zealand', slug: 'new-zealand', code: 'NZ' },
  { name: 'South Africa', slug: 'south-africa', code: 'ZA' },
  { name: 'Brazil', slug: 'brazil', code: 'BR' },
  { name: 'Mexico', slug: 'mexico', code: 'MX' },
  { name: 'Belgium', slug: 'belgium', code: 'BE' },
  { name: 'Austria', slug: 'austria', code: 'AT' },
  { name: 'Portugal', slug: 'portugal', code: 'PT' },
  { name: 'Poland', slug: 'poland', code: 'PL' },
  { name: 'Sweden', slug: 'sweden', code: 'SE' },
  { name: 'Norway', slug: 'norway', code: 'NO' },
  { name: 'Denmark', slug: 'denmark', code: 'DK' },
  { name: 'Finland', slug: 'finland', code: 'FI' },
  { name: 'Malaysia', slug: 'malaysia', code: 'MY' }
];

export default function DirectoryHub() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '10px' }}>Global Banking Directory Hub</h1>
        <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '800px' }}>
          Select a country routing node below to access verified IBAN validation structures, national sort codes, and dynamic SWIFT/BIC banking identifier directories.
        </p>
      </header>

      <section>
        <h2 style={{ fontSize: '1.5rem', color: '#1e3a8a', marginBottom: '20px' }}>International Routing Nodes</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '16px' 
        }}>
          {countries.map((country) => (
            <Link 
              key={country.slug} 
              href={`/iban/${country.slug}`}
              style={{
                display: 'block',
                padding: '16px',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#334155',
                fontWeight: '500',
                backgroundColor: '#f8fafc',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ marginRight: '8px', color: '#94a3b8' }}>{country.code}</span>
              {country.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
