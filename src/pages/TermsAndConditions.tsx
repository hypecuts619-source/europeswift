import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';

export function TermsAndConditions() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Terms & Conditions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 shadow-sm max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Terms and Conditions</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 border-b border-slate-100 dark:border-slate-800 pb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
          <p>
            Welcome to SwiftcodeDir!
          </p>
          <p>
            These terms and conditions outline the rules and regulations for the use of SwiftcodeDir's Website, located at swiftcodedir.com.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use SwiftcodeDir if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Disclaimer of Liability</h2>
          <p>
            The information provided on SwiftcodeDir (including but not limited to SWIFT codes, BIC codes, IBAN numbers, routing numbers, and sort codes) is generated from our database and is intended for informational purposes only.
          </p>
          <p>
            <strong>While we strive for accuracy, we cannot guarantee that the banking information on this site is 100% correct, complete, or up-to-date.</strong> You are strongly advised to verify the SWIFT code, IBAN, or any routing number with your bank or financial institution directly before executing any financial transaction or wire transfer.
          </p>
          <p>
            SwiftcodeDir will not be held liable for any direct, indirect, consequential, or incidental damages, loss of funds, or delayed transactions resulting from the use of the information provided on this website. 
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">License</h2>
          <p>
            Unless otherwise stated, SwiftcodeDir and/or its licensors own the intellectual property rights for all material on SwiftcodeDir. All intellectual property rights are reserved. You may access this from SwiftcodeDir for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Republish material from SwiftcodeDir</li>
            <li>Sell, rent or sub-license material from SwiftcodeDir</li>
            <li>Reproduce, duplicate or copy material from SwiftcodeDir</li>
            <li>Redistribute content from SwiftcodeDir</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Acceptable Use</h2>
          <p>
            You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.
          </p>
          <p>
            Automated scraping, data mining, or programmatic gathering of data from the site without explicit permission is strictly prohibited.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Modifications</h2>
          <p>
            SwiftcodeDir reserves the right to revise these terms and conditions at any time as it sees fit, and by using this website you are expected to review these terms on a regular basis.
          </p>
        </div>
      </div>
    </div>
  );
}
