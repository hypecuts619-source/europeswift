import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, BookOpen, Calculator } from 'lucide-react';

export const DirectoryEquityBox = () => {
  return (
    <div className="w-full max-w-5xl mx-auto -mt-6 mb-12 px-4 relative z-20">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all hover:shadow-[0_8px_40px_rgb(0,51,153,0.08)] dark:hover:shadow-[0_8px_40px_rgb(59,130,246,0.08)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </div>
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Financial Toolkits
          </h3>
          <span className="h-px bg-slate-100 dark:bg-slate-800/80 flex-grow ml-2"></span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link 
            to="/sort-code" 
            className="group flex flex-col p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/30 hover:border-blue-200 dark:hover:border-blue-800/80 hover:bg-blue-50/80 dark:hover:bg-blue-900/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 dark:bg-blue-900/60 p-2 rounded-lg text-[#003399] dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                <Landmark size={18} />
              </div>
              <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors text-sm">
                UK Bank Sort Code Directory
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 ml-[42px] leading-relaxed">
              Verify UK branch routing codes accurately.
            </p>
          </Link>
          
          <Link 
            to="/blog/swift-wire-transfer-fees" 
            className="group flex flex-col p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/30 hover:border-blue-200 dark:hover:border-blue-800/80 hover:bg-blue-50/80 dark:hover:bg-blue-900/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 dark:bg-blue-900/60 p-2 rounded-lg text-[#003399] dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                <BookOpen size={18} />
              </div>
              <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors text-sm">
                SWIFT Wire Transfer Fees & Intermediary Cost Breakdown
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 ml-[42px] leading-relaxed">
              Explore global banking deductions limits.
            </p>
          </Link>
          
          <Link 
            to="/iban/calculator" 
            className="group flex flex-col p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/30 hover:border-blue-200 dark:hover:border-blue-800/80 hover:bg-blue-50/80 dark:hover:bg-blue-900/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 dark:bg-blue-900/60 p-2 rounded-lg text-[#003399] dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                <Calculator size={18} />
              </div>
              <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-[#003399] dark:group-hover:text-blue-400 transition-colors text-sm">
                Global IBAN Format Map & Calculator
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 ml-[42px] leading-relaxed">
              Generate and validate global account numbers.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
