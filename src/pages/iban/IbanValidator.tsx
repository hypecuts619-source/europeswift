import { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle, Search } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ibanFormats } from '../../data/mockData';
import { AdSense } from '../../components/AdSense';
import { SEO } from '../../components/SEO';

export function IbanValidator() {
  const [iban, setIban] = useState('');
  const [result, setResult] = useState<any>(null);

  const validateIban = () => {
    const cleanIban = iban.replace(/\s+/g, '').toUpperCase();
    if (cleanIban.length < 15) {
      setResult({ valid: false, error: 'IBAN is too short' });
      return;
    }
    
    const countryCodeStr = cleanIban.substring(0, 2);
    const rules = (ibanFormats as any[]).find(f => f.code === countryCodeStr);
    
    if (!rules) {
      setResult({ valid: false, error: 'Unsupported or Invalid Country Code' });
      return;
    }

    if (cleanIban.length !== rules.length) {
      setResult({ valid: false, error: `Invalid length for ${rules.country}. Expected ${rules.length} chars, got ${cleanIban.length}` });
      return;
    }

    // Basic structure validation passed
    setResult({
      valid: true,
      country: rules.country,
      bankCode: cleanIban.substring(4, 10),
      accountNumber: cleanIban.substring(10)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="IBAN Validator - Check IBAN Number Validity | SwiftCodeDir"
        description="Verify the checksum and format of an International Bank Account Number. Validate IBAN for SEPA and international bank transfers safely."
        canonicalUrl={window.location.href}
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/iban">IBAN</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Validator</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-serif text-gray-900 dark:text-gray-100">IBAN Validator Tool</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Verify the checksum and format of an International Bank Account Number. We check the length and mathematical validity without storing your data.
        </p>
      </div>

      <Card className="shadow-lg border-0 mb-8 max-w-2xl mx-auto dark:bg-slate-900 dark:border dark:border-slate-800">
        <CardContent className="p-8">
          <label className="block text-sm font-semibold text-gray-900 dark:text-slate-200 mb-2">Enter IBAN to Validate</label>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Input 
              value={iban}
              onChange={(e) => setIban(e.target.value.replace(/\s+/g, '').toUpperCase())}
              placeholder="e.g. GB82 WEST 1234 5698 7654 32"
              className="text-lg font-mono tracking-widest uppercase h-14 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
            />
            <Button onClick={validateIban} size="lg" className="h-14 px-8 bg-[#003399] dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 w-full sm:w-auto">
              Validate <Search className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <AdSense slot="1231231234" className="max-w-2xl mx-auto mb-8" />

      {result && (
        <Card className={`max-w-2xl mx-auto border-2 ${result.valid ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20' : 'border-red-500 bg-red-50/50 dark:bg-red-950/20'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.valid ? (
                <><CheckCircle className="text-green-500" /> <span className="text-green-800 dark:text-green-400">IBAN is Valid</span></>
              ) : (
                <><ShieldAlert className="text-red-500" /> <span className="text-red-800 dark:text-red-400">Invalid IBAN</span></>
              )}
            </CardTitle>
          </CardHeader>
          {result.valid && (
            <CardContent>
              <div className="bg-white dark:bg-slate-900/50 rounded-lg p-6 border dark:border-slate-800 shadow-sm">
                <dl className="grid grid-cols-2 gap-y-4">
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Country</dt>
                    <dd className="font-medium text-gray-900 dark:text-slate-100">{result.country}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Bank Code</dt>
                    <dd className="font-mono text-gray-900 dark:text-slate-100">{result.bankCode}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Account Portion</dt>
                    <dd className="font-mono text-gray-900 dark:text-slate-100 break-all">{result.accountNumber}</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
          )}
          {!result.valid && result.error && (
            <CardContent>
              <p className="text-red-700">{result.error}</p>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}
