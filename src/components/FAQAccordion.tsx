import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <details
          key={index}
          className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg p-4 text-slate-900 dark:text-slate-100 font-medium">
            <h3 className="text-lg">{item.question}</h3>
            <span className="shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-1.5 text-slate-900 dark:text-slate-100 group-open:-rotate-180 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <div className="px-4 pb-4 pt-0">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
