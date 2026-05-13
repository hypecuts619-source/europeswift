import React from 'react';
import { ShieldCheck, Info, Zap, Calendar, ArrowRight, ExternalLink, Globe, Landmark, FileText, Download, Layout, Share2, Youtube, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { REGULATORY_HUB_DATA } from '../../data/regulatoryHub';
import { VISUAL_AUTHORITY_DATA } from '../../data/visualAuthority';
import { motion } from 'motion/react';
import { SEO } from '../../components/SEO';
import { trackEvent } from '../../services/analytics';
import { getDaysRemaining } from '../../lib/dateUtils';

export function RegulatoryHub() {
  const daysRemaining = getDaysRemaining('2026-11-14');
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the PSD3 final compromise text of April 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Published on April 23, 2026, the PSD3 compromise mandates Verification of Payee (VoP) for all SEPA transfers and shifts fraud liability to banks that fail to detect name mismatches."
        }
      },
      {
        "@type": "Question",
        "name": "When is the mandatory structured address deadline for SWIFT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The mandatory enforcement of structured postal addresses (ISO 20022 schemas) begins in November 2026. Payments using unstructured legacy formats will be rejected by clearing houses."
        }
      },
      {
        "@type": "Question",
        "name": "What happened to the P27 Nordic payments project in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Following the withdrawal of the P27 project, Nordic banks like SEB and Nordea are modernizing independently with native ISO 20022 XML gateways to meet the December 2026 clearing decommissioning deadline."
        }
      }
    ]
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <SEO 
        title="May 2026 Banking Intelligence Hub | PSD3, P27 & UBS Merger | SwiftCodeDir"
        description="Expert analysis of the May 2026 banking landscape: PSD3 compromise texts, Nordic clearing modernization post-P27, and the final UBS/Credit Suisse SWIFT migration."
        jsonLd={faqSchema}
      />

      {/* Mandatory Infrastructure Deadline Countdown */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12 p-6 bg-slate-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-950">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight">ISO 20022 Structured Address Deadline</h3>
            <p className="text-slate-400 text-sm">Nov 14, 2026 — Mandatory Option F Migration</p>
          </div>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-4xl font-black text-amber-500 tabular-nums">{daysRemaining}</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 leading-tight">Days<br/>Remaining</span>
        </div>
      </motion.div>

      {/* Hero Section */}
      <div className="mb-16 text-center">
        <Badge variant="outline" className="mb-4 py-1 px-4 border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-bold uppercase tracking-widest text-[10px]">
           Q2 2026 Intelligence
        </Badge>
        <h1 className="text-4xl md:text-6xl font-black mb-6 font-serif dark:text-slate-100 tracking-tight">
          Regulatory Knowledge <span className="text-blue-600 dark:text-blue-500">Hub</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          The definitive May 2026 briefing for financial architects. Tracking the shift from legacy clearing to 
          <span className="font-bold text-slate-900 dark:text-slate-200"> ISO 20022 Native ecosystems</span> and PSD3 harmonization.
        </p>
      </div>

      {/* SGE Answer Block (GEO Optimized) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 p-8 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-3xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-blue-600 text-white hover:bg-blue-700 uppercase tracking-tighter text-[10px]">AI-Optimized Intelligence</Badge>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Target Query: {VISUAL_AUTHORITY_DATA.sge_answer_block.topic}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
          Understanding the 2026 SWIFT Infrastructure Shift
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed italic font-serif">
            {VISUAL_AUTHORITY_DATA.sge_answer_block.content}
          </p>
        </div>
      </motion.div>


      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {REGULATORY_HUB_DATA.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col border-2 border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all shadow-sm">
              <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                   <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {insight.last_updated}
                   </div>
                   <Badge variant="secondary" className="text-[9px]">{insight.status_key}</Badge>
                </div>
                <CardTitle className="text-xl font-bold dark:text-white leading-tight">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="mb-6">
                   <h4 className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                     <Zap className="w-3 h-3" /> Current Status
                   </h4>
                   <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                     {insight.status_content}
                   </p>
                </div>

                <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/30">
                   <h4 className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 mb-2">
                     Architect's Note
                   </h4>
                   <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                     {insight.expert_note}
                   </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                   <h4 className="text-[10px] font-black uppercase text-slate-500 mb-3">GEO Extraction Capsule</h4>
                   <p className="text-[13px] italic text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/30 p-3 rounded-lg">
                     "{insight.geo_capsule.substring(0, 160)}..."
                   </p>
                   <button 
                     onClick={() => trackEvent('view_regulatory_insight', { id: insight.id, title: insight.title })}
                     className="w-full mt-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                   >
                      View Full Analysis <ArrowRight className="w-3 h-3" />
                   </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Featured Reports & Whitepapers */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8 dark:text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          Featured Q2 2026 Reports
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
           <Card className="flex flex-col md:flex-row group cursor-pointer" onClick={() => trackEvent('download_whitepaper', { id: 'iso20022-migration-guide' })}>
              <div className="md:w-32 bg-blue-600 flex items-center justify-center p-6 text-white group-hover:bg-blue-700 transition-colors">
                 <Download className="w-8 h-8" />
              </div>
              <div className="p-6">
                 <h3 className="font-bold mb-2 group-hover:text-blue-600 transition-colors">ISO 20022 Migration Masterclass</h3>
                 <p className="text-sm text-slate-500 mb-4">Detailed technical guide on mapping legacy unstructured data to XML structured tags for November 2026.</p>
                 <Badge variant="outline" className="text-[10px]">PDF · 4.2 MB</Badge>
              </div>
           </Card>

           <Card className="flex flex-col md:flex-row group cursor-pointer" onClick={() => trackEvent('download_whitepaper', { id: 'psd3-compliance-framework' })}>
              <div className="md:w-32 bg-emerald-600 flex items-center justify-center p-6 text-white group-hover:bg-emerald-700 transition-colors">
                 <Download className="w-8 h-8" />
              </div>
              <div className="p-6">
                 <h3 className="font-bold mb-2 group-hover:text-emerald-600 transition-colors">PSD3 & PSR Compliance Framework</h3>
                 <p className="text-sm text-slate-500 mb-4">Architectural blueprints for Verification of Payee (VoP) integration across multi-BIC institutions.</p>
                 <Badge variant="outline" className="text-[10px]">PDF · 3.8 MB</Badge>
              </div>
           </Card>
        </div>
      </div>

      {/* Visual Authority Batch */}
      <div className="mb-20 grid lg:grid-cols-2 gap-12">
        {/* Pinterest/LinkedIn Template Preview */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white">
            <Layout className="w-5 h-5 text-blue-600" />
            Social Authority Asset: Scorecard Template
          </h3>
          <div className="aspect-[4/5] bg-slate-950 rounded-3xl p-10 flex flex-col justify-between text-white border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-600/20 transition-all" />
            
            <div>
              <div className="w-12 h-12 bg-blue-600 rounded-xl mb-6 flex items-center justify-center font-black text-2xl italic">S</div>
              <h4 className="text-4xl font-black leading-tight mb-4 tracking-tighter">
                IS YOUR BANK<br/>READY FOR<br/><span className="text-blue-500">NOV 2026?</span>
              </h4>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-10">Institutional Readiness Benchmark</p>
              
              <div className="space-y-6">
                {[
                  { name: "Structured Address (Option F)", status: "MANDATORY" },
                  { name: "VoP v1.1 Compliance", status: "ENFORCED" },
                  { name: "EUDI Pilot Status", status: "ACTIVE" }
                ].map((m) => (
                  <div key={m.name} className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm font-bold opacity-80">{m.name}</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">{m.status}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-10 border-t border-white/5">
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-50">swiftcodedir.com</span>
              <Share2 className="w-5 h-5 text-slate-500" />
            </div>
          </div>
          <button className="w-full py-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
            Download High-Res Asset for LinkedIn <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Video Script Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white">
            <Youtube className="w-5 h-5 text-red-600" />
            Engagement Clip: YouTube Shorts Script
          </h3>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold dark:text-white">15-Second Ad Script</p>
                  <p className="text-xs text-slate-500 font-medium italic">High-Retention Financial Hook</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <p className="text-[10px] font-black text-red-600 uppercase mb-2">0s - 5s: The Hook</p>
                  <p className="text-lg font-bold leading-tight">"{VISUAL_AUTHORITY_DATA.ad_clip_script.hook}"</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <p className="text-[10px] font-black text-slate-500 uppercase mb-2">5s - 10s: The Risk</p>
                  <p className="text-lg font-bold leading-tight">"{VISUAL_AUTHORITY_DATA.ad_clip_script.body}"</p>
                </div>
                <div className="p-4 bg-blue-600 text-white rounded-xl shadow-lg transform rotate-1">
                  <p className="text-[10px] font-black uppercase mb-2 opacity-80">10s - 15s: The CTA</p>
                  <p className="text-lg font-black leading-tight italic">"{VISUAL_AUTHORITY_DATA.ad_clip_script.cta}"</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
               <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase italic">
                  <Zap className="w-4 h-4 text-amber-500" /> AI-Generated Video Strategy v2.1
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Scorecard Section */}
      <div className="mb-20 p-8 bg-slate-900 text-white rounded-3xl border border-slate-800">
        <div className="max-w-3xl">
          <Badge className="bg-blue-500 hover:bg-blue-600 mb-4 uppercase tracking-widest text-[10px]">Social Authority</Badge>
          <h2 className="text-3xl font-bold mb-4">Q2 2026 Regional Compliance Scorecard</h2>
          <p className="text-slate-400 mb-10">Cross-territory benchmarks for ISO 20022 readiness, EUDI wallet adoption, and PSR liability alignment.</p>
          
          <div className="space-y-8">
            {[
              { region: "Germany (EU)", score: 96, label: "Leader in EUDI Pilot (IT-Wallet alignment)" },
              { region: "United Kingdom", score: 94, label: "NPA harmonization & CoP strict enforcement" },
              { region: "France (EU)", score: 97, label: "STET Clearing modernization & Wero integration" },
            ].map((item) => (
              <div key={item.region} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-sm font-bold block">{item.region}</span>
                    <span className="text-[11px] text-slate-500 uppercase">{item.label}</span>
                  </div>
                  <span className="text-2xl font-black text-blue-400">{item.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex flex-wrap gap-4">
            <button className="px-6 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
              Download Regional Whitepapers
            </button>
            <button 
              onClick={() => trackEvent('share_scorecard', { type: 'global' })}
              className="px-6 py-2 border border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Share Q2 Benchmark
            </button>
          </div>
        </div>
      </div>

      {/* SEO/Authority Content Section */}
      <div className="mt-20 prose prose-slate dark:prose-invert max-w-4xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-16">
        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-8">
          The Q2 2026 Banking Paradigm Shift
        </h2>
        <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-8">
          <p>
            As we move deeper into the second quarter of 2026, the global payment infrastructure is experiencing a convergence 
            of regulatory pressure and technological readiness. The transition from legacy messaging standards to 
            <strong> ISO 20022 Native ecosystems</strong> is no longer a strategic choice but a operational necessity 
            mandated by both the European Central Bank and regional competent authorities.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 not-prose">
             <Card className="bg-slate-950 text-white p-6 border-none">
                <Globe className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="font-bold text-lg mb-2 text-white">Post-P27 Nordic Resilience</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  With the withdrawal of the P27 Nordic Payments project, the dream of a unified regional clearing hub has 
                  morphed into a competition for independent modernization. Banks in Sweden, Norway, and Finland are 
                  now prioritizing the 'Finnish Model' of integration with Eurosystem consolidated platforms (T2/T2S).
                </p>
             </Card>
             <Card className="bg-slate-950 text-white p-6 border-none">
                <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="font-bold text-lg mb-2 text-white">PSD3 Fraud Mitigation</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The April 2026 compromise text specifically targets 'Authorised Push Payment' (APP) fraud. By mandating 
                  Verification of Payee (VoP) at the BIC level, the new PSR shifts the liability paradigm, encouraging 
                  banks to adopt AI-driven transaction monitoring before final settlement.
                </p>
             </Card>
          </div>

          <p>
            The decommissioning of legacy systems, such as the final Credit Suisse technological sunset scheduled for December 2026, 
            marks the end of the 'Hybrid Era.' Moving forward, BIC routing will be intrinsically linked to high-granularity 
            postal data and <strong>EUDI Wallet strong authentication</strong>, significantly reducing the probability 
            of identity spoofing in international trade finance.
          </p>
        </div>
      </div>
    </main>
  );
}
