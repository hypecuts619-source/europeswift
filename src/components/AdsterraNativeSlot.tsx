import React, { useEffect, useRef } from 'react';

interface AdsterraNativeSlotProps {
  zoneId: string;
  format: 'horizontal' | 'rectangle';
}

export function AdsterraNativeSlot({ zoneId, format }: AdsterraNativeSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only mount if the container exists and hasn't been mounted yet
    if (!containerRef.current) return;
    
    // Prevent multiple injections
    if (containerRef.current.hasChildNodes()) return;

    try {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = `//www.highperformanceformat.com/${zoneId}/invoke.js`;
      script.setAttribute('data-wj-zone', zoneId);
      
      containerRef.current.appendChild(script);
    } catch (e) {
      console.error('Failed to load Adsterra script', e);
    }
  }, [zoneId]);

  // Dimension constraints based on format
  const wrapperClass = format === 'horizontal' 
    ? "min-h-[90px] w-full max-w-[728px] mx-auto overflow-hidden my-4"
    : "min-h-[250px] w-full max-w-[300px] mx-auto overflow-hidden my-4";

  return (
    <div className={wrapperClass}>
      <div className="text-center mb-1">
        <span className="text-[10px] text-slate-300 dark:text-slate-600 select-none uppercase tracking-wider">Sponsored Link</span>
      </div>
      <div 
        id={`container-${zoneId}`} 
        ref={containerRef} 
        className="w-full flex justify-center items-center" 
      />
    </div>
  );
}
