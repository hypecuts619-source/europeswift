import { useParams, Link, useLocation } from 'react-router-dom';
import { Copy, Check, Building2, MapPin, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { countriesData } from '../../data/mockData';
import { AdSense } from '../../components/AdSense';
import { getSwiftCodesByBank, SwiftCodeDoc } from '../../lib/firebaseQueries';

export function BankSwift() {
  const { countrySlug, bankSlug } = useParams<{ countrySlug: string; bankSlug: string }>();
  const location = useLocation();
  const [copied, setCopied] = useState<string | null>(null);
  const [branches, setBranches] = useState<SwiftCodeDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const country = countriesData.find(c => c.slug === countrySlug);
  const bankNameStr = location.state?.realBankName || bankSlug?.replace(/-/g, ' ');

  useEffect(() => {
    if (country?.code && bankNameStr) {
      setLoading(true);
      getSwiftCodesByBank(country.code, bankNameStr).then(data => {
        setBranches(data);
        setLoading(false);
      });
    }
  }, [country, bankNameStr]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!country || !bankSlug) return <div className="p-12 text-center text-xl text-gray-500">Bank not found</div>;

  // Derive the head office SWIFT code (usually ends with XXX or is 8 chars, fallback to first in list)
  const headOfficeSwiftDoc = branches.find(b => b.bic && (b.bic.endsWith('XXX') || b.bic.length === 8)) || branches[0];
  const fallbackSwift = (country.code + 'XXXXXX').padEnd(8, 'X');
  const primaryBic = headOfficeSwiftDoc?.bic || fallbackSwift;

  // Anatomy
  const bankCode = primaryBic.substring(0, 4);
  const countryCode = primaryBic.substring(4, 6);
  const locationCode = primaryBic.length >= 8 ? primaryBic.substring(6, 8) : 'XX';
  const headOfficeBranch = primaryBic.length === 11 ? primaryBic.substring(8, 11) : 'XXX';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/swift">SWIFT</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/swift/${countrySlug}`}>{country.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">{bankNameStr}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex items-start justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-[#003399]" />
            <h1 className="text-4xl font-bold text-gray-900 capitalize">{bankNameStr} SWIFT Codes</h1>
          </div>
          <p className="text-lg text-gray-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {country.name}
            {/* Assume all listed banks here can receive intl transfers */}
            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">SEPA Ready</Badge>
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <Card className="border shadow-sm overflow-hidden border-[#003399]/20">
            <div className="h-2 bg-[#003399] w-full" />
            <CardContent className="p-8">
              <h2 className="text-sm uppercase tracking-widest font-semibold text-gray-500 mb-2">
                {loading ? 'Loading Primary Code...' : 'Primary SWIFT / BIC Code'}
              </h2>
              <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl border">
                <div className="font-mono text-4xl font-bold tracking-[0.2em] text-[#003399]">
                  {primaryBic}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => handleCopy(primaryBic)}
                  className="gap-2"
                >
                  {copied === primaryBic ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied === primaryBic ? 'Copied' : 'Copy'}
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">SWIFT Code Anatomy</h3>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div className="bg-blue-50 p-3 rounded border border-blue-100">
                    <div className="font-mono font-bold text-lg text-blue-900">{bankCode}</div>
                    <div className="text-blue-600/80 text-xs mt-1">Bank Code</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-100">
                    <div className="font-mono font-bold text-lg text-green-900">{countryCode}</div>
                    <div className="text-green-600/80 text-xs mt-1">Country</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border border-purple-100">
                    <div className="font-mono font-bold text-lg text-purple-900">{locationCode}</div>
                    <div className="text-purple-600/80 text-xs mt-1">Location</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded border border-orange-100">
                    <div className="font-mono font-bold text-lg text-orange-900">{headOfficeBranch}</div>
                    <div className="text-orange-600/80 text-xs mt-1">Branch</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {loading ? 'Loading branches...' : 'All Branch Codes'}
            </h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SWIFT / BIC</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Branch Name</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-gray-500 py-8">Loading from database...</TableCell>
                    </TableRow>
                  )}
                  {!loading && branches.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-gray-500 py-8">No branches found in database.</TableCell>
                    </TableRow>
                  )}
                  {!loading && branches.map((branch) => (
                    <TableRow key={branch.bic}>
                      <TableCell className="font-mono font-medium">{branch.bic}</TableCell>
                      <TableCell>{branch.city || 'N/A'}</TableCell>
                      <TableCell className="text-gray-500">{branch.branch || 'Head Office'}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(branch.bic)}>
                          {copied === branch.bic ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>

        <aside className="space-y-6">
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Bank Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-gray-500 mb-1">Full Name</dt>
                  <dd className="font-medium text-gray-900 capitalize">{bankNameStr}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 mb-1">Country</dt>
                  <dd className="font-medium text-gray-900 flex items-center gap-2">
                    <span>{country.flag}</span> {country.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500 mb-1">Network Access</dt>
                  <dd className="font-medium text-gray-900 flex flex-col gap-2 mt-2">
                    <Badge variant="outline" className="w-fit"><Globe className="w-3 h-3 mr-1"/> SWIFT International</Badge>
                    <Badge variant="outline" className="w-fit"><Check className="w-3 h-3 mr-1 text-green-600"/> SEPA Transfers</Badge>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card className="border border-blue-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2 capitalize">Transferring money to {bankNameStr}?</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm mb-4">
                If you are sending an international wire template, make sure to ask your beneficiary for their exact IBAN. You will need both the SWIFT code and the IBAN for a successful transaction.
              </p>
              <Link to="/what-is-an-iban">
                <Button variant="outline" className="w-full text-[#003399] dark:text-blue-400 border-[#003399]/30 dark:border-blue-400/30 hover:bg-blue-50 dark:hover:bg-slate-800">
                  Read IBAN Guide
                </Button>
              </Link>
            </CardContent>
          </Card>
          <AdSense slot="5566778899" />
        </aside>
      </div>
    </div>
  );
}
