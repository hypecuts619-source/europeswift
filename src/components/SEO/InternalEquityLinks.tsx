import { Link } from 'react-router-dom';
import { Landmark, FileText } from 'lucide-react';

export function InternalEquityLinks() {
  return (
    <div id="internal-equity-links-container" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#003399] dark:bg-blue-500 shrink-0 shadow-sm shadow-[#003399]/20"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans">
            Verified Directories & Cost Intelligence
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm">
          <Link
            to="/sort-code"
            id="seo-link-sort-code"
            className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-[#003399] dark:text-slate-300 dark:hover:text-blue-400 group transition-colors"
          >
            <Landmark className="w-4 h-4 text-[#003399] dark:text-blue-400 shrink-0" />
            <span className="underline decoration-slate-300/80 group-hover:decoration-[#003399] underline-offset-4">
              UK Bank Sort Code Directory
            </span>
          </Link>
          
          <Link
            to="/blog/swift-wire-transfer-fees"
            id="seo-link-wire-fees"
            className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-[#003399] dark:text-slate-300 dark:hover:text-blue-400 group transition-colors"
          >
            <FileText className="w-4 h-4 text-[#003399] dark:text-blue-400 shrink-0" />
            <span className="underline decoration-slate-300/80 group-hover:decoration-[#003399] underline-offset-4">
              SWIFT Wire Transfer Fees & Intermediary Cost Breakdown
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
