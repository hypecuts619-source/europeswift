import { useParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Landmark, ArrowLeft, Info, MapPin, Building2, HelpCircle, CreditCard } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { ROUTING_NUMBERS } from '../../data/routingNumbers';

export function RoutingDetails() {
  const { routingNumber } = useParams();
  const navigate = useNavigate();
  
  // Normalize and find bank
  const bank = ROUTING_NUMBERS.find(b => {
    const normalizedB = String(b.code).trim();
    const normalizedP = String(routingNumber).trim();
    return normalizedB === normalizedP;
  });

  if (!bank) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <Landmark className="w-16 h-16 text-slate-200 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4 font-serif">Routing Number Not Found</h1>
        <p className="text-slate-600 mb-8 text-lg">We couldn't find an official record for routing number: <span className="font-mono font-bold text-slate-900">{routingNumber}</span></p>
        <Button onClick={() => navigate('/routing-number')} size="lg">Return to Routing Number Directory</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEO 
        title={`${bank.name} Routing Number ${bank.code} Details | SwiftcodeDir`}
        description={`Find detailed information for ${bank.name} (City: ${bank.city}, State: ${bank.state}) with routing number ${bank.code}. ABA routing Transit Number information.`}
        canonicalUrl={`https://swiftcodedir.com/routing-number/${bank.code}`}
      />
      
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/routing-number" />}>US Routing Numbers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{bank.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button 
        variant="ghost" 
        onClick={() => navigate('/routing-number')} 
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
               Official American Bankers Association (ABA) Routing Number record for {bank.name}.
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
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Routing Number (ABA)</span>
                  <span className="text-3xl font-mono font-bold text-[#004a99] dark:text-blue-400">{bank.code}</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Bank Name</span>
                  <span className="text-xl font-semibold dark:text-slate-100">{bank.name}</span>
                </div>
                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Headquarters City</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-lg dark:text-slate-200">{bank.city}, {bank.state}</span>
                  </div>
                </div>
                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Country</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇺🇸</span>
                    <span className="text-lg dark:text-slate-200">United States</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              What is an ABA Routing Number?
            </h2>
            <p>
              An <strong>ABA Routing Number</strong> (also known as a Routing Transit Number or RTN) is a nine-digit code used by financial institutions in the United States to identify themselves. It is essential for various types of transactions:
            </p>
            <ul>
              <li><strong>Direct Deposit:</strong> Receiving your paycheck or government benefits.</li>
              <li><strong>ACH Transfers:</strong> Electronic payments between banks for bills or transfers.</li>
              <li><strong>Domestic Wire Transfers:</strong> Sending or receiving fast, secure payments within the US.</li>
              <li><strong>Checks:</strong> The routing number is printed on the bottom left of every check.</li>
            </ul>
            <p>
              Large national banks like <strong>{bank.name}</strong> often have multiple routing numbers depending on the state where the account was opened or the type of transaction (Wire vs. ACH).
            </p>
          </div>
        </div>

        <aside className="space-y-6">
          <Card className="dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <h2 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Search 18,000+ Codes</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Need to verify a code for a smaller credit union or regional bank? Use our full US database:
              </p>
              <a 
                href="https://usroutingnumber.com/" 
                target="_blank" 
                rel="noopener"
                className="block text-center bg-[#004a99] hover:bg-blue-800 text-white text-sm font-bold py-2 rounded transition-colors"
              >
                Go to USRoutingNumber.com
              </a>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-sm">Quick Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => navigate('/iban')} variant="outline" className="w-full justify-start text-sm h-auto py-3">
                <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                Find IBAN for Transfers
              </Button>
              <Button onClick={() => navigate('/swift')} variant="outline" className="w-full justify-start text-sm h-auto py-3">
                <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                Find SWIFT/BIC Code
              </Button>
            </CardContent>
          </Card>

          
        </aside>
      </div>
    </div>
  );
}
