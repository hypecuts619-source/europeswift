const fs = require('fs');

const swiftData = JSON.parse(fs.readFileSync('src/data/swift.json', 'utf8'));
const files = fs.readdirSync('public/data/countries').filter(f => f.endsWith('.json') && !f.includes('_branches'));

const getFlagEmoji = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

let count = 0;

for (const file of files) {
  const code = file.replace('.json', '').toUpperCase();
  
  // Check if exists
  const exists = Object.values(swiftData).find(s => s.iso2 === code);
  if (exists) {
    continue;
  }
  
  try {
    const data = JSON.parse(fs.readFileSync('public/data/countries/' + file, 'utf8'));
    let numBanks = data.banks ? data.banks.length : 0;
    
    if (numBanks === 0) continue;
    
    const name = regionNames.of(code);
    if (!name) continue;
    
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    console.log(`Adding ${name} (${code})`);
    
    swiftData[slug] = {
      name,
      iso2: code,
      flag: getFlagEmoji(code),
      sepa: false, // Default to false
      ibanLength: null,
      topBanks: data.banks.slice(0, 4).map(b => {
            const key = Object.keys(data.bankDetails).find(k => data.bankDetails[k].bank === b.name) || b.slug;
            let hq = "Capital";
            let branches = [];
            
            if (data.bankDetails[key]) {
                branches = data.bankDetails[key].branches.slice(0, 2);
                if (branches.length > 0) hq = branches[0].city;
            }
            
            return {
                slug: b.slug,
                name: b.name,
                bic: b.primaryBic,
                headquarters: hq,
                branches
            }
      })
    };
    
    count++;
  } catch (e) {
      console.error("Error for " + code, e.message);
  }
}

fs.writeFileSync('src/data/swift.json', JSON.stringify(swiftData, null, 2));
console.log(`Added ${count} missing countries.`);
