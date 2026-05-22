/**
 * Centralized Technical SEO Metadata & Schema Architect
 * Enforces strict truncation boundaries and builds semantic topical authority
 */

export interface MetaTags {
  title: string;
  description: string;
}

/**
 * Enforces Title strictly under 60 characters and Description strictly under 155 characters.
 * Switch from descriptive phrasing to high-intent, action-oriented, utility-driven models.
 */
export function getIbanRootMeta(): MetaTags {
  return {
    title: "Free IBAN Directory & Validator: Check 110+ Countries", // 53 characters
    description: "Instantly verify International Bank Account Number (IBAN) formats, structures & lengths. Check 110+ countries with our free utility validator." // 142 characters
  };
}

export function getIbanCountryMeta(countryName: string, countryCode: string, ibanLength: number): MetaTags {
  // Try to use highly optimized eye-catching desktop brackets first if under 60 characters
  const defaultMeta = `[2026 Bank Registry] Verify ${countryName} IBAN Layout`;
  
  let title = defaultMeta;
  if (title.length >= 60) {
    title = `Verify ${countryName} IBAN Format & Rules`;
  }
  if (title.length >= 60) {
    title = `Check ${countryName} IBAN Length & Formats`;
  }
  if (title.length >= 60) {
    title = `${countryName} IBAN Format & Validator`;
  }
  // Ultimate hard fallback to keep strictly under 60 characters
  if (title.length >= 60) {
    title = title.substring(0, 59);
  }

  // Strict length validator on description under 155 chars
  let description = `Get official ${countryName} IBAN formatting, lengths (${ibanLength} chars) & examples. Run real-time format validation for standard ${countryCode} bank routing.`;
  if (description.length >= 155) {
    description = `Verify standard ${countryName} (${countryCode}) IBAN details. Check official formatting, BBAN patterns, and standard ${ibanLength}-character structures.`;
  }
  if (description.length >= 155) {
    description = description.substring(0, 151) + "...";
  }

  return { title, description };
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
 * Ensures clean traversal maps connect Home -> Hub -> Region
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
