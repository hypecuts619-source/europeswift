import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdSense({ slot, className = "" }: { slot: string, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use offsetWidth for the most accurate measurement of the rendered block
        const width = containerRef.current?.offsetWidth ?? 0;
        
        if (width > 0 && !initialized.current) {
          // Wrap in requestAnimationFrame to ensure layout is fully painted
          requestAnimationFrame(() => {
            if (initialized.current) return;
            
            try {
              if (window.adsbygoogle) {
                const ins = containerRef.current?.querySelector('ins.adsbygoogle');
                if (ins && !ins.getAttribute('data-adsbygoogle-status')) {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                  initialized.current = true;
                  observer.disconnect();
                }
              }
            } catch (e: any) {
              if (e && e.message && (e.message.includes("already have ads in them") || e.message.includes("availableWidth=0"))) {
                // If it still fails with 0 width, we don't mark as initialized 
                // so the observer can try again if the container grows
                if (e.message.includes("availableWidth=0")) return;
                
                initialized.current = true;
                observer.disconnect();
                return;
              }
              console.error("AdSense push error", e);
            }
          });
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [slot]);

  return (
    <div 
      ref={containerRef}
      className={`w-full flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      <span className="mb-2 uppercase tracking-widest text-[9px] font-bold text-slate-400 opacity-50">Advertisement</span>
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%' }}
           data-ad-client="ca-pub-7380090598384677"
           data-ad-slot={slot}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
