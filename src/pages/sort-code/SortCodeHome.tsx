import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { SORT_CODES } from '../../data/sortCodes';

export function SortCodeHome() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title="UK Sort Codes | SwiftcodeDir"
        description="Search our complete directory of UK Sort Codes. Verify bank branch sort codes for Barclays, HSBC, Lloyds, NatWest, Santander and other British & Irish banks."
        canonicalUrl="https://swiftcodedir.com/sort-code"
      />
      
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>UK Sort Codes Directory</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid lg:grid-cols-[1fr_300px] gap-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif dark:text-slate-100">UK Sort Codes</h1>
          <p className="text-gray-600 dark:text-slate-400 mb-8 max-w-2xl text-lg">
            A Sort Code is a 6-digit number formatted as xx-xx-xx used by British and Irish banks to route money transfers. Search our complete directory of Pay.UK verified sort codes.
          </p>
          
          <Card className="dark:bg-slate-900 dark:border-slate-800 mb-12">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-slate-200">Search Sort Codes</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Enter Sort Code (e.g., 20-00-00) or Bank Name..." 
                  className="h-12 text-lg dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200"
                />
                <Button className="h-12 px-8 bg-[#003399] dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 w-full sm:w-auto">
                  <Search className="w-5 h-5 mr-2" /> Search
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-6 font-serif dark:text-slate-100">Popular UK Banks</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {SORT_CODES.slice(0, 8).map((bank, index) => (
              <Link 
                key={`${bank.code}-${index}`} 
                to={`/sort-code/${bank.code}`}
                className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer transition-colors bg-white dark:bg-slate-900 block"
              >
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{bank.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">View Sort Codes &rarr;</p>
              </Link>
            ))}
          </div>
        </div>
        
        <aside className="space-y-6">
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-6">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">What is a UK Sort Code?</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                A sort code is a six-digit number that identifies both the bank and the branch where an account is held. In the UK, it is essential for domestic BACS, CHAPS, and Faster Payments.
              </p>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="font-medium text-sm text-slate-900 dark:text-slate-100 mb-2">Expert Analysis</h3>
                <ul className="space-y-2 text-sm mb-4">
                  <li>
                    <Link to="/blog/complete-2026-guide-uk-bank-sort-codes" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                      The Complete 2026 Guide to UK Bank Sort Codes
                    </Link>
                  </li>
                </ul>
                <h3 className="font-medium text-sm text-slate-900 dark:text-slate-100 mb-2">Helpful Guides</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/blog/uk-sort-code-vs-swift" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                      Sort Code vs SWIFT Code
                    </Link>
                  </li>
                  <li>
                    <Link to="/iban" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                      Find IBAN Numbers
                    </Link>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          
        </aside>
      </div>
    </div>
  );
}
