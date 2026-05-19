import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { SEO } from '../../components/SEO';

export function IbanVsRoutingNumber() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="IBAN vs Routing Number | US vs Global Banking Systems"
        description="Discover the difference between an International Bank Account Number (IBAN) and a US Routing Number (ABA). Do you need both for international transfers?"
        canonicalUrl="https://swiftcodedir.com/iban-vs-routing-number"
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/iban">IBAN</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>IBAN vs Routing Number</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="font-serif text-4xl text-[#003399] dark:text-blue-400 mb-6">IBAN vs ABA Routing Number</h1>
        
        <p className="text-lg">
          If you are sending or receiving an international wire transfer involving the United States, you will frequently encounter confusion between IBANs and Routing Numbers.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What is a US Routing Number?</h2>
        <p>
          A Routing Transit Number (RTN), often called an ABA Routing Number, is a 9-digit code used exclusively in the United States to identify the financial institution upon which a payment is drawn.
        </p>
        <p>
          Routing numbers are strictly domestic. They are used for automated clearing house (ACH) transactions, direct deposits, and domestic wire transfers within the Federal Reserve network.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Does the US use IBAN?</h2>
        <p>
          <strong>No.</strong> The United States has not adopted the IBAN system. Therefore, a bank account held in the US will not have an IBAN.
        </p>
        <p>
          When you receive funds internationally into a US account, the sender's bank will usually require:
        </p>
        <ul>
          <li>Your Bank's <strong>SWIFT/BIC Code</strong> (for international routing)</li>
          <li>Your local <strong>ABA Routing Number</strong></li>
          <li>Your <strong>Account Number</strong></li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Key Differences</h2>
        <table className="min-w-full text-left mt-4">
          <thead>
            <tr>
              <th>Feature</th>
              <th>IBAN</th>
              <th>Routing Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Geography</strong></td>
              <td>International (89+ Countries)</td>
              <td>United States only</td>
            </tr>
            <tr>
              <td><strong>Contains Account Data?</strong></td>
              <td>Yes (includes the specific account number)</td>
              <td>No (only identifies the bank/branch)</td>
            </tr>
            <tr>
              <td><strong>Format</strong></td>
              <td>Alphanumeric (up to 34 chars)</td>
              <td>9-digit numeric</td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>
  );
}
