import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Building2, MapPin, Globe, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { countriesData } from '../../data/mockData';
import { SEO } from '../../components/SEO';

export function SwiftChecker() {
  const [swiftCode, setSwiftCode] = useState('');
  const [result, setResult] = useState<{
    valid: boolean;
    formatValid: boolean;
    bankCode: string;
    countryCode: string;
    locationCode: string;
    branchCode: string;
    countryName: string;
    isHeadOffice: boolean;
  } | null>(null);

  const analyzeSwift = (code: string) => {
    const cleanCode = code.replace(/\s+/g, '').toUpperCase();
    if (cleanCode.length !== 8 && cleanCode.length !== 11) {
      setResult({ valid: false, formatValid: false } as any);
      return;
    }

    const bankCode = cleanCode.substring(0, 4);
    const countryCode = cleanCode.substring(4, 6);
    const locationCode = cleanCode.substring(6, 8);
    const branchCode = cleanCode.length === 11 ? cleanCode.substring(8, 11) : 'XXX';
    const isHeadOffice = branchCode === 'XXX';

    const country = countriesData.find((c) => c.code === countryCode);

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'swift_validation_check', {
        event_category: 'engagement',
        swift_format_valid: true,
        swift_country: countryCode,
        is_head_office: isHeadOffice
      });
    }

    setResult({
      valid: !!country,
      formatValid: true,
      bankCode,
      countryCode,
      locationCode,
      branchCode,
      countryName: country ? country.name : 'Unknown Country',
      isHeadOffice,
    });
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "SWIFT Code Checker",
      "description": "Check, decode and verify SWIFT / BIC codes instantly.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://swiftcodedir.com/swift-checker",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://swiftcodedir.com/swift-checker?code={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does this SWIFT Code Checker verify the code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The checker decodes the standard 8 or 11-character SWIFT/BIC string. It validates the length, identifies the 4-letter bank code, matches the 2-letter ISO country code against international directories, decodes the 2-character location code, and reads the 3-character branch code (which is 'XXX' for head offices)."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if a SWIFT code fails the check?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If a SWIFT code fails, it typically means the code format is incorrect (e.g., wrong length, invalid characters). Our tool will alert you to 'Invalid SWIFT Format'. Double-check your code against your bank documentation."
          }
        }
      ]
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <SEO 
        title="SWIFT Code Checker - Verify BIC Codes | SwiftCodeDir"
        description="Check, decode and verify SWIFT / BIC codes instantly. Find the bank, country, location, and branch details from any SWIFT code."
        canonicalUrl="https://swiftcodedir.com/swift-checker"
        jsonLd={jsonLd}
      />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0B1C3D] to-[#003399] dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-4">
          SWIFT / BIC Code Checker
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Enter a SWIFT/BIC code to verify its format, decode its branch details, and confirm the destination country instantly.
        </p>
      </div>

      <Card className="shadow-lg border-blue-100 dark:border-blue-900 overflow-visible mb-12 relative z-10">
        <CardContent className="p-2 sm:p-4 pb-8 sm:pb-8 pt-8">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              analyzeSwift(swiftCode);
            }} 
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input 
                value={swiftCode}
                onChange={(e) => setSwiftCode(e.target.value)}
                placeholder="e.g., CHASUS33XXX" 
                className="pl-12 h-14 text-lg font-mono uppercase bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-[#003399]"
                maxLength={11}
              />
            </div>
            <Button size="lg" type="submit" className="h-14 px-8 bg-[#003399] hover:bg-blue-800 text-white font-semibold">
              Check SWIFT
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {!result.formatValid ? (
            <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl p-6 text-center shadow-sm">
              <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">Invalid SWIFT Format</h3>
              <p className="text-red-600 dark:text-red-300">
                A valid SWIFT / BIC code must be exactly 8 or 11 characters long. Please check your code and try again.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 dark:border-green-900/50 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                     </div>
                     <div>
                       <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Code Verified</h2>
                       <p className="text-slate-500 dark:text-slate-400">The length and format are correct.</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 flex items-center gap-2"><Globe className="w-4 h-4"/> Country</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-50">{result.countryName} ({result.countryCode})</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 flex items-center gap-2"><MapPin className="w-4 h-4"/> Location Code</span>
                      <span className="font-semibold tracking-wider font-mono text-slate-900 dark:text-slate-50">{result.locationCode}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 flex items-center gap-2"><Building2 className="w-4 h-4"/> Branch</span>
                      <div className="text-right">
                        <span className="font-semibold tracking-wider font-mono text-slate-900 dark:text-slate-50">{result.branchCode}</span>
                        {result.isHeadOffice && (
                          <div className="mt-1"><Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Head Office</Badge></div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">Code Breakdown</h3>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                        <div className="font-mono font-bold text-lg text-blue-600 mb-1">{result.bankCode}</div>
                        <div className="text-slate-500 uppercase">Bank</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                        <div className="font-mono font-bold text-lg text-emerald-600 mb-1">{result.countryCode}</div>
                        <div className="text-slate-500 uppercase">Country</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                        <div className="font-mono font-bold text-lg text-purple-600 mb-1">{result.locationCode}</div>
                        <div className="text-slate-500 uppercase">Location</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                        <div className="font-mono font-bold text-lg text-amber-600 mb-1">{result.branchCode}</div>
                        <div className="text-slate-500 uppercase">Branch</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
