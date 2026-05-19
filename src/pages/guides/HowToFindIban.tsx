import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Card, CardContent } from '../../components/ui/card';
import { Link } from 'react-router-dom';
import { Search, Map, Globe, Landmark } from 'lucide-react';
import { SEO } from '../../components/SEO';

export function HowToFindIban() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="How to Find Your IBAN Number | Step-by-Step Guide 2026"
        description="Learn the fastest and most accurate ways to find your International Bank Account Number (IBAN). Step-by-step instructions for online banking, bank statements, and banking apps."
        canonicalUrl="https://swiftcodedir.com/how-to-find-iban"
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/iban">IBAN</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>How to Find Your IBAN</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="font-serif text-4xl text-[#003399] dark:text-blue-400 mb-6">How to Find Your IBAN Number</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Need to receive an international payment? The sender will almost certainly ask for your IBAN (International Bank Account Number). Finding it is usually straightforward if you know where to look.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Method 1: Online Banking (Fastest)</h2>
        <p>
          The easiest way to find your IBAN is by logging into your online banking portal via your computer or mobile app.
        </p>
        <ul>
          <li><strong>Step 1:</strong> Log in to your online banking.</li>
          <li><strong>Step 2:</strong> Navigate to your account summary or account details.</li>
          <li><strong>Step 3:</strong> Look for a section titled "Account Information" or "Bank Details". Your IBAN should be displayed prominently, often alongside your BIC/SWIFT code.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Method 2: Bank Statements</h2>
        <p>
          If you have a paper or digital bank statement, your IBAN is typically printed near the top of the page.
        </p>
        <ul>
          <li>Check the upper right or left corner of the statement.</li>
          <li>It will usually be clearly labeled "IBAN: " followed by the alphanumeric string.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Method 3: Ask Your Bank</h2>
        <p>
          You can always call your bank's customer service number or visit a local branch. A representative can quickly provide your IBAN after verifying your identity.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Method 4: Generate It (Use with Caution)</h2>
        <p>
          If you know your domestic bank account numbers (like your Sort Code and Account Number in the UK, or BLZ and Account Number in Germany), you can generate your IBAN. We offer a free <Link to="/iban/calculator">IBAN Calculator</Link> to help you do this safely.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl mt-8 border border-blue-100 dark:border-blue-900/30">
          <h3 className="text-[#003399] dark:text-blue-400 font-bold mb-2">Important Warning</h3>
          <p className="text-sm">
            Always verify your IBAN using our <Link to="/iban/validator">IBAN Validator</Link> before sending it to someone else. Providing an incorrect IBAN can cause delays, failed payments, and banks may charge significant return fees.
          </p>
        </div>
      </article>
    </div>
  );
}
