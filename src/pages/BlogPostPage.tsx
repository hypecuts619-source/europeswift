import { useParams, Navigate, Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { WireTransferFeesFaqSchema } from "../components/SEO/StructuredDataEngine";
import { blogPosts } from "../data/blogPosts";
import { trackEvent } from "../services/analytics";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, ArrowLeft, ShieldCheck, Zap, AlertTriangle, MessageSquarePlus, Newspaper, ArrowRight, User, Landmark } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

// Internal Auto-Linker for maximum SEO
const keywordLinks = [
  { term: 'SWIFT code', url: '/what-is-a-swift-code' },
  { term: 'BIC code', url: '/swift' },
  { term: 'IBAN calculator', url: '/iban/calculator' },
  { term: 'IBAN validator', url: '/iban/validator' },
  { term: 'sort code', url: '/sort-code' },
  { term: 'routing number', url: '/routing' },
  { term: 'BLZ', url: '/blz' }
];

const relatedRecordsMapping: Record<string, { title: string, links: { name: string, url: string }[] }> = {
  'nordic': {
    title: "Browse Verified Nordic BICs",
    links: [
      { name: "Denmark SWIFT Codes", url: "/swift/denmark" },
      { name: "Finland SWIFT Codes", url: "/swift/finland" },
      { name: "Sweden SWIFT Codes", url: "/swift/sweden" },
      { name: "Norway SWIFT Codes", url: "/swift/norway" },
    ]
  },
  'currency': {
    title: "Global Conversion Hubs",
    links: [
      { name: "India SWIFT Codes", url: "/swift/india" },
      { name: "United Kingdom SWIFT Codes", url: "/swift/united-kingdom" },
      { name: "United States SWIFT Codes", url: "/swift/united-states" },
    ]
  },
  'sort-code': {
    title: "UK Financial Directories",
    links: [
      { name: "Barclays SWIFT Codes", url: "/swift/united-kingdom/barclays" },
      { name: "HSBC SWIFT Codes", url: "/swift/united-kingdom/hsbc" },
      { name: "Lloyds SWIFT Codes", url: "/swift/united-kingdom/lloyds-bank" },
    ]
  }
};

