import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Landmark, Search, Map, CreditCard, Menu, Globe } from 'lucide-react';
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
const BlzHome = lazy(() => import('./pages/blz/BlzHome').then(module => ({ default: module.BlzHome })));
const IbanValidator = lazy(() => import('./pages/iban/IbanValidator').then(module => ({ default: module.IbanValidator })));
const IbanCalculator = lazy(() => import('./pages/iban/IbanCalculator').then(module => ({ default: module.IbanCalculator })));
const SwiftChecker = lazy(() => import('./pages/tool/SwiftChecker').then(module => ({ default: module.SwiftChecker })));
const BanksAtoZ = lazy(() => import('./pages/banks/BanksAtoZ').then(module => ({ default: module.BanksAtoZ })));

import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const SiteMap = lazy(() => import('./pages/SiteMap').then(module => ({ default: module.SiteMap })));
const AboutUs = lazy(() => import('./pages/AboutUs').then(module => ({ default: module.AboutUs })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions').then(module => ({ default: module.TermsAndConditions })));
const BlogIndex = lazy(() => import('./pages/BlogIndex').then(module => ({ default: module.BlogIndex })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));

const BankingStatistics = lazy(() => import('./pages/BankingStatistics').then(module => ({ default: module.BankingStatistics })));

function Layout() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans flex flex-col transition-colors duration-200">
      <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 xl:px-12 hidden md:grid grid-cols-[auto_1fr_auto_auto] items-center gap-8 flex-none">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 group">
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
        </div>

        <div className="flex justify-center w-full">
          <Suspense fallback={<div className="h-9 w-64 bg-slate-100 dark:bg-slate-900 rounded-md animate-pulse"></div>}>
            <GlobalSearch />
          </Suspense>
        </div>

        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link to="/swift" className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 py-5 transition-colors flex items-center gap-2">
            <Map className="w-4 h-4" />
            By Country
          </Link>
          <div className="relative group/nav py-5">
            <button className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 transition-colors flex items-center gap-1 pb-1">
              Tools <span className="text-[10px] opacity-60">▼</span>
            </button>
            <div className="absolute top-10 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl p-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all z-50">
               <Link to="/swift-checker" className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">SWIFT Checker</Link>
               <Link to="/iban/validator" className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">IBAN Validator</Link>
               <Link to="/iban/calculator" className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">IBAN Calculator</Link>
            </div>
          </div>
          <Link to="/iban" className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 py-5 transition-colors">{t('nav.iban')}</Link>
          <Link to="/sort-code" className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 py-5 transition-colors">{t('nav.sortcode')}</Link>
          <Link to="/blz" className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 py-5 transition-colors">{t('nav.blz')}</Link>
        </nav>

        <div className="flex items-center gap-4 pl-8 border-l border-slate-100 dark:border-slate-800">
          <div className="px-3 py-1 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full border border-green-200 dark:border-green-900/50 uppercase tracking-wider italic hidden xl:block">Verified by SWIFT</div>
          <LanguageSelector />
          <ModeToggle />
        </div>
      </header>
      
      {/* Mobile Header below */}
      <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between flex-none md:hidden">
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
              <DropdownMenuItem onClick={() => navigate('/iban')} className="cursor-pointer">
                {t('nav.iban')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/sort-code')} className="cursor-pointer">
                {t('nav.sortcode')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/blz')} className="cursor-pointer">
                {t('nav.blz')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/blog')} className="cursor-pointer">
                Blog
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-6 pb-20">
        <Outlet />
      </main>

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
                <li><Link to="/swift" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">SWIFT Codes by Country</Link></li>
                <li><Link to="/sort-code" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">UK Sort Codes</Link></li>
                <li><Link to="/blz" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">German BLZ Codes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><Link to="/banking-statistics" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Data & Stats</Link></li>
                <li><Link to="/blog" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Banking Blog</Link></li>
                <li><Link to="/sitemap" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Site Map</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-4 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><Link to="/about-us" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions" className="hover:text-[#003399] dark:hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
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
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950"><div className="w-8 h-8 border-4 border-[#003399] border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                
                <Route path="swift">
                  <Route index element={<SwiftHome />} />
                  <Route path=":countrySlug" element={<CountrySwift />} />
                  <Route path=":countrySlug/branches" element={<BranchList />} />
                  <Route path=":countrySlug/:bankSlug" element={<BankSwift />} />
                </Route>

                <Route path="iban">
                  <Route index element={<IbanHome />} />
                  <Route path="validator" element={<IbanValidator />} />
                  <Route path="calculator" element={<IbanCalculator />} />
                </Route>

                <Route path="swift-checker" element={<SwiftChecker />} />

                <Route path="sort-code">
                  <Route index element={<SortCodeHome />} />
                </Route>

                <Route path="blz">
                  <Route index element={<BlzHome />} />
                </Route>

                <Route path="banks" element={<BanksAtoZ />} />

                {/* Guide pages placeholders */}
                <Route path="sitemap" element={<SiteMap />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="blog" element={<BlogIndex />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                <Route path="banking-statistics" element={<BankingStatistics />} />
                <Route path="what-is-a-swift-code" element={<div className="p-12">What is a SWIFT code guide placeholder...</div>} />
                <Route path="what-is-an-iban" element={<div className="p-12">What is an IBAN guide placeholder...</div>} />
                <Route path="swift-vs-iban" element={<div className="p-12">SWIFT vs IBAN guide placeholder...</div>} />
                <Route path="sepa-transfer-guide" element={<div className="p-12">SEPA Transfer Guide placeholder...</div>} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </LanguageProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}
