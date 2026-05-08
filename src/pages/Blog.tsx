import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { ArrowRight, BookOpen, Calendar } from 'lucide-react';

export const BLOG_POSTS = [
  {
    slug: 'what-is-a-swift-code-and-how-to-find-it',
    title: 'What is a SWIFT Code? The Ultimate Guide for International Bank Transfers',
    excerpt: 'Learn exactly what a SWIFT/BIC code is, how it works, and why it is essential for secure cross-border wire transfers.',
    date: 'May 1, 2026',
    category: 'Guides',
    readTime: '5 min read'
  },
  {
    slug: 'swift-vs-iban-difference',
    title: 'SWIFT vs IBAN: What is the Difference and When to Use Which?',
    excerpt: 'Confused between SWIFT codes and IBAN numbers? Discover the key differences and understand which one you need for your international payments.',
    date: 'April 28, 2026',
    category: 'Comparisons',
    readTime: '4 min read'
  },
  {
    slug: 'how-long-do-international-wire-transfers-take',
    title: 'How Long Do International Wire Transfers Take? (2026 Update)',
    excerpt: 'Waiting for an overseas payment? Find out the standard clearing times for SWIFT transfers, SEPA payments, and international wire timelines.',
    date: 'April 20, 2026',
    category: 'Banking',
    readTime: '6 min read'
  },
  {
    slug: 'wire-transfer-routing-number-vs-swift-code',
    title: 'Wire Transfer Routing Number vs. SWIFT Code: Which Do You Need?',
    excerpt: 'Sending money to the US? Learn when to use an ABA Routing Number and when to use a SWIFT Code for domestic and international wire transfers.',
    date: 'April 15, 2026',
    category: 'US Banking',
    readTime: '5 min read'
  },
  {
    slug: 'what-is-sepa-transfer-europe',
    title: 'SEPA Transfers Explained: The Complete Guide to European Payments',
    excerpt: 'Everything you need to know about the Single Euro Payments Area (SEPA), SEPA Instant, and how it differs from traditional SWIFT banking.',
    date: 'April 10, 2026',
    category: 'Europe',
    readTime: '7 min read'
  },
  {
    slug: 'how-to-find-my-iban-number',
    title: 'How to Find a Bank IBAN Number Easily',
    excerpt: 'Step-by-step guide on how to locate your International Bank Account Number (IBAN) on your bank statement, online banking, or app.',
    date: 'April 5, 2026',
    category: 'Guides',
    readTime: '3 min read'
  },
  {
    slug: 'failed-wire-transfer-wrong-bic-swift',
    title: 'Used the Wrong SWIFT / BIC Code? Here is What to Do Next',
    excerpt: 'Made a mistake on an international transfer? Learn how to trace, recall, or correct a wire transfer sent with an incorrect SWIFT code.',
    date: 'March 28, 2026',
    category: 'Troubleshooting',
    readTime: '6 min read'
  },
  {
    slug: 'uk-sort-code-vs-swift',
    title: 'UK Sort Code, Account Number, and IBAN: A Complete Guide',
    excerpt: 'Sending money to the UK? Understand the difference between UK Sort Codes, 8-digit Account Numbers, and when an IBAN is required.',
    date: 'March 22, 2026',
    category: 'UK Banking',
    readTime: '5 min read'
  }
];

export function Blog() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Blog & Guides</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Banking Guides & News
          </h1>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mt-4">
          Expert insights, how-to guides, and the latest information on international wire transfers, SWIFT codes, and global banking networks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
                <span>{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {post.readTime}
                </span>
                <span className="inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400">
                  Read Article <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
