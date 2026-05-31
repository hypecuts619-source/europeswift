import { Metadata } from 'next';
import Link from 'next/link';
import ibanFormatsDataJson from '../../../data/iban-formats.json';
import { Globe, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Global Bank Directory Hub | SwiftCodeDir',
  description: 'Instant structural parsing and regional parameter matrix mapping for 110+ SWIFT/BIC and IBAN compliance zones worldwide.',
  alternates: {
    canonical: 'https://swiftcodedir.com/directory-hub'
  }
};

export default async function DirectoryHubPage() {
  // Extract all distinct countries and shape the routing matrix
  const routingNodes = ibanFormatsDataJson.map(node => ({
    name: node.country,
    slug: node.country.toLowerCase().replace(/[\s_]+/g, '-')
  }));

  // Identify primary structural corridors to feature at the top
  const coreCorridorsList = ["united-kingdom", "united-states", "germany", "india"];
  
  const coreCorridors = routingNodes.filter(n => coreCorridorsList.includes(n.slug));
  const globalNodes = routingNodes.filter(n => !coreCorridorsList.includes(n.slug));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
      {/* High-Density Header Setup */}
      <div className="mb-14 relative bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden z-10 text-white">
        <div className="absolute -top-16 -right-16 p-8 opacity-5 text-slate-100 pointer-events-none">
          <Globe size={320} strokeWidth={1} />
        </div>
        <div className="relative z-20 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Comprehensive <span className="text-blue-400">Global Routing</span> Hub
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Directly access real-time formatting definitions, clearing house identifiers, and banking networks structured geographically for instant extraction.
          </p>
        </div>
      </div>

      {/* Primary Settlement Corridors */}
      <div className="mb-14">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 uppercase">
          Primary Corridors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {coreCorridors.map((node) => (
            <Link 
              key={`core-${node.slug}`} 
              href={`/iban/${node.slug}`}
              className="group flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-900 shadow-sm hover:shadow-md transition-all"
            >
              <span className="font-bold text-slate-800 dark:text-slate-100 mb-1 truncate block" title={node.name}>
                {node.name}
              </span>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-2 flex items-center group-hover:translate-x-1 transition-transform">
                Enter Node
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* High-Density Global Matrix */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 uppercase">
          Full International Matrix
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-3">
          {globalNodes.map((node) => (
            <Link 
              key={`global-${node.slug}`} 
              href={`/iban/${node.slug}`}
              className="group flex items-center py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
            >
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate w-full" title={node.name}>
                {node.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
