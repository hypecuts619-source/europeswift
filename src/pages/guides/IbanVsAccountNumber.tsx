import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { SEO } from '../../components/SEO';

export function IbanVsAccountNumber() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="IBAN vs Account Number | What is the difference?"
        description="Learn the key differences between a standard local bank account number and an International Bank Account Number (IBAN)."
        canonicalUrl="https://swiftcodedir.com/iban-vs-account-number"
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/iban">IBAN</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>IBAN vs Account Number</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="font-serif text-4xl text-[#003399] dark:text-blue-400 mb-6">IBAN vs Local Account Number</h1>
        
        <p className="text-lg">
          While both identify where your money is stored, a domestic account number is only useful within your own country, whereas an IBAN acts as a globally recognizable coordinate.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Local Account Number</h2>
        <p>
          A local account number string uniquely identifies your specific account within your bank. However, by itself, it tells the banking system nothing about <strong>which</strong> bank or <strong>which</strong> country holds the account. To do a local transfer, you usually need a secondary piece of information (like a branch code, Sort Code, or BSB).
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">The IBAN Approach</h2>
        <p>
          The IBAN (International Bank Account Number) was created to solve the ambiguity of cross-border transfers. It takes your local account number and wraps it in standardized layers:
        </p>
        <ul>
          <li><strong>Country Code:</strong> Identifies the destination nation instantly.</li>
          <li><strong>Bank Identifier:</strong> Tells the global system which specific financial institution holds the funds.</li>
          <li><strong>Checksum:</strong> A mathematical signature that proofs the number wasn't mistyped.</li>
          <li><strong>Your Account Number:</strong> Embedded intact within the final string.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Summary</h2>
        <p>
          Your Local Account Number is a <em>sub-component</em> of your IBAN. When performing an international wire, the sender's bank doesn't know the domestic routing rules of the destination country. By providing the full IBAN, you guarantee the foreign bank has the complete, validated payload to reach your ledger.
        </p>
      </article>
    </div>
  );
}
