import React from 'react';
import { ShieldCheck, Database, Calendar } from 'lucide-react';
import { SEO } from '../components/SEO';

export default function DataMethodology() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <SEO 
        title="Data Methodology | SwiftCodeDir Verification Standards" 
        description="Learn about the strict data provenance, update frequency, and verification standards used by SwiftCodeDir for global routing and SWIFT codes."
        canonicalUrl="https://swiftcodedir.com/data-methodology"
      />

      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">Data Methodology & Trust</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Our commitment to deterministic accuracy in global banking infrastructure.
        </p>
      </header>

      <section className="space-y-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Data Provenance</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            SwiftCodeDir synthesizes its data from primary authoritative sources. We cross-reference raw banking registries, central bank publications, and international standard-setting bodies to establish a single source of truth for ISO 9362 (SWIFT/BIC) and ISO 13616 (IBAN) formats.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li>European Central Bank (ECB) registries</li>
            <li>Federal Reserve routing directories</li>
            <li>National clearing house datasets</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Verification Standards</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our Automated Authority Checker actively validates routing parameters against real-time checksum algorithms. Every SWIFT code format is validated against its country-specific ISO pattern logic. Data found to be deprecated or involved in M&A transitions is audited and flagged dynamically.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Update Frequency</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The global banking directory undergoes scheduled integrity checks to identify modified payment endpoints. Major structural changes in banking networks are typically reflected within a 48-hour refresh cycle. 
          </p>
        </div>
      </section>
    </main>
  );
}
