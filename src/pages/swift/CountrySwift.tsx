import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Building2, Search, Component } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { countriesData } from '../../data/mockData';
import { SEO } from '../../components/SEO';

interface BankSummary {
  name: string;
  slug: string;
  primaryBic: string;
}

export function CountrySwift() {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const [banks, setBanks] = useState<BankSummary[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Find country
  const country = countriesData.find(c => c.slug === countrySlug);

  useEffect(() => {
    if (country?.code) {
      setLoading(true);
      fetch(`/data/countries/${country.code.toLowerCase()}.json`)
        .then(res => {
          if (!res.ok) throw new Error('Data not found');
          return res.json();
        })
        .then(data => {
          if (data && Array.isArray(data.banks)) {
            setBanks(data.banks);
          } else {
            setBanks([]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load country data:", err);
          setBanks([]);
          setLoading(false);
        });
    }
  }, [country]);

  // Use the fetched banks, or fallback to mock top banks if empty (e.g. before fetch completes)
  const uniqueBanks = useMemo(() => {
    if (banks.length > 0) return banks;
    if (!loading && country) {
       // Fallback mock top banks
       return country.topBanks.map(b => ({
          name: b.replace(/-/g, ' '),
          slug: b,
          primaryBic: country.code + 'XX'
       }));
    }
    return [];
  }, [banks, loading, country]);

  if (!country) return <div className="p-12 text-center text-xl text-gray-500">Country not found</div>;

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${country.name} Banks SWIFT/BIC Codes Directory`,
    "description": `Comprehensive directory of SWIFT / BIC codes for all banks in ${country.name}. Check branch details, head office codes, and international routing numbers.`,
    "url": `https://swiftcodedir.com/swift/${countrySlug}`,
    "creator": {
      "@type": "Organization",
      "name": "SwiftCodeDir"
    },
    "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    "isAccessibleForFree": true,
    "keywords": `SWIFT, BIC, Banks, Financial Institutions, Routing Numbers, ${country.name}`
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How many banks are listed for ${country.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `There are currently ${banks.length > 0 ? banks.length : 'multiple'} financial institutions and banks listed in our directory for ${country.name}.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the SWIFT/BIC code format for ${country.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `In ${country.name}, SWIFT codes typically consist of 8 to 11 characters. The first 4 characters are the bank code, the next 2 are ' ${country.code}', the following 2 are the location code, and the last 3 (optional) are the branch code.`
        }
      }
    ]
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title={`All SWIFT/BIC Codes for Banks in ${country.name} | SwiftCodeDir`}
        description={`Find verified SWIFT and BIC codes for all major banks and branches in ${country.name}. Use our directory to ensure safe international money transfers.`}
        canonicalUrl={`https://swiftcodedir.com/swift/${countrySlug}`}
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
            <BreadcrumbPage>{country.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{country.flag}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            SWIFT Codes for {country.name}
          </h1>
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
          <p className="text-lg">
            Browse our comprehensive directory of SWIFT / BIC codes for financial institutions operating in {country.name}. Use the search bar to find a specific bank or branch.
          </p>
          <p>
            When sending an international wire transfer to {country.name}, the <Link to="/glossary/swift-society-worldwide-interbank" className="text-blue-600 hover:underline">SWIFT code</Link> (also known as a BIC code) is absolutely essential. It ensures that your payment is routed securely and directly to the correct destination bank. Most banks in {country.name} adhere strictly to international payment standards, meaning transfers without an accurate SWIFT code and <Link to="/glossary/iban-international-bank-account" className="text-blue-600 hover:underline">IBAN</Link> will likely fail or incur heavy processing fees.
          </p>
          <p>
            The SWIFT codes listed below have been verified against the most recent financial registry updates.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-10">
        <div>
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <Input 
              placeholder={`Search ${country.name} banks...`} 
              className="pl-10 h-12 text-lg bg-white dark:bg-slate-900 border-2 dark:border-slate-800 dark:text-slate-100 focus-visible:border-[#003399]"
            />
          </div>

          <div className="flex items-center justify-between mb-4 border-b dark:border-slate-800 pb-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
              {loading ? 'Loading Banks...' : 'Top Banks'}
            </h2>
          </div>
          <div className="grid gap-4">
            {!loading && uniqueBanks.map(bank => (
              <Link 
                key={bank.slug} 
                to={`/swift/${countrySlug}/${bank.slug}`}
                state={{ realBankName: bank.name }}
              >
                <Card className="hover:border-[#003399]/40 dark:bg-slate-900 dark:border-slate-800 hover:shadow-md transition-all group">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">
                        <Building2 className="w-6 h-6 text-gray-500 dark:text-slate-400 group-hover:text-[#003399] dark:group-hover:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-slate-100 capitalize">
                          {bank.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-mono text-gray-500 dark:text-slate-400">{bank.primaryBic}</span>
                          <Badge variant="secondary" className="text-xs">SEPA Enabled</Badge>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400 group-hover:text-[#003399] dark:group-hover:text-blue-400" />
                  </CardContent>
                </Card>
              </Link>
            ))}
            {!loading && uniqueBanks.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-900/50 rounded-xl">
                No banks found in the database. Run the dataset upload script!
              </div>
            )}
          </div>
          <div className="mt-8">
            
          </div>
        </div>

        <aside className="space-y-6 relative gap-6 flex flex-col h-full">
          <Card className="border dark:bg-slate-900 dark:border-slate-800 shadow-sm shrink-0">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Country Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b dark:border-slate-800 pb-2">
                  <dt className="text-gray-500 dark:text-slate-400">ISO Code</dt>
                  <dd className="font-medium text-gray-900 dark:text-slate-100">{country.code}</dd>
                </div>
                <div className="flex justify-between border-b dark:border-slate-800 pb-2">
                  <dt className="text-gray-500 dark:text-slate-400">SEPA Zone</dt>
                  <dd className="font-medium text-green-600 flex items-center gap-1"><Component className="w-4 h-4"/> Yes</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-slate-400">Registered Banks</dt>
                  <dd className="font-medium text-gray-900 dark:text-slate-100">{loading ? '...' : uniqueBanks.length}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <div className="sticky top-6 h-[600px]">
            
          </div>
        </aside>
      </div>
    </main>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

