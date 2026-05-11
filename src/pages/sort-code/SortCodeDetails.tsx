import { useParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Landmark, ArrowLeft, Info, MapPin, Building2, HelpCircle, CreditCard } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { SORT_CODES } from '../../data/sortCodes';

export function SortCodeDetails() {
  const { sortCode } = useParams();
  const navigate = useNavigate();
  
  // Normalize and find bank
  const bank = SORT_CODES.find(b => {
    const normalizedB = String(b.code).replace(/[^0-9]/g, '');
    const normalizedP = String(sortCode).replace(/[^0-9]/g, '');
    return normalizedB === normalizedP;
  });

  if (!bank) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <Landmark className="w-16 h-16 text-slate-200 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4 font-serif">Sort Code Not Found</h1>
        <p className="text-slate-600 mb-8 text-lg">We couldn't find an official record for sort code: <span className="font-mono font-bold text-slate-900">{sortCode}</span></p>
        <Button onClick={() => navigate('/sort-code')} size="lg">Return to Sort Code Directory</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEO 
        title={`${bank.name} Sort Code ${bank.code} Details | SwiftcodeDir`}
        description={`Find detailed information for ${bank.name} with sort code ${bank.code} located in ${bank.city}. Routing information and bank details for UK transfers.`}
        canonicalUrl={`https://swiftcodedir.com/sort-code/${bank.code}`}
      />
      
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/sort-code" />}>UK Sort Codes Directory</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{bank.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button 
        variant="ghost" 
        onClick={() => navigate('/sort-code')} 
        className="mb-8 text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
      </Button>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-8">
          <header>
            <div className="flex items-center gap-3 text-blue-600 mb-2">
              <Landmark className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-widest">Bank Details</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 font-serif dark:text-slate-100">{bank.name}</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
               Official UK Sort Code record for {bank.name} in {bank.city}, United Kingdom.
            </p>
          </header>

          <Card className="dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Routing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-6 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Sort Code</span>
                  <span className="text-3xl font-mono font-bold text-[#003399] dark:text-blue-400">{bank.code}</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Bank Name</span>
                  <span className="text-xl font-semibold dark:text-slate-100">{bank.name}</span>
                </div>
                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Location / City</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-lg dark:text-slate-200">{bank.city}, United Kingdom</span>
                  </div>
                </div>
                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Country</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇬🇧</span>
                    <span className="text-lg dark:text-slate-200">United Kingdom</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              What is a Sort Code?
            </h2>
            <p>
              A <strong>Sort Code</strong> is a six-digit number used by British and Irish banks to identify the specific bank and branch where an account is held. It is essential for domestic money transfers, including:
            </p>
            <ul>
              <li><strong>Faster Payments:</strong> Real-time transfers between UK banks.</li>
              <li><strong>BACS:</strong> Used for direct debits and payroll.</li>
              <li><strong>CHAPS:</strong> High-value, same-day guaranteed payments.</li>
            </ul>
            <p>
              The format is usually three pairs of numbers separated by hyphens (e.g., <strong>{bank.code}</strong>).
            </p>
          </div>
        </div>

        <aside className="space-y-6">
          <Card className="dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-sm">Quick Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => navigate('/iban/validator')} variant="outline" className="w-full justify-start text-sm h-auto py-3">
                <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                Validate IBAN for this Bank
              </Button>
              <Button onClick={() => navigate('/swift')} variant="outline" className="w-full justify-start text-sm h-auto py-3">
                <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                Find SWIFT for this Bank
              </Button>
            </CardContent>
          </Card>

          <AdSense slot="1122334455" />
        </aside>
      </div>
    </div>
  );
}
