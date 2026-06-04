const fs = require('fs');
let code = fs.readFileSync('src/data/blogPosts.ts', 'utf8');

const reps = {
  "Can You Get a SWIFT Code from an IBAN How to Bank Identifier Mapping [2026]": "IBAN to SWIFT Code: Find BIC from IBAN [2026]",
  "How to Identify a Bank from its Sort Code: A Step-by-Step Security Guide for 2026": "Bank Sort Codes: Identify Banks Securely [2026]",
  "Evolution of Global Bank Transfers: How Money Moves in 2026": "Evolution of Global Bank Transfers [2026]",
  "PSD3 & PSR Final Analysis: What the April 2026 Texts Mean for Banks": "PSD3 & PSR 2026: What It Means for Global Banks",
  "2026 ISO 20022 Mandate: What it Means for Your International Transfers": "ISO 20022 Mandate 2026: What It Means for You",
  "UBS & Credit Suisse: The Final SWIFT Migration Phase (May 2026)": "UBS & Credit Suisse: Final SWIFT Migration [May 2026]",
  "Demystifying Currency Conversions: Mid-Market Rates vs Bank Rates [2026]": "Currency Conversions: Mid-Market vs Bank Rates [2026]",
  "Hidden Dangers of Wire Transfer Fraud: Protect Your SWIFT Payments [2026]": "Wire Transfer Fraud: Protect Your Payments [2026]"
};

for (let key in reps) {
  let oldT = key;
  let newT = reps[key];
  code = code.replace('title: "' + oldT + '"', 'title: "' + newT + '"');
}

fs.writeFileSync('src/data/blogPosts.ts', code);
console.log("Fixed long titles");
