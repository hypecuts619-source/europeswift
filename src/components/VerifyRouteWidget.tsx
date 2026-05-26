import React from 'react';
import { Link } from 'react-router-dom';

export function VerifyRouteWidget() {
  return (
    <div className="my-8 p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        ⚠️ Verify Your Route Before Initiating a Wire
      </h3>
      <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
        Entering the wrong 9-digit ABA code can lock your money in clearing-house limbo or incur expensive rejection fees. Use our free tool to validate your bank's route mathematically before hitting send.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Link 
          to="/reports/2026-us-credit-union-report" 
          className="p-3 text-sm font-medium text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm transition-all"
        >
          2026 Credit Union Density Report
        </Link>
        <Link 
          to="/states/ca" 
          className="p-3 text-sm font-medium text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm transition-all"
        >
          California Bank Directory
        </Link>
        <Link 
          to="/states/tx" 
          className="p-3 text-sm font-medium text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm transition-all"
        >
          Texas Bank Directory
        </Link>
        <Link 
          to="/states/fl" 
          className="p-3 text-sm font-medium text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm transition-all"
        >
          Florida Bank Directory
        </Link>
        <Link 
          to="/states/ny" 
          className="p-3 text-sm font-medium text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm transition-all"
        >
          New York Bank Directory
        </Link>
      </div>
    </div>
  );
}
