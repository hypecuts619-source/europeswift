import { Info, ShieldCheck, Zap, ArrowRight, Table, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';
import { BankAuthorityData } from '../data/authorityEngine';

interface AuthorityProfileProps {
  data: BankAuthorityData;
}

export function AuthorityProfile({ data }: AuthorityProfileProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Information Gain Bento UI */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-blue-50/30 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 overflow-hidden">
          <CardHeader className="pb-3 border-b border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/20">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-blue-900 dark:text-blue-300 uppercase tracking-widest">
               <Info className="w-4 h-4" /> Bank Role
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {data.bank_role}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50/30 dark:bg-purple-900/10 border-purple-100 dark:border-purple-900/30 overflow-hidden">
          <CardHeader className="pb-3 border-b border-purple-100 dark:border-purple-900/30 bg-purple-50/50 dark:bg-purple-900/20">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-purple-900 dark:text-purple-300 uppercase tracking-widest">
               <ShieldCheck className="w-4 h-4" /> SWIFT Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {data.swift_structure}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Expert Insight Section */}
      <Card className="bg-amber-50/30 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-900/30">
        <CardContent className="p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-1">Expert Regulatory Insight (2026)</h4>
            <p className="text-amber-800/80 dark:text-amber-400/80 text-sm leading-relaxed">
              {data.expert_insight}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* GEO Answer Capsule */}
      <Card className="border-2 border-[#003399]/10 dark:border-blue-900/30 relative overflow-hidden bg-slate-950 text-slate-100">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Database className="w-24 h-24" />
        </div>
        <CardHeader className="border-b border-white/10 bg-white/5">
          <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verified Authority Record
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
           <div className="mb-8">
             <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1 uppercase tracking-tighter">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> {data.freshness_badge}
             </div>
             <p className="text-lg md:text-xl font-serif italic text-slate-200 leading-relaxed">
               "{data.quotable_summary}"
             </p>
           </div>
           
           <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI & Technical Fact Sheet</h5>
                <div className="space-y-3">
                  {Object.entries(data.ai_fact_sheet).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">{key}:</span>
                      <span className="font-mono text-slate-100">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Regulatory Standards</h5>
                <p className="text-sm text-slate-300 font-medium">
                  {data.regulatory_note}
                </p>
                <div className="pt-4 space-y-2">
                  <h6 className="text-[9px] font-bold text-slate-500 uppercase tracking-[2px]">Semantic Neighbors</h6>
                  <div className="flex flex-wrap gap-2">
                    {data.semantic_bridges.map((bridge) => (
                      <Link 
                        key={bridge.path} 
                        to={bridge.path}
                        className="text-[10px] px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md flex items-center gap-1 transition-colors"
                      >
                         {bridge.label} <ArrowRight className="w-2 h-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
