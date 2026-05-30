import React from 'react';
import { Metadata } from 'next';
import { getIbanCountryMeta } from '../../../../utils/seoHelpers';
import { CountryParametricCard } from '../../../../components/Directory/CountryParametricCard';
import { RegionalComplianceShield } from '../../../../components/Directory/RegionalComplianceShield';
import { RegionalComplianceSchema } from '../../../../components/SEO/StructuredDataEngine';
import ibanFormatsDataJson from '../../../../data/iban-formats.json';

// Define localized priorities internally to keep latency under 100ms
export async function generateStaticParams() {
  const priorityCountries = [
    'united-kingdom', 'united-states', 'india', 'france', 
    'germany', 'netherlands', 'canada', 'saint-lucia'
  ];
  
  return priorityCountries.map((country) => ({
    country,
  }));
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
}

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const data = (ibanFormatsDataJson as any[]).find(item => slugify(item.country) === params.country);
  
  if (!data) {
    return { title: 'Country Not Found' };
  }

  const meta = getIbanCountryMeta(data.country, data.code, data.length);
  
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://swiftcodedir.com/iban/${params.country}`
    }
  };
}

export default function IbanCountryPage({ params }: { params: { country: string } }) {
  const data = (ibanFormatsDataJson as any[]).find(item => slugify(item.country) === params.country);

  if (!data) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Country Layout Not Found</h1>
      </main>
    );
  }

  // Desktop-Optimized BreadcrumbList Schema built programmatically
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://swiftcodedir.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Directory Hub",
        "item": "https://swiftcodedir.com/iban"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${data.country} IBAN`,
        "item": `https://swiftcodedir.com/iban/${params.country}`
      }
    ]
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* JSON-LD Payload Injection */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
      />
      <RegionalComplianceSchema 
        country={params.country} 
        entityName={data.country} 
        directoryType="iban" 
      />
      
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-serif tracking-tight font-bold text-slate-900 dark:text-white mb-4">
          {data.country} Bank Layout Specifications
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Complete parameter breakdowns and programmatic mapping structures for standard {data.code} account routing elements.
        </p>
      </div>
      
      {/* High-speed parametric viewport loading instantly above the fold */}
      <CountryParametricCard 
        entityName={data.country}
        countryCode={data.code} 
        totalLength={data.length} 
        bbanFormat={data.format} 
      />

      <RegionalComplianceShield country={params.country} directoryType="iban" />
      
      <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[40vh]">
        <p className="text-slate-500 italic">Extended directory structural payload and API interactive UI follows here...</p>
      </div>
    </main>
  );
}
