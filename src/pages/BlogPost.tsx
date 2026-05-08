import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { BLOG_POSTS } from './Blog';

export function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <Link to="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
      </Link>

      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink to="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{post.category}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-14 shadow-sm mb-12">
        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-6">
          <span>{post.category}</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm mb-10">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium text-slate-700 dark:text-slate-300">SwiftcodeDir Editorial</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
            {post.excerpt}
          </p>
          
          <p>
            When making international payments or receiving wire transfers from abroad, you have likely encountered terms like SWIFT code, BIC, IBAN, or routing number. In this comprehensive guide, we will break down exactly what these terms mean, why they are essential for secure cross-border transactions, and how to find the correct banking codes for your needs.
          </p>

          <h2>Understanding the Banking Network</h2>
          <p>
            The global banking system relies on an interconnected network of financial institutions. To ensure money flows securely and accurately from one account to another, especially across international borders, standard identification codes were created.
          </p>
          <p>
            The Society for Worldwide Interbank Financial Telecommunication (SWIFT) network is the primary messaging system used by banks worldwide to transmit payment instructions. By using unique identification codes (BICs), the network ensures precision.
          </p>

          <h3>Finding Your Code</h3>
          <p>
            Most modern banks list their SWIFT code on bank statements, within the online banking portal, or on the official website. Alternatively, you can use lookup tools like SwiftcodeDir to verify a code's validity before executing a transfer, preventing costly delays and failed payment fees.
          </p>
          
          <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-xl my-8 border border-blue-100 dark:border-slate-700">
            <h4 className="text-blue-900 dark:text-blue-300 font-bold mt-0 mb-2">Pro Tip</h4>
            <p className="text-blue-800 dark:text-blue-400 mb-0">Always verify the SWIFT code with your recipient before initiating a large wire transfer. Many banks have different SWIFT codes for different branches or specific types of transactions (e.g., Forex, Trade Finance).</p>
          </div>

          <p>
            Double-checking these details ensures your funds arrive seamlessly and securely at their intended destination.
          </p>
        </div>
      </div>
    </div>
  );
}
