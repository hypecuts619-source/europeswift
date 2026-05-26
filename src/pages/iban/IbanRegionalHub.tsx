import { useState, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Card, CardContent } from '../../components/ui/card';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Globe, MapPin } from 'lucide-react';
import { SEO } from '../../components/SEO';
import ibanFormatsDataJson from '../../data/iban-formats.json';

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🌐';
  }
};

const slugify = (text: string) => {
  return text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
};

const REGIONS: Record<string, { title: string, description: string, countries: string[] }> = {
  'europe': {
    title: 'European IBAN Formats',
    description: 'Complete directory of IBAN formats for Europe, including all SEPA member states.',
    countries: ['AL','AD','AT','BY','BE','BA','BG','HR','CY','CZ','DK','EE','FI','FR','GE','DE','GI','GR','HU','IS','IE','IT','XK','LV','LI','LT','LU','MT','MD','MC','ME','NL','MK','NO','PL','PT','RO','RU','SM','RS','SK','SI','ES','SE','CH','UA','GB','VA','AX']
  },
  'middle-east': {
    title: 'Middle East IBAN Formats',
    description: 'IBAN formats and structure for Middle Eastern countries.',
    countries: ['BH','IQ','IL','JO','KW','LB','OM','PS','QA','SA','AE','YE']
  },
  'africa': {
    title: 'African IBAN Formats',
    description: 'IBAN formats and structure for African nations adopting the international standard.',
    countries: ['DZ','AO','BI','CM','CV','CF','CG','DJ','EG','GA','GQ','MG','ML','MR','MU','MZ','ST','SN','SC','SO','SD','TN','YT','RE']
  },
  'caribbean': {
    title: 'Caribbean IBAN Formats',
    description: 'IBAN standards across Caribbean nations and territories.',
    countries: ['BS','CR','DO','LC','VG','MQ','GP','MF']
  },
  'americas': {
    title: 'Americas IBAN Formats',
    description: 'IBAN formats for Central and South American countries.',
    countries: ['BR','CR','SV','GT','NI','GF','PM']
  },
  'asia': {
    title: 'Asian IBAN Formats',
    description: 'IBAN formats for Asian countries.',
    countries: ['AZ','IQ','JO','KZ','LB','MN','PK','QA','SA','AE','TL','RU']
  }
};

export function IbanRegionalHub() {
  const { regionSlug } = useParams<{ regionSlug: string }>();
  const region = regionSlug ? REGIONS[regionSlug] : undefined;

  if (!region) {
    return <Navigate to="/iban" replace />;
  }

  const regionCountries = useMemo(() => {
    return (ibanFormatsDataJson as any[])
      .filter(item => region.countries.includes(item.code))
      .map(item => ({
        code: item.code,
        country: item.country,
        length: item.length,
        format: item.format,
        example: item.example
      }))
      .sort((a, b) => a.country.localeCompare(b.country));
  }, [region]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title={`${region.title} | IBAN Guide 2026`}
        description={region.description}
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/iban">IBAN</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{region.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-xl shadow-blue-900/5">
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-[2.25rem] flex items-center justify-center text-[#003399] dark:text-blue-400 shrink-0">
          <MapPin className="w-10 h-10" />
        </div>
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">
            {region.title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {region.description}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 overflow-hidden shadow-sm mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
              <tr>
                <th className="px-3 sm:px-6 py-4 font-semibold">Country</th>
                <th className="px-3 sm:px-6 py-4 font-semibold">ISO</th>
                <th className="px-3 sm:px-6 py-4 font-semibold">Length</th>
                <th className="px-3 sm:px-6 py-4 font-semibold">Format</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              {regionCountries.map((item) => (
                <tr key={item.code} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-3 sm:px-6 py-4">
                    <Link to={`/iban/${slugify(item.country)}`} className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <span className="text-xl" role="img" aria-label={`Flag of ${item.country}`}>
                        {getFlagEmoji(item.code)}
                      </span>
                      <span className="font-medium text-slate-900 dark:text-slate-100 underline decoration-transparent hover:decoration-current">{item.country}</span>
                    </Link>
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <span className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-mono">
                      {item.code}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4">{item.length}</td>
                  <td className="px-3 sm:px-6 py-4 font-mono text-xs text-gray-500 dark:text-gray-400 tracking-wider">
                    {item.format}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
