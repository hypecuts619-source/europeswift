import React from 'react';
import { Link } from 'react-router-dom';

const countries = [
  { name: 'United Kingdom', slug: 'united-kingdom', code: 'GB' },
  { name: 'United States', slug: 'united-states', code: 'US' },
  { name: 'India', slug: 'india', code: 'IN' },
  { name: 'Germany', slug: 'germany', code: 'DE' }
];

export default function DirectoryHub() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '10px' }}>Global Banking Directory Hub</h1>
      </header>
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {countries.map((country) => (
            <Link key={country.slug} to={`/iban/${country.slug}`} style={{ display: 'block', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '8px', textDecoration: 'none', color: '#334155', backgroundColor: '#f8fafc' }}>
              <span style={{ marginRight: '8px', color: '#94a3b8' }}>{country.code}</span>
              {country.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
