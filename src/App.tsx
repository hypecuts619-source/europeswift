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
import { GlobalSearch } from './components/GlobalSearch';
import { Home } from './pages/Home';
import { SwiftHome } from './pages/swift/SwiftHome';
import { CountrySwift } from './pages/swift/CountrySwift';
import { BranchList } from './pages/swift/BranchList';
import { BankSwift } from './pages/swift/BankSwift';
import { IbanHome } from './pages/iban/IbanHome';
import { SortCodeHome } from './pages/sort-code/SortCodeHome';
import { BlzHome } from './pages/blz/BlzHome';
import { IbanValidator } from './pages/iban/IbanValidator';
import { IbanCalculator } from './pages/iban/IbanCalculator';
import { SwiftChecker } from './pages/tool/SwiftChecker';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

import { SiteMap } from './pages/SiteMap';
import { AboutUs } from './pages/AboutUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';

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
          <GlobalSearch />
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-6 pb-20">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 p-8 flex-none text-slate-500 dark:text-slate-400 text-xs text-center max-w-[1200px] mx-auto w-full">
        <p className="mb-4 max-w-4xl mx-auto leading-relaxed opacity-80">
          <strong>Disclaimer:</strong> The SWIFT/BIC codes, IBAN formats, Sort Codes, and BLZ records provided on this website are for informational purposes only. While we source our data from official registries (including the ECB SEPA register, Pay.UK, and Bundesbank) and strive to keep it up to date, we cannot guarantee complete accuracy. Always verify bank details directly with your financial institution before initiating any wire transfers or payments to prevent loss of funds. SwiftCodeDir is not affiliated with SWIFT SCRL.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[10px] uppercase font-medium tracking-widest mt-4">
          <span>&copy; {new Date().getFullYear()} Swiftcodedir.com</span>
          <span className="hidden md:inline">•</span>
          <Link to="/about-us" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">About Us</Link>
          <Link to="/privacy-policy" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Terms & Conditions</Link>
          <Link to="/sitemap" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Site Map</Link>
          <span className="flex items-center gap-2 italic ml-0 md:ml-4 text-slate-400 dark:text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Records updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
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

              {/* Guide pages placeholders */}
              <Route path="sitemap" element={<SiteMap />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="what-is-a-swift-code" element={<div className="p-12">What is a SWIFT code guide placeholder...</div>} />
              <Route path="what-is-an-iban" element={<div className="p-12">What is an IBAN guide placeholder...</div>} />
              <Route path="swift-vs-iban" element={<div className="p-12">SWIFT vs IBAN guide placeholder...</div>} />
              <Route path="sepa-transfer-guide" element={<div className="p-12">SEPA Transfer Guide placeholder...</div>} />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}
