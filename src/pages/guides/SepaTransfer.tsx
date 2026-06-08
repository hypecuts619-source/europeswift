import { Helmet } from 'react-helmet-async';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { SEO } from '../../components/SEO';

export function SepaTransfer() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "SEPA Transfer Guide: How Europe's Payment System Works",
    "description": "Learn about the Single Euro Payments Area (SEPA), how long transfers take, and why you mostly just need an IBAN for payments within Europe.",
    "publisher": {
      "@type": "Organization",
      "name": "SwiftCodeDir"
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="SEPA Transfer Guide: How Europe's Payment System Works | SwiftCodeDir"
        description="Learn about the Single Euro Payments Area (SEPA), how long transfers take, and why you mostly just need an IBAN for payments within Europe."
        canonicalUrl="https://swiftcodedir.com/sepa-transfer-guide"
        jsonLd={schema}
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
            <BreadcrumbPage>SEPA Transfer Guide</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
        <h1 className="text-4xl font-serif text-[#003399] dark:text-blue-400 mb-6">SEPA Transfer Guide</h1>
        
        <p className="lead text-xl text-gray-600 dark:text-gray-300">
          SEPA stands for the <strong>Single Euro Payments Area</strong>. It is an initiative created by the European Union to simplify cross-border bank transfers, making them as fast, secure, and cheap as domestic payments.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mt-8 mb-4">How Does SEPA Work?</h2>
          <p>
            Before SEPA, sending money from France to Germany required international wire fees and took several days to clear through correspondent banks using SWIFT. Under the SEPA framework, consumers and businesses can make electronic euro payments to any other SEPA-compliant country under the same basic conditions as domestic payments.
          </p>
          <p className="mt-4">
            Currently, there are over 36 member countries in the SEPA zone, including all EU member states, as well as the UK, Switzerland, Norway, Iceland, and a few others.
          </p>
        </section>

        <section className="bg-blue-50 dark:bg-slate-800/50 p-6 rounded-xl my-8 border border-blue-100 dark:border-slate-700">
          <h3 className="text-xl font-bold mb-4">The Golden Rule of SEPA: The IBAN</h3>
          <p>
            To send a SEPA transfer, the absolute most critical piece of information you need is the recipient's <strong>IBAN</strong> (International Bank Account Number). Since SEPA's standardization rules came into effect fully, the "IBAN Only" rule applies. This means that for SEPA transfers, you no longer strictly need to provide a BIC/SWIFT code; the IBAN is enough to route the money.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">Types of SEPA Transfers</h2>
          <ul className="list-disc pl-6 space-y-4 mt-4 mb-8">
            <li>
              <strong>SEPA Credit Transfer (SCT):</strong> The standard transfer. Usually takes 1 business day to arrive.
            </li>
            <li>
              <strong>SEPA Instant Credit Transfer (SCT Inst):</strong> Also known as SEPA Instant, this allows for funds to settle in fewer than 10 seconds, 24/7/365. Both the sending and receiving banks must support the scheme.
            </li>
            <li>
              <strong>SEPA Direct Debit (SDD):</strong> Used for recurring payments, such as utility bills or subscriptions, allowing a company to pull funds directly from your account (with prior authorization).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">Cost of SEPA Transfers</h2>
          <p>
            By EU regulation, banks cannot charge more for a cross-border SEPA payment than they do for an equivalent domestic transfer. For most individuals within the Eurozone, this means standard SEPA Credit Transfers are completely free.
          </p>
        </section>
      </article>
    </main>
  );
}
