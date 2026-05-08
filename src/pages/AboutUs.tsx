import { Building2, Globe, ShieldCheck } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';

export function AboutUs() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>About Us</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 shadow-sm max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">About SwiftcodeDir</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            SwiftcodeDir is the world's most comprehensive and up-to-date directory of SWIFT / BIC codes, IBAN validation tools, and global banking routing numbers. Our mission is to simplify international money transfers by providing accurate bank identification data to individuals and businesses worldwide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
            <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Global Coverage</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Database encompassing thousands of banks across 200+ countries and territories.</p>
            </div>
            
            <div className="bg-emerald-50 dark:bg-slate-800 p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Verified Data</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Regularly updated and verified routing codes to prevent transfer failures and lost funds.</p>
            </div>

            <div className="bg-purple-50 dark:bg-slate-800 p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Institution Support</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Detailed branch information, head office locations, and local routing networks.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Why Accuracy Matters</h2>
          <p className="text-slate-600 dark:text-slate-400">
            An incorrect SWIFT code or invalid IBAN can result in failed wire transfers, severe delays, and significant banking fees. We aggregate data directly from trusted financial networks to ensure that when you search for a bank's routing information, you get the exact data needed for a successful international wire transfer.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Our Commitment</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Whether you are an expat sending money home, a freelancer receiving international payments, or a corporate treasury managing cross-border transactions, SwiftcodeDir is committed to keeping the financial world connected through reliable data.
          </p>
        </div>
      </div>
    </div>
  );
}
