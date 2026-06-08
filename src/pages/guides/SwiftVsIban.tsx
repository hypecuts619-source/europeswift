import { SEO } from '../../components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';

export function SwiftVsIban() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "SWIFT vs IBAN vs Routing: What's the Difference?",
    "description": "Confused about the difference between a SWIFT code, an IBAN, and a US Routing Number? Learn when to use each for your bank transfers.",
    "publisher": {
      "@type": "Organization",
      "name": "SwiftCodeDir"
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="SWIFT vs IBAN vs Routing: What is the Difference? | SwiftCodeDir"
        description="Confused about the difference between a SWIFT code, an IBAN, and a US Routing Number? Learn when to use each for your bank transfers."
        canonicalUrl="https://swiftcodedir.com/swift-vs-iban"
        jsonLd={articleSchema}
      />

      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/guides">Guides</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>SWIFT vs IBAN vs Routing</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0B1C3D] to-[#003399] dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-6">SWIFT vs IBAN vs Routing: What's the Difference?</h1>
        
        <p className="lead text-xl text-slate-600 dark:text-slate-400">
          When sending money, your bank might ask you for a SWIFT code, an IBAN, a US Routing Number, or sometimes a combination. While they are all used in money transfers, they serve entirely different geographical and functional purposes.
        </p>

        <section className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl overflow-hidden my-8 shadow-sm">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x dark:divide-slate-800">
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#003399] dark:text-blue-400 mb-4">SWIFT Code (BIC)</h3>
              <p className="mb-4">Identifies the <strong>Bank Internationally</strong>.</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>8 or 11 characters long (letters and numbers).</li>
                <li>Points the funds to the correct financial institution anywhere in the world.</li>
                <li>Indispensable for global wire transfers.</li>
              </ul>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#003399] dark:text-blue-400 mb-4">IBAN</h3>
              <p className="mb-4">Identifies the <strong>Individual Account</strong>.</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>Up to 34 alphanumeric characters (varies by country).</li>
                <li>Points the funds to the specific recipient's account.</li>
                <li>Used prominently in Europe, the Middle East, and some other regions (but not in the US or Canada).</li>
              </ul>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4">US Routing Number</h3>
              <p className="mb-4">Identifies the <strong>Bank Domestically (US)</strong>.</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>Exactly 9 digits long.</li>
                <li>Used exclusively for domestic US transfers (ACH, Wire).</li>
                <li>Useless for international SWIFT transfers on its own.</li>
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
            <li>The <strong>SWIFT code</strong> is the Country, City, and Zip Code. It ensures the letter gets to the exact right post office (bank branch) globally.</li>
            <li>The <strong>IBAN</strong> is the specific Street Address and Apartment number. It ensures that once the post office has the letter, they put it into the correct mailbox (account).</li>
            <li>The <strong>US Routing Number</strong> is like a localized US Zip Code. Very efficient if you're sending a letter from Ohio to Texas, but completely unrecognized by a post office in France.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">Do I need both?</h2>
          <p>
            It depends on where you are sending money to. If you are sending money to a country within the SEPA zone (most of Europe), you often only need the IBAN, as modern systems can derive the bank's routing path directly from it. However, if sending a wire to the United States, you will need the bank's SWIFT code and the recipient's domestic Account Number (sometimes alongside their Routing Number, depending on your bank's portal).
          </p>
        </section>
      </article>
    </main>
  );
}
