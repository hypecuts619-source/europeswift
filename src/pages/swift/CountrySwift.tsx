import { useParams, Link } from 'react-router-dom';
import { Building2, Search, Component } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { countriesData, mockBanksData } from '../../data/mockData';
import { AdSense } from '../../components/AdSense';

export function CountrySwift() {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  
  // Find country
  const country = countriesData.find(c => c.slug === countrySlug);

  if (!country) return <div className="p-12 text-center text-xl text-gray-500">Country not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            SWIFT Codes for {country.name}
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">
          Browse our directory of SWIFT / BIC codes for {country.name}. Use the search bar to find a specific bank or branch.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-10">
        <div>
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <Input 
              placeholder={`Search ${country.name} banks...`} 
              className="pl-10 h-12 text-lg bg-white border-2 focus-visible:border-[#003399]"
            />
          </div>

          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h2 className="text-xl font-bold text-gray-900">Top Banks</h2>
            <Link 
              to={`/swift/${country.slug}/branches`}
              className="text-sm font-medium text-[#003399] hover:underline flex items-center gap-1 group"
            >
              Browse all branches <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid gap-4">
            {country.topBanks.map(bankSlug => {
              const bankDetails = mockBanksData[bankSlug];
              return (
              <Link 
                key={bankSlug} 
                to={`/swift/${country.slug}/${bankSlug}`}
              >
                <Card className="hover:border-[#003399]/40 hover:shadow-md transition-all group">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 p-3 rounded-xl group-hover:bg-blue-50 group-hover:text-[#003399] transition-colors">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {bankDetails?.name || bankSlug.replace('-', ' ')}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-mono text-gray-500">{bankDetails?.bic || country.code} Bank Code</span>
                          <Badge variant="secondary" className="text-xs">SEPA Enabled</Badge>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400 group-hover:text-[#003399]" />
                  </CardContent>
                </Card>
              </Link>
            )})}
          </div>
        </div>

        <aside className="space-y-6">
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Country Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b dark:border-slate-800 pb-2">
                  <dt className="text-gray-500">ISO Code</dt>
                  <dd className="font-medium text-gray-900 dark:text-slate-100">{country.code}</dd>
                </div>
                <div className="flex justify-between border-b dark:border-slate-800 pb-2">
                  <dt className="text-gray-500">SEPA Zone</dt>
                  <dd className="font-medium text-green-600 flex items-center gap-1"><Component className="w-4 h-4"/> Yes</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Registered Banks</dt>
                  <dd className="font-medium text-gray-900 dark:text-slate-100">~ 250</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <AdSense slot="1122334455" />
        </aside>
      </div>
    </div>
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
