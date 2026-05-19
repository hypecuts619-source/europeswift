import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { SEO } from '../../components/SEO';
import { Link } from 'react-router-dom';

export function SepaCountries() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title="SEPA Countries List 2026 | SEPA Zone Members"
        description="View the complete list of 36 Single Euro Payments Area (SEPA) countries for 2026. See which European nations mandate IBAN for fast domestic-style euro transfers."
        canonicalUrl="https://swiftcodedir.com/sepa-countries"
      />
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/iban">IBAN</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>SEPA Countries List</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="font-serif text-4xl text-[#003399] dark:text-blue-400 mb-6">Complete List of SEPA Countries (2026)</h1>
        
        <p className="text-lg">
          The Single Euro Payments Area (SEPA) consists of 36 European countries. Within this zone, international transfers denominated in Euros are treated the same as domestic payments: they are fast, cheap, and standardized via the IBAN system.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">The 27 EU Member States</h2>
        <p>All members of the European Union are inherently part of SEPA:</p>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 pl-0 list-none">
          <li>🇦🇹 Austria</li>
          <li>🇧🇪 Belgium</li>
          <li>🇧🇬 Bulgaria</li>
          <li>🇭🇷 Croatia</li>
          <li>🇨🇾 Cyprus</li>
          <li>🇨🇿 Czech Republic</li>
          <li>🇩🇰 Denmark</li>
          <li>🇪🇪 Estonia</li>
          <li>🇫🇮 Finland</li>
          <li>🇫🇷 France</li>
          <li>🇩🇪 Germany</li>
          <li>🇬🇷 Greece</li>
          <li>🇭🇺 Hungary</li>
          <li>🇮🇪 Ireland</li>
          <li>🇮🇹 Italy</li>
          <li>🇱🇻 Latvia</li>
          <li>🇱🇹 Lithuania</li>
          <li>🇱🇺 Luxembourg</li>
          <li>🇲🇹 Malta</li>
          <li>🇳🇱 Netherlands</li>
          <li>🇵🇱 Poland</li>
          <li>🇵🇹 Portugal</li>
          <li>🇷🇴 Romania</li>
          <li>🇸🇰 Slovakia</li>
          <li>🇸🇮 Slovenia</li>
          <li>🇪🇸 Spain</li>
          <li>🇸🇪 Sweden</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Non-EU SEPA Members</h2>
        <p>SEPA extends beyond the political borders of the European Union. The following countries have adopted SEPA infrastructure:</p>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 pl-0 list-none">
          <li>🇦🇩 Andorra</li>
          <li>🇮🇸 Iceland</li>
          <li>🇱🇮 Liechtenstein</li>
          <li>🇲🇨 Monaco</li>
          <li>🇳🇴 Norway</li>
          <li>🇸🇲 San Marino</li>
          <li>🇨🇭 Switzerland</li>
          <li>🇬🇧 United Kingdom</li>
          <li>🇻🇦 Vatican City</li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-xl mt-8 border border-emerald-100 dark:border-emerald-900/30">
          <h3 className="text-emerald-800 dark:text-emerald-400 font-bold mb-2">IBAN is Mandatory</h3>
          <p className="text-sm">
            To successfully execute a SEPA transfer to any of these 36 countries, you <strong>must</strong> use a formal International Bank Account Number. Need to construct one? Use our free <Link to="/iban/calculator" className="text-emerald-600 font-bold hover:underline">IBAN Calculator tool</Link>.
          </p>
        </div>
      </article>
    </div>
  );
}
