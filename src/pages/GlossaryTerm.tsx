import { useParams, Link, Navigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { glossaryTerms } from '../data/glossaryTerms';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { AdSense } from '../components/AdSense'; // Include AdSense component to monetize

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
          </div>

          <div className="my-8">
            <AdSense slot="1234567890" />
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
            <AdSense slot="0987654321" />
          </div>
        </aside>
      </div>
    </div>
  );
}
