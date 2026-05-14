import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ROUTING_NUMBERS } from '../../data/routingNumbers';

export function RoutingHome() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title="US Routing Numbers (ABA) | SwiftcodeDir"
        description="Search our complete directory of US Bank Routing Numbers (ABA). Verify routing codes for Chase, Bank of America, Wells Fargo, Citibank, and other American banks."
        canonicalUrl="https://swiftcodedir.com/routing-number"
      />
      
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>US Routing Numbers Directory</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid lg:grid-cols-[1fr_300px] gap-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif dark:text-slate-100">Top US Banks Directory</h1>
          <p className="text-gray-600 dark:text-slate-400 mb-8 max-w-2xl text-lg">
            A curated directory of major US financial institutions. For a complete, searchable database of over 20,000 ABA routing numbers, visit our partner site <a href="https://usroutingnumber.com/" target="_blank" rel="noopener" className="font-bold text-blue-600 hover:underline">USRoutingNumber.com</a>.
          </p>
          
          <Card className="dark:bg-slate-900 dark:border-slate-800 mb-12">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-slate-200">Find Bank Routing Details</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Enter Bank Name or Routing Code..." 
                  className="h-12 text-lg dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200"
                />
                <Button className="h-12 px-8 bg-[#004a99] dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 w-full sm:w-auto">
                  <Search className="w-5 h-5 mr-2" /> Search
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-6 font-serif dark:text-slate-100">Popular American Banks</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ROUTING_NUMBERS.slice(0, 10).map((bank, index) => (
              <Link 
                key={`${bank.code}-${index}`} 
                to={`/routing-number/${bank.code}`}
                className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer transition-colors bg-white dark:bg-slate-900 block"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">{bank.name}</h3>
                  <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-400">
                    {bank.code}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{bank.city}, {bank.state}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">View Details &rarr;</p>
              </Link>
            ))}
          </div>
        </div>
        
        <aside className="space-y-6">
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-6">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 underline decoration-blue-500/30">Need a full list?</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                This directory features the top US banks. If you need to search the full ABA database of over 18,000+ codes, use our dedicated engine:
              </p>
              <a 
                href="https://usroutingnumber.com/" 
                target="_blank" 
                rel="noopener"
                className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-sm"
              >
                Visit USRoutingNumber.com
              </a>
            </CardContent>
          </Card>
          
          
        </aside>
      </div>
    </div>
  );
}
