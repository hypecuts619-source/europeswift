import React from 'react';

interface CountryParametricCardProps {
  countryCode: string;
  totalLength: number | string;
  bbanFormat: string;
  entityName?: string;
}

/**
 * Above-the-Fold Parametric Viewport DOM Component
 * Clean server component displaying instant parametric facts.
 * Built with strict text truncation and step-down fallback layouts
 * to prevent layout breakage on exceptionally long entity names.
 */
export function CountryParametricCard({ countryCode, totalLength, bbanFormat, entityName }: CountryParametricCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col md:flex-row gap-6 justify-between items-start md:items-center w-full mx-auto mb-8 text-slate-900 dark:text-white overflow-hidden relative z-10">
      
      {entityName && (
        <>
          <div className="flex flex-col min-w-0 max-w-full md:w-auto md:max-w-[280px]">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 truncate">
              Entity Target
            </span>
            <span className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400 truncate w-full" title={entityName}>
              {entityName}
            </span>
          </div>
          <div className="hidden md:block w-px h-16 bg-slate-200 dark:bg-slate-800 shrink-0"></div>
          <div className="block md:hidden w-full h-px bg-slate-200 dark:bg-slate-800"></div>
        </>
      )}

      <div className="flex flex-col shrink-0 min-w-0">
        <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 truncate">Country Code</span>
        <span className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{countryCode}</span>
      </div>
      
      <div className="hidden md:block w-px h-16 bg-slate-200 dark:bg-slate-800 shrink-0"></div>
      <div className="block md:hidden w-full h-px bg-slate-200 dark:bg-slate-800"></div>
      
      <div className="flex flex-col shrink-0 min-w-0">
        <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 truncate">Total Length</span>
        <span className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white truncate">
          {totalLength} {typeof totalLength === 'number' ? 'Chars' : ''}
        </span>
      </div>
      
      <div className="hidden md:block w-px h-16 bg-slate-200 dark:bg-slate-800 shrink-0"></div>
      <div className="block md:hidden w-full h-px bg-slate-200 dark:bg-slate-800"></div>
      
      <div className="flex flex-col min-w-0 flex-grow md:max-w-md">
        <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 truncate">BBAN Format Map String</span>
        <span className="text-lg md:text-2xl font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-md border border-emerald-200 dark:border-emerald-900/50 truncate w-full" title={bbanFormat}>
          {bbanFormat}
        </span>
      </div>
    </div>
  );
}
