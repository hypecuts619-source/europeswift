import fs from 'fs';
import path from 'path';

async function run() {
    const countriesDir = path.resolve(process.cwd(), 'node_modules/swiftcodes-toolkit/AllCountries');
    const files = fs.readdirSync(countriesDir);
    const uniqueBics = new Map();
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      const dataPath = path.join(countriesDir, file);
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      const countryData = JSON.parse(fileContent);
      const iso2 = countryData.country_code || file.replace('.json', '');
      if (countryData.list && Array.isArray(countryData.list)) {
        for (const item of countryData.list) {
            const bicStr = item.swift_code || item.bic;
            if (!bicStr) continue;
            const normalized = bicStr.trim().toUpperCase();
            if (!uniqueBics.has(normalized)) {
                uniqueBics.set(normalized, 1);
            }
        }
      }
    }
    const finalData = Array.from(uniqueBics.keys());
    console.log(`Total unique BICs: ${finalData.length}`);
}
run();
