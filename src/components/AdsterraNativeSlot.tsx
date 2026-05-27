import React, { useId } from 'react';

interface AdsterraNativeSlotProps {
  zoneId: string;
  format: 'horizontal' | 'rectangle';
}

export function AdsterraNativeSlot({ zoneId, format }: AdsterraNativeSlotProps) {
  const instanceId = useId();

  // Dimension constraints based on format
  const wrapperClass = format === 'horizontal' 
    ? "min-h-[90px] w-full max-w-[728px] mx-auto overflow-hidden my-4"
    : "min-h-[250px] w-full max-w-[300px] mx-auto overflow-hidden my-4";

  return (
    <div className={wrapperClass}>
      <div className="text-center mb-1">
        <span className="text-[10px] text-slate-300 dark:text-slate-600 select-none uppercase tracking-wider">Sponsored Link</span>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <iframe
          src={`/adsterra.html?zoneId=${zoneId}&v=${instanceId}`}
          width="100%"
          height="100%"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          title={`Adsterra Native Ad ${zoneId}`}
        />
      </div>
    </div>
  );
}

