import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, AlertCircle, Copy, Check, Info } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { SEO } from '../../components/SEO';
import { AdsterraNativeSlot } from '../../components/AdsterraNativeSlot';
import IBAN from 'iban';

import { calculateIbanChecksum, formatIban } from '../../lib/ibanUtils';

export function IbanCalculator() {
  const [country, setCountry] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [generatedIban, setGeneratedIban] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countries = useMemo(() => {
    // arhs/iban.js exports countries
    const countryData = (IBAN as any).countries || {};
    return Object.keys(countryData).sort().map(code => ({
      code,
      name: countryData[code].country || code,
      length: countryData[code].length,
      example: countryData[code].example
    }));
  }, []);

  const selectedCountryInfo = useMemo(() => {
    if (!country) return null;
    return countries.find(c => c.code === country);
  }, [country, countries]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (country && bankCode && accountNumber) {
      try {
        const fullBban = (bankCode + accountNumber).toUpperCase().replace(/\s+/g, '');
        // Validate BBAN length/format if possible
        const iban = IBAN.fromBBAN(country, fullBban);
        
        if (IBAN.isValid(iban)) {
          setGeneratedIban(iban);
          setCopied(false);
        } else {
          setError(`The generated IBAN is mathematically invalid. Please check your bank code and account number for ${country}.`);
        }
      } catch (err) {
        setError('Failed to generate IBAN. Please ensure the bank code and account number are correct for the selected country.');
      }
    }
  };

  const handleCopy = () => {
    if (generatedIban) {
      navigator.clipboard.writeText(generatedIban);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "IBAN Calculator & Generator",
    "description": "Calculate your IBAN from your local bank code and account number using our free IBAN Generator.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All"
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="Interactive IBAN Calculator & Generator | Free Bank Verification"
        description="Calculate your IBAN from your local bank code and account number using our free IBAN Generator. Supports UK Sort Codes, German BLZ, and more."
        canonicalUrl="https://swiftcodedir.com/iban/calculator"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does the IBAN calculator work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The calculator takes your local bank code and account number, adds the country prefix, and calculates the required two-digit checksum using the MOD 97-10 algorithm to produce a valid IBAN."
                }
              },
              {
                "@type": "Question",
                "name": "Is the generated IBAN guaranteed to work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The IBAN is mathematically correct, but you must verify that the account number belongs to a real, active account with your bank before sending significant funds."
                }
              },
              {
                "@type": "Question",
                "name": "What is a BBAN?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BBAN stands for Basic Bank Account Number. It is the domestic part of the IBAN that contains the bank and branch identifier along with the account number."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this for any country?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our calculator supports over 80 countries that have officially adopted the IBAN standard, including EU nations, the UK, and several Middle Eastern and African countries."
                }
              },
              {
                "@type": "Question",
                "name": "Does the calculator verify my bank balance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. This tool only performs a mathematical formatting check. It does not have access to your private bank account details or balance."
                }
              }
            ]
          }
        ]}
      />

      <div className="flex flex-col items-center text-center mb-16 pt-4">
        <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-[#003399] dark:text-blue-400 mb-8 shadow-xl border border-blue-50/50 dark:border-blue-900/30 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
          <Calculator className="w-12 h-12 relative z-10" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#0B1C3D] to-[#003399] dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-6 font-serif tracking-tight leading-tight">
          IBAN Calculator — <span className="opacity-80">Generate & Build IBANs</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal opacity-80 italic">
          Convert your domestic bank identity (Bank Code, Sort Code, or BLZ) and account number into a fully compliant International Bank Account Number (IBAN).
        </p>
      </div>

      <section className="mb-12 w-full flex justify-center">
        <AdsterraNativeSlot zoneId="d3204c449d1c550b52260207ce88c485" format="horizontal" />
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg border-t-4 border-t-[#003399]">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#003399] dark:text-blue-400" />
              Generate IBAN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Country</label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name} ({c.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCountryInfo && (
                <div className="flex items-start gap-2 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/50">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <div className="text-xs text-blue-700 dark:text-blue-300">
                    <p className="font-semibold mb-1">Country Requirements:</p>
                    <p>Total IBAN Length: {selectedCountryInfo.length} characters</p>
                    <p className="mt-1 opacity-80 italic">Example: {selectedCountryInfo.example}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bank Code / Branch Identity</label>
                <Input 
                  value={bankCode} 
                  onChange={e => setBankCode(e.target.value)} 
                  placeholder="Enter bank code portion"
                  required
                  className="dark:bg-slate-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Account Number</label>
                <Input 
                  value={accountNumber} 
                  onChange={e => setAccountNumber(e.target.value)} 
                  placeholder="Enter account number portion"
                  required
                  className="dark:bg-slate-900"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full h-12 bg-[#003399] hover:bg-blue-800 text-white font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]">
                Calculate & Validate IBAN
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {generatedIban ? (
            <Card className="border-green-200 dark:border-green-900 shadow-md bg-green-50/50 dark:bg-green-950/20">
              <CardContent className="p-6">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-green-700 dark:text-green-400 mb-3">
                  Your Calculated IBAN
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-green-200 dark:border-green-800 mb-4">
                  <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold tracking-wider text-slate-900 dark:text-slate-50 break-all text-center sm:text-left w-full">
                    {generatedIban.match(/.{1,4}/g)?.join(' ')}
                  </span>
                </div>
                <Button 
                  onClick={handleCopy} 
                  variant="outline"
                  className="w-full gap-2 border-green-300 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900 text-green-700 dark:text-green-400"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied to Clipboard' : 'Copy IBAN'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Alert className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">How it works</AlertTitle>
              <AlertDescription className="text-blue-700/80 dark:text-blue-400/80 mt-2">
                Provide your local bank code and account number. We will use the standardized ISO 13616 rules to calculate your international checksum and format your true IBAN.
              </AlertDescription>
            </Alert>
          )}

          
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-16 space-y-12">
        <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border dark:border-slate-800 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-[#003399] dark:text-blue-400">When to use an IBAN calculator?</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              An IBAN calculator is essential when you have your local bank details—such as a bank code, branch code, and account number—but need the internationally recognized IBAN format for a cross-border transfer. Many domestic accounts, particularly in older banking systems or non-EU nations, do not prominently display the IBAN on debit cards or monthly statements.
            </p>
            <p>
              If you are expecting a payment from abroad or need to set up an international direct debit, our calculator takes your domestic "Basic Bank Account Number" (BBAN) and applies the correct mathematical checksum and country prefix to generate the precise IBAN required by the global networks.
            </p>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
           <section className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border dark:border-slate-800">
             <h3 className="font-bold text-lg mb-3">IBAN Structure Examples</h3>
             <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400 list-disc pl-4">
               <li><strong>United Kingdom:</strong> GB + 2 Check Digits + 4 Chars (Bank) + 6 Digits (Sort) + 8 Digits (Account)</li>
               <li><strong>Germany:</strong> DE + 2 Check Digits + 8 Digits (BLZ) + 10 Digits (Account)</li>
               <li><strong>France:</strong> FR + 2 Check Digits + 5 Digits (Bank) + 5 Digits (Branch) + 11 Chars (Account) + 2 Digits</li>
               <li><strong>Italy:</strong> IT + 2 Check Digits + 1 Char (Check) + 5 Digits (Bank) + 5 Digits (Branch) + 12 Chars</li>
             </ul>
           </section>

           <section className="bg-blue-50/30 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
              <h3 className="font-bold text-lg mb-3">How to use this tool</h3>
              <ol className="text-sm space-y-2 text-slate-600 dark:text-slate-400 list-decimal pl-4">
                <li>Select the <strong>Destination Country</strong> from the dropdown menu.</li>
                <li>Enter the local <strong>Bank Code</strong> or Branch Identifier (e.g. Sort Code for UK).</li>
                <li>Enter your <strong>Basic Bank Account Number (BBAN)</strong> in full.</li>
                <li>Click "Calculate & Validate" to perform the <strong>MOD-97 checksum</strong>.</li>
              </ol>
           </section>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold">The Science of IBAN Generation</h2>
          <p>
            Constructing an IBAN isn't just about combining your bank code and account number. The critical component is the two-digit <strong>Checksum</strong> located immediately after the two-letter country code. 
          </p>
          <p>
            The process involves moving the country code and a temporary '00' checksum to the end of the string, and converting all alphabet characters into their numeric equivalents (where A=10, B=11... Z=35). We then divide this massive integer mathematically by 97 and subtract the remainder from 98. This resulting two-digit number is your unique, un-forgeable checksum.
          </p>
        </div>

        <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
          <h3 className="text-amber-900 dark:text-amber-400 font-bold mb-2">Legal Disclaimer</h3>
          <p className="text-xs text-amber-800/80 dark:text-amber-400/80 leading-relaxed">
            This tool generates IBANs based strictly on standard algorithmic formatting. It cannot verify if the underlying bank account is open, active, or belongs to a specific person. We recommend performing a "penny test" (sending a very small amount) before fulfilling any large invoices to ensure the recipient's bank account fully supports the generated IBAN without automated reversal.
          </p>
        </div>
      </div>
    </main>
  );
}
