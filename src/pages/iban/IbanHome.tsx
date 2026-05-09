import { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Card, CardContent } from '../../components/ui/card';
import { Link } from 'react-router-dom';
import { AdSense } from '../../components/AdSense';
import { Search, Globe } from 'lucide-react';
import { Input } from '../../components/ui/input';
import ibanFormatsData from '../../data/iban-formats.json';
import { SEO } from '../../components/SEO';

// Helper to get flag emoji from ISO2 code
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export function IbanHome() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFormats = ibanFormatsData.filter(item => 
    item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title="IBAN Formats & Country Codes Directory | SwiftCodeDir"
        description="Explore the complete registry of IBAN formats, lengths, and structures for all SEPA and international bank account numbering systems."
        canonicalUrl={window.location.href}
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>IBAN Registry</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid lg:grid-cols-[1fr_300px] gap-12">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            IBAN <span className="text-[#003399] dark:text-blue-400">Directory & Formats</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed">
            The International Bank Account Number (IBAN) is an internationally agreed system of identifying bank accounts across national borders to facilitate the communication and processing of cross border transactions.
          </p>

          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search by country or ISO code..." 
              className="pl-12 h-14 text-lg shadow-sm border-gray-200 dark:border-slate-800 dark:bg-slate-950 focus:ring-[#003399]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200 whitespace-nowrap">Country</th>
                    <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">ISO</th>
                    <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">Length</th>
                    <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">Pattern</th>
                    <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-slate-800">
                  {filteredFormats.length > 0 ? (
                    filteredFormats.map((item) => (
                      <tr key={item.code} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 dark:text-gray-300">
                          <div className="flex items-center gap-3">
                            <span className="text-xl" role="img" aria-label={`Flag of ${item.country}`}>
                              {getFlagEmoji(item.code)}
                            </span>
                            <span className="font-medium">{item.country}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 dark:text-gray-300">
                          <span className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-mono">
                            {item.code}
                          </span>
                        </td>
                        <td className="px-6 py-4 dark:text-gray-300">{item.length}</td>
                        <td className="px-6 py-4 font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest whitespace-nowrap">
                          {item.format}
                        </td>
                        <td className="px-6 py-4 font-mono text-[10px] text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {item.example}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                        <Globe className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="text-lg">No IBAN formats found for "{searchQuery}"</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <aside className="space-y-6">
          <Card className="bg-[#003399] dark:bg-slate-800 text-white border-0 shadow-lg shadow-blue-900/10 dark:shadow-none">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2 dark:text-blue-100 uppercase tracking-wider text-xs opacity-80">Tools</h3>
              <h4 className="text-xl font-bold mb-3 italic">Validate IBAN</h4>
              <p className="text-blue-100 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                Check the structure and checksum of any International Bank Account Number instantly.
              </p>
              <Link to="/iban/validator" className="w-full text-center py-3 bg-white dark:bg-blue-600 text-[#003399] dark:text-white rounded-lg font-bold inline-block hover:bg-blue-50 dark:hover:bg-blue-500 transition-all shadow-md active:scale-95">Open Validator</Link>
            </CardContent>
          </Card>
          <AdSense slot="9876543210" />
        </aside>
      </div>
    </div>
  );
}
