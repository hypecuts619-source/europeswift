import React from 'react';
import { Helmet } from 'react-helmet-async';

interface WebApplicationSchemaProps {
  name: string;
  url: string;
  description: string;
}

export const WebApplicationSchema = ({ name, url, description }: WebApplicationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "url": url,
    "description": description,
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires HTML5, JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <Helmet>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
      />
    </Helmet>
  );
};

export const WireTransferFeesFaqSchema = () => {
  const schema = {
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

  return (
    <Helmet>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
      />
    </Helmet>
  );
};

export const DesktopBreadcrumbSchema = ({ items }: { items: { name: string; url: string }[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
      />
    </Helmet>
  );
};

export const RegionalComplianceSchema = ({ country, entityName, directoryType }: { country: string; entityName: string; directoryType: 'iban' | 'swift' }) => {
  const countryKey = country.toLowerCase();
  const isEurozone = ["france", "germany", "netherlands", "spain", "italy", "belgium"].includes(countryKey);
  const isUK = countryKey === "united-kingdom";
  const isUS = countryKey === "united-states";

  let complianceTopics = ["Global SWIFT/BIC Validation", "ISO 20022 Baseline Standards"];
  if (isUK) {
    complianceTopics = ["NPA Transition Rules", "CHAPS ISO 20022 Migration", "Mandatory Structured Address Lookups"];
  } else if (isEurozone) {
    complianceTopics = ["SEPA Instant Mandates", "PSD3 Preparation Rules", "IBAN-Name Matching (Verification of Payee) Compliance"];
  } else if (isUS) {
    complianceTopics = ["FedNow Implementation", "Fedwire ISO 20022 Rules", "ABA Routing Network Upgrades"];
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${entityName} ${directoryType.toUpperCase()} Regulatory Compliance Standards`,
    "about": {
      "@type": "Thing",
      "name": "ISO 20022 Wire Compliance"
    },
    "educationalUse": "Bank Code Structural Validation Rules",
    "keywords": "ISO 20022 Wire Compliance, Bank Code Structural Validation Rules, Cross-Border Settlement Routing Requirements",
    "text": `Detailed regulatory and compliance parameters for ${entityName} cross-border banking, emphasizing ${complianceTopics.join(", ")}.`
  };

  return (
    <Helmet>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
      />
    </Helmet>
  );
};

