import { Helmet } from 'react-helmet-async';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { SEO } from '../../components/SEO';

export function SwiftVsIban() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="SWIFT vs IBAN: What is the Difference? | SwiftCodeDir"
        description="Confused about the difference between a SWIFT code and an IBAN? Learn when to use each for your international bank transfers."
        canonicalUrl="https://swiftcodedir.com/swift-vs-iban"
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
            <BreadcrumbPage>SWIFT vs IBAN</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
        <h1 className="text-4xl font-serif text-[#003399] dark:text-blue-400 mb-6">SWIFT vs IBAN: What's the Difference?</h1>
        
        <p className="lead text-xl text-gray-600 dark:text-gray-300">
          When sending money overseas, your bank might ask you for a SWIFT code, an IBAN, or sometimes both. While they are both used in international money transfers, they serve two entirely different purposes.
        </p>

        <section className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl overflow-hidden my-8 shadow-sm">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x dark:divide-slate-800">
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#003399] dark:text-blue-400 mb-4">SWIFT Code (BIC)</h3>
              <p className="mb-4">Identifies the <strong>Bank</strong>.</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Stands for Society for Worldwide Interbank Financial Telecommunication.</li>
                <li>8 or 11 characters long (letters and numbers).</li>
                <li>Points the funds to the correct financial institution.</li>
                <li>Used globally.</li>
              </ul>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#003399] dark:text-blue-400 mb-4">IBAN</h3>
              <p className="mb-4">Identifies the <strong>Individual Account</strong>.</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Stands for International Bank Account Number.</li>
                <li>Up to 34 alphanumeric characters (varies by country).</li>
                <li>Points the funds to the specific recipient's account.</li>
                <li>Used prominently in Europe, the Middle East, and some other regions (but not in the US or Canada).</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">The Postal Service Analogy</h2>
          <p>
            Think of sending an international wire transfer like sending a physical letter in the mail:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-8">
            <li>The <strong>SWIFT code</strong> is like the City and Zip Code. It ensures the letter gets to the exact right post office (bank).</li>
            <li>The <strong>IBAN</strong> is the specific Street Address and Apartment number. It ensures that once the post office has the letter, they put it into the correct mailbox (account).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">Do I need both?</h2>
          <p>
            It depends on where you are sending money to. If you are sending money to a country within the SEPA zone (most of Europe), you often only need the IBAN, as modern systems can derive the bank's routing path directly from it. However, if sending to a non-SEPA country, you will usually need both the SWIFT code and the local account number (or IBAN if applicable).
          </p>
        </section>
      </article>
    </main>
  );
}
