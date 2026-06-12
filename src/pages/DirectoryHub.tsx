import React from 'react';
import { Link } from 'react-router-dom';
import { Network, Database, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

const countries = [
  { name: 'United Kingdom', slug: 'united-kingdom', code: 'GB', branches: 12450 },
  { name: 'United States', slug: 'united-states', code: 'US', branches: 18500 },
  { name: 'India', slug: 'india', code: 'IN', branches: 5432 },
  { name: 'Germany', slug: 'germany', code: 'DE', branches: 16842 },
  { name: 'France', slug: 'france', code: 'FR', branches: 14209 },
  { name: 'Italy', slug: 'italy', code: 'IT', branches: 9112 },
  { name: 'Switzerland', slug: 'switzerland', code: 'CH', branches: 4102 }
];

export default function DirectoryHub() {
  const totalCodes = countries.reduce((acc, curr) => acc + curr.branches, 0);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title="Global SWIFT & Banking Directory Hub | SwiftCodeDir" 
        description="Access verified SWIFT codes, BICs, and routing details for global financial institutions. A structured directory for cross-border banking."
      />
      
      <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">Global Banking Data Hub</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          The definitive open directory of international financial routing parameters, empowering deterministic cross-border payments.
        </p>
      </header>

      {/* Dynamic Information Gain Stats (AEO Optimization) */}
      <section className="mb-12 bg-[#003399]/5 dark:bg-blue-900/10 border border-[#003399]/20 dark:border-blue-800/30 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#003399] dark:text-blue-400 mb-2">
              <Database className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-wider text-sm">Directory Live Metrics</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Currently indexing <strong className="text-lg text-slate-900 dark:text-white">90,000+</strong> verified SWIFT lines and <strong className="text-lg text-slate-900 dark:text-white">186,000+</strong> routing credentials globally. Data structured accurately for human and AI verification.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center min-w-[120px] shadow-sm">
              <div className="text-2xl font-black text-[#003399] dark:text-blue-400">{totalCodes.toLocaleString()}+</div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Tracked Nodes</div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/30 text-center min-w-[120px] shadow-sm">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">48h</div>
              <div className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-500">Refresh Cycle</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countries.map((country) => (
            <Link 
              key={country.slug} 
              to={`/swift/${country.slug}`} 
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-[#003399] dark:hover:border-blue-600 hover:shadow-md transition-all group"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">
                  {country.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                  {country.branches.toLocaleString()} BANKS
                </span>
              </div>
              <Network className="w-4 h-4 text-slate-300 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
