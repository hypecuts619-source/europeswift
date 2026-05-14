import { Link } from 'react-router-dom';
import { Mail, MessageSquare } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { SEO } from '../components/SEO';

export function ContactUs() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title="Contact Us | SwiftcodeDir"
        description="Have a question about a SWIFT code or IBAN? Get in touch with the SwiftcodeDir team. We're here to help with your banking routing data inquiries."
        canonicalUrl="https://swiftcodedir.com/contact-us"
      />
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

          <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-800 my-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Headquarters</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  While our database covers financial institutions globally, our data architects and compliance team are based in our technology hub in Kerala, India.
                </p>
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">SwiftCodeDir Tech Hub</h3>
                  <address className="not-italic text-slate-600 dark:text-slate-400 leading-relaxed">
                    Infopark Phase 1, Kakkanad<br />
                    Kochi, Kerala 682030<br />
                    India
                  </address>
                </div>
              </div>
              <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.983163155708!2d76.35332611475143!3d10.018151592837373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c8e94a07a07%3A0x10b7f847240d1a49!2sInfopark%20Phase%201!5e0!3m2!1sen!2sin!4v1689253457597!5m2!1sen!2sin">
                  </iframe>
              </div>
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
