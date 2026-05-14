import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { glossaryTerms } from '../data/glossaryTerms';
import { BookA } from 'lucide-react';

export function GlossaryIndex() {
  // Sort alphabetically by term
  const sortedTerms = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Glossary</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
          <BookA className="w-8 h-8 text-[#003399] dark:text-blue-400" />
          Banking & Wire Transfer Glossary
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Navigate the complex language of international finance, domestic banking, and global wire transfers. Understand the meaning behind standard routing codes, messaging networks, and banking regulations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTerms.map((item) => (
          <Link 
            key={item.slug} 
            to={`/glossary/${item.slug}`}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-md transition-shadow group flex flex-col h-full"
          >
            <h2 className="text-xl font-bold text-[#003399] dark:text-blue-400 group-hover:underline mb-3">
              {item.term}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow">
              {item.shortDefinition}
            </p>
            <div className="mt-4 text-sm font-medium text-slate-900 dark:text-white flex items-center gap-1 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">
              Read definition &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