function autoLink(text: string): string {
  let result = text;
  keywordLinks.forEach(({ term, url }) => {
    // Regex to find keyword NOT surrounded by [ ] or inside ( ) or tags
    // This is a naive but effective approach for basic markdown
    const regex = new RegExp(`(?<!\\[[^\\]]*?)(?<!\\()\\b(${term}s?)\\b(?!\\))(?![^\\[]*?\\])`, 'gi');
    // We only replace the FIRST occurrence per post
    let modified = false;
    result = result.replace(regex, (match) => {
      if (!modified) {
        modified = true;
        return `[${match}](${url})`;
      }
      return match;
    });
  });
  return result;
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedRecord = Object.entries(relatedRecordsMapping).find(([key]) => 
    post.slug.toLowerCase().includes(key) || post.content.toLowerCase().includes(key)
  )?.[1];

  const isCompliance = post.executiveSummary?.compliance || post.slug.includes('compliance') || post.slug.includes('sepa');
  const author = isCompliance 
    ? {
        name: "Stephen Sebastian",
        title: "IT and Product Head",
        action: "Verified by",
        avatarUrl: "https://ui-avatars.com/api/?name=Stephen+Sebastian&background=10B981&color=fff&size=128"
      }
    : {
        name: "Mathew George",
        title: "Head of Financial Data Architecture",
        action: "Written by",
        avatarUrl: "https://ui-avatars.com/api/?name=Mathew+George&background=0D8ABC&color=fff&size=128"
      };

  // Related posts logic: pick 3 other posts
  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const relatedPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  const readingTime = Math.max(1, Math.round((post.content || "").split(/\s+/).length / 200));

  const cta = isCompliance 
    ? {
        title: "Verify Enterprise SWIFT & Clearing Identifiers Instantly",
        subtitle: "Minimize payment failure and transaction delays. Locate correct BIC codes and cross-border routing parameters.",
        btnText: "BIC & SWIFT Checker",
        path: "/swift"
      }
    : post.slug.includes("iban") 
    ? {
        title: "Calculated IBAN Validation Engine",
        subtitle: "Execute instant structure audits, checksum digit confirmation, and Basic Bank Account Number decoding.",
        btnText: "IBAN Calculator Tool",
        path: "/iban/validator"
      }
    : post.slug.includes("sort-code")
    ? {
        title: "UK Sort Code Verification Channel",
        subtitle: "Audit UK domestic routing and Confirmation of Payee parameters.",
        btnText: "BACS Sort Code Finder",
        path: "/sort-code"
      }
    : {
        title: "Access SWIFT/BIC & National Bank Directories",
        subtitle: "Retrieve verified country formatting rules, branch identifiers, and international routing routes.",
        btnText: "Global SWIFT Directory",
        path: "/swift"
      };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "dateModified": post.date,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": author.name,
      "jobTitle": author.title,
      "sameAs": `https://swiftcodedir.com/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "SwiftCodeDir",
      "logo": {
        "@type": "ImageObject",
        "url": "https://swiftcodedir.com/favicon.svg"
      }
    },
    ...(post.executiveSummary && {
      "abstract": `${post.executiveSummary.engineers} ${post.executiveSummary.compliance}`
    })
  };

  const schemas: any[] = [articleSchema];

  return (
    <div className="w-full mx-auto">
      {post.slug === "swift-wire-transfer-fees" && <WireTransferFeesFaqSchema />}
      <SEO 
        title={`${post.title} | SwiftCodeDir`}
        description={post.excerpt}
        canonicalUrl={`https://swiftcodedir.com/blog/${post.slug}`}
        ogType="article"
        jsonLd={schemas}
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
          <header className="mb-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium mb-4">
              <div className="flex items-center gap-2 text-[#003399] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-800 shadow-sm">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  Last Updated: {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/50 shadow-sm font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Fact Checked</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm font-semibold">
                <Landmark className="w-4 h-4 text-slate-400" />
                <span>{readingTime} min read</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold dark:text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            {post.executiveSummary && (
              <div className="grid md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto mt-8 mb-4">
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
                <Card className="md:col-span-2 bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30 overflow-hidden">
                  <Link to="/guides/2026-iso-20022-mandate" className="block hover:bg-amber-100/50 dark:hover:bg-amber-900/20 transition-colors">
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
                        <span className="text-xs text-amber-700 dark:text-amber-400 mt-3 inline-flex items-center gap-1 font-semibold underline underline-offset-2">
                          Visit our 2026 Regulatory Hub & EUDI Readiness Checker <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            )}
          </header>

          <div className="my-8 p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#003399] dark:bg-blue-600 text-white rounded-xl shadow-md shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{cta.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{cta.subtitle}</p>
              </div>
            </div>
            <Link 
              to={cta.path} 
              className="px-5 py-2.5 bg-[#003399] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center gap-2 group shrink-0"
            >
              {cta.btnText}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-[#003399] dark:prose-a:text-blue-400 hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300 prose-a:underline prose-a:underline-offset-4 prose-a:font-semibold prose-img:rounded-xl">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: (props: any) => {
                  const { node, ...rest } = props;
                  if (rest.href && rest.href.startsWith('/')) {
                    return <Link to={rest.href} className="underline decoration-[#003399]/30 hover:decoration-[#003399] transition-colors" {...rest}>{rest.children}</Link>;
                  }
                  return <a target="_blank" rel="noopener noreferrer" className="underline decoration-[#003399]/30 hover:decoration-[#003399] transition-colors" {...rest}>{rest.children}</a>;
                }
              }}
            >
              {autoLink(post.content)}
            </ReactMarkdown>
          </div>

          {relatedRecord && (
            <div className="mt-12 p-8 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
              <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-6 flex items-center gap-2">
                <Landmark className="w-5 h-5" /> {relatedRecord.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedRecord.links.map((link) => (
                  <Link 
                    key={link.url}
                    to={link.url}
                    className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800 text-center hover:shadow-md hover:border-emerald-500 transition-all group"
                  >
                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {link.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-xl font-bold text-[#003399] dark:text-blue-400 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Recommended Financial Tools
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "SWIFT Directory", path: "/swift", icon: "Global" },
                { name: "IBAN Validator", path: "/iban/validator", icon: "Check" },
                { name: "IBAN Calculator", path: "/iban/calculator", icon: "Calc" },
                { name: "Sort Code Checker", path: "/sort-code", icon: "UK" },
                { name: "USA Routing No.", path: "/routing", icon: "US" },
                { name: "Germany BLZ", path: "/blz", icon: "DE" },
                { name: "Banks A-Z", path: "/banks", icon: "List" },
                { name: "SWIFT Checker", path: "/swift-checker", icon: "Search" },
              ].map((tool) => (
                <Link 
                  key={tool.path}
                  to={tool.path}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-blue-100 dark:border-blue-800 text-center hover:shadow-md hover:border-[#003399] transition-all group"
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 border-4 border-white dark:border-slate-900 shadow-sm">
              <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1 uppercase tracking-widest">{author.action || "About the Author"}</p>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white leading-tight mb-1">{author.name}</h3>
              <p className="text-sm text-[#003399] dark:text-blue-400 font-medium mb-3">{author.title}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                {author.name === "Mathew George" 
                  ? "As the Head of Financial Data Architecture, Mathew oversees our comprehensive database of over 186,000 global banking endpoints, ensuring routing accuracy for international institutions."
                  : "As IT and Product Head, Stephen leads the technical infrastructure and compliance integration strategies, ensuring our platforms align with modern EUDI and Swift standardization mandates."}
              </p>
            </div>
            <Link to="/about" className="mt-4 md:mt-0 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-[#003399] dark:hover:text-blue-400 hover:border-[#003399] dark:hover:border-blue-400 transition-all shadow-sm whitespace-nowrap self-start md:self-center">
              Read Our Methodology
            </Link>
          </div>

          {/*  */}

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
    </div>
  );
}
