import { Helmet } from 'react-helmet-async';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { SEO } from '../../components/SEO';

export function WhatIsSwift() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What is a SWIFT Code? Structure and Meaning Explained",
    "description": "Learn what a SWIFT code is, how to read its 8 or 11 character format, and why it's essential for safe international bank transfers.",
    "publisher": {
      "@type": "Organization",
      "name": "SwiftCodeDir"
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="What is a SWIFT Code? Structure and Meaning Explained | SwiftCodeDir"
        description="Learn what a SWIFT code is, how to read its 8 or 11 character format, and why it's essential for safe international bank transfers."
        canonicalUrl="https://swiftcodedir.com/what-is-a-swift-code"
        jsonLd={articleSchema}
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
            <BreadcrumbPage>What is a SWIFT Code?</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
        <h1 className="text-4xl font-serif text-[#003399] dark:text-blue-400 mb-6">What is a SWIFT Code?</h1>
        
        <p className="lead text-xl text-gray-600 dark:text-gray-300">
          A SWIFT code (sometimes known as a BIC number) is a standard format for Business Identifier Codes. It is arguably the most essential piece of information required when setting up an international wire transfer.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mt-8 mb-4">Understanding the SWIFT Code Format</h2>
          <p>
            SWIFT codes are formatted as either 8 or 11 characters. Each section of the code represents specific information about the bank:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-8">
            <li><strong>Bank Code (4 letters):</strong> Usually looks like a shortened version of the bank's name.</li>
            <li><strong>Country Code (2 letters):</strong> The ISO 3166-1 alpha-2 country code (e.g., US for United States, GB for Great Britain).</li>
            <li><strong>Location Code (2 letters or numbers):</strong> Identifies the head office or specific location of the bank.</li>
            <li><strong>Branch Code (3 letters or numbers, optional):</strong> Specifies a particular branch. If left out, the code represents the bank's primary office. Usually "XXX" for the main office.</li>
          </ul>
        </section>

        <section className="bg-blue-50 dark:bg-slate-800/50 p-6 rounded-xl my-8 border border-blue-100 dark:border-slate-700">
          <h3 className="text-xl font-bold mb-4">Example: CHASUS33XXX</h3>
          <p className="mb-2"><strong>CHAS</strong> = JPMorgan Chase Bank</p>
          <p className="mb-2"><strong>US</strong> = United States</p>
          <p className="mb-2"><strong>33</strong> = New York location</p>
          <p className="mb-0"><strong>XXX</strong> = Main Office</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">Why are SWIFT Codes Important?</h2>
          <p>
            When you send money internationally, your home bank doesn't simply hand the money over to the receiving bank directly. Instead, funds are routed through the SWIFT (Society for Worldwide Interbank Financial Telecommunication) network. The SWIFT code acts as a distinct global routing address so the money knows exactly where to go.
          </p>
          <p className="mt-4">
            If you provide an incorrect SWIFT code, your transfer may be delayed, returned, or routed to the wrong bank entirely, potentially costing you hefty international transfer fees. Always double-check your SWIFT code before confirming an international wire.
          </p>
        </section>
      </article>
    </main>
  );
}
