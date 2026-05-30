import { useState, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Card, CardContent } from '../../components/ui/card';
import { Link } from 'react-router-dom';
import { Search, Globe } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { SEO } from '../../components/SEO';
import { AdsterraNativeSlot } from '../../components/AdsterraNativeSlot';
import ibanFormatsDataJson from '../../data/iban-formats.json';
import { getIbanRootMeta, getWebApplicationSchema, getBreadcrumbSchema } from '../../utils/seoHelpers';

// Helper to get flag emoji from ISO2 code
const getFlagEmoji = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🌐';
  }
};

const slugify = (text: string) => {
  return text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
};

import { WebApplicationSchema } from '../../components/SEO/StructuredDataEngine';

export function IbanHome() {
  const [searchQuery, setSearchQuery] = useState('');

  const ibanFormatsData = useMemo(() => {
    return (ibanFormatsDataJson as any[]).map(item => ({
      code: item.code,
      country: item.country,
      length: item.length,
      format: item.format,
      example: item.example
    })).sort((a, b) => a.country.localeCompare(b.country));
  }, []);

  const filteredFormats = ibanFormatsData.filter(item => 
    item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const meta = getIbanRootMeta();
  const webAppSchema = getWebApplicationSchema("https://swiftcodedir.com/iban", "Global IBAN Directory & Validator Utility");
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://swiftcodedir.com" },
    { name: "IBAN Directory", url: "https://swiftcodedir.com/iban" }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <WebApplicationSchema 
        name="Global IBAN Directory & Validator Utility"
        url="https://swiftcodedir.com/iban"
        description={meta.description}
      />
      <SEO 
        title={meta.title}
        description={meta.description}
        canonicalUrl="https://swiftcodedir.com/iban"
        jsonLd={[
          webAppSchema,
          breadcrumbSchema,
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is an IBAN code?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "An International Bank Account Number (IBAN) is an internationally agreed system of identifying bank accounts across national borders to facilitate cross-border transactions."
                }
              },
              {
                "@type": "Question",
                "name": "How do I find my IBAN?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can usually find your IBAN on your bank statement, within your online banking app, or by using our IBAN Calculator tool with your local bank code and account number."
                }
              },
              {
                "@type": "Question",
                "name": "Is an IBAN the same as a SWIFT code?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. An IBAN identifies a specific individual bank account, while a SWIFT (or BIC) code identifies a specific bank or financial institution."
                }
              },
              {
                "@type": "Question",
                "name": "Which countries use IBAN?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Over 80 countries worldwide use IBAN, including all countries in the European Union, the UK, Switzerland, and many nations in the Middle East and North Africa."
                }
              },
              {
                "@type": "Question",
                "name": "What happens if I use a wrong IBAN?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If you use an incorrect IBAN, the transfer will likely be rejected by the receiving bank, which can lead to delays and potential rejection fees."
                }
              }
            ]
          }
        ]}
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
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-xl shadow-blue-900/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
          <div className="w-20 h-20 bg-[#003399] dark:bg-blue-600 rounded-[2.25rem] flex items-center justify-center text-white shadow-lg shadow-blue-900/10 shrink-0 relative z-10 transition-transform group-hover:scale-105">
            <Globe className="w-12 h-12" />
          </div>
          <div className="relative z-10">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-5xl text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
              IBAN Directory — <span className="text-[#003399] dark:text-blue-400">All Countries 2026</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide border-l-2 border-blue-500 pl-3">
                Official Registry of Global Bank Account Identifiers
              </p>
              <Link to="/iban/guide" className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800 hover:bg-blue-100 transition-colors">
                View IBAN Guide
              </Link>
            </div>
          </div>
        </div>

        <section className="mb-12 w-full flex justify-center">
          <AdsterraNativeSlot zoneId="d3204c449d1c550b52260207ce88c485" format="horizontal" />
        </section>
          
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search by country or ISO code..." 
              className="pl-12 h-14 text-lg shadow-sm border-gray-200 dark:border-slate-800 dark:bg-slate-950 focus:ring-[#003399]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
            <div className="grid md:grid-cols-2 gap-8 not-prose">
              <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border dark:border-slate-800 shadow-sm">
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100 italic">What is IBAN?</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  The International Bank Account Number (IBAN) is a standardized international numbering system developed to identify bank accounts across national borders. Originally conceived by the European Committee for Banking Standards, it has become the global benchmark for international financial transactions. An IBAN consists of up to 34 alphanumeric characters, including a two-letter country code, two check digits, and a country-specific Basic Bank Account Number (BBAN). By using this unified format, financial institutions can automatically verify account details, significantly reducing errors, manual interventions, and transaction costs in global money transfers. It is the primary vehicle for SEPA payments.
                </p>
              </section>

              <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border dark:border-slate-800 shadow-sm">
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100 italic">SEPA vs Non-SEPA</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  The Single Euro Payments Area (SEPA) is a payment-integration initiative of the European Union for simplification of bank transfers denominated in euro. SEPA countries—which include all EU member states plus several others like Switzerland and the United Kingdom—strictly mandate the use of IBANs for all transfers. In contrast, many non-SEPA countries, such as Brazil, Saudi Arabia, and Mauritius, have also adopted the IBAN standard to improve their international banking efficiency, even if they aren't part of the Eurozone's internal infrastructure. Understanding whether a country is SEPA-compliant is crucial, as SEPA transfers are often processed as domestic payments with lower fees.
                </p>
              </section>
            </div>

            <section className="mt-8 bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <h2 className="text-2xl font-bold mb-4 text-[#003399] dark:text-blue-400 font-serif">How IBAN Format Differs by Country</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                While the IBAN provides a standard framework, the internal structure of the BBAN (Basic Bank Account Number) portion varies significantly between nations, reflecting diverse domestic banking histories. Each country defines its own fixed length and character set for the BBAN. For example, a German IBAN is always 22 characters long, typically containing an 8-digit Bankleitzahl (BLZ) and a 10-digit account number. Conversely, a Norwegian IBAN is one of the shortest at 15 characters, while a Maltese IBAN stretches to 31 characters. 
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Some countries use purely numeric characters in their BBAN, while others, like the United Kingdom or Ireland, incorporate alphabetical bank identifiers. These differences are registered with SWIFT, the registration authority for the IBAN standard. Our directory meticulously tracks these variations—including the specific indices for bank codes, branch identifiers, and account numbers—to ensure that every generated or validated IBAN meets the precise legal requirements of the destination country's central bank.
              </p>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/what-is-an-iban" className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-all border dark:border-slate-700">General IBAN Guide</Link>
                <Link to="/sepa-transfer-guide" className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-all border dark:border-slate-700">SEPA Transfer Rules</Link>
                <Link to="/swift-vs-iban" className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-all border dark:border-slate-700">SWIFT vs IBAN Comparison</Link>
              </div>
            </section>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                  <tr>
                    <th className="px-3 sm:px-6 py-4 font-semibold text-gray-900 dark:text-gray-200 whitespace-nowrap">Country</th>
                    <th className="px-3 sm:px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">ISO</th>
                    <th className="px-3 sm:px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">Length</th>
                    <th className="px-3 sm:px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">Pattern</th>
                    <th className="px-3 sm:px-6 py-4 font-semibold text-gray-900 dark:text-gray-200">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-slate-800">
                  {filteredFormats.length > 0 ? (
                    filteredFormats.map((item) => (
                      <tr key={item.code} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-3 sm:px-6 py-4 dark:text-gray-300">
                          <Link to={`/iban/${slugify(item.country)}`} className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <span className="text-xl" role="img" aria-label={`Flag of ${item.country}`}>
                              {getFlagEmoji(item.code)}
                            </span>
                            <span className="font-medium underline decoration-transparent hover:decoration-current">{item.country}</span>
                          </Link>
                        </td>
                        <td className="px-3 sm:px-6 py-4 dark:text-gray-300">
                          <span className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-mono">
                            {item.code}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 dark:text-gray-300">{item.length}</td>
                        <td className="px-3 sm:px-6 py-4 font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest whitespace-nowrap">
                          {item.format}
                        </td>
                        <td className="px-3 sm:px-6 py-4 font-mono text-[10px] text-gray-600 dark:text-gray-400 whitespace-nowrap">
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
          
          <Card className="bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2 dark:text-blue-100 uppercase tracking-wider text-xs text-slate-400">Tools</h3>
              <h4 className="text-xl font-bold mb-3 text-[#003399] dark:text-blue-400">IBAN Calculator</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Convert local bank codes and account numbers into a fully compliant international IBAN.
              </p>
              <Link to="/iban/calculator" className="w-full text-center py-3 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 text-[#003399] dark:text-blue-400 rounded-lg font-bold inline-block hover:bg-white dark:hover:bg-slate-750 transition-all shadow-sm active:scale-95">Open Calculator</Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
