export interface RoutingNumber {
  name: string;
  code: string;
  city: string;
  state: string;
}

export const ROUTING_NUMBERS: RoutingNumber[] = [
  { name: 'JPMorgan Chase Bank, N.A.', code: '021000021', city: 'New York', state: 'NY' },
  { name: 'Bank of America, N.A.', code: '121000358', city: 'San Francisco', state: 'CA' },
  { name: 'Wells Fargo Bank, N.A.', code: '121000248', city: 'San Francisco', state: 'CA' },
  { name: 'Citibank, N.A.', code: '021000089', city: 'New York', state: 'NY' },
  { name: 'U.S. Bank, N.A.', code: '091000022', city: 'Minneapolis', state: 'MN' },
  { name: 'PNC Bank, N.A.', code: '043000096', city: 'Pittsburgh', state: 'PA' },
  { name: 'Truist Bank (formerly SunTrust)', code: '061000104', city: 'Atlanta', state: 'GA' },
  { name: 'Truist Bank (formerly BB&T)', code: '053101121', city: 'Charlotte', state: 'NC' },
  { name: 'Goldman Sachs Bank USA', code: '021000322', city: 'New York', state: 'NY' },
  { name: 'Capital One, N.A.', code: '051405515', city: 'Richmond', state: 'VA' },
  { name: 'TD Bank, N.A.', code: '031201360', city: 'Cherry Hill', state: 'NJ' },
  { name: 'The Bank of New York Mellon', code: '021000018', city: 'New York', state: 'NY' },
  { name: 'State Street Bank and Trust Company', code: '011000028', city: 'Boston', state: 'MA' },
  { name: 'Fifth Third Bank, N.A.', code: '042000314', city: 'Cincinnati', state: 'OH' },
  { name: 'Ally Bank', code: '031101161', city: 'Midvale', state: 'UT' },
  { name: 'BMO Harris Bank N.A.', code: '071000288', city: 'Chicago', state: 'IL' },
  { name: 'KeyBank National Association', code: '041001039', city: 'Cleveland', state: 'OH' },
  { name: 'Huntington National Bank', code: '044000037', city: 'Columbus', state: 'OH' },
  { name: 'Citizens Bank, N.A.', code: '011000138', city: 'Providence', state: 'RI' },
  { name: 'Regions Bank', code: '062000140', city: 'Birmingham', state: 'AL' },
  { name: 'M&T Bank', code: '022000046', city: 'Buffalo', state: 'NY' },
  { name: 'Discover Bank', code: '031100641', city: 'Greenwood', state: 'DE' },
  { name: 'American Express National Bank', code: '124085054', city: 'Salt Lake City', state: 'UT' },
  { name: 'Silicon Valley Bank (A Division of First Citizens Bank)', code: '121140399', city: 'Santa Clara', state: 'CA' },
  { name: 'Charles Schwab Bank, SSB', code: '121144007', city: 'Westlake', state: 'TX' },
];
