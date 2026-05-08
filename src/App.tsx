import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { Landmark, Search, Map, CreditCard, Menu } from 'lucide-react';
import { Button } from './components/ui/button';
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
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function Layout() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans flex flex-col transition-colors duration-200">
      <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 xl:px-12 hidden md:grid grid-cols-[auto_1fr_auto_auto] items-center gap-8 flex-none">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#003399] rounded flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="text-white font-bold italic text-lg">S</div>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#003399] dark:text-blue-400">Swiftcode<span className="text-slate-400 dark:text-slate-500">dir</span></span>
          </Link>
        </div>

        <div className="flex justify-center w-full">
          <GlobalSearch />
        </div>

        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link to="/swift" className="hover:text-[#003399] dark:hover:text-blue-400 border-transparent hover:border-[#003399] dark:hover:border-blue-400 border-b-2 py-5 transition-colors">{t('nav.swift')}</Link>
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
          <div className="w-8 h-8 bg-[#003399] rounded flex items-center justify-center">
            <div className="text-white font-bold italic text-lg">S</div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ModeToggle />
          <Button variant="ghost" size="icon" className="dark:text-slate-50 border-slate-200 dark:border-slate-800">
            <Menu className="w-5 h-5" />
          </Button>
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
          <Link to="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Data Sources</Link>
          <Link to="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">API Access</Link>
          <Link to="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Privacy Policy</Link>
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
              </Route>

              <Route path="sort-code">
                <Route index element={<SortCodeHome />} />
              </Route>

              <Route path="blz">
                <Route index element={<BlzHome />} />
              </Route>

              {/* Guide pages placeholders */}
              <Route path="what-is-a-swift-code" element={<div className="p-12">What is a SWIFT code guide placeholder...</div>} />
              <Route path="what-is-an-iban" element={<div className="p-12">What is an IBAN guide placeholder...</div>} />
              <Route path="swift-vs-iban" element={<div className="p-12">SWIFT vs IBAN guide placeholder...</div>} />
              <Route path="sepa-transfer-guide" element={<div className="p-12">SEPA Transfer Guide placeholder...</div>} />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}
