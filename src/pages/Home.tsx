import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Search, Globe, CreditCard, ChevronRight, ArrowRight, Landmark, Zap, Calculator } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { SEO } from '../components/SEO';
import { Badge } from '../components/ui/badge';
import { InternalEquityLinks } from '../components/SEO/InternalEquityLinks';
import { AdsterraNativeSlot } from '../components/AdsterraNativeSlot';

import { getDaysRemaining } from '../lib/dateUtils';

const DirectorySearch = lazy(() => import('../components/DirectorySearch').then(module => ({ default: module.DirectorySearch })));

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Home() {
  const { t } = useLanguage();
  const daysRemaining = getDaysRemaining('2026-11-14');

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a SWIFT / BIC code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A SWIFT code or Business Identifier Code (BIC) is a standard format of Bank Identifier Codes used to identify banks and financial institutions globally, verifying money transfers between institutions."
        }
      },
      {
        "@type": "Question",
        "name": "How many bank directories are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our directory currently holds over 186,000 banking codes including BICs, Sort Codes, and BLZs across multiple countries, providing one of the most comprehensive free databases for international bank routing."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between an IBAN and a SWIFT code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A SWIFT code identifies a specific bank or branch internationally, while an IBAN identifies a specific individual bank account in a particular country. You typically need both to complete an international wire transfer."
        }
      },
      {
        "@type": "Question",
        "name": "Are SWIFT codes 8 or 11 characters long?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SWIFT codes can be either 8 or 11 characters. An 8-character code refers to the primary or head office of a bank, while an 11-character code includes a 3-character branch code at the end to identify a specific branch."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if I use the wrong SWIFT code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you use an incorrect SWIFT code, your transfer may be delayed, returned, or subject to additional fees as it gets routed improperly or rejected by the receiving banking network."
        }
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SwiftCodeDir",
    "url": "https://swiftcodedir.com",
    "logo": "https://swiftcodedir.com/icon-512.png",
    "description": "The world's most comprehensive directory of SWIFT / BIC codes, IBAN validation tools, and global banking routing numbers.",
    "sameAs": [
      "https://twitter.com/swiftcodedir"
    ]
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Global SWIFT/BIC Codes Directory",
    "description": "Database of 186,000+ banking codes, including BICs, branch codes, and bank addresses for 89 countries.",
    "url": "https://swiftcodedir.com",
    "creator": {
      "@type": "Organization",
      "name": "SwiftCodeDir"
    },
    "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    "isAccessibleForFree": true,
    "keywords": "SWIFT, BIC, Banks, Financial Institutions, Routing Numbers"
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "USRoutingNumber.com Verification Engine",
    "url": "https://usroutingnumber.com",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": "Client-side Modulo 10 check-digit validation, offline local storage tracking, sub-millisecond bank directory search filtering."
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SwiftCodeDir",
      "url": "https://swiftcodedir.com",
      "description": t('home.subtitle'),
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://swiftcodedir.com/swift/{search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    organizationSchema,
    datasetSchema,
    faqSchema,
    webApplicationSchema
  ];

  return (
    <div className="w-full mx-auto py-8 md:py-16">
      <SEO 
        title="US Routing Number Lookup: Instant Check & Verification"
        description="Instantly find and verify any US bank routing number. Run client-side Modulo 10 checksum validation to prevent transfer errors. 100% secure."
        canonicalUrl="https://swiftcodedir.com"
        jsonLd={jsonLd}
      />

      {/* Mandatory Infrastructure Deadline Countdown */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-center justify-center gap-3 text-center"
      >
        <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
        <span className="text-xs font-black text-amber-900 dark:text-amber-200 uppercase tracking-widest">
          {daysRemaining} Days to Mandatory ISO 20022 Structured Addresses (Nov 14, 2026)
        </span>
      </motion.div>

      {/* Internal Equity Link Distributor (Above Fold for Elite SEO Authority) */}
      <InternalEquityLinks />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="inline-flex px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow transition-all relative group overflow-hidden">
            <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#003399] dark:text-blue-400" />
              Database of 186,000+ Banking Codes
            </span>
          </div>
          <div className="inline-flex px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow transition-all cursor-pointer relative group overflow-hidden" onClick={() => window.location.href='/iban/complete-coverage'}>
            <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <span role="img" aria-label="check" className="text-emerald-500">✓</span> 101 IBAN Regions <span className="opacity-60 font-normal capitalize hidden sm:inline">Including all territories</span>
            </span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1] selection:bg-blue-100 dark:selection:bg-blue-900/50">
          {t('home.title')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          {t('home.subtitle')}
        </p>
        
        <div className="max-w-2xl mx-auto relative bg-white dark:bg-slate-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] text-left border border-slate-200/80 dark:border-slate-800 transition-all hover:shadow-[0_8px_40px_rgb(0,51,153,0.1)] dark:hover:shadow-[0_8px_40px_rgb(59,130,246,0.1)]">
          <Suspense fallback={<div className="h-14 bg-gray-50 dark:bg-slate-950 rounded-xl animate-pulse w-full"></div>}>
            <DirectorySearch />
          </Suspense>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 italic absolute -bottom-8 left-0 right-0 text-center">
            Example: <span className="font-mono">Barclays Bank</span>, <span className="font-mono">Frankfurt</span>, or <span className="font-mono">CHASUS33</span>
          </p>
        </div>
      </motion.section>

      {/* Top Adsterra Native Slot (Below Hero) */}
      <section className="mb-16 w-full flex justify-center">
        <AdsterraNativeSlot zoneId="d3204c449d1c550b52260207ce88c485" format="horizontal" />
      </section>

      {/* Services Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      >
        {/* SWIFT Search Service */}
        <motion.div variants={item}>
          <Link to="/swift" className="group h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/50 hover:-translate-y-1 transition-all flex flex-col relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#003399] opacity-[0.03] dark:opacity-5 rounded-full group-hover:scale-110 transition-transform"></div>
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mb-6 text-[#003399] dark:text-blue-400">
              <Globe className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">SWIFT / BIC Directory</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 flex-1">
              Find verified SWIFT codes for every bank branch across Europe. Accurate, updated, and ready for your transfers.
            </p>
            <div className="flex items-center text-sm font-bold text-[#003399] dark:text-blue-400">
              Browse Countries <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>

        {/* Mobile Ad Unit */}
        <div className="block md:hidden">
          
        </div>

        {/* IBAN Services */}
        <motion.div variants={item} className="md:col-span-2 lg:col-span-1">
          <div className="h-full flex flex-col gap-4">
            <Link to="/iban/validator" className="group flex-1 bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-8 shadow-xl hover:bg-slate-800 hover:-translate-y-1 hover:shadow-2xl transition-all flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#003399] to-transparent opacity-20 z-0"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-3">IBAN Validator</h2>
                <p className="text-slate-300 mb-8 flex-1">
                  Instantly verify IBAN structure, MOD-97 checks, and bank identification for all SEPA zone countries.
                </p>
                <div className="flex items-center text-sm font-bold text-white uppercase tracking-wider">
                  Validate Now <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            
            <Link to="/iban/calculator" className="group flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/50 hover:-translate-y-1 transition-all flex flex-col relative overflow-hidden">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mb-6 text-[#003399] dark:text-blue-400">
                <Calculator className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold mb-3 dark:text-white group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">IBAN Calculator</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 flex-1">
                Convert local bank codes and account numbers into fully formatted, compliant IBANs.
              </p>
              <div className="flex items-center text-sm font-bold text-[#003399] dark:text-blue-400">
                Generate IBAN <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* UK Sort Codes Service */}
        <motion.div variants={item}>
          <Link to="/sort-code" className="group h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/50 hover:-translate-y-1 transition-all flex flex-col relative overflow-hidden">
             <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-slate-400 dark:text-slate-500">
              <CreditCard className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">UK Sort Codes</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 flex-1">
              Search the complete database of UK bank sort codes, branch locations, and clearing information.
            </p>
            <div className="flex items-center text-sm font-bold text-[#003399] dark:text-blue-400">
              Find Code <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>

        {/* German BLZ Service */}
        <motion.div variants={item}>
          <Link to="/blz" className="group h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/50 hover:-translate-y-1 transition-all flex flex-col relative overflow-hidden">
             <div className="w-14 h-14 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-500">
              <Landmark className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">German BLZ</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 flex-1">
              Access the official German Bankleitzahl (BLZ) directory for all regional and national banks in Germany.
            </p>
            <div className="flex items-center text-sm font-bold text-[#003399] dark:text-blue-400">
              Explore BLZ <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>

        {/* US Routing Numbers Service */}
        <motion.div variants={item}>
          <Link to="/routing-number" className="group h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/50 hover:-translate-y-1 transition-all flex flex-col relative overflow-hidden">
             <div className="w-14 h-14 bg-green-50 dark:bg-green-950/30 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-500">
              <Search className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">US Top Banks</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 flex-1">
              Verify ABA Routing Transit Numbers (RTN) for the largest American banks and financial institutions.
            </p>
            <div className="flex items-center text-sm font-bold text-[#003399] dark:text-blue-400">
              View US Banks <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>

        {/* Knowledge Base */}
        <motion.div variants={item}>
          <Link to="/blog" className="group h-full bg-slate-50 dark:bg-slate-900/40 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-8 hover:bg-white dark:hover:bg-slate-900 hover:border-solid hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col relative overflow-hidden">
             <div className="w-14 h-14 bg-purple-50 dark:bg-purple-950/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-500">
              <Landmark className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors">Knowledge Base</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 flex-1">
              Expert guides on wire transfers, PSD3 regulations, and international bank routing practices.
            </p>
            <div className="flex items-center text-sm font-bold text-[#003399] dark:text-blue-400">
              Read Guides <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* SWIFT Anatomy Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-[#003399] rounded-[2.5rem] p-8 md:p-14 text-white mb-16 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-2xl relative z-10">
          <h2 className="text-3xl font-bold mb-6">How SWIFT/BIC Codes Work</h2>
          <p className="text-blue-100 mb-10 text-lg">
            A SWIFT code (or BIC) is an 8 to 11 character identifier for a specific bank. Knowing the structure helps you verify the accuracy of your transfer details.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-3xl font-mono font-bold mb-1">DEUT</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-blue-300">Bank Code</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-3xl font-mono font-bold mb-1">DE</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-blue-300">Country</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-3xl font-mono font-bold mb-1">FF</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-blue-300">Location</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-3xl font-mono font-bold mb-1">XXX</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-blue-300">Branch</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Regulatory Hub Promo */}
      <motion.div variants={item} className="mb-20">
        <Link to="/regulatory-hub" className="group block relative rounded-3xl overflow-hidden bg-slate-950 p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-blue-600 hover:bg-blue-600 text-white border-none py-1 px-3 text-[10px] uppercase font-bold tracking-widest">
                Intelligence Update 2026
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif tracking-tight">
                Banking Intelligence & Regulatory Hub
              </h2>
              <p className="text-slate-400 max-w-xl text-lg leading-relaxed mb-8">
                Expert analysis of PSD3, the Nordic P27 phase-out, and global SWIFT migration standards. 
                Stay ahead of the November 2026 Structured Address mandate.
              </p>
              <div className="inline-flex items-center gap-2 text-blue-400 font-bold group-hover:text-blue-300 transition-colors text-lg">
                 Explore Intelligence <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end gap-3 text-right">
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Verified Hubs</div>
               <div className="flex -space-x-3">
                 <div className="w-12 h-12 rounded-full border-2 border-slate-950 bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shadow-xl">EU</div>
                 <div className="w-12 h-12 rounded-full border-2 border-slate-950 bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm shadow-xl">CH</div>
                 <div className="w-12 h-12 rounded-full border-2 border-slate-950 bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm shadow-xl">NO</div>
               </div>
               <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10 text-left">
                  <div className="text-[9px] font-bold text-emerald-400 uppercase mb-1 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Feed
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">PSD3 Compromise Published</div>
               </div>
            </div>
          </div>
        </Link>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
           <Link to="/eudi-readiness" className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 rounded-lg bg-emerald-500 text-white">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-lg dark:text-white">EUDI Readiness Checker</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                 Is your bank ready for the 2026 Structured Address mandate? Check compliance status for specific BICs.
              </p>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                Analyze Bank <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
           </Link>

           <Link to="/swift" className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 rounded-lg bg-blue-500 text-white">
                    <Search className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-lg dark:text-white">Live BIC Directory</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                 Access 186,000+ verified SWIFT/BIC codes for Q2 2026. Data covers 17,000 financial institutions.
              </p>
              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold text-sm">
                Browse Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
           </Link>
        </div>
      </motion.div>

      {/* UK Top Banks Quick Links */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6 px-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
            <span className="text-3xl">🇬🇧</span> UK Top Banks & Sort Codes
          </h2>
          <Link to="/sort-code" className="text-sm font-bold text-[#003399] dark:text-blue-400 hover:underline">View all Sort Codes</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { name: 'Barclays', link: '/sort-code/20-00-00' },
            { name: 'HSBC', link: '/sort-code/40-00-00' },
            { name: 'Lloyds', link: '/sort-code/30-00-00' },
            { name: 'NatWest', link: '/sort-code/60-00-01' },
            { name: 'Santander', link: '/sort-code/09-01-29' },
            { name: 'Standard Chartered', link: '/sort-code/16-00-00' },
            { name: 'Metro Bank', link: '/sort-code/23-05-80' },
            { name: 'TSB', link: '/sort-code/30-94-47' },
            { name: 'Co-operative Bank', link: '/sort-code/08-92-99' },
            { name: 'Royal Bank of Scotland', link: '/sort-code/15-10-00' }
          ].map((bank, idx) => (
            <Link
              key={idx}
              to={bank.link}
              className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 rounded-xl text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-center min-h-[4rem]"
            >
              <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors text-sm">
                {bank.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Major Banking Hubs Grid */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8 px-2">
          <h2 className="text-2xl font-bold dark:text-white">Major Banking Hubs</h2>
          <Link to="/swift" className="text-sm font-bold text-[#003399] dark:text-blue-400 hover:underline">View all 89 countries</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: 'United Kingdom', flag: '🇬🇧', count: '22,401', slug: 'united-kingdom' },
            { name: 'Germany', flag: '🇩🇪', count: '16,842', slug: 'germany' },
            { name: 'USA', flag: '🇺🇸', count: '18,500', slug: 'united-states' },
            { name: 'France', flag: '🇫🇷', count: '14,209', slug: 'france' },
            { name: 'Italy', flag: '🇮🇹', count: '9,112', slug: 'italy' },
            { name: 'India', flag: '🇮🇳', count: '5,432', slug: 'india' },
            { name: 'United Arab Emirates', flag: '🇦🇪', count: '1,205', slug: 'united-arab-emirates' },
            { name: 'Switzerland', flag: '🇨🇭', count: '4,102', slug: 'switzerland' },
          ].map((c) => (
            <Link 
              key={c.slug}
              to={`/swift/${c.slug}`}
              className="group bg-white dark:bg-slate-900 rounded-3xl p-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center"
            >
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform grayscale-[0.5] group-hover:grayscale-0">{c.flag}</span>
              <span className="text-sm font-bold dark:text-slate-200 mb-1">{c.name}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider font-mono">{c.count} BANKS</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16 max-w-4xl mx-auto px-2 border-t border-slate-200 dark:border-slate-800 pt-16">
        <h2 className="text-2xl font-bold dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-md transition-all shadow-sm">
            <h3 className="text-lg font-bold mb-2 dark:text-white text-[#003399]">What is a SWIFT / BIC code?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              A SWIFT code or Business Identifier Code (BIC) is a standard format of Bank Identifier Codes used to identify banks and financial institutions globally, verifying money transfers between institutions.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-md transition-all shadow-sm">
            <h3 className="text-lg font-bold mb-2 dark:text-white text-[#003399]">How many bank directories are available?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              Our directory currently holds <strong>over 186,000 banking codes</strong> including BICs, Sort Codes, and BLZs across multiple countries, providing one of the most comprehensive free databases for international bank routing.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-md transition-all shadow-sm">
            <h3 className="text-lg font-bold mb-2 dark:text-white text-[#003399]">What is the difference between an IBAN and a SWIFT code?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              A SWIFT code identifies a specific bank or branch internationally, while an IBAN identifies a specific individual bank account in a particular country. You typically need both to complete an international wire transfer.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-md transition-all shadow-sm">
            <h3 className="text-lg font-bold mb-2 dark:text-white text-[#003399]">Are SWIFT codes 8 or 11 characters long?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              SWIFT codes can be either 8 or 11 characters. An 8-character code refers to the primary or head office of a bank, while an 11-character code includes a 3-character branch code at the end to identify a specific branch.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-md transition-all shadow-sm">
            <h3 className="text-lg font-bold mb-2 dark:text-white text-[#003399]">What happens if I use the wrong SWIFT code?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              If you use an incorrect SWIFT code, your transfer may be delayed, returned, or subject to additional fees as it gets routed improperly or rejected by the receiving banking network.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
