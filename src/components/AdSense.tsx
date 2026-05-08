export function AdSense({ slot, className = "" }: { slot: string, className?: string }) {
  return (
    <div className={`w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-4 min-h-[120px] text-slate-400 dark:text-slate-500 text-sm ${className}`}>
      <span className="mb-1 uppercase tracking-widest text-[10px] font-bold opacity-50">Advertisement</span>
      <span className="text-xs">Google AdSense Space [{slot}]</span>
      {/* 
        To implement real AdSense, you would drop your <ins> tag here.
        Example:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slot}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      */}
    </div>
  );
}
