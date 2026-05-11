import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ArrowRight, Building2, MapPin, Search, Globe } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { countriesData } from '../../data/mockData';
import { AdSense } from '../../components/AdSense';
import { DirectorySearch } from '../../components/DirectorySearch';
import { SEO } from '../../components/SEO';

export function SwiftHome() {
  const [countrySearchInput, setCountrySearchInput] = useState('');
  const [countrySearch, setCountrySearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setCountrySearch(countrySearchInput);
    }, 300);
    return () => clearTimeout(handler);
  }, [countrySearchInput]);

  const filteredCountries = countriesData.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many SWIFT / BIC codes are recorded in this directory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The directory currently tracks over 186,000 banking codes across global institutions."
        }
      },
      {
        "@type": "Question",
        "name": "How is a SWIFT code formatted?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A SWIFT code is either 8 or 11 characters long. It consists of a 4-letter bank code, a 2-letter country code, a 2-character location code, and an optional 3-character branch code."
        }
      }
    ]
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "SWIFT / BIC Codes Directory",
      "description": "Select a country to find SWIFT codes formatting and browse local bank directories.",
      "url": window.location.href
    },
    faqSchema
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title="SWIFT / BIC Codes Directory | SwiftCodeDir"
        description="Browse our global directory of over 186,000 SWIFT, BIC, and routing codes by country to safely perform international bank wire transfers."
        canonicalUrl={window.location.href}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>SWIFT Codes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid lg:grid-cols-[1fr_300px] gap-12">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 mb-6 tracking-tight font-medium">
            SWIFT / BIC Codes <br/><span className="text-[#003399] dark:text-blue-400">Directory</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed">
            A SWIFT code (or BIC) is an 8 to 11 character format that identifies a specific bank when making an international bank transfer. 
            Select a European country below to find out the SWIFT code formatting and browse their local bank directories.
          </p>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border dark:border-slate-800 p-4 mb-12 max-w-xl">
            <DirectorySearch />
          </div>

          <div className="flex flex-col mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#003399] dark:text-blue-400" /> Browse by Country
              </h2>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {countrySearch ? (
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
                    {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'} matching
                  </span>
                ) : (
                  <span>Showing all {countriesData.length} countries</span>
                )}
              </div>
            </div>
            
            <div className="relative group max-w-xl mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#003399] transition-colors" />
              <Input 
                placeholder="Filter countries by name or ISO code (e.g. Germany, DE)..." 
                value={countrySearchInput}
                onChange={(e) => setCountrySearchInput(e.target.value)}
                className="pl-12 h-14 text-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 dark:text-slate-100 shadow-sm focus:ring-[#003399] rounded-xl"
              />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {filteredCountries.length > 0 ? (
              filteredCountries.map(c => (
                <Link 
                  key={c.code} 
                  to={`/swift/${c.slug}`}
                  className="bg-white dark:bg-slate-900 border dark:border-slate-800 hover:border-[#003399]/50 dark:hover:border-blue-400/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl p-4 flex flex-col gap-2 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-3xl filter drop-shadow-sm">{c.flag}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#003399]/10 transition-colors">
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#003399]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">{c.name}</h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-gray-400 dark:text-slate-500">{c.code} FORMAT</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-gray-50/50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-800">
                <div className="bg-white dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border dark:border-slate-800">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No countries found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                  We couldn't find any results for <strong>"{countrySearchInput}"</strong>. Check your spelling or try searching by country name or ISO code.
                </p>
                <button 
                  onClick={() => {
                    setCountrySearchInput('');
                    setCountrySearch('');
                  }}
                  className="px-8 py-3 bg-[#003399] dark:bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-800 dark:hover:bg-blue-500 transition-all shadow-md active:scale-95"
                >
                  View All Countries
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/what-is-a-swift-code" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group">
                    <div className="mt-0.5 bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-md text-[#003399] dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">What is a SWIFT code?</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">Learn how to read and understand the 8 or 11 character SWIFT code format.</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/sepa-transfer-guide" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group">
                    <div className="mt-0.5 bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-md text-[#003399] dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">SEPA Transfer Guide</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">Understanding Europe's Single Euro Payments Area and transfer times.</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/swift-vs-iban" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group">
                    <div className="mt-0.5 bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-md text-[#003399] dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">SWIFT vs IBAN Explained</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">The difference between a SWIFT code and an IBAN.</div>
                    </div>
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-[#003399] dark:bg-slate-800 text-white border-0">
            <CardContent className="p-6">
              <Building2 className="w-8 h-8 text-blue-200 dark:text-blue-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">Need to validate an IBAN?</h3>
              <p className="text-blue-100 dark:text-slate-300 text-sm mb-4">Make sure you have the correct format before sending your wire transfer.</p>
              <Link to="/iban/validator" className="text-sm font-semibold text-white underline decoration-blue-400 underline-offset-4">Open Validator</Link>
            </CardContent>
          </Card>

          <AdSense slot="7788990011" />
        </aside>
      </div>
    </main>
  );
}
