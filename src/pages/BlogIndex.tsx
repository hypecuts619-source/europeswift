import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SEO } from "../components/SEO";
import { blogPosts } from "../data/blogPosts";
import { Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export function BlogIndex() {
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SwiftCodeDir Banking Insights",
    "url": "https://swiftcodedir.com/blog",
    "description": "Guides, explanations, and insights into the world of international finance, SWIFT codes, and secure money transfers.",
    "blogPost": sortedPosts.map(post => {
      const isCompliance = post.executiveSummary?.compliance || post.slug.includes('compliance') || post.slug.includes('sepa');
      const author = isCompliance 
        ? { name: "Stephen Sebastian", title: "IT and Product Head" } 
        : { name: "Mathew George", title: "Head of Financial Data Architecture" };
      return {
        "@type": "BlogPosting",
        "headline": post.title,
        "datePublished": post.date,
        "description": post.excerpt,
        "url": `https://swiftcodedir.com/blog/${post.slug}`,
        "author": {
          "@type": "Person",
          "name": author.name,
          "jobTitle": author.title
        },
        "publisher": {
          "@type": "Organization",
          "name": "SwiftCodeDir",
          "logo": {
            "@type": "ImageObject",
            "url": "https://swiftcodedir.com/favicon.svg"
          }
        }
      };
    })
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <SEO 
        title="SWIFT & BIC Code Guides, IBAN Tips & International Payment How-tos | SWIFT Code Directory"
        description="Explore the authoritative guide to BIC formatting codes, IBAN verification parameters, UK sort codes, and compliance frameworks written by financial experts."
        canonicalUrl="https://swiftcodedir.com/blog"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight dark:text-white">
          Banking <span className="text-[#003399] dark:text-blue-400">Insights</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Authoritative technical resources, regulatory updates, and expert walk-throughs mapping international routing standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {sortedPosts.map((post, index) => {
          const isCompliance = post.executiveSummary?.compliance || post.slug.includes('compliance') || post.slug.includes('sepa');
          const authorName = isCompliance ? "Stephen Sebastian" : "Mathew George";
          const readingTime = Math.max(1, Math.round((post.content || "").split(/\s+/).length / 200));

          return (
            <motion.article 
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mb-4 font-semibold uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                  <span className="text-slate-300 dark:text-slate-800 font-normal">|</span>
                  <span className="text-[#003399] dark:text-blue-400">{authorName}</span>
                  <span className="text-slate-300 dark:text-slate-800 font-normal">|</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> Verified
                  </span>
                  <span className="text-slate-300 dark:text-slate-800 font-normal">|</span>
                  <span>{readingTime}m read</span>
                </div>
                
                <Link to={`/blog/${post.slug}`} className="block group-hover:text-[#003399] dark:group-hover:text-blue-400">
                  <h2 className="text-xl font-bold dark:text-white mb-3 leading-snug">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="inline-flex items-center font-bold text-sm text-[#003399] dark:text-blue-400 group/link mt-auto"
                >
                  Read Full Guide
                  <ArrowRight className="ml-1.5 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
