import { useParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Landmark, ArrowLeft, Info, MapPin, Building2, HelpCircle, CreditCard } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { GERMAN_BANKS } from '../../data/germanBanks';

export function BlzDetails() {
  const { blzCode } = useParams();
  const navigate = useNavigate();
  
  // Normalize and find bank
  const bank = GERMAN_BANKS.find(b => {
    const normalizedB = String(b.blz).trim();
    const normalizedP = String(blzCode).trim();
    return normalizedB === normalizedP;
  });

  if (!bank) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <Landmark className="w-16 h-16 text-slate-200 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4 font-serif">BLZ Code Not Found</h1>
        <p className="text-slate-600 mb-8 text-lg">We couldn't find an official record for BLZ code: <span className="font-mono font-bold text-slate-900">{blzCode}</span></p>
        <Button onClick={() => navigate('/blz')} size="lg">Return to BLZ Directory</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEO 
        title={`${bank.name} BLZ ${bank.blz} Details | SwiftcodeDir`}
        description={`Find detailed information for ${bank.name} with BLZ code ${bank.blz} located in ${bank.city}. Routing information and bank details.`}
        canonicalUrl={`https://swiftcodedir.com/blz/${bank.blz}`}
      />
      
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/blz" />}>German BLZ Directory</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{bank.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button 
        variant="ghost" 
        onClick={() => navigate('/blz')} 
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
               Official Bankleitzahl (BLZ) record for {bank.name} in {bank.city}, Germany.
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
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Bankleitzahl (BLZ)</span>
                  <span className="text-3xl font-mono font-bold text-[#003399] dark:text-blue-400">{bank.blz}</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Bank Name</span>
                  <span className="text-xl font-semibold dark:text-slate-100">{bank.name}</span>
                </div>
                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Location / City</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-lg dark:text-slate-200">{bank.city}, Germany</span>
                  </div>
                </div>
                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Country</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇩🇪</span>
                    <span className="text-lg dark:text-slate-200">Germany</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              How to use this BLZ?
            </h2>
            <p>
              The Bankleitzahl (BLZ) <strong>{bank.blz}</strong> is primarily used for domestic transfers within Germany. It identifies both the bank <strong>{bank.name}</strong> and the specific regional branch or clearing center.
            </p>
            <p>
              While SEPA (Single Euro Payments Area) has transitioned most processing to IBAN and BIC, the BLZ remains a critical component of the German banking system:
            </p>
            <ul>
              <li><strong>IBAN Generation:</strong> The BLZ is embedded within German IBANs (from positions 5 to 12).</li>
              <li><strong>Domestic Clearing:</strong> Some internal legacy systems still utilize BLZ for routing.</li>
              <li><strong>Verification:</strong> It helps confirm the bank's identity when setting up direct debits or local standing orders.</li>
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <Card className="dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-sm">Quick Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => navigate('/iban/calculator')} variant="outline" className="w-full justify-start text-sm h-auto py-3">
                <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                Generate IBAN from BLZ
              </Button>
              <Button onClick={() => navigate('/swift')} variant="outline" className="w-full justify-start text-sm h-auto py-3">
                <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                Find SWIFT for this Bank
              </Button>
            </CardContent>
          </Card>

          
        </aside>
      </div>
    </div>
  );
}
