import { useParams, Navigate, Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import { trackEvent } from "../services/analytics";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, ArrowLeft, ShieldCheck, Zap, AlertTriangle, MessageSquarePlus, Newspaper } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { AdSense } from "../components/AdSense";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Related posts logic: pick 3 other posts
  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const relatedPosts = blogPosts
    .filter((_, idx) => idx !== currentIndex)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "SwiftCodeDir Architectural Team"
    },
    ...(post.executiveSummary && {
      "abstract": `${post.executiveSummary.engineers} ${post.executiveSummary.compliance}`
    })
  };

  return (
    <main className="w-full mx-auto px-4 py-8 md:py-16">
      <SEO 
        title={`${post.title} | SwiftCodeDir`}
        description={post.excerpt}
        canonicalUrl={window.location.href}
        ogType="article"
        jsonLd={articleSchema}
      />

      <div className="max-w-4xl mx-auto">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#003399] dark:text-slate-400 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Blog
        </Link>
        
        <article className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
          <header className="mb-10 text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-[#003399] dark:text-blue-400 mb-4 bg-blue-50 dark:bg-blue-900/30 w-fit mx-auto px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold dark:text-white tracking-tight leading-tight mb-8">
              {post.title}
            </h1>

            {post.executiveSummary && (
              <div className="grid md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto mb-12">
                <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
                  <CardContent className="p-5">
                    <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Zap className="w-3 h-3" /> Impact for Engineers
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {post.executiveSummary.engineers}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30">
                  <CardContent className="p-5">
                    <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3" /> Impact for Compliance
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {post.executiveSummary.compliance}
                    </p>
                  </CardContent>
                </Card>
                <Card className="md:col-span-2 bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-1">
                        Critical Action Required (Q2 2026)
                      </h3>
                      <p className="text-sm text-amber-900 dark:text-amber-200 font-bold">
                        {post.executiveSummary.actionRequired}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </header>

          <AdSense slot="blog_post_top" className="mb-10" />

          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-[#003399] dark:prose-a:text-blue-400 hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300 prose-img:rounded-xl">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: (props: any) => {
                  const { node, ...rest } = props;
                  if (rest.href && rest.href.startsWith('/')) {
                    return <Link to={rest.href} {...rest}>{rest.children}</Link>;
                  }
                  return <a target="_blank" rel="noopener noreferrer" {...rest}>{rest.children}</a>;
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <AdSense slot="blog_post_bottom" className="my-12" />

          <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
             <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
               <Newspaper className="w-6 h-6 text-[#003399] dark:text-blue-400" />
               Related Topics
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
               {relatedPosts.map(rp => (
                 <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group">
                   <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 h-full hover:border-[#003399] dark:hover:border-blue-400 transition-all flex flex-col">
                     <time className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">{new Date(rp.date).toLocaleDateString()}</time>
                     <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
                       {rp.title}
                     </h4>
                     <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-auto">
                       {rp.excerpt}
                     </p>
                   </div>
                 </Link>
               ))}
             </div>

             <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Help Us Maintain Accuracy</h3>
                  <p className="text-slate-400 text-sm">
                    Have you noticed a change in your bank's regulatory status or SWIFT routing?
                  </p>
                </div>
                <button 
                  onClick={() => trackEvent('report_compliance_update', { post: post.title })}
                  className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors whitespace-nowrap"
                >
                  <MessageSquarePlus className="w-5 h-5" /> Report a Compliance Update
                </button>
             </div>
          </div>
        </article>
      </div>
    </main>
  );
}
