import { useParams, Link, Navigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { glossaryTerms } from '../data/glossaryTerms';
import { ChevronRight, ArrowLeft } from 'lucide-react';
 

export function GlossaryTermPage() {
  const { slug } = useParams<{ slug: string }>();
  const termData = glossaryTerms.find(t => t.slug === slug);

  if (!termData) {
    return <Navigate to="/glossary" replace />;
  }

  // Get related terms data
  const related = termData.relatedSlugs 
    ? glossaryTerms.filter(t => termData.relatedSlugs?.includes(t.slug))
    : [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/glossary" />}>Glossary</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{termData.term}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
        <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
          <Link to="/glossary" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Glossary
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            What is {termData.term}?
          </h1>

          <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
            <p className="text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {termData.shortDefinition}
            </p>
            <div className="h-px w-full bg-slate-100 dark:bg-slate-800 my-6" />
            <p className="text-lg text-slate-700 dark:text-slate-400 leading-relaxed">
              {termData.longDefinition}
            </p>

            {/* Diagrams for specific terms to boost Helpful Content score */}
            {['nostro-account', 'vostro-account'].includes(termData.slug) && (
              <div className="my-10 bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 text-center">Nostro vs Vostro Account Structure</h4>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center shadow-sm w-full">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl text-blue-700 dark:text-blue-400">🏛️</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">Bank A (US)</div>
                    <div className="text-sm text-slate-500 mt-1">Has EUR account in Germany</div>
                    <div className="mt-3 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-sm font-bold rounded">
                      Calls it NOSTRO ("Ours")
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center px-4">
                    <div className="text-2xl text-slate-400 animate-pulse">⇄</div>
                  </div>

                  <div className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center shadow-sm w-full">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl text-amber-700 dark:text-amber-400">💶</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">Bank B (Germany)</div>
                    <div className="text-sm text-slate-500 mt-1">Holds the account for Bank A</div>
                    <div className="mt-3 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 text-sm font-bold rounded">
                      Calls it VOSTRO ("Yours")
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center text-slate-500 mt-6 mt-4">Illustration of the mirrored accounting terminology used in international correspondent banking.</p>
              </div>
            )}

            {termData.slug === 'correspondent-bank' && (
              <div className="my-10 bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 text-center">Correspondent Banking Flow</h4>
                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                  <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center shadow-sm">
                    <div className="font-bold text-slate-900 dark:text-white">Local Bank</div>
                    <div className="text-xs text-slate-500 mt-1">(Originator)</div>
                  </div>
                  <div className="text-slate-400 text-sm font-bold">→</div>
                  <div className="w-full md:w-1/3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-center shadow-md relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">The Bridge</div>
                    <div className="font-bold text-blue-900 dark:text-blue-300 mt-2">Correspondent Bank</div>
                    <div className="text-[10px] text-blue-700 dark:text-blue-400 mt-1">Has accounts for both</div>
                  </div>
                  <div className="text-slate-400 text-sm font-bold">→</div>
                  <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center shadow-sm">
                    <div className="font-bold text-slate-900 dark:text-white">Foreign Bank</div>
                    <div className="text-xs text-slate-500 mt-1">(Beneficiary)</div>
                  </div>
                </div>
                <p className="text-xs text-center text-slate-500 mt-6 mt-4">The correspondent bank holds accounts for both smaller banks, allowing funds to bridge the gap.</p>
              </div>
            )}

            <div className="mt-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                <img src="https://ui-avatars.com/api/?name=Mathew+George&background=0D8ABC&color=fff&size=128" alt="Mathew George" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5">Curated by</p>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">Mathew George</h3>
                <p className="text-sm text-[#003399] dark:text-blue-400 font-medium">Head of Financial Data Architecture</p>
              </div>
            </div>
          </div>

          <div className="my-8">
            
          </div>

          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Related Financial Terms</h3>
              <ul className="space-y-3">
                {related.map(r => (
                  <li key={r.slug}>
                    <Link 
                      to={`/glossary/${r.slug}`}
                      className="flex items-center text-[#003399] dark:text-blue-400 hover:underline group"
                    >
                      <ChevronRight className="w-4 h-4 mr-1 text-slate-400 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors" />
                      <span className="font-medium">{r.term}</span>
                      <span className="text-slate-500 dark:text-slate-400 ml-2 text-sm hidden md:inline">- {r.shortDefinition}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Free Routing Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/swift" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#003399] dark:hover:text-blue-400 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003399] dark:bg-blue-400 mr-2" />
                  SWIFT/BIC Code Search
                </Link>
              </li>
              <li>
                <Link to="/iban/validator" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#003399] dark:hover:text-blue-400 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003399] dark:bg-blue-400 mr-2" />
                  IBAN Validator
                </Link>
              </li>
              <li>
                <Link to="/iban/calculator" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#003399] dark:hover:text-blue-400 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003399] dark:bg-blue-400 mr-2" />
                  IBAN Calculator
                </Link>
              </li>
              <li>
                <Link to="/routing" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#003399] dark:hover:text-blue-400 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003399] dark:bg-blue-400 mr-2" />
                  US Routing Numbers
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="sticky top-24">
            
          </div>
        </aside>
      </div>
    </div>
  );
}
