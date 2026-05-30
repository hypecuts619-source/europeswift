import React from 'react';
import { ShieldCheck, ArrowRight, Globe } from 'lucide-react';

interface RegionalComplianceShieldProps {
  country: string;
  directoryType: 'iban' | 'swift';
}

/**
 * Dynamic Compliance Knowledge Block
 * Provides authoritative "Topical Authority Blocks" separating structured content from thin scraper grids.
 */
export function RegionalComplianceShield({ country, directoryType }: RegionalComplianceShieldProps) {
  const countryKey = country.toLowerCase();
  
  // Conditionally format our regional matrices based on dynamic corridors
  const isEurozone = ["france", "germany", "netherlands", "spain", "italy", "belgium"].includes(countryKey);
  const isUK = countryKey === "united-kingdom";
  const isUS = countryKey === "united-states";

  let title = "Global ISO 20022 Baseline Standards";
  let items = [
    { label: "Format Specs", value: "Standard ISO Validation" },
    { label: "Identity", value: "Global Bank Routing Rules" }
  ];

  if (isUK) {
    title = "UK Clearing Architecture Compliance";
    items = [
      { label: "NPA Stage", value: "Transitioning Rules active" },
      { label: "CHAPS", value: "ISO 20022 Migration timelines" },
      { label: "Address", value: "Mandatory Structured Lookup" }
    ];
  } else if (isEurozone) {
    title = "Eurozone PSD3 & SEPA Directives";
    items = [
      { label: "SEPA", value: "Instant Mandates Enforced" },
      { label: "PSD3", value: "Preparation Rules Active" },
      { label: "VOP", value: "IBAN-Name Matching Scrutiny" }
    ];
  } else if (isUS) {
    title = "US Fedwire & Routing Compliance";
    items = [
      { label: "FedNow", value: "Real-time Implementation Rules" },
      { label: "Fedwire", value: "ISO 20022 Mandates active" },
      { label: "Network", value: "ABA Protocol Upgrades" }
    ];
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl w-full mx-auto my-8 relative overflow-hidden z-10 text-white">
      <div className="absolute -top-10 -right-10 p-8 opacity-5 pointer-events-none text-slate-100">
        <Globe size={240} strokeWidth={1} />
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 relative z-20">
        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 shrink-0 self-start md:self-auto">
          <ShieldCheck size={28} />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1 truncate" title={title}>
            {title}
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest truncate">
            Enterprise Compliance Matrix • {directoryType.toUpperCase()} Routing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-20">
        {items.map((item, idx) => (
          <div key={idx} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 flex flex-col justify-between hover:bg-slate-800/80 transition-colors">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2 truncate">
              {item.label}
            </span>
            <span className="text-sm md:text-[15px] font-semibold text-slate-200 flex items-center justify-between">
               <span className="truncate pr-3" title={item.value}>{item.value}</span>
               <ArrowRight size={14} className="text-slate-600 shrink-0" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
