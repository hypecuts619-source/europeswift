import fs from 'fs';

const DB_PATH = './src/data/blogPosts.ts';
let content = fs.readFileSync(DB_PATH, 'utf8');

const specificUpdates = {
  // Phase 1 (New Posts)
  "swift-code-lookup": {
    title: "SWIFT Code Lookup: Find Any Bank's Code [2026]",
    excerpt: "Free SWIFT code lookup tool. Find your bank's SWIFT/BIC code instantly. Search 25,000+ banks worldwide. Complete step-by-step guide included."
  },
  "how-to-send-international-wire": {
    title: "How to Send International Wire Transfer [Step-by-Step]",
    excerpt: "Learn how to send international wire transfers step-by-step. Complete guide covering fees, SWIFT codes, IBAN, timing, and best practices for global payments."
  },
  "iban-lookup": {
    title: "IBAN Lookup: Find & Verify Your IBAN [2026]",
    excerpt: "Free IBAN lookup tool. Find your IBAN number and verify it instantly. Complete guide to IBAN format by country, examples, and validation."
  },
  "deutsche-bank-swift-code": {
    title: "Deutsche Bank SWIFT Code [2026]: Find & Verify Your BIC Code",
    excerpt: "Deutsche Bank SWIFT code guide. Find your regional SWIFT code for Frankfurt, Berlin, Munich. ACH vs wire codes, verification, and international transfers."
  },
  "hsbc-bank-swift-code": {
    title: "HSBC Bank SWIFT Code [Complete Guide 2026]",
    excerpt: "HSBC SWIFT code guide for 70+ countries. Find regional codes, branch-specific codes, and verify your HSBC bank's BIC for international transfers."
  },
  "swift-vs-wise": {
    title: "SWIFT vs Wise: Which is Better for Transfers [2026]",
    excerpt: "Compare SWIFT vs Wise for international transfers. Review speed, fees, exchange rates, and best uses for each service. Complete comparison guide."
  },
  "canadian-wire-transfer-guide": {
    title: "Canadian Wire Transfer Guide: Transit Numbers [2026]",
    excerpt: "Complete guide to Canadian wire transfers, transit numbers, and institution codes. Learn how to find your bank's transit number for domestic transfers."
  },
  "swift-vs-routing-number": {
    title: "SWIFT vs Routing Number: When to Use Each [2026]",
    excerpt: "Understand differences between SWIFT codes and routing numbers. Learn when to use each, key distinctions, and best practices for domestic vs international transfers."
  },

  // Part 2 (Specific Rewrites)
  "wrong-swift-code-what-happens": {
    title: "How to Recover Money Sent to the Wrong SWIFT Code [2026]",
    h1: "How to Recover Money Sent to Wrong SWIFT Code",
    excerpt: "Sent funds to a wrong SWIFT code? Learn how to recover your money step-by-step. Understand what happens, recovery timeframes, and prevention tips."
  },
  "ultimate-guide-swift-bic-codes-2026": {
    title: "What is a SWIFT Code? Complete Guide to BIC Codes [2026]",
    h1: "Complete Guide to SWIFT and BIC Codes",
    excerpt: "Complete guide to SWIFT and BIC codes for international transfers. Learn structure, how to find them, when to use each, and the future of banking codes."
  },
  "how-to-find-swift-code-30-seconds": {
    title: "How to Find Your SWIFT Code: 5 Easy Methods [2026]",
    h1: "How to Find Your SWIFT Code: 5 Easy Methods",
    excerpt: "Find your SWIFT code in minutes with our step-by-step guide. Learn 5 methods: mobile app, website, check, customer service, and our free lookup tool."
  },
  "why-international-wire-transfers-are-expensive": {
    title: "International Wire Transfer Fees: Why They're So High [2026]",
    excerpt: "Why are international wire transfers expensive? Learn what fees banks charge, how they calculate costs, and proven strategies to reduce transfer expenses."
  },
  "how-to-get-mid-market-exchange-rate": {
    title: "How to Get Mid-Market Exchange Rates on Money Transfers",
    excerpt: "Learn how to get mid-market exchange rates and avoid bank markups on international transfers. Compare services, timing strategies, and save up to 3-5% on FX."
  },
  "what-is-an-iban-beginners-guide": {
    title: "What is an IBAN? Everything You Need to Know [2026]",
    h1: "What Is an IBAN Number? Complete Guide",
    excerpt: "What is an IBAN number? Learn how IBAN works, why you need it, structure explanation, differences from SWIFT codes, and how to find yours."
  },
  "list-of-iban-formats-by-country": {
    title: "IBAN Format Guide: All 110+ Countries [2026]",
    excerpt: "Complete IBAN format guide for all 110+ countries. Find IBAN structure, length, examples, and country-specific rules for international transfers."
  },
  "how-to-validate-iban-number-instantly": {
    title: "How to Validate an IBAN Number [Complete Guide]",
    excerpt: "Learn how to validate IBAN numbers to ensure correct international transfers. Understand IBAN structure, checksum validation, and use our free checker."
  },
  "understanding-german-blz-codes": {
    title: "How to Find German Bank Codes (BLZ) [Complete Guide]",
    excerpt: "Learn about German Bankleitzahl (BLZ) codes, how they work, where to find them, and how they differ from SWIFT codes for German bank transfers."
  },
  "bsb-numbers-explained-australia-routing": {
    title: "How to Find Your Australian Bank's BSB Number [2026]",
    excerpt: "Learn how to find your Australian bank's BSB number. Understand BSB structure, how it's used in transfers, and the differences from international codes."
  },
  "ifsc-codes-indian-domestic-transfers": {
    title: "How to Find IFSC Codes for Indian Banks [2026]",
    excerpt: "Learn what IFSC codes are and how to find them for Indian banks. Complete guide to IFSC structure, purpose in transfers, and how to look up any bank's code."
  },
  "complete-2026-guide-uk-bank-sort-codes": {
    title: "How to Find UK Bank Sort Codes [Complete Guide 2026]",
    h1: "How to Find UK Bank Sort Codes",
    excerpt: "Learn how to find UK bank sort codes, understand their structure, and verify branch details. Complete guide to sort codes for Barclays, HSBC, NatWest, and more."
  },
  "iban-vs-swift-code": {
    title: "IBAN vs SWIFT Code: Key Differences Explained [2026]",
    h1: "IBAN vs SWIFT Code: Key Differences",
    excerpt: "Understand differences between SWIFT codes and IBAN numbers. Learn when to use each, key distinctions, and best practices for domestic vs international transfers."
  },
  "how-to-find-swift-code": {
    title: "How to Find SWIFT Code: Complete Guide [2026]",
    excerpt: "Learn how to find SWIFT codes for any bank. Complete step-by-step guide with screenshots, our free lookup tool, and common mistakes to avoid."
  },
  "swift-wire-transfer-fees": {
    title: "SWIFT Wire Transfer Fees Explained [2026 Guide]",
    h1: "SWIFT Wire Transfer Fees Explained",
    excerpt: "Understand SWIFT wire transfer fees and costs. Our complete 2026 guide covers hidden charges, intermediary bank fees, and how to save money on global payments."
  },
  "how-to-avoid-high-fees-international-wire-transfers": {
    title: "How to Avoid High Fees on Transfers [2026]",
    h1: "How to Avoid High Fees on Transfers",
    excerpt: "Avoid high fees on international wire transfers using our 2026 guide. Compare mid-market rates, avoid bank markups, and discover cheaper transfer alternatives."
  },
  "swift-vs-sepa-european-payments": {
    title: "SWIFT vs SEPA: Which to Use for European Payments [2026]",
    h1: "SWIFT vs SEPA: Which to Use",
    excerpt: "SWIFT vs SEPA for European payments compared. We break down the differences in fees, speed, requirements, and help you choose the best transfer method for 2026."
  }
};

