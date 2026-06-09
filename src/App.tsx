import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
import { HelmetProvider } from 'react-helmet-async';
import { Landmark, Search, Map, CreditCard, Menu, Globe, Zap } from 'lucide-react';
import { Button, buttonVariants } from './components/ui/button';
import { cn } from './lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/ModeToggle';
import { LanguageSelector } from './components/LanguageSelector';
import { Home } from './pages/Home';

const GlobalSearch = lazy(() => import('./components/GlobalSearch').then(module => ({ default: module.GlobalSearch })));

const SwiftHome = lazy(() => import('./pages/swift/SwiftHome').then(module => ({ default: module.SwiftHome })));
const CountrySwift = lazy(() => import('./pages/swift/CountrySwift').then(module => ({ default: module.CountrySwift })));
const BranchList = lazy(() => import('./pages/swift/BranchList').then(module => ({ default: module.BranchList })));
const BankSwift = lazy(() => import('./pages/swift/BankSwift').then(module => ({ default: module.BankSwift })));
const IbanHome = lazy(() => import('./pages/iban/IbanHome').then(module => ({ default: module.IbanHome })));
const SortCodeHome = lazy(() => import('./pages/sort-code/SortCodeHome').then(module => ({ default: module.SortCodeHome })));
const SortCodeDetails = lazy(() => import('./pages/sort-code/SortCodeDetails').then(module => ({ default: module.SortCodeDetails })));
const BlzHome = lazy(() => import('./pages/blz/BlzHome').then(module => ({ default: module.BlzHome })));
const BlzDetails = lazy(() => import('./pages/blz/BlzDetails').then(module => ({ default: module.BlzDetails })));
const RoutingHome = lazy(() => import('./pages/routing/RoutingHome').then(module => ({ default: module.RoutingHome })));
const RoutingDetails = lazy(() => import('./pages/routing/RoutingDetails').then(module => ({ default: module.RoutingDetails })));
const RegulatoryHub = lazy(() => import('./pages/guides/RegulatoryHub').then(module => ({ default: module.RegulatoryHub })));
const EUDIReadiness = lazy(() => import('./pages/tool/EUDIReadiness').then(module => ({ default: module.EUDIReadiness })));
const IbanValidator = lazy(() => import('./pages/iban/IbanValidator').then(module => ({ default: module.IbanValidator })));
const IbanCalculator = lazy(() => import('./pages/iban/IbanCalculator').then(module => ({ default: module.IbanCalculator })));
const SwiftChecker = lazy(() => import('./pages/tool/SwiftChecker').then(module => ({ default: module.SwiftChecker })));
const BanksAtoZ = lazy(() => import('./pages/banks/BanksAtoZ').then(module => ({ default: module.BanksAtoZ })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AdsterraNativeSlot } from './components/AdsterraNativeSlot';

const SiteMap = lazy(() => import('./pages/SiteMap').then(module => ({ default: module.SiteMap })));
const AboutUs = lazy(() => import('./pages/AboutUs').then(module => ({ default: module.AboutUs })));
const ContactUs = lazy(() => import('./pages/ContactUs').then(module => ({ default: module.ContactUs })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions').then(module => ({ default: module.TermsAndConditions })));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy').then(module => ({ default: module.CookiePolicy })));
const BlogIndex = lazy(() => import('./pages/BlogIndex').then(module => ({ default: module.BlogIndex })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const GlossaryIndex = lazy(() => import('./pages/GlossaryIndex').then(module => ({ default: module.GlossaryIndex })));
const GlossaryTermPage = lazy(() => import('./pages/GlossaryTerm').then(module => ({ default: module.GlossaryTermPage })));

import { WhatIsSwift } from './pages/guides/WhatIsSwift';
import { WhatIsIban } from './pages/guides/WhatIsIban';
import { SwiftVsIban } from './pages/guides/SwiftVsIban';
import { SepaTransfer } from './pages/guides/SepaTransfer';
import { HowToFindIban } from './pages/guides/HowToFindIban';
import { IbanFormatByCountry } from './pages/guides/IbanFormatByCountry';
import { IbanErrorCodes } from './pages/guides/IbanErrorCodes';
import { IbanVsAccountNumber } from './pages/guides/IbanVsAccountNumber';
import { IbanVsRoutingNumber } from './pages/guides/IbanVsRoutingNumber';
import { SepaCountries } from './pages/guides/SepaCountries';
import { IbanCompleteCoverage } from './pages/guides/IbanCompleteCoverage';
import { BestIbanValidators } from './pages/guides/BestIbanValidators';
import { EmergingMarketsWireTransfers } from './pages/guides/EmergingMarketsWireTransfers';
import { CryptoToBankBridges } from './pages/guides/CryptoToBankBridges';
import { IbanRegionalHub } from './pages/iban/IbanRegionalHub';
import { IbanCountryFormat } from './pages/iban/IbanCountryFormat';
import DirectoryHub from './pages/DirectoryHub';
import { BookmarkPrompt } from './components/BookmarkPrompt';
import { InstallPWA } from './components/InstallPWA';

const BankingStatistics = lazy(() => import('./pages/BankingStatistics').then(module => ({ default: module.BankingStatistics })));




function Layout() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans flex flex-col transition-colors duration-200">
      <header className="h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 px-6 xl:px-8 hidden md:flex items-center flex-none">
        {/* Left section: Logo + Nav */}
        <div className="flex items-center gap-8 flex-1">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <div className="absolute inset-0 bg-[#003399] rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-blue-500 rounded-xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300 opacity-80"></div>
              <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-[#0B1C3D] to-[#003399] rounded-xl shadow-inner border border-white/10 overflow-hidden">
                <Globe className="absolute w-8 h-8 text-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 drop-shadow-md" strokeWidth={1.5} />
                <span className="text-white text-2xl font-bold italic relative z-10 drop-shadow-lg font-serif">S</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#003399] dark:text-blue-400">Swiftcode<span className="text-slate-400 dark:text-slate-500">dir</span></span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/swift" className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 py-5 transition-colors flex items-center gap-1.5">
              <Map className="w-4 h-4" />
              By Country
            </Link>
            <div className="relative group/nav py-5">
              <button className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 transition-colors flex items-center gap-1 pb-1">
                Tools <span className="text-[10px] opacity-60">▼</span>
              </button>
              <div className="absolute top-12 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl p-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all z-50">
                 <Link to="/swift-checker" className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">SWIFT Checker</Link>
                 <Link to="/iban/validator" className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">IBAN Validator</Link>
                 <Link to="/iban/calculator" className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">IBAN Calculator</Link>
                 <Link to="/iban/guide" className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md font-medium text-blue-600">IBAN Guide</Link>
              </div>
            </div>
            <Link to="/iban" className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 py-5 transition-colors">{t('nav.iban')}</Link>
            <Link to="/sort-code" className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 py-5 transition-colors">{t('nav.sortcode')}</Link>
            <Link to="/blz" className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 py-5 transition-colors">{t('nav.blz')}</Link>
            <div className="relative group/resources py-5 animate-none">
              <button className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 transition-colors flex items-center gap-1 pb-1">
                Resources <span className="text-[10px] opacity-60">▼</span>
              </button>
              <div className="absolute top-12 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl p-2 opacity-0 invisible group-hover/resources:opacity-100 group-hover/resources:visible transition-all z-50">
                 <Link to="/blog" className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Banking Blog</Link>
                 <Link to="/glossary" className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Banking Glossary</Link>
                 <Link to="/banking-statistics" className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Data & Stats</Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Right section: Search & Utils */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="w-64">
            <Suspense fallback={<div className="h-9 w-64 bg-slate-100 dark:bg-slate-900 rounded-md animate-pulse"></div>}>
              <GlobalSearch />
            </Suspense>
          </div>
          
          <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-800">
            <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm uppercase tracking-wider hidden xl:block">
              Verified by SWIFT
            </div>
            <LanguageSelector />
            <ModeToggle />
          </div>
        </div>
      </header>
      
      {/* Mobile Header below */}
      <header className="h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 px-4 flex items-center justify-between flex-none md:hidden">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-[#003399] dark:text-blue-400">
          <div className="relative flex items-center justify-center w-8 h-8 flex-shrink-0">
            <div className="absolute inset-0 bg-[#003399] rounded-[10px] transform rotate-3"></div>
            <div className="absolute inset-0 bg-blue-500 rounded-[10px] transform -rotate-3 opacity-80"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-[#0B1C3D] to-[#003399] rounded-[10px] shadow-inner border border-white/10 overflow-hidden">
              <Globe className="absolute w-6 h-6 text-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 drop-shadow-sm" strokeWidth={1.5} />
              <span className="text-white text-lg font-bold italic relative z-10 drop-shadow-md font-serif">S</span>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "dark:text-slate-50 border-slate-200 dark:border-slate-800")}>
              <Menu className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/swift')} className="cursor-pointer gap-2">
                <Map className="w-4 h-4" /> By Country
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/swift-checker')} className="cursor-pointer">
                SWIFT Checker
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/iban/calculator')} className="cursor-pointer">
                IBAN Calculator
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/iban/guide')} className="cursor-pointer text-blue-600 font-medium">
                IBAN Guide
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/iban')} className="cursor-pointer">
                {t('nav.iban')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/sort-code')} className="cursor-pointer">
                {t('nav.sortcode')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/blz')} className="cursor-pointer">
                {t('nav.blz')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/routing-number')} className="cursor-pointer">
                US Routing Numbers
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/regulatory-hub')} className="cursor-pointer font-bold text-blue-600">
                2026 Regulatory Hub
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/eudi-readiness')} className="cursor-pointer font-bold text-emerald-600">
                EUDI Readiness Checker
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/blog')} className="cursor-pointer">
                Banking Blog
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/glossary')} className="cursor-pointer">
                Banking Glossary
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-6 pb-20">
        <Outlet />
      </main>

      <InstallPWA />
      <BookmarkPrompt />

      <div className="w-full bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 flex justify-center">
        <AdsterraNativeSlot zoneId="d3204c449d1c550b52260207ce88c485" format="horizontal" />
      </div>

      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 flex-none w-full">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider text-sm">Tools</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><Link to="/swift-checker" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">SWIFT Code Checker</Link></li>
                <li><Link to="/iban/validator" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">IBAN Validator</Link></li>
                <li><Link to="/iban/calculator" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">IBAN Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider text-sm">Directories</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><Link to="/banks" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Banks A-Z Directory</Link></li>
                <li><Link to="/directory-hub" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Global Directory</Link></li>
                <li><Link to="/swift" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">SWIFT Codes by Country</Link></li>
                <li><Link to="/sort-code" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">UK Sort Codes</Link></li>
                <li><Link to="/blz" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">German BLZ Codes</Link></li>
                <li><Link to="/routing-number" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">US Routing Numbers</Link></li>
                <li><Link to="/regulatory-hub" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">2026 Regulatory Hub</Link></li>
                <li><Link to="/eudi-readiness" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">EUDI Readiness Checker</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><Link to="/banking-statistics" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Data & Stats</Link></li>
                <li><Link to="/blog" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Banking Blog</Link></li>
                <li><Link to="/glossary" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Banking Glossary</Link></li>
                <li><Link to="/sitemap" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Site Map</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><Link to="/about-us" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact-us" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/cookie-policy" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
                <li><a href="https://x.com/StephenSeb12450" target="_blank" rel="noopener noreferrer" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors flex items-center gap-2">X (Twitter)</a></li>
                <li><a href="https://in.pinterest.com/hypecuts619/routing-numbers/" target="_blank" rel="noopener noreferrer" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors flex items-center gap-2">Pinterest</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-xs text-slate-500 dark:text-slate-400">
            <p className="mb-4 max-w-4xl mx-auto leading-relaxed border border-yellow-200 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl text-yellow-900 dark:text-yellow-200">
              <strong>Disclaimer:</strong> The SWIFT/BIC codes, IBAN formats, Sort Codes, and BLZ records provided on this website are for informational purposes only. While we source our data from official registries and strive to keep it up to date, we cannot guarantee complete accuracy. Always verify bank details directly with your financial institution before initiating any wire transfers or payments to prevent loss of funds. SwiftCodeDir is not affiliated with SWIFT SCRL.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[10px] uppercase font-medium tracking-widest mt-6">
              <span>&copy; {new Date().getFullYear()} Swiftcodedir.com</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-2 italic text-slate-400 dark:text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Records updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="swiftcode-theme">
      <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950"><div className="w-8 h-8 border-4 border-[#003399] border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                
                <Route path="swift">
                  <Route index element={<SwiftHome />} />
                  <Route path=":countrySlug" element={<CountrySwift />} />
                  <Route path=":countrySlug/branches" element={<BranchList />} />
                  <Route path=":countrySlug/:bankSlug/:bicCode?" element={<BankSwift />} />
                </Route>

                <Route path="iban">
                  <Route index element={<IbanHome />} />
                  <Route path="validator" element={<IbanValidator />} />
                  <Route path="calculator" element={<IbanCalculator />} />
                  <Route path=":regionSlug(europe|middle-east|africa|caribbean|americas|asia)" element={<IbanRegionalHub />} />
                  <Route path=":countrySlug" element={<IbanCountryFormat />} />
                  <Route path="guide" element={<WhatIsIban />} />
                </Route>

                <Route path="swift-checker" element={<SwiftChecker />} />

                <Route path="sort-code">
                  <Route index element={<SortCodeHome />} />
                  <Route path=":sortCode" element={<SortCodeDetails />} />
                </Route>

                <Route path="directory-hub" element={<DirectoryHub />} />

                <Route path="blz">
                  <Route index element={<BlzHome />} />
                  <Route path=":blzCode" element={<BlzDetails />} />
                </Route>

                <Route path="routing-number">
                  <Route index element={<RoutingHome />} />
                  <Route path=":routingNumber" element={<RoutingDetails />} />
                </Route>

                <Route path="regulatory-hub" element={<RegulatoryHub />} />
                <Route path="eudi-readiness" element={<EUDIReadiness />} />

                <Route path="banks" element={<BanksAtoZ />} />

                {/* Guide pages placeholders */}
                <Route path="sitemap" element={<SiteMap />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="cookie-policy" element={<CookiePolicy />} />
                <Route path="blog" element={<BlogIndex />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                <Route path="glossary" element={<GlossaryIndex />} />
                <Route path="glossary/:slug" element={<GlossaryTermPage />} />
                <Route path="banking-statistics" element={<BankingStatistics />} />
                {/* Guide pages */}
                <Route path="what-is-a-swift-code" element={<WhatIsSwift />} />
                <Route path="what-is-an-iban" element={<WhatIsIban />} />
                <Route path="swift-vs-iban" element={<SwiftVsIban />} />
                <Route path="sepa-transfer-guide" element={<SepaTransfer />} />
                <Route path="how-to-find-iban" element={<HowToFindIban />} />
                <Route path="iban-format-by-country" element={<IbanFormatByCountry />} />
                <Route path="iban-error-codes" element={<IbanErrorCodes />} />
                <Route path="iban-vs-account-number" element={<IbanVsAccountNumber />} />
                <Route path="iban-vs-routing-number" element={<IbanVsRoutingNumber />} />
                <Route path="sepa-countries" element={<SepaCountries />} />
                <Route path="guides/best-iban-validators-2026" element={<BestIbanValidators />} />
                <Route path="guides/emerging-markets-wire-transfers" element={<EmergingMarketsWireTransfers />} />
                <Route path="guides/crypto-traditional-bank-bridges" element={<CryptoToBankBridges />} />
                
                {/* 404 Catch-All Route for Soft 404 Resolution */}
                <Route path="*" element={<NotFound />} />
              </Route>
              
              <Route path="iban/complete-coverage" element={<IbanCompleteCoverage />} />
            </Routes>
          </Suspense>
        </Router>
      </LanguageProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}
