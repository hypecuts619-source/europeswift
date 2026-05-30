/**
 * Centralized Technical SEO Metadata & Schema Architect
 * Enforces strict truncation boundaries (55 max title, 145 max desc) and builds semantic topical authority
 */

export interface MetaTags {
  title: string;
  description: string;
}

/**
 * Clamps strings strictly to the configured desktop snippet bounds.
 * Truncates cleanly at the end of the nearest whole word and appends an optimized semantic suffix.
 */
function clampTitle(text: string): string {
  if (text.length <= 55) return text;
  return text.substring(0, 52).replace(/\s+\S*$/, "") + "...";
}

function clampDesc(text: string): string {
  if (text.length <= 145) return text;
  return text.substring(0, 142).replace(/\s+\S*$/, "") + "...";
}

export function getIbanRootMeta(): MetaTags {
  return {
    title: clampTitle("Free IBAN Directory & Validator: Check 110+ Countries Instantly"),
    description: clampDesc("Verify any international bank account number instantly. Access official character lengths, country code validations, and structural maps for free.")
  };
}

export function getSortCodeRootMeta(): MetaTags {
  return {
    title: clampTitle("[2026 Sort Code Registry] UK Bank Sort Code Finder & Checker"),
    description: clampDesc("Look up, verify, and check UK bank sort codes instantly. Pinpoint exact branch routing codes, clearing parameters, and processing details without scrolling.")
  };
}

export function getIbanCalculatorRootMeta(): MetaTags {
  return {
    title: clampTitle("Interactive IBAN Calculator & Generator | Free Bank Verification"),
    description: clampDesc("Calculate your IBAN from your local bank code and account number using our free generator. Supports UK Sort Codes, German BLZ, and more.")
  };
}

/**
 * Advanced sequential fallback engine to prevent truncation while preserving keyword targets.
 */
export function getDynamicBankMeta(entityType: "Bank" | "IBAN" | "Routing", entityName: string, countryOrCode: string): MetaTags {
  // Primary Pattern: [2026 Bank Registry] Verify {Bank Name} SWIFT Code
  // Secondary Fallback: [SWIFT Code] {Bank Name} {Country}
  // Tertiary Fallback: Verify {Bank Name} BIC Code
  const keyword = entityType === "Routing" ? "SWIFT Code" : entityType;

  const sequences = [
    `[2026 Bank Registry] Verify ${entityName} ${keyword}`,
    `[${keyword}] ${entityName} ${countryOrCode}`,
    `Verify ${entityName} BIC Code`
  ];

  let formattedTitle = sequences[2]; // Default to shortest
  for (const seq of sequences) {
    if (seq.length <= 55) {
      formattedTitle = seq;
      break;
    }
  }

  const baseDesc = `Verify standard ${entityName} (${countryOrCode}) details and ${entityType} formatting accurately.`;
  const optimizedDesc = clampDesc(baseDesc);

  return { title: formattedTitle, description: optimizedDesc };
}

export function getIbanCountryMeta(countryName: string, countryCode: string, ibanLength: number): MetaTags {
  const sequences = [
    `[2026 Registry] Verify ${countryName} IBAN Layout`,
    `Verify ${countryName} IBAN Format & Rules`,
    `Check ${countryName} IBAN Length`,
    `${countryName} IBAN Validator`
  ];
  
  let formattedTitle = sequences[3];
  for (const seq of sequences) {
    if (seq.length <= 55) {
      formattedTitle = seq;
      break;
    }
  }

  let description = `Get official ${countryName} IBAN formatting, lengths (${ibanLength} chars) & examples. Run real-time format validation for standard ${countryCode} bank routing.`;
  description = clampDesc(description);

  return { title: formattedTitle, description };
}

/**
 * Technical SEO JSON-LD WebApplication Schemas
 */
export function getWebApplicationSchema(url: string, name: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "url": url,
    "operatingSystem": "All",
    "applicationCategory": "FinancialApplication",
    "browserRequirements": "Requires HTML5, JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };
}

/**
 * Technical SEO BreadcrumbList Schemas
 * Ensures clean traversal maps connect Home ➔ Directory Hub ➔ Country Node
 * This renders an elegant navigation trail in desktop SERPs instead of raw URLs.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * FAQPage Schema for swift-wire-transfer-fees
 * Programmatically structures highly optimized topical questions and answers
 */
export function getWireTransferFeesFaqSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are SWIFT wire transfer fees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SWIFT wire transfer fees are the processing costs assessed when sending capital across borders on the SWIFT network. These commonly include standard dispatch charges at the sending bank, regulatory taxes, transit processing cuts during inter-bank routing, and landing deductions at the destination bank."
        }
      },
      {
        "@type": "Question",
        "name": "How do intermediary bank routing margins affect total wire costs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Intermediary or bridge banks act as transit hops to link institutions lacking direct correspondent relationships. Under the SHA structure, these transit banks deduct transaction processing fees (usually ranging between $10.00 and $50.00 USD per hop) directly from the running principal transit amount."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between OUR, SHA, and BEN SWIFT fee codes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "These represent standard instructions defining who pays the wire transaction expenses: OUR requires the sender to cover transit costs and intermediary network margins upfront; SHA splits the expenses so senders pay dispatch levies while routing cuts reduce the payout volume; BEN shifts all fees to the beneficiary, deducted from total final credits."
        }
      },
      {
        "@type": "Question",
        "name": "Why do recipient banks assess inbound wire deductions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Often termed landing fees or inbound credit charges, receiver bank deductions are processing ledger costs applied by the final destination institution for importing cross-border foreign currencies into standard recipient checking databases, ranging from $10.00 to $30.00 USD."
        }
      }
    ]
  };
}