const slugs = [];
const slugRegex = /slug:\s*"([^"]+)"/g;
let match;
while ((match = slugRegex.exec(content)) !== null) {
  slugs.push(match[1]);
}

for (const slug of slugs) {
  const objStartIndex = content.indexOf(`slug: "${slug}"`);
  if (objStartIndex === -1) continue;
  
  const titleMatch = content.substring(objStartIndex).match(/title:\s*"([^"]+)"/);
  const excerptMatch = content.substring(objStartIndex).match(/excerpt:\s*"([^"]*)"/);
  
  if (!titleMatch || !excerptMatch) continue;
  
  let oldTitle = titleMatch[1];
  let oldExcerpt = excerptMatch[1];
  
  let newTitle = oldTitle;
  let newExcerpt = oldExcerpt;
  let newH1 = null;

  if (specificUpdates[slug]) {
    const update = specificUpdates[slug];
    if (update.title) newTitle = update.title;
    if (update.excerpt) newExcerpt = update.excerpt;
    if (update.h1) newH1 = update.h1;
  } else {
    // General Rules Execution
    newTitle = newTitle.replace(/\?/g, ""); // No question marks 
    newTitle = newTitle.replace(/Understanding /g, "How to ");
    newTitle = newTitle.replace(/^The /g, "");
    newTitle = newTitle.replace(/ still /g, " ");

    if (!oldTitle.includes("2026")) {
      newTitle = newTitle + " [2026]";
    }
    
    if (oldExcerpt.length < 130) {
      let kw = newTitle.replace(/\[\d+\]/, "").trim();
      newExcerpt = `Learn all about ${kw}. Complete step-by-step 2026 guide and walkthrough covering essential information, requirements, and best practices to stay secure.`;
      if (newExcerpt.length > 160) {
         newExcerpt = newExcerpt.substring(0, 155) + "...";
      }
    }
  }

  // Do replacements just within the 1000 characters after slug declaration
  const blockEnd = objStartIndex + 1000;
  let originalBlock = content.substring(objStartIndex, blockEnd);
  let block = originalBlock;
  
  if (newTitle !== oldTitle) {
     block = block.replace(`title: "${oldTitle}"`, `title: "${newTitle}"`);
  }
  if (newExcerpt !== oldExcerpt) {
     block = block.replace(`excerpt: "${oldExcerpt}"`, `excerpt: "${newExcerpt}"`);
  }
  if (newH1) {
     // replace first H1 markdown heading inside the block
     block = block.replace(/content:\s*`\s*(#\s+[^\n]+)/, `content: \`\n# ${newH1}`);
  }
  
  content = content.replace(originalBlock, block);
}

fs.writeFileSync(DB_PATH, content);
console.log("Updated posts in blogPosts.ts");
