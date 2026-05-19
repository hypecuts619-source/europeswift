import { Link } from 'react-router-dom';
import { Map, CreditCard, Landmark, FileText, Globe, Search, BookOpen, ShieldCheck } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { glossaryTerms } from '../data/glossaryTerms';

export function SiteMap() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Sitemap</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Site Map</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Navigate through our comprehensive directory of global banking codes.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Main Sections */}
          <div className="space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                <Globe className="w-5 h-5 text-blue-500" />
                SWIFT / BIC Codes
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/swift" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Browse SWIFT Codes by Country
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Global SWIFT/BIC Search Engine
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                <CreditCard className="w-5 h-5 text-indigo-500" />
                IBAN Tools & Hubs
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/iban" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    IBAN Country Formats & Rules
                  </Link>
                </li>
                <li>
                  <Link to="/iban/validator" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Official IBAN Validator & Checker
                  </Link>
                </li>
                <li>
                  <Link to="/iban/europe" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    European IBAN Formats
                  </Link>
                </li>
                <li>
                  <Link to="/iban/middle-east" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Middle East IBAN Formats
                  </Link>
                </li>
                <li>
                  <Link to="/iban/africa" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    African IBAN Formats
                  </Link>
                </li>
                <li>
                  <Link to="/iban/caribbean" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Caribbean IBAN Formats
                  </Link>
                </li>
                 <li>
                  <Link to="/iban/americas" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Americas IBAN Formats
                  </Link>
                </li>
                <li>
                  <Link to="/iban/asia" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Asian IBAN Formats
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                <Landmark className="w-5 h-5 text-emerald-500" />
                Local Bank Codes
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/sort-code" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    UK Bank Sort Code Directory
                  </Link>
                </li>
                <li>
                  <Link to="/blz" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    German Bankleitzahl (BLZ) Search
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                <ShieldCheck className="w-5 h-5 text-purple-500" />
                Legal & Info
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                <BookOpen className="w-5 h-5 text-amber-500" />
                Guides & Resources
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/what-is-a-swift-code" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Guide: What is a SWIFT / BIC Code?
                  </Link>
                </li>
                <li>
                  <Link to="/what-is-an-iban" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Guide: What is an IBAN Number?
                  </Link>
                </li>
                <li>
                  <Link to="/swift-vs-iban" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Comparison: SWIFT vs IBAN Differences
                  </Link>
                </li>
                <li>
                  <Link to="/sepa-transfer-guide" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Complete SEPA Transfer Rules Guide
                  </Link>
                </li>
                <li>
                  <Link to="/sepa-countries" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    SEPA Countries List
                  </Link>
                </li>
                <li>
                  <Link to="/how-to-find-iban" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    How to Find Your IBAN
                  </Link>
                </li>
                <li>
                  <Link to="/iban-format-by-country" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    IBAN Format by Country
                  </Link>
                </li>
                <li>
                  <Link to="/iban-error-codes" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    IBAN Error Codes Recognized
                  </Link>
                </li>
                <li>
                  <Link to="/iban-vs-account-number" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    IBAN vs Local Account Number
                  </Link>
                </li>
                <li>
                  <Link to="/iban-vs-routing-number" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    IBAN vs ABA Routing Number
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                <BookOpen className="w-5 h-5 text-[#003399]" />
                Banking Glossary
              </h2>
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                <li>
                  <Link to="/glossary" className="text-slate-900 dark:text-white font-medium hover:text-[#003399] dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Glossary Index
                  </Link>
                </li>
                {glossaryTerms.map(t => (
                  <li key={`glossary-${t.slug}`}>
                    <Link to={`/glossary/${t.slug}`} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2 text-sm">
                      {t.term}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
