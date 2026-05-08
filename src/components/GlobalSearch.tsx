import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { countriesData, mockBanksData } from '../data/mockData';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = query 
    ? countriesData.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) || 
        c.code.toLowerCase().includes(query.toLowerCase()) ||
        c.slug.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const filteredBanks = query && query.length > 2
    ? Object.values(mockBanksData).filter(b => 
        b.name.toLowerCase().includes(query.toLowerCase()) || 
        b.bic.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : [];

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

  return (
    <div ref={wrapperRef} className="relative hidden md:block w-full max-w-md xl:max-w-lg mx-4 group">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500 group-focus-within:text-[#003399] transition-colors" />
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search countries, banks, or BICs..."
        className="pl-9 pr-12 h-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-1 focus-visible:ring-[#003399] dark:focus-visible:ring-blue-400 dark:text-slate-200 text-sm transition-all shadow-sm"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
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
      {isOpen && query && (filteredCountries.length > 0 || filteredBanks.length > 0) && (
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
                    setQuery('');
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

          {filteredBanks.length > 0 && (
            <div className="p-2 border-t border-slate-100 dark:border-slate-800">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Banks & BICs</div>
              {filteredBanks.map(b => (
                <button
                  key={b.bic}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md flex flex-col group transition-colors"
                  onClick={() => {
                    navigate(`/swift/${b.countrySlug}/${b.slug}`);
                    setIsOpen(false);
                    setQuery('');
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
        </div>
      )}
      {isOpen && query && filteredCountries.length === 0 && filteredBanks.length === 0 && (
        <div className="absolute top-11 left-0 w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-50 p-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
