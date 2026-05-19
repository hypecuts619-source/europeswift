import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { SEO } from '../../components/SEO';

export function IbanErrorCodes() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="IBAN Validation Error Codes Explained 2026"
        description="Understand what IBAN error codes mean. See common rejection reasons including invalid length, checksum failure, and incorrect country formatting."
        canonicalUrl="https://swiftcodedir.com/iban-error-codes"
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/iban">IBAN</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>IBAN Error Codes</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="font-serif text-4xl text-[#003399] dark:text-blue-400 mb-6">IBAN Error Codes & Rejection Reasons</h1>
        <p className="text-lg">
          If your bank transfer fails due to an "Invalid IBAN" message, the system has detected a structural or mathematical flaw in the number provided.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Common Validation Errors</h2>
        
        <div className="space-y-6">
          <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-lg border border-red-100 dark:border-red-900/30">
            <h3 className="text-red-800 dark:text-red-400 font-bold m-0 mt-0">Checksum Failure (Invalid Check Digits)</h3>
            <p className="text-sm mt-2">
              The 3rd and 4th digits of an IBAN are a mathematical checksum calculated from the rest of the string using the MOD-97 algorithm. If you mistype a single character in the account number or bank code, the checksum will fail, and the bank will reject the entire IBAN immediately.
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/10 p-5 rounded-lg border border-orange-100 dark:border-orange-900/30">
            <h3 className="text-orange-800 dark:text-orange-400 font-bold m-0 mt-0">Invalid Length</h3>
            <p className="text-sm mt-2">
              Each country has a strictly defined IBAN length. For example, a UK IBAN must be exactly 22 characters. If you submit 21 or 23 characters starting with 'GB', the banking system will raise a length error.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-lg border border-amber-100 dark:border-amber-900/30">
            <h3 className="text-amber-800 dark:text-amber-400 font-bold m-0 mt-0">Invalid Country Code</h3>
            <p className="text-sm mt-2">
              The first two letters must conform to the ISO 3166-1 alpha-2 registry. If an unsupported code is provided (e.g., 'XX'), the routing system will not be able to identify the destination nation.
            </p>
          </div>

           <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-[#003399] dark:text-blue-400 font-bold m-0 mt-0">Incorrect BBAN Format</h3>
            <p className="text-sm mt-2">
              Even if the length and checksum are theoretically correct, the internal structure might violate the country's specific rules (for instance, containing letters where a country expects strictly numeric characters for the account section).
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
