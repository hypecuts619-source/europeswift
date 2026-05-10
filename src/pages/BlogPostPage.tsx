import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SEO } from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, ArrowLeft } from "lucide-react";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "SwiftCodeDir"
    }
  };

  return (
    <main className="w-full mx-auto px-4 py-8 md:py-16">
      <SEO 
        title={`${post.title} | SwiftCodeDir`}
        description={post.excerpt}
        canonicalUrl={window.location.href}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="max-w-3xl mx-auto">
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
            <h1 className="text-3xl md:text-5xl font-extrabold dark:text-white tracking-tight leading-tight">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-[#003399] dark:prose-a:text-blue-400 hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300 prose-img:rounded-xl">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, href, children, ...props }) => {
                  if (href && href.startsWith('/')) {
                    return <Link to={href} {...props}>{children}</Link>;
                  }
                  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}
