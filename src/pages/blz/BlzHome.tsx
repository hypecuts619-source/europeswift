import { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { AdSense } from '../../components/AdSense';
import { SEO } from '../../components/SEO';

const GERMAN_BANKS = [
  { name: 'Deutsche Bank AG', blz: '10020000', city: 'Berlin' },
  { name: 'Commerzbank AG', blz: '10040000', city: 'Frankfurt am Main' },
  { name: 'KfW Bankengruppe', blz: '50080000', city: 'Frankfurt am Main' },
  { name: 'DZ Bank AG', blz: '10060000', city: 'Berlin' },
  { name: 'Landesbank Baden-Württemberg', blz: '60050101', city: 'Stuttgart' },
  { name: 'Sparkasse Berlin', blz: '10050000', city: 'Berlin' },
  { name: 'Postbank (Bonn)', blz: '37010050', city: 'Bonn' },
  { name: 'HypoVereinsbank (UniCredit Bank AG)', blz: '70020270', city: 'München' },
  { name: 'ING-DiBa AG', blz: '50010517', city: 'Frankfurt am Main' },
  { name: 'DKB (Deutsche Kreditbank)', blz: '12030000', city: 'Berlin' },
];

export function BlzHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBanks, setFilteredBanks] = useState(GERMAN_BANKS);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredBanks(GERMAN_BANKS);
      setHasSearched(false);
      return;
    }

    const filtered = GERMAN_BANKS.filter(bank => 
      bank.name.toLowerCase().includes(query) || 
      bank.blz.includes(query)
    );
    setFilteredBanks(filtered);
    setHasSearched(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title="German BLZ Directory - Find Bankleitzahl Codes | SwiftcodeDir"
        description="Search our directory of verified German BLZ (Bankleitzahl) codes. Formats, branch identifiers, and local routing numbers for German and Austrian banks."
        canonicalUrl="https://swiftcodedir.com/blz"
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>German BLZ Directory</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid lg:grid-cols-[1fr_300px] gap-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif dark:text-slate-100">German BLZ Codes</h1>
          <p className="text-gray-600 dark:text-slate-400 mb-8 max-w-2xl text-lg">
            A Bankleitzahl (BLZ) is an 8-digit bank code used by German and Austrian banks to route transactions to the correct branch. Search our directory of verified BLZ records.
          </p>
          
          <Card className="dark:bg-slate-900 dark:border-slate-800 mb-12">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-slate-200">Search BLZ Directory</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Enter BLZ code (e.g., 10020000) or Bank Name..." 
                  className="h-12 text-lg dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  onClick={handleSearch}
                  className="h-12 px-8 bg-[#003399] dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 w-full sm:w-auto"
                >
                  <Search className="w-5 h-5 mr-2" /> Search
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-6 font-serif dark:text-slate-100">
            {hasSearched ? 'Search Results' : 'Popular German Banks'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredBanks.length > 0 ? (
              filteredBanks.map(bank => (
                <div key={bank.blz} className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer transition-colors bg-white dark:bg-slate-900">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">{bank.name}</h3>
                    <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">
                      BLZ: {bank.blz}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{bank.city}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium tracking-tight">View Details &rarr;</p>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <p className="text-slate-500 dark:text-slate-400 text-lg">No BLZ codes found for "{searchQuery}"</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchQuery('');
                    setFilteredBanks(GERMAN_BANKS);
                    setHasSearched(false);
                  }}
                  className="mt-2 text-blue-600 dark:text-blue-400"
                >
                  Clear search and show all banks
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <aside className="space-y-6">
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">What is a BLZ?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                The Bankleitzahl (BLZ) is a bank code used in Germany and Austria. It consists of 8 digits identifying the bank and the branch. While mostly replaced by IBAN, it's still used domestically and forms part of the German IBAN.
              </p>
            </CardContent>
          </Card>
          
          <AdSense slot="9191919191" />
        </aside>
      </div>
    </div>
  );
}
