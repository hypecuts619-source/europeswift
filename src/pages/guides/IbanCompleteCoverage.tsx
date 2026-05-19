import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { useMemo } from 'react';
import ibanFormatsDataJson from '../../data/iban-formats.json';

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

export function IbanCompleteCoverage() {
  const allCountries = useMemo(() => {
    return (ibanFormatsDataJson as any[]).map(item => ({
      code: item.code,
      country: item.country,
      length: item.length,
    })).sort((a, b) => a.country.localeCompare(b.country));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="Complete IBAN Coverage — All 101 Regions Including Territories"
        description="The only free directory covering all 101 IBAN regions, including French overseas territories and Russia. See our complete coverage comparison."
        canonicalUrl="https://swiftcodedir.com/iban/complete-coverage"
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/iban">IBAN</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Complete IBAN Coverage</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-xl shadow-blue-900/5">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-[2.25rem] flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">
            Complete IBAN Coverage: 101 Regions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Unlike standard directories that only list the 89 primary nations, we fully implement the SWIFT registry's 12 overseas territories and complex standalone adoptions.
          </p>
        </div>
      </div>
      
      <article className="prose prose-slate dark:prose-invert max-w-none">
        
        <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Why Territories and Full Coverage Matter</h2>
        <p>
          Sending money to a French overseas department like Martinique or Réunion? Using the parent country's format (France) instead of verifying against the exact territory's specific SWIFT registration often leads to failed validations or bounced transactions.
        </p>
        <p>
          Furthermore, we are the only free platform to correctly validate <strong>Russia (RU)</strong> based on its official 2013 Central Bank adoption of the 33-character standard. Many generic IBAN tools reject valid Russian IBANs because they are using outdated datasets.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Coverage Comparison</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm mb-8">
          <table className="w-full text-left m-0">
             <thead className="bg-gray-50 dark:bg-slate-800/80">
               <tr>
                 <th className="py-4 px-6 border-b dark:border-slate-700">Feature</th>
                 <th className="py-4 px-6 border-b dark:border-slate-700 text-emerald-600 dark:text-emerald-400">SwiftCodeDir</th>
                 <th className="py-4 px-6 border-b dark:border-slate-700 text-slate-500">Typical Competitor</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100 dark:divide-slate-800/50">
               <tr>
                 <td className="py-4 px-6 font-medium">Officially Recognized IBAN Nations</td>
                 <td className="py-4 px-6"><CheckCircle2 className="inline w-5 h-5 text-emerald-500" /> 89 Countries</td>
                 <td className="py-4 px-6 text-slate-500"><CheckCircle2 className="inline w-5 h-5" /> 70-89 Countries</td>
               </tr>
               <tr className="bg-emerald-50/30 dark:bg-emerald-900/5">
                 <td className="py-4 px-6 font-medium">French Overseas Territories (e.g. GF, GP, MQ)</td>
                 <td className="py-4 px-6"><CheckCircle2 className="inline w-5 h-5 text-emerald-500" /> Yes (10 Regions)</td>
                 <td className="py-4 px-6 text-slate-500"><XCircle className="inline w-5 h-5 text-red-400" /> No</td>
               </tr>
               <tr>
                 <td className="py-4 px-6 font-medium">Russia (RU) Validation</td>
                 <td className="py-4 px-6"><CheckCircle2 className="inline w-5 h-5 text-emerald-500" /> Yes (33 chars)</td>
                 <td className="py-4 px-6 text-slate-500"><XCircle className="inline w-5 h-5 text-red-400" /> No</td>
               </tr>
               <tr className="bg-emerald-50/30 dark:bg-emerald-900/5">
                 <td className="py-4 px-6 font-medium">Saint Lucia (LC)</td>
                 <td className="py-4 px-6"><CheckCircle2 className="inline w-5 h-5 text-emerald-500" /> Yes (32 chars)</td>
                 <td className="py-4 px-6 text-slate-500"><XCircle className="inline w-5 h-5 text-red-400" /> No</td>
               </tr>
             </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">List of All 101 Supported Regions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 not-prose">
          {allCountries.map((c) => (
             <Link to={`/iban/${slugify(c.country)}`} key={c.code} className="group flex items-center gap-2 p-2 rounded-lg border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
               <span className="text-xl" role="img">{getFlagEmoji(c.code)}</span>
               <div className="flex flex-col min-w-0 flex-1">
                 <span className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline" title={c.country}>{c.country}</span>
                 <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400">{c.code} • {c.length} chars</span>
               </div>
             </Link>
          ))}
        </div>
      </article>
    </div>
  );
}
