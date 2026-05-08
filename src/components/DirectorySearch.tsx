import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { countriesData, mockBanksData } from '../data/mockData';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function DirectorySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [liveBics, setLiveBics] = useState<any[]>([]);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

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
        } catch (e) {
          console.error("Firebase search error", e);
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hasResults = filteredCountries.length > 0 || filteredTopBanks.length > 0 || liveBics.length > 0;

  return (
    <div ref={wrapperRef} className="relative w-full group z-[60]">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#003399] transition-colors" />
        <Input
          type="text"
          placeholder="Search countries, banks, or SWIFT codes..."
          className="pl-12 h-14 text-lg bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 focus-visible:ring-[#003399] dark:text-slate-100 transition-all shadow-sm rounded-xl"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
          }}
        />
      </div>

      {isOpen && searchQuery && hasResults && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[60vh] overflow-y-auto">
          {filteredCountries.length > 0 && (
            <div className="p-2">
              <div className="px-4 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Countries</div>
              {filteredCountries.map(c => (
                <button
                  key={c.code}
                  className="w-full text-left px-4 py-3 text-base justify-between hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex items-center group transition-colors"
                  onClick={() => {
                    navigate(`/swift/${c.slug}`);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-slate-900 dark:text-slate-100 font-medium">{c.name}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono group-hover:text-[#003399]">{c.code}</span>
                </button>
              ))}
            </div>
          )}

          {filteredTopBanks.length > 0 && (
            <div className="p-2 border-t border-slate-100 dark:border-slate-800">
              <div className="px-4 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Popular Banks</div>
              {filteredTopBanks.map(b => (
                <button
                  key={b.bic}
                  className="w-full text-left px-4 py-3 text-base hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex flex-col group transition-colors"
                  onClick={() => {
                    navigate(`/swift/${b.countrySlug}/${b.slug}`);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-slate-900 dark:text-slate-100 font-medium truncate pr-2">{b.name}</span>
                    <span className="text-xs font-mono text-[#003399] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded shrink-0">{b.bic}</span>
                  </div>
                  <span className="text-sm text-slate-500 mt-1">{b.country} • {b.headquarters}</span>
                </button>
              ))}
            </div>
          )}

          {liveBics.length > 0 && (
            <div className="p-2 border-t border-slate-100 dark:border-slate-800">
              <div className="px-4 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Verified Directory Data</div>
              {liveBics.map(b => (
                <button
                  key={b.bic}
                  className="w-full text-left px-4 py-3 text-base hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex flex-col group transition-colors"
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
                    <span className="text-xs font-mono font-bold text-[#003399] dark:text-blue-400">{b.bic}</span>
                  </div>
                  <span className="text-sm text-slate-500">{b.city ? b.city + ',' : ''} {b.country}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {isOpen && searchQuery && !hasResults && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 p-8 text-center">
          <p className="text-lg text-slate-500 dark:text-slate-400">No results found for "{searchQuery}"</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">Try searching for a country name, bank name, or BIC code.</p>
        </div>
      )}
    </div>
  );
}
