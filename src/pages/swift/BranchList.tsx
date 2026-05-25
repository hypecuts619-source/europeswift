import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Building2, MapPin, Globe, ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { countriesData } from '../../data/mockData';
import { SEO } from '../../components/SEO';

export interface SwiftCodeDoc {
  bic: string;
  bank: string;
  branch?: string;
  city?: string;
  country: string;
  address?: string;
}

export function BranchList() {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [allBranches, setAllBranches] = useState<SwiftCodeDoc[]>([]);
  const [loading, setLoading] = useState(true);

  let country = countriesData.find(c => c.slug === countrySlug);
  if (!country && countrySlug) {
    country = countriesData.find(c => c.code.toLowerCase() === countrySlug.toLowerCase());
  }

  useEffect(() => {
    if (country?.code) {
      setLoading(true);
      fetch(`/data/countries/${country.code.toLowerCase()}_branches.json`)
        .then(res => {
          if (!res.ok) throw new Error('Data not found');
          return res.json();
        })
        .then(data => {
          if (data && Array.isArray(data.branches)) {
            setAllBranches(data.branches);
          } else {
            setAllBranches([]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load branches data:", err);
          setAllBranches([]);
          setLoading(false);
        });
    }
  }, [country]);

  if (!country) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Country not found</h1>
        <Link to="/swift" className="text-[#003399] hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to countries
        </Link>
      </div>
    );
  }

  const filteredBranches = allBranches.filter((b) => {
    const term = searchQuery.toLowerCase();
    return (
      (b.branch && b.branch.toLowerCase().includes(term)) ||
      b.bic.toLowerCase().includes(term) ||
      (b.city && b.city.toLowerCase().includes(term)) ||
      (b.bank && b.bank.toLowerCase().includes(term)) ||
      (b.address && b.address.toLowerCase().includes(term))
    );
  });

  // Rough estimation of unique banks
  const uniqueBanksCount = new Set(allBranches.map(b => b.bank)).size;

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${country.name} Bank Branches Dataset`,
    "description": `Complete directory of all bank branches in ${country.name} with their respective SWIFT/BIC codes and addresses.`,
    "url": `https://swiftcodedir.com/swift/${countrySlug}/branches`,
    "creator": {
      "@type": "Organization",
      "name": "SwiftCodeDir"
    },
    "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    "isAccessibleForFree": true
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How do I find a specific branch SWIFT code in ${country.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can use the search bar above to filter all ${allBranches.length} branches in ${country.name} by city or branch name.`
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title={`${country.name} Bank Branches SWIFT/BIC Codes & Routing Data`}
        description={`Explore all ${allBranches.length} bank branches in ${country.name}. Find exact SWIFT codes, branch addresses, and routing numbers required for secure wire transfers.`}
        canonicalUrl={`https://swiftcodedir.com/swift/${country.slug.toLowerCase()}/branches`}
        jsonLd={[datasetSchema, faqSchema]}
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/swift">SWIFT Codes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/swift/${country.slug}`}>{country.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Branches</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{country.flag}</span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight dark:text-white">
              Bank Branches in {country.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {loading ? 'Loading branches...' : `Complete list of ${allBranches.length} bank branches and their SWIFT/BIC codes`}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-10">
        <div className="space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#003399] transition-colors" />
            <Input 
              placeholder="Search by branch name, city, bank, or SWIFT code..." 
              className="pl-12 h-14 text-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 shadow-sm focus:ring-[#003399] rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && !loading && (
               <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                 {filteredBranches.length} results
               </div>
            )}
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="py-12 text-center text-slate-500">Loading from database...</div>
            ) : filteredBranches.length > 0 ? (
              filteredBranches.map((branch, idx) => (
                <Card key={`${branch.bic}-${idx}`} className="overflow-hidden hover:border-[#003399]/30 transition-all group border-slate-200 dark:border-slate-800">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[1fr_auto] items-center">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                             {branch.bank}
                           </span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                             {branch.city || 'Head Office'}
                           </span>
                           <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded ml-auto sm:ml-0">
                             <CheckCircle2 className="w-3 h-3" />
                             SEPA
                           </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#003399] transition-colors">
                          {branch.branch || branch.bank}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span>{branch.address ? `${branch.address}, ` : ''}{branch.city || ''}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:border-l border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center md:items-end min-w-[200px]">
                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">SWIFT Code</div>
                        <div className="text-lg font-mono font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          {branch.bic}
                          <button 
                             onClick={() => navigator.clipboard.writeText(branch.bic)}
                             className="p-1 hover:bg-white dark:hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-[#003399]"
                             title="Copy SWIFT"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">No branches found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  {allBranches.length === 0 ? "Database holds no records for this country yet. Run the upload script!" : "Try adjusting your search query"}
                </p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#003399] to-blue-800 text-white">
            <CardContent className="p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold">{loading ? '...' : allBranches.length}</div>
                  <div className="text-xs opacity-80 uppercase tracking-wider font-medium">Total Branches</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{loading ? '...' : Math.min(uniqueBanksCount, 15)}</div>
                  <div className="text-xs opacity-80 uppercase tracking-wider font-medium">Major Banks</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm">
             <h4 className="font-bold mb-3 flex items-center gap-2">
               <Globe className="w-4 h-4 text-blue-500" /> Useful Links
             </h4>
             <ul className="space-y-2 text-slate-600 dark:text-slate-400">
               <li>
                 <Link to="/iban" className="hover:text-[#003399] transition-colors flex items-center justify-between group">
                   <span>IBAN Formats</span>
                   <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </Link>
               </li>
               <li>
                 <Link to="/iban/validator" className="hover:text-[#003399] transition-colors flex items-center justify-between group">
                   <span>IBAN Validator</span>
                   <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </Link>
               </li>
             </ul>
          </div>

          
        </aside>
      </div>
    </div>
  );
}
