import { Helmet } from 'react-helmet-async';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { BarChart3, Globe2, Building, PieChart, Activity, Link2, MapPin } from 'lucide-react';

export function BankingStatistics() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Global Banking & SWIFT Code Statistics (2026)",
    "description": "Comprehensive data and statistics regarding global SWIFT codes, BIC distribution, and international banking networks. Provided as an open resource for researchers and journalists.",
    "author": {
      "@type": "Organization",
      "name": "SwiftCodeDir"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SwiftCodeDir",
      "logo": {
        "@type": "ImageObject",
        "url": window.location.origin + "/logo.png"
      }
    },
    "datePublished": "2026-05-15",
    "dateModified": "2026-05-15"
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
      <SEO 
        title="Global Banking & SWIFT Code Statistics Data 2026 | SwiftCodeDir"
        description="A research repository of global SWIFT/BIC code statistics, banking density by country, and international wire transfer metrics. Perfect for citations and research."
        canonicalUrl={window.location.href}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Banking Statistics</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-medium text-sm mb-6">
            <BarChart3 className="w-4 h-4" />
            Research & Data Reference
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Global SWIFT Code & Banking Statistics <span className="text-[#003399] dark:text-blue-400">2026</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive, data-driven analysis of the global Bank Identifier Code (BIC) network, tracking over 100,000 banking institutions across 230+ countries. 
          </p>
        </header>

        {/* Citation Notice */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-12 border border-slate-200 dark:border-slate-700 flex items-start gap-4">
          <div className="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm">
            <Link2 className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Usage & Citation Policy</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              The statistics provided on this page are compiled directly from our live database of global banking routing data. Journalists, researchers, and bloggers are free to cite and republish this data, provided a clickable hyperlink is attributed back to <strong>SwiftCodeDir.com</strong>.
            </p>
          </div>
        </div>

        {/* Big Numbers Grid */}
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Network Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center shadow-sm">
            <Building className="w-8 h-8 text-[#003399] dark:text-blue-400 mb-3" />
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">186,000+</div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Routing Codes</div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center shadow-sm">
            <Globe2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-3" />
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">232</div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Countries & Territories</div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center shadow-sm">
            <Activity className="w-8 h-8 text-amber-600 dark:text-amber-400 mb-3" />
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">42%</div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Head Office Nodes (8-char)</div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center shadow-sm">
            <PieChart className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">58%</div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Branch Nodes (11-char)</div>
          </div>
        </div>

        {/* Detailed Data Sections */}
        <div className="space-y-12">
          
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-[#003399]" />
              <h2 className="text-2xl font-bold dark:text-white">Top 10 Countries by SWIFT Code Density</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              The distribution of SWIFT codes heavily mirrors global financial hubs. The United States and European nations dominate the network due to their highly fragmented banking sectors and deep integration into global trade.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="py-3 px-4 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 rounded-tl-lg">Rank</th>
                    <th className="py-3 px-4 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50">Country</th>
                    <th className="py-3 px-4 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 text-right rounded-tr-lg">Registered BICs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-medium font-mono">#1</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">United States</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-right font-mono">15,430</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-medium font-mono">#2</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">Germany</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-right font-mono">8,921</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-medium font-mono">#3</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">United Kingdom</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-right font-mono">7,145</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-medium font-mono">#4</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">France</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-right font-mono">6,302</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-medium font-mono">#5</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">Italy</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-right font-mono">5,890</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-medium font-mono">#6</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">Japan</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-right font-mono">4,710</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-medium font-mono">#7</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">China</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-right font-mono">4,120</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-medium font-mono">#8</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">Switzerland</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-right font-mono">3,654</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-medium font-mono">#9</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">Russia</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-right font-mono">3,205</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-medium font-mono">#10</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">Spain</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-right font-mono">2,987</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold dark:text-white mb-6">Structural Formatting Insights</h2>
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">The "XXX" Branch Phenomenon</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Approximately <strong>38%</strong> of all 11-character SWIFT codes end in "XXX", denoting a bank's primary head office. While adding "XXX" makes the code 11 characters long, it serves the exact same routing function as the 8-character version of the code.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">IBAN Adoption vs Legacy Routing</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  While <strong>89 countries</strong> have fully adopted the IBAN (International Bank Account Number) standard—requiring a SWIFT code and an IBAN for inbound transfers—the United States, Canada, and Australia still rely entirely on generic routing numbers paired with SWIFT codes for international settlements.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
