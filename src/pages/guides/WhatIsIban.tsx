import { Helmet } from 'react-helmet-async';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { SEO } from '../../components/SEO';

export function WhatIsIban() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="What is an IBAN? International Bank Account Number Explained | SwiftCodeDir"
        description="Learn what an IBAN is, how it's structured, and why you need it for international and SEPA bank transfers."
        canonicalUrl="https://swiftcodedir.com/what-is-an-iban"
      />

      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Guides</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>What is an IBAN?</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
        <h1 className="text-4xl font-serif text-[#003399] dark:text-blue-400 mb-6">What is an IBAN?</h1>
        
        <p className="lead text-xl text-gray-600 dark:text-gray-300">
          IBAN stands for <strong>International Bank Account Number</strong>. It's an internationally agreed system of identifying bank accounts across national borders to facilitate the communication and processing of cross-border transactions with a reduced risk of transcription errors.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mt-8 mb-4">How an IBAN is Structured</h2>
          <p>
            An IBAN can have up to 34 alphanumeric characters, but the exact length depends on the country. It always consists of:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-8">
            <li><strong>Country Code (2 letters):</strong> Indicates the country where the bank account is held (e.g., DE for Germany, GB for the UK).</li>
            <li><strong>Check Digits (2 numbers):</strong> Used to verify the routing destination and ensure the IBAN is valid before the transfer is sent.</li>
            <li><strong>Basic Bank Account Number (BBAN):</strong> The remainder of the IBAN, which includes the bank identifier and the account number itself. The format of the BBAN is decided by each individual country.</li>
          </ul>
        </section>

        <section className="bg-blue-50 dark:bg-slate-800/50 p-6 rounded-xl my-8 border border-blue-100 dark:border-slate-700">
          <h3 className="text-xl font-bold mb-4">Example: German IBAN Format (22 characters)</h3>
          <p className="mb-2"><strong>DE</strong> (Country Code)</p>
          <p className="mb-2"><strong>89</strong> (Check Digits)</p>
          <p className="mb-2"><strong>37040044</strong> (Bank Code - BLZ)</p>
          <p className="mb-0"><strong>0532013000</strong> (Account Number)</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">Where is IBAN Used?</h2>
          <p>
            The IBAN system was initially developed to facilitate payments within the European Union but has since been adopted by over 70 countries worldwide. Notable exceptions are the United States, Canada, and Australia, which do not use IBANs for domestic transfers (the US relies on ABA Routing Numbers).
          </p>
          <p className="mt-4">
            If you are sending money to Europe or the Middle East, you will likely be asked for the recipient's IBAN. Always verify the length and format using an IBAN Validator before dispatching funds.
          </p>
        </section>
      </article>
    </main>
  );
}
