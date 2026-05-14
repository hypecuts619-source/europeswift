import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Building2, Search } from 'lucide-react';
import { mockBanksData } from '../../data/mockData';
import { DirectorySearch } from '../../components/DirectorySearch';
import { SEO } from '../../components/SEO';

export function BanksAtoZ() {
  // Group banks by first letter
  const groupedBanks: Record<string, any[]> = {};
  
  Object.values(mockBanksData).forEach(bank => {
    const firstLetter = bank.name.charAt(0).toUpperCase();
    if (!groupedBanks[firstLetter]) {
      groupedBanks[firstLetter] = [];
    }
    groupedBanks[firstLetter].push(bank);
  });

  // Sort letters
  const sortedLetters = Object.keys(groupedBanks).sort();

  // Sort banks within each letter
  sortedLetters.forEach(letter => {
    groupedBanks[letter].sort((a, b) => a.name.localeCompare(b.name));
  });

  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title="Global Banks A-Z Directory | SwiftCodeDir"
        description="Browse our comprehensive A-Z directory of global banks. Find SWIFT codes, branch locations, and routing information for banks worldwide."
        canonicalUrl="https://swiftcodedir.com/banks"
      />

      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-[#003399]/10 dark:bg-blue-500/10 text-[#003399] dark:text-blue-400 rounded-2xl mb-6">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-slate-50 tracking-tight">
          Global Banks <span className="text-[#003399] dark:text-blue-400">A-Z</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Browse our comprehensive directory to find bank routing details worldwide.
        </p>
        <div className="max-w-xl mx-auto">
          <DirectorySearch />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12 sticky top-4 z-10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {alphabet.map(letter => {
          const hasBanks = !!groupedBanks[letter];
          return hasBanks ? (
            <a 
              key={letter} 
              href={`#letter-${letter}`}
              className="w-10 h-10 flex items-center justify-center rounded-lg font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#003399] hover:text-[#003399] dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors shadow-sm"
            >
              {letter}
            </a>
          ) : (
            <span 
              key={letter} 
              className="w-10 h-10 flex items-center justify-center rounded-lg font-bold text-slate-400 dark:text-slate-600 opacity-50 cursor-not-allowed border border-transparent"
            >
              {letter}
            </span>
          )
        })}
      </div>

      <div className="space-y-12">
        {sortedLetters.map(letter => (
          <div key={letter} id={`letter-${letter}`} className="scroll-mt-32">
            <h2 className="text-3xl font-bold border-b-2 border-[#003399] dark:border-blue-400 pb-2 mb-6 inline-block">
              {letter}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedBanks[letter].map(bank => (
                <Link 
                  key={bank.slug}
                  to={`/swift/${bank.countrySlug}/${bank.slug}`}
                  className="group p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#003399] dark:hover:border-blue-400 transition-all shadow-sm flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5 text-slate-400 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">
                      {bank.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {bank.country}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
