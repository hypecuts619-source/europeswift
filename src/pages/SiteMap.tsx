import { Link } from 'react-router-dom';
import { Map, CreditCard, Landmark, FileText, Globe, Search, BookOpen, ShieldCheck } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';

export function SiteMap() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
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
                    Browse by Country
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Global SWIFT Search
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                <CreditCard className="w-5 h-5 text-indigo-500" />
                IBAN Tools
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/iban" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    IBAN Information
                  </Link>
                </li>
                <li>
                  <Link to="/iban/validator" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    IBAN Validator & Checker
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
                    UK Sort Codes
                  </Link>
                </li>
                <li>
                  <Link to="/blz" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    German BLZ Codes
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
                  <Link to="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Data Sources
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    API Access
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    Privacy Policy
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
                    What is a SWIFT / BIC Code?
                  </Link>
                </li>
                <li>
                  <Link to="/what-is-an-iban" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    What is an IBAN?
                  </Link>
                </li>
                <li>
                  <Link to="/swift-vs-iban" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    SWIFT vs IBAN: Differences
                  </Link>
                </li>
                <li>
                  <Link to="/sepa-transfer-guide" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-2">
                    SEPA Transfer Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
