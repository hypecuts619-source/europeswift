import { Link } from 'react-router-dom';
import { Mail, MessageSquare } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';

export function ContactUs() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contact Us</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 shadow-sm max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Contact Us</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We value your feedback and are always here to help. Whether you have found an error in our database, need support, or have a business inquiry, please don't hesitate to reach out.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-xl border border-blue-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-xl">Email Us</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">For general inquiries, data corrections, and support.</p>
              <a href="mailto:support@swiftcodedir.com" className="text-[#003399] dark:text-blue-400 font-medium hover:underline">
                support@swiftcodedir.com
              </a>
            </div>

            <div className="bg-amber-50 dark:bg-slate-800 p-6 rounded-xl border border-amber-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-xl">Feedback & Suggestions</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">We are always looking to improve our directory. Let us know how we can serve you better.</p>
              <a href="mailto:feedback@swiftcodedir.com" className="text-amber-600 dark:text-amber-400 font-medium hover:underline">
                feedback@swiftcodedir.com
              </a>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Data Correction Requests</h2>
          <p className="text-slate-600 dark:text-slate-400">
            If you represent a financial institution and need to update your SWIFT, BIC, IBAN format, or routing information, please email us with the subject line <strong>"Data Correction Request"</strong>. Include official documentation or a link to your public bank registry to expedite the verification process.
          </p>
        </div>
      </div>
    </div>
  );
}
