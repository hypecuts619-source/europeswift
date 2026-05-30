import React from 'react';
import { Metadata } from 'next';
import { getDynamicBankMeta } from '../../../../utils/seoHelpers';
import { CountryParametricCard } from '../../../../components/Directory/CountryParametricCard';
import { RegionalComplianceShield } from '../../../../components/Directory/RegionalComplianceShield';
import { RegionalComplianceSchema } from '../../../../components/SEO/StructuredDataEngine';

// Pre-render core volume corridors for <100ms latency limits
export async function generateStaticParams() {
  const priorityCountries = [
    'united-kingdom', 'united-states', 'india', 'france', 
    'germany', 'netherlands', 'canada', 'saint-lucia'
  ];
  
  return priorityCountries.map((country) => ({
    country,
  }));
}

function unslugify(text: string) {
  return text
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const countryName = unslugify(params.country);
  
  // Utilizes sequential metadata routing handler cleanly stepping down on long entity names
  const meta = getDynamicBankMeta("Routing", "National Bank", countryName);
  
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://swiftcodedir.com/swift/${params.country}`
    }
  };
}

export default function SwiftCountryPage({ params }: { params: { country: string } }) {
  const countryName = unslugify(params.country);
  
  // Fallback to static mapping parsing parameters
  const isoCodeFallback = params.country.substring(0, 2).toUpperCase();

  // Desktop-Optimized BreadcrumbList Schema capturing position ZERO navigation layouts
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
        "item": "https://swiftcodedir.com/swift"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${countryName} Routing Node`,
        "item": `https://swiftcodedir.com/swift/${params.country}`
      }
    ]
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Dangerously executed JSON-LD engine placement bypassing user script restraints */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
      />
      <RegionalComplianceSchema 
        country={params.country} 
        entityName={countryName} 
        directoryType="swift" 
      />
      
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-serif tracking-tight font-bold text-slate-900 dark:text-white mb-4">
          {countryName} SWIFT & Bank Routing Map
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          National identifier arrays and strict parameters mapping internal branch node strings.
        </p>
      </div>
      
      {/* Structural parametric visualization zero-scroll card component */}
      <CountryParametricCard 
        entityName={countryName}
        countryCode={isoCodeFallback} 
        totalLength={8} 
        bbanFormat="AAAA BB CC" 
      />

      <RegionalComplianceShield country={params.country} directoryType="swift" />
      
      <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[40vh]">
        <p className="text-slate-500 italic">Extended SWIFT/BIC directory pipeline node layout renders underneath...</p>
      </div>
    </main>
  );
}
