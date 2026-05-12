import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SEO } from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { AdSense } from "../components/AdSense";

export function BlogIndex() {
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SwiftCodeDir Banking Insights",
    "url": window.location.href,
    "description": "Guides, explanations, and insights into the world of international finance, SWIFT codes, and secure money transfers.",
    "blogPost": sortedPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "description": post.excerpt,
      "url": `${window.location.origin}/blog/${post.slug}`
    }))
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
      <SEO 
        title="Banking Insights & SWIFT Code Guides | SwiftCodeDir"
        description="Read our latest articles and guides on international wire transfers, SWIFT codes, IBANs, and global banking."
        canonicalUrl={window.location.href}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight dark:text-white">
          Banking <span className="text-[#003399] dark:text-blue-400">Insights</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Guides, explanations, and insights into the world of international finance, SWIFT codes, and secure money transfers.
        </p>
      </div>

      <AdSense slot="blog_index_top" className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPosts.map((post, index) => (
          <motion.article 
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </div>
              
              <Link to={`/blog/${post.slug}`} className="block group-hover:text-[#003399] dark:group-hover:text-blue-400">
                <h2 className="text-xl font-bold dark:text-white mb-3 leading-snug">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                {post.excerpt}
              </p>
              
              <Link 
                to={`/blog/${post.slug}`} 
                className="inline-flex items-center font-medium text-sm text-[#003399] dark:text-blue-400 group/link"
              >
                Read Article
                <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <AdSense slot="blog_index_bottom" className="mt-16" />
    </main>
  );
}
