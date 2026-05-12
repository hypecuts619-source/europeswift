import fs from 'fs';
import path from 'path';

const countriesDir = path.resolve(process.cwd(), 'node_modules/swiftcodes-toolkit/AllCountries');
const publicDataDir = path.resolve(process.cwd(), 'public/data');
const countriesDataDir = path.join(publicDataDir, 'countries');

// Create directories
fs.mkdirSync(countriesDataDir, { recursive: true });

async function run() {
  const files = fs.readdirSync(countriesDir);
  let totalBicsProcessed = 0;

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const countryCode = file.replace('.json', '').toUpperCase();
    const dataPath = path.join(countriesDir, file);
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const countryData = JSON.parse(fileContent);
    const iso2 = countryData.country_code || countryCode;
    const fileCountrySlug = iso2.toLowerCase(); 

    if (countryData.list && Array.isArray(countryData.list)) {
      const banksMap = new Map();
      const uniqueBics = new Map();
      
      for (const item of countryData.list) {
        const bicStr = item.swift_code || item.bic;
        if (!bicStr) continue;
        
        const normalizedBic = bicStr.trim().toUpperCase();
        if (!uniqueBics.has(normalizedBic)) {
            const dataItem = {
                bic: normalizedBic,
                bank: item.bank || item.bank_name || "",
                branch: item.branch || "",
                city: item.city || "",
                country: (item.country || iso2 || "").toUpperCase(),
                address: item.address || ""
            };
            uniqueBics.set(normalizedBic, dataItem);
            
            const bankName = dataItem.bank;
            if (bankName) {
                const bankSlug = bankName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                if (!banksMap.has(bankSlug)) {
                    banksMap.set(bankSlug, {
                        name: bankName,
                        slug: bankSlug,
                        primaryBic: normalizedBic,
                        branches: []
                    });
                }
                banksMap.get(bankSlug).branches.push(dataItem);
            }
        }
      }
      
      totalBicsProcessed += uniqueBics.size;

      const bankSummaries = [];
      const countryBanksData: Record<string, any> = {};

      for (const [bankSlug, bankData] of banksMap.entries()) {
          bankSummaries.push({
              name: bankData.name,
              slug: bankSlug,
              primaryBic: bankData.primaryBic
          });
          
          countryBanksData[bankSlug] = {
              bank: bankData.name,
              country: iso2.toUpperCase(),
              branches: bankData.branches
          };
      }

      fs.writeFileSync(
          path.join(countriesDataDir, `${fileCountrySlug}.json`),
          JSON.stringify({
              countryCode: iso2.toUpperCase(),
              banks: bankSummaries,
              bankDetails: countryBanksData,
              totalBranches: uniqueBics.size
          })
      );
      
      fs.writeFileSync(
          path.join(countriesDataDir, `${fileCountrySlug}_branches.json`),
          JSON.stringify({
              countryCode: iso2.toUpperCase(),
              branches: Array.from(uniqueBics.values())
          })
      );
      
      console.log(`Processed ${iso2}: ${bankSummaries.length} banks, ${uniqueBics.size} branches.`);
    }
  }

  console.log(`Successfully finished processing ${totalBicsProcessed} BICs.`);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
