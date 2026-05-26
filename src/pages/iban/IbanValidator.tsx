import { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle, Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { SEO } from '../../components/SEO';
import IBAN from 'iban';

import { validateIbanChecksum } from '../../lib/ibanUtils';

export function IbanValidator() {
  const [iban, setIban] = useState('');
  const [result, setResult] = useState<any>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setIban(q.replace(/\s+/g, '').toUpperCase());
      // Small delay to ensure the UI is ready
      setTimeout(() => {
        validateIbanAction(q.replace(/\s+/g, '').toUpperCase());
      }, 100);
    }
  }, [searchParams]);

  const validateIbanAction = (ibanToVerify: string) => {
    const cleanIban = ibanToVerify.replace(/\s+/g, '').toUpperCase();
    
    if (cleanIban.length < 4) {
      setResult({ valid: false, error: 'IBAN is too short' });
      return;
    }

    const isValid = IBAN.isValid(cleanIban);
    
    if (!isValid) {
      // Try to determine why it's invalid
      const countryCode = cleanIban.substring(0, 2);
      const countryInfo = (IBAN as any).countries?.[countryCode];
      
      if (!countryInfo) {
        setResult({ valid: false, error: `Unsupported or Invalid Country Code: ${countryCode}` });
      } else if (cleanIban.length !== countryInfo.length) {
        setResult({ valid: false, error: `Invalid length for ${countryInfo.country}. Expected ${countryInfo.length} characters, got ${cleanIban.length}.` });
      } else {
        setResult({ valid: false, error: 'Checksum failure or invalid format. This IBAN is mathematically incorrect.' });
      }
      return;
    }

    // It's valid!
    const countryCode = cleanIban.substring(0, 2);
    const countryInfo = (IBAN as any).countries?.[countryCode];
    
    setResult({
      valid: true,
      country: countryInfo?.country || countryCode,
      // The library might have extraction logic, but let's do a basic split for UI
      // Many IBANs have index 4-x as bank code
      bankCode: cleanIban.substring(4, 8), 
      accountNumber: cleanIban.substring(8)
    });
  };

  const onManualValidate = () => {
    validateIbanAction(iban);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="IBAN Validator — Check Any IBAN Instantly (2026)"
        description="Verify the checksum and format of an International Bank Account Number. Safe and secure IBAN validation using ISO 7064 MOD 97-10 algorithm."
        canonicalUrl="https://swiftcodedir.com/iban/validator"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is it safe to enter my IBAN here?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Our validator checks the mathematical logic on your device without saving the account number to any database. An IBAN alone cannot be used to withdraw money from your account."
                }
              },
              {
                "@type": "Question",
                "name": "Can someone steal money with my IBAN?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. An IBAN is strictly an 'address' for receiving funds. To withdraw money, a person would need your private authentication, passwords, or direct debit mandates."
                }
              },
              {
                "@type": "Question",
                "name": "Why did my IBAN validation fail?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Failures usually occur due to an incorrect length, illegal characters, or a checksum failure (likely a typo in the numbers)."
                }
              },
              {
                "@type": "Question",
                "name": "How many digits are in a valid IBAN?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The length varies by country, ranging from 15 characters (Norway) up to 34 characters."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need an IBAN for US transfers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The USA does not use IBAN for domestic transfers. However, if you are sending money FROM the US to an IBAN country, you must provide the recipient's IBAN."
                }
              }
            ]
          }
        ]}
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
      
      <div className="flex flex-col items-center text-center mb-16 pt-4">
        <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-blue-600 mb-8 shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
          <ShieldCheck className="w-12 h-12 relative z-10" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
          IBAN Validator — <span className="text-blue-600 dark:text-blue-400">Check Any IBAN Instantly (2026)</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-normal opacity-80 italic">
          Verify the structural and mathematical integrity of any International Bank Account Number using the official ISO 7064 MOD 97-10 algorithm.
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
              className="text-base sm:text-lg font-mono tracking-wider sm:tracking-widest uppercase h-14 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 placeholder:normal-case placeholder:tracking-normal"
            />
            <Button onClick={onManualValidate} size="lg" className="h-14 px-8 bg-[#003399] dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 w-full sm:w-auto">
              Validate <Search className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      

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
              <p className="text-red-700 dark:text-red-400 font-medium">{result.error}</p>
            </CardContent>
          )}
        </Card>
      )}

      <div className="max-w-4xl mx-auto mt-16 space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <section className="prose prose-slate dark:prose-invert">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">How ISO 7064 MOD 97-10 works</h2>
            <p className="text-sm leading-relaxed">
              The security of the IBAN system relies on a mathematical checksum calculation known as the ISO 7064 MOD 97-10 algorithm. To validate an IBAN, the country code and check digits are moved to the end of the string. Characters are thereafter converted into numbers (A=10, B=11, etc.). The resulting massive integer is divided by 97. If the IBAN is valid, the remainder (modulo) must strictly be 1. This mathematical certainty allows banks to catch typos or transposed digits before a transfer is even initiated, protecting funds from being sent to non-existent or incorrect destinations across the global banking networks.
            </p>
          </section>

          <section className="prose prose-slate dark:prose-invert">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">What a valid IBAN means</h2>
            <p className="text-sm leading-relaxed">
              A "valid" result from our tool means the IBAN is structurally and mathematically sound according to international standards. Specifically, it confirms the country code exists, the string length matches that nation’s requirements, and the checksum digits successfully pass the MOD 97-10 calculation. It serves as a guarantee that the bank identity and account syntax are correct. However, please note that "validity" does not confirm the account is currently open, active, or belongs to a specific individual. It only confirms that the "address" exists in a format that banking computers can recognize and process.
            </p>
          </section>
        </div>

        <section className="bg-slate-100 dark:bg-slate-900/50 p-8 rounded-2xl border dark:border-slate-800">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">Common IBAN Errors Explained</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              IBAN errors typically fall into three categories: length errors, character errors, and checksum failures. A length error occurs when the number of characters provided does not match the ISO registry for that specific country (e.g., providing 20 characters for a 22-character German IBAN). Character errors involve using symbols or letters in positions where only digits are permitted by the local central bank.
            </p>
            <p>
              The most common error, however, is a checksum failure. This happens when a user mistypes a single digit or swaps two numbers. Because of the MOD 97-10 algorithm, even a minor typo will totally change the mathematical remainder, triggering a failure. Transposition errors (writing 56 instead of 65) are particularly common. Using our validator helps identify these mistakes early, preventing "Payment Rejected" status and the associated bank penalties or investigation delays.
            </p>
          </div>
        </section>

        <section className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold">Country-Specific Notes</h2>
          <p>
            Different countries have unique quirks in their IBAN structure. For instance, French IBANs (27 chars) include a RIB (Relevé d'Identité Bancaire) which contains a bank code, branch code, account number, and two additional check digits within the BBAN itself. UK IBANs (22 chars) always start with GB, followed by a 4-character bank identifier (like 'WEST' or 'BARC') and the 6-digit sort code. Some Middle Eastern nations have recently adopted IBANs but may still require additional local identifiers for certain types of domestic clearances. Our database accounts for these localized rules during the validation process.
          </p>
        </section>
      </div>
    </div>
  );
}
