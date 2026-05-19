import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';

export function IbanFormatByCountry() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="IBAN Format by Country | Global Standards 2026"
        description="Comprehensive guide to IBAN formats, BBAN structures, and character lengths for all 89 countries in the SWIFT IBAN registry."
        canonicalUrl="https://swiftcodedir.com/iban-format-by-country"
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/iban">IBAN</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>IBAN formats by country</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="font-serif text-4xl text-[#003399] dark:text-blue-400 mb-6">IBAN Format by Country</h1>
        <p className="text-lg">
          The International Bank Account Number (IBAN) structure varies slightly from country to country, but each must follow the strict ISO 13616 standard.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Standard IBAN Structure</h2>
        <p>Every IBAN consists of three structural components:</p>
        <ol>
          <li><strong>Country Code</strong> (2 letters): Defined under ISO-3166-1 (e.g., DE for Germany).</li>
          <li><strong>Check Digits</strong> (2 numbers): Used mathematically to validate the entire IBAN routing sequence.</li>
          <li><strong>BBAN (Basic Bank Account Number)</strong> (Up to 30 alphanumeric characters): The country-specific routing details.</li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-4">Country Examples</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th>Country</th>
                <th>Code</th>
                <th>IBAN Length</th>
                <th>BBAN Format</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>United Kingdom</td>
                <td>GB</td>
                <td>22 characters</td>
                <td>4 letters (Bank), 6 numbers (Sort Code), 8 numbers (Account)</td>
              </tr>
              <tr>
                <td>Germany</td>
                <td>DE</td>
                <td>22 characters</td>
                <td>8 numbers (BLZ), 10 numbers (Account)</td>
              </tr>
              <tr>
                <td>France</td>
                <td>FR</td>
                <td>27 characters</td>
                <td>5 numbers (Bank), 5 (Branch), 11 alphanum (Account), 2 nums (Key)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-8">
          To browse the complete registry of all 89 formatting patterns, length requirements, and structure mappings, access our master <Link to="/iban" className="text-blue-600 dark:text-blue-400">IBAN format directory</Link>.
        </p>
      </article>
    </div>
  );
}
