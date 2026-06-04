import { useMemo, useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { useParams, Navigate, Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { getIbanCountryMeta, getBreadcrumbSchema } from '../../utils/seoHelpers';
import { Globe, CheckCircle2, ShieldCheck, Banknote, HelpCircle, ArrowRight, Check, X } from 'lucide-react';
import ibanFormatsDataJson from '../../data/iban-formats.json';
import * as ibantools from 'ibantools';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { AdsterraNativeSlot } from '../../components/AdsterraNativeSlot';
import { useRecentViews } from '../../hooks/useRecentViews';

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🌐';
  }
};

const slugify = (text: string) => {
  return text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
};

const formatIBAN = (iban: string) => {
  return iban.replace(/[^\w]/g, '').toUpperCase().replace(/(.{4})/g, '$1 ').trim();
};

export function IbanCountryFormat() {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const [testIban, setTestIban] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const { trackView } = useRecentViews();

  const countryData = useMemo(() => {
    return (ibanFormatsDataJson as any[]).find(item => 
      slugify(item.country) === countrySlug || item.code.toLowerCase() === countrySlug
    );
  }, [countrySlug]);

  useEffect(() => {
    if (countryData) {
      trackView({
        id: `iban-${countryData.code}`,
        title: `${countryData.country} IBAN`,
        type: 'iban',
        url: `/iban/${slugify(countryData.country)}`
      });
    }
  }, [countryData]);


  const validationResult = useMemo(() => {
    if (!testIban) return null;
    const cleanIban = testIban.replace(/[\s\-_]/g, '').toUpperCase();
    if (cleanIban.length < 2) return { valid: false, message: 'IBAN is too short' };
    
    if (cleanIban.substring(0, 2) !== countryData?.code) {
      return { valid: false, message: `IBAN must start with ${countryData?.code}` };
    }
    
    if (cleanIban.length !== countryData?.length) {
      return { valid: false, message: `Length should be exactly ${countryData?.length} characters (currently ${cleanIban.length})` };
    }

    const isValid = ibantools.isValidIBAN(cleanIban);
    if (isValid) {
      return { valid: true, message: 'Valid IBAN format and check digits!' };
    } else {
      return { valid: false, message: 'Invalid check digits or internal structure.' };
    }
  }, [testIban, countryData]);

  if (!countryData && countrySlug) {
    return <Navigate to="/iban" replace />;
  }

  if (!countryData) return null;

  const exampleBlocks = (countryData.example || '').match(/.{1,4}/g) || [];
  const meta = getIbanCountryMeta(countryData.country, countryData.code, countryData.length);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://swiftcodedir.com" },
    { name: "IBAN Directory", url: "https://swiftcodedir.com/iban" },
    { name: `${countryData.country} IBAN`, url: `https://swiftcodedir.com/iban/${slugify(countryData.country)}` }
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title={meta.title}
        description={meta.description}
        canonicalUrl={`https://swiftcodedir.com/iban/${slugify(countryData.country)}`}
        jsonLd={[breadcrumbSchema]}
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/iban">IBAN</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{countryData.country} IBAN</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 bg-[#003399] dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-[#002266] dark:border-slate-800 shadow-2xl text-white">
        <div className="w-24 h-24 bg-white/10 rounded-[2.25rem] flex items-center justify-center text-5xl shrink-0 backdrop-blur-sm border border-white/20 shadow-inner">
          <span role="img" aria-label={`Flag of ${countryData.country}`}>{getFlagEmoji(countryData.code)}</span>
        </div>
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {countryData.country} IBAN Format
          </h1>
          <p className="text-blue-100 font-medium text-lg leading-relaxed max-w-2xl mb-6">
            Everything you need to know to send money to {countryData.country}: exact length ({countryData.length} characters), format, and real-time validation.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
             <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 flex flex-col">
               <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Country Code</span>
               <span className="text-2xl font-bold text-white">{countryData.code}</span>
             </div>
             <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 flex flex-col">
               <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Exact Length</span>
               <span className="text-2xl font-bold text-white">{countryData.length} chars</span>
             </div>
             <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 flex flex-col max-w-full overflow-hidden">
               <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">BBAN Format</span>
               <span className="text-lg md:text-xl font-mono text-white font-bold truncate">{countryData.format}</span>
             </div>
          </div>
        </div>
      </div>

      <section className="mb-12 w-full flex justify-center">
        <AdsterraNativeSlot zoneId="d3204c449d1c550b52260207ce88c485" format="horizontal" />
      </section>

      {/* Interactive Validator Tool */}
      <div className="bg-white dark:bg-slate-900 border-2 border-blue-500/20 dark:border-blue-500/30 rounded-3xl p-6 md:p-10 mb-16 shadow-xl shadow-blue-900/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-[#003399]"></div>
        <h2 className="text-2xl font-bold mb-2">Check a {countryData.country} IBAN</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Test any {countryData.code} IBAN below to verify its {countryData.length}-character structure and mathematical check digits.</p>
        
        <div className="space-y-4 max-w-3xl">
          <div className="relative">
            <input 
              type="text" 
              value={formatIBAN(testIban)}
              onChange={(e) => {
                setTestIban(e.target.value.toUpperCase());
                setHasInteracted(true);
              }}
              placeholder={`e.g. ${formatIBAN(countryData.example || countryData.code + '1234567890')}`}
              className="w-full text-base sm:text-lg md:text-3xl font-mono p-4 sm:p-6 pr-12 sm:pr-16 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none uppercase placeholder:text-slate-300"
              maxLength={countryData.length + Math.floor(countryData.length/4)}
            />
            {hasInteracted && validationResult && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                {validationResult.valid ? (
                  <div className="bg-emerald-100 text-emerald-600 rounded-full p-2">
                    <Check className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="bg-red-100 text-red-600 rounded-full p-2">
                    <X className="w-8 h-8" />
                  </div>
                )}
              </div>
            )}
          </div>
          
          {hasInteracted && validationResult && (
            <div className={`p-4 rounded-xl flex items-start gap-3 border ${validationResult.valid ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300' : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'}`}>
              {validationResult.valid ? <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" /> : <X className="w-5 h-5 mt-0.5 shrink-0" />}
              <span className="font-medium text-lg">{validationResult.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Structure Visualizer */}
      <h2 className="text-3xl font-bold mb-8">Structure of a {countryData.country} IBAN</h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 shadow-sm flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
            {exampleBlocks.map((block: string, i: number) => (
              <div key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-mono text-lg sm:text-2xl font-bold border border-slate-200 dark:border-slate-700 shadow-sm grow sm:grow-0 text-center">
                {block}
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-dashed dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Country Code</span>
              <span className="font-bold text-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-md">{countryData.code}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-dashed dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Total Exact Length</span>
              <span className="font-bold text-xl bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md">{countryData.length} chars</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400 font-medium">BBAN Pattern</span>
              <span className="font-mono text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-md border border-red-100 dark:border-red-900/50">
                {countryData.format}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
          <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" />
            Official formatting rules
          </h3>
          <p className="text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed mb-6">
            When sending money to {countryData.country}, an exact {countryData.length}-character IBAN starting with <strong>{countryData.code}</strong> is required by the payment routing network to pass validation. 
          </p>
          <ul className="space-y-4 text-emerald-900 dark:text-emerald-200">
             <li className="flex gap-3">
               <div className="w-6 h-6 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">1</div>
               <p>Must be exactly <strong>{countryData.length} alphanumeric characters</strong> long.</p>
             </li>
             <li className="flex gap-3">
               <div className="w-6 h-6 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">2</div>
               <p>Must begin with the ISO country code <strong>{countryData.code}</strong>.</p>
             </li>
             <li className="flex gap-3">
               <div className="w-6 h-6 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">3</div>
               <p>Must pass the strict MOD-97 mathematical validation algorithm utilizing the two check digits following the country code.</p>
             </li>
          </ul>
        </div>
      </div>

      <article className="prose prose-slate prose-lg dark:prose-invert max-w-none mt-16 mb-12">
        <h2 className="text-3xl font-bold">What is the {countryData.country} IBAN Format?</h2>
        <p>
          The International Bank Account Number (IBAN) in {countryData.country} is a highly standardized formatting system designed to identify international customer bank accounts, minimizing the risk of transcription errors and missed payments. 
        </p>
        <p>
          The official IBAN requirement for {countryData.country} mandates that the string consists of exactly {countryData.length} characters. Every valid IBAN registered for this area begins with the standardized two-letter ISO country code, which is officially registered as <strong>{countryData.code}</strong>.
        </p>
        
        <h3>Decoding the numbers</h3>
        <p>
          Directly following the {countryData.code} country code, there are two precisely calculated check digits. These check digits are mathematically derived based on the entire remainder of the IBAN sequence. They are a critical security and validation feature, instantly rejecting typos or transposed numbers before a wire transfer is even transmitted over the network.
        </p>
        <p>
          The remaining {countryData.length - 4} characters make up the Basic Bank Account Number (BBAN). The detailed layout of the BBAN is determined locally by the national banking authority or central bank in {countryData.country}. It usually strings together a unique national bank routing code, a branch location identifier, and the customer's personal individual account number. The official BBAN configuration pattern for {countryData.country} is recognized as <code>{countryData.format}</code>.
        </p>

        <hr className="my-10 border-slate-200 dark:border-slate-800" />

        <h2 className="text-3xl font-bold">Why precise IBAN validation is critical for {countryData.country}</h2>
        <p>
          Routing international wire transfers through the SWIFT mechanism, or initiating direct SEPA cross-border payments (if {countryData.country} is a participating SEPA member state), requires absolute adherence to strict formatting constraints. If you try to execute a funds transfer to {countryData.country} using an irregularly formatted IBAN, the transaction will almost certainly be blocked by your banking software, or immediately rejected by the receiving clearing house.
        </p>
        <ul>
          <li><strong>Financial Penalties:</strong> Bounced transfers due to a fractured IBAN structure lead to prolonged delays in transaction settlement and often result in expensive, non-refundable intermediary banking fees.</li>
          <li><strong>Processing Speed:</strong> A 100% correct IBAN sequence allows for automated "Straight Through Processing" (STP), ensuring the money moves optimally without manual human intervention.</li>
        </ul>
        <p>
          Because of these risks, you must verify the IBAN length ({countryData.length} characters) and structure prior to formally authorizing your international remittance. We heavily advise using our real-time cryptographic verification tool located at the top of this page to calculate the MOD-97 check digits automatically before sending.
        </p>
        
        <hr className="my-10 border-slate-200 dark:border-slate-800" />

        <h2 className="text-3xl font-bold">How to correctly find your {countryData.country} IBAN</h2>
        <p>
          If you open a bank account in {countryData.country} and intend to receive foreign incoming funds, you are obligated to provide the sender with your complete, unbroken IBAN sequence. You can generally uncover this verified string in multiple protected locations:
        </p>
        <ol>
          <li><strong>Online Banking Portals:</strong> Log securely into your institution's web portal or official mobile application. The IBAN is nearly always displayed visibly on the primary account details, settings, or statement hub.</li>
          <li><strong>Paper and PDF Bank Statements:</strong> Examine the top right margin or header section of your strictly official PDF or conventionally printed monthly bank statements.</li>
          <li><strong>Physical Checkbooks:</strong> If your specific bank distributes checkbooks, the full IBAN might be imprinted at the bottom edge of the paper checks, commonly neighboring the localized MICR line.</li>
          <li><strong>Direct Request:</strong> You invariably have the option to contact your bank's telephonic customer support line or visit a physical retail branch location in {countryData.country} to formally request your explicit international routing document.</li>
        </ol>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-xl my-8 not-prose">
          <h4 className="text-amber-800 dark:text-amber-400 font-bold text-lg mb-2 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" /> Warning
          </h4>
          <p className="text-amber-900/80 dark:text-amber-300 leading-relaxed">
            You should systematically avoid attempting to manually guess, forge, or construct an IBAN yourself by simply stringing together your standalone local bank code and account number. The two check digits located in positions 3 and 4 must strictly adhere to the official ISO 7064 MOD 97-10 algorithm to be authenticated globally.
          </p>
        </div>

        <h2 className="text-3xl font-bold">Difference between a {countryData.country} IBAN and SWIFT/BIC</h2>
        <p>
          It is extremely common to confuse an IBAN with a SWIFT code, yet they serve entirely different functional roles during a wire transfer:
        </p>
        <p>
          While your IBAN meticulously identifies your distinct, specific, individual banking account ledger residing within {countryData.country}, the SWIFT code (sometimes termed BIC or Bank Identifier Code) strictly identifies the institutional bank organization itself on a macroeconomic global scale. When originating an international wire format, most banking platforms will demand both the final beneficiary's IBAN and their receiving bank's 8 or 11 character SWIFT code to guarantee the capital reaches both the correct destination institution and the exact granular account directory.
        </p>
      </article>

    </div>
  );
}

