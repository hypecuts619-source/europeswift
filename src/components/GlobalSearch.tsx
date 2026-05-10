import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { countriesData, mockBanksData } from '../data/mockData';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [liveBics, setLiveBics] = useState<any[]>([]);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = searchQuery 
    ? countriesData.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const filteredTopBanks = searchQuery && searchQuery.length > 2
    ? Object.values(mockBanksData).filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        b.bic.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  useEffect(() => {
    async function fetchBics() {
      if (!searchQuery || searchQuery.length < 4) {
        setLiveBics([]);
        return;
      }
      
      const upperQuery = searchQuery.toUpperCase();
      // Only do a firebase lookup if the query looks like a partial BIC (no spaces and mostly letters/numbers)
      if (/^[A-Z0-9]{4,}$/.test(upperQuery)) {
        try {
          const q = query(
             collection(db, 'swiftCodes'),
             where('bic', '>=', upperQuery),
             where('bic', '<=', upperQuery + '\uf8ff'),
             limit(6)
          );
          const snap = await getDocs(q);
          setLiveBics(snap.docs.map(doc => doc.data()));
        } catch (e: any) {
          if (e?.message?.includes('Quota exceeded')) {
            console.warn("Firebase Quota exceeded for GlobalSearch");
          } else {
            console.error("Firebase search error", e);
          }
        }
      } else {
        setLiveBics([]);
      }
    }
    
    const timeout = setTimeout(fetchBics, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const hasResults = filteredCountries.length > 0 || filteredTopBanks.length > 0 || liveBics.length > 0;

  return (
    <div ref={wrapperRef} className="relative hidden md:block w-full max-w-md xl:max-w-lg mx-4 group z-50">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500 group-focus-within:text-[#003399] transition-colors" />
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search countries, banks, or BICs (e.g. CHASUS)..."
        className="pl-9 pr-12 h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-1 focus-visible:ring-[#003399] dark:focus-visible:ring-blue-400 dark:text-slate-200 text-sm transition-all shadow-sm"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
          }
        }}
      />
      <div className="absolute right-2 top-1.5 hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] text-slate-400 font-medium pointer-events-none">
        <span className="text-[8px]">⌘</span>K
      </div>
      {isOpen && searchQuery && hasResults && (
        <div className="absolute top-11 left-0 w-80 lg:w-96 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-50 overflow-hidden max-h-[80vh] overflow-y-auto">
          {filteredCountries.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Countries</div>
              {filteredCountries.map(c => (
                <button
                  key={c.code}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md flex items-center justify-between group transition-colors"
                  onClick={() => {
                    navigate(`/swift/${c.slug}`);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{c.flag}</span>
                    <span className="text-slate-900 dark:text-slate-100 font-medium">{c.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono group-hover:text-blue-500">{c.code}</span>
                </button>
              ))}
            </div>
          )}

          {filteredTopBanks.length > 0 && (
            <div className="p-2 border-t border-slate-100 dark:border-slate-800">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Top Banks</div>
              {filteredTopBanks.map(b => (
                <button
                  key={b.bic}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md flex flex-col group transition-colors"
                  onClick={() => {
                    navigate(`/swift/${b.countrySlug}/${b.slug}`);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-slate-900 dark:text-slate-100 font-medium truncate pr-2">{b.name}</span>
                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded shrink-0">{b.bic}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5">{b.country} • {b.headquarters}</span>
                </button>
              ))}
            </div>
          )}

          {liveBics.length > 0 && (
            <div className="p-2 border-t border-slate-100 dark:border-slate-800">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Live Database Codes</div>
              {liveBics.map(b => (
                <button
                  key={b.bic}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md flex flex-col group transition-colors"
                  onClick={() => {
                    const country = countriesData.find(c => c.code === b.country);
                    const countrySlug = country ? country.slug : b.country.toLowerCase();
                    const bankSlug = b.bank.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    navigate(`/swift/${countrySlug}/${bankSlug}`);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-slate-900 dark:text-slate-100 font-medium truncate pr-2">{b.bank}</span>
                    <span className="text-[10px] font-mono font-bold text-[#003399] dark:text-blue-400">{b.bic}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{b.city ? b.city + ',' : ''} {b.country}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {isOpen && searchQuery && !hasResults && (
        <div className="absolute top-11 left-0 w-80 lg:w-96 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-50 p-8 text-center">
          <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-900 dark:text-slate-200 mb-1">No results found</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">We couldn't find anything for "{searchQuery}". Try a different term or BIC code.</p>
        </div>
      )}
    </div>
  );
}
