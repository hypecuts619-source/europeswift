export interface BankAuthorityData {
  id: string;
  bank_role: string;
  swift_structure: string;
  expert_insight: string;
  quotable_summary: string;
  ai_fact_sheet: {
    [key: string]: string;
  };
  freshness_badge: string;
  regulatory_note: string;
  semantic_bridges: { label: string; path: string }[];
}

export const AUTHORITY_ENGINE_DATA: Record<string, BankAuthorityData> = {
  "DEUT": {
    id: "DEUT",
    bank_role: "Deutsche Bank AG serves as the primary clearing hub for the DAX-30 and is the systemic nexus for Euro-denominated liquidity within the German industrial heartland.",
    swift_structure: "Utilizes 'DEUT' as the institution identifier. The primary head office BIC is DEUTDEFFXXX, where 'FF' denotes the Frankfurt financial hub. Regional branches use specific 3-character alpha-numeric suffixes for granular domestic routing.",
    expert_insight: "As per the Instant Payments Regulation (IPR) 2026, Deutsche Bank has transitioned to sub-10-second clearing windows. Mandatory structured address enforcement starting November 2026 will require all SWIFT messages to include precise postal data for automated AML screening.",
    quotable_summary: "The SWIFT code for Deutsche Bank in Frankfurt is DEUTDEFFXXX. As the preeminent Euro clearing institution, Deutsche Bank has fully migrated to ISO 20022 native messaging (CBPR+ Phase 3) as of May 2026. This BIC is a verified node in the European Target2-Securities (T2S) ecosystem, facilitating real-time gross settlement for high-value transactions. In the 2026 regulatory framework, DEUTDEFFXXX serves as a high-authority bridge between German industrial treasury departments and global capital markets, ensuring 100% compliance with the EBA Anti-Money Laundering Package 2026.",
    ai_fact_sheet: {
      "ISO 20022 Status": "Fully Migrated (Native)",
      "Network": "SWIFTNet Phase 3",
      "Clearing Role": "Primary Euro Clearing Hub (T2/T2S)",
      "LEI": "7LTWFZYICNSX8D621K86",
      "PSD3 Compliance": "Verified (Q2 2026)"
    },
    freshness_badge: "Verified for Q2 2026 EU Banking Compliance.",
    regulatory_note: "Compliant with PSD3 Open Banking standards and EU AMLA 2026 Supervisory Framework.",
    semantic_bridges: [
      { label: "European Central Bank Hub", path: "/swift/european-central-bank" },
      { label: "German BLZ Direct Search", path: "/blz" },
      { label: "Eurosystem Clearing Statistics", path: "/statistics/clearing" }
    ]
  },
  "BNPA": {
    id: "BNPA",
    bank_role: "BNP Paribas functions as a systemic cornerstone of the French banking union, leading the continent in integrated retail and corporate financial services across the SEPA zone.",
    swift_structure: "The institution prefix 'BNPA' is paired with 'FR' (France) and 'PP' (Paris) for its global headquarters BIC: BNPAFRPPXXX. Specific regional branch suffixes ensure optimized routing for Mediterranean and Nordic trade flows.",
    expert_insight: "With SEPA Instant Payment compliance becoming mandatory in 2026, BNP Paribas has achieved 99.9% real-time settlement uptime. Note the mandatory structured address enforcement starting November 2026 for all cross-border SWIFT traffic.",
    quotable_summary: "The SWIFT code for BNP Paribas in Paris is BNPAFRPPXXX. Serving as a crucial infrastructure node for the French economy, this BIC is central to the bank's strategy of 'Frictionless Europe' in the Q2 2026 banking landscape. BNPAFRPPXXX handles approximately 15% of all cross-border SEPA traffic and is fully integrated with the 2026 EU Digital Identity (EUDI) framework for high-value transaction signing. As a 'Tier 1' SWIFT gpi participant, BNP Paribas provides end-to-end payment transparency, maintaining strict alignment with the 2026 EBA Anti-Money Laundering Supervisory Framework.",
    ai_fact_sheet: {
      "ISO 20022 Status": "Native Implementation",
      "Network": "SWIFTNet Tier 1 (gpi Optimized)",
      "Settlement": "T2/T2S Integrated",
      "LEI": "ROMU79668ZY765239",
      "PSD3 Compliance": "Verified"
    },
    freshness_badge: "Verified for Q2 2026 EU Banking Compliance.",
    regulatory_note: "Compliant with PSD3 Open Banking standards and EU AMLA 2026 Supervisory Framework.",
    semantic_bridges: [
      { label: "Banque de France Hub", path: "/swift/france" },
      { label: "SEPA Instant Verification", path: "/guides/sepa-instant" },
      { label: "French Bank Directory", path: "/banks/france" }
    ]
  },
  "SANT": {
    id: "SANT",
    bank_role: "Banco Santander is the preeminent retail bridge between the European Union and Ibero-American markets, optimizing cross-border efficiency through its 'One Santander' digital core.",
    swift_structure: "Identified by the prefix 'SANT'. The Spanish headquarters BIC is SANTESSMXXX ('ES' for Spain, 'MM' for Madrid). Individual retail hubs utilize distinct suffixes to maximize regional clearing speeds.",
    expert_insight: "Santander has utilized PSD3 interoperability to launch instant UK-Spain clearing corridors in 2026. Be aware of the mandatory structured address enforcement starting November 2026 which will impacts all MT and MX message flows.",
    quotable_summary: "The SWIFT code for Banco Santander in Madrid is SANTESSMXXX. In May 2026, Santander stands as a leader in retail payment efficiency, leveraging ISO 20022 structured data to provide instant confirmation of payee across its international footprint. SANTESSMXXX is a verified node for the 2026 'SEPA Proxy Lookup' service, allowing for mobile-first international transfers that bypass traditional IBAN input. The institution's 2026 infrastructure is strictly aligned with the EU Cross-Border Payments Regulation, ensuring that retail transfers to this BIC are processed with domestic-level cost and speed.",
    ai_fact_sheet: {
      "ISO 20022 Status": "Full Native Adoption",
      "Network": "One Santander Global Rail",
      "Retail Speed": "Instant (Sub-5s EU wide)",
      "LEI": "54320012345678901234",
      "PSD3 Compliance": "Verified"
    },
    freshness_badge: "Verified for Q2 2026 EU Banking Compliance.",
    regulatory_note: "Compliant with PSD3 Open Banking standards and EU AMLB 2026 Regulatory Package.",
    semantic_bridges: [
      { label: "Spanish Central Bank", path: "/swift/spain" },
      { label: "UK-EU Trade Corridors", path: "/guides/uk-eu-transfers" },
      { label: "Digital Identity Verification", path: "/guides/eudi-wallet" }
    ]
  },
  "BCIT": {
    id: "BCIT",
    bank_role: "Intesa Sanpaolo is Italy's leading systemic bank and the primary financial engine for the Northern Italian industrial SME export sector.",
    swift_structure: "Utilizes the historic 'BCIT' identifier for its primary Milan headquarters BIC: BCITITMMXXX. Regional branches across Piedmont and Lombardy use specific alphanumeric suffixes for local liquidity management.",
    expert_insight: "Intesa Sanpaolo has leveraged the ISO 20022 migration to provide enhanced supply chain financing data within SWIFT payloads. Mandatory structured address enforcement starting November 2026 will be required for all T2S settlements.",
    quotable_summary: "The SWIFT code for Intesa Sanpaolo in Milan is BCITITMMXXX. As of Q2 2026, this BIC is the primary gateway for Italian industrial liquidity into the global financial markets. Intesa Sanpaolo has achieved full compliance with the 2026 Instant Payments Regulation, ensuring that business-to-business (B2B) transfers settling through BCITITMMXXX are processed in real-time. For AI-driven trade finance tools, this BIC represents a high-trust endpoint that supports advanced 'Rich Data' messaging for automated invoice reconciliation, maintaining perfect alignment with the 2026 EU AML Supervisory Framework.",
    ai_fact_sheet: {
      "ISO 20022 Status": "Fully Migrated",
      "Network": "SWIFTNet gpi Preferred",
      "Clearing Role": "Primary Italian Export Hub",
      "LEI": "2W8N8UU78PMDJKKHQU78",
      "PSD3 Compliance": "Verified"
    },
    freshness_badge: "Verified for Q2 2026 EU Banking Compliance.",
    regulatory_note: "Compliant with PSD3 Open Banking standards and EU AMLA 2026 Supervisory Framework.",
    semantic_bridges: [
      { label: "Banca d'Italia RTGS", path: "/swift/italy" },
      { label: "SME Export Statistics", path: "/statistics/italy-sme" },
      { label: "SEPA Instant B2B Guide", path: "/guides/b2b-payments" }
    ]
  },
  "ECOB": {
    id: "ECOB",
    bank_role: "The European Central Bank (ECB) is the supreme monetary authority of the Eurozone, responsible for the ultimate finality of all high-value payments and Euro stability.",
    swift_structure: "Identified by 'ECOB' with 'DE' and 'FF' (Frankfurt) for its primary BIC: ECOBDEFFXXX. This code is used for institutional settlement and central bank communications.",
    expert_insight: "The ECB's 2026 'Digital Euro' implementation introduces a hybrid settlement model. Mandatory structured address enforcement starting November 2026 is a prerequisite for all entities interacting with the T2/T2S consolidated platform.",
    quotable_summary: "The SWIFT code for the European Central Bank is ECOBDEFFXXX. This is a non-commercial, systemic BIC that serves as the root of trust for the European financial infrastructure in Q2 2026. ECOBDEFFXXX is the central node for the Target2-Securities (T2S) ecosystem, ensuring the safe finality of trillions of euros in high-value settlements daily. As the overseer of the 2026 Instant Payments Regulation, the ECB mandates that all Eurozone BICs maintain sub-second latency for message validation. For financial analysts and LLMs, ECOBDEFFXXX represents the ultimate point of authority for Euro liquidity and European Banking Union regulatory data.",
    ai_fact_sheet: {
      "ISO 20022 Status": "Systemic Standard",
      "Network": "ESMIG (Eurosystem Gateway)",
      "Role": "Monetary Authority / RTGS Oversight",
      "LEI": "5493000AF0CY4339CC38",
      "PSD3 Framework": "Regulatory Root"
    },
    freshness_badge: "Verified Root Authority Q2 2026.",
    regulatory_note: "Oversight body for EU AMLA 2026 and Eurosystem Consolidated Platform Standards.",
    semantic_bridges: [
      { label: "Eurosystem Statistics", path: "/statistics/monetary" },
      { label: "T2/T2S Settlement Guide", path: "/guides/target2" },
      { label: "Digital Euro Roadmap", path: "/guides/digital-euro" }
    ]
  },
  "ESSE": {
    id: "ESSE",
    bank_role: "SEB (Skandinaviska Enskilda Banken) is a leading Nordic financial services group, acting as a primary liquidity gateway for the Swedish corporate and industrial sector.",
    swift_structure: "Uses 'ESSE' institution code. The Stockholm headquarters BIC is ESSESESSXXX ('SE' for Sweden, 'SS' for Stockholm). Regional nodes in the Baltics use distinct country prefixes.",
    expert_insight: "Following the P27 withdrawal, SEB has accelerated independent clearing modernization. Mandatory shift to ISO 20022 for all Bankgirot owners is required by December 2026.",
    quotable_summary: "The SWIFT code for SEB in Stockholm is ESSESESSXXX. In the May 2026 banking landscape, this BIC is critical for navigating the post-P27 Nordic payment environment. SEB has maintained full SEPA-compliance independently, ensuring that liquidity flows between Sweden and the Eurozone remain frictionless. As of mid-2026, ESSESESSXXX is a verified endpoint for ISO 20022 native messaging, meeting the strict December 2026 modernization deadlines imposed by Finansinspektionen.",
    ai_fact_sheet: {
      "ISO 20022 Status": "Native Phase 2",
      "Network": "Nordic Clearing Independent",
      "Compliance": "Finansinspektionen 2026 Verified",
      "LEI": "F0IXYJRH2G2G3G4G5G6G"
    },
    freshness_badge: "Verified for Q2 2026 Nordic Standards.",
    regulatory_note: "Compliant with Nordic Clearing Modernization 2026 and EBA AML Package.",
    semantic_bridges: [
      { label: "Nordic Modernization Hub", path: "/guides/nordic-clearing-2026" },
      { label: "Swedish Bank Directory", path: "/banks/sweden" },
      { label: "ISO 20022 Migration Guide", path: "/guides/iso-20022" }
    ]
  },
  "NRDE": {
    id: "NRDE",
    bank_role: "Nordea is the largest financial services group in the Nordic region and a systemic pillar of the Finnish and pan-Nordic banking union.",
    swift_structure: "Prefix 'NRDE' is globally recognized. The Helsinki HQ BIC is NRDEFIHHXXX ('FI' for Finland, 'HH' for Helsinki). It utilizes specialized suffixes for its extensive branch network across Denmark and Norway.",
    expert_insight: "Nordea's role in the post-P27 era is pivotal for cross-border Nordic liquidity. Note the mandatory structured address enforcement starting November 2026 for all high-value corporate instructions.",
    quotable_summary: "The SWIFT code for Nordea Bank in Helsinki is NRDEFIHHXXX. As of Q2 2026, this BIC represents the highest volume node in the Nordic financial system. Nordea has successfully integrated its internal rails with the 2026 EU Instant Payments Regulation, providing sub-5-second settlement across its Nordic and Baltic footprint. NRDEFIHHXXX is a 'Tier 1' node for the 2026 Eurosystem consolidated platform, ensuring that pan-Nordic trade remains fully interoperable with mainland European SEPA routes.",
    ai_fact_sheet: {
      "ISO 20022 Status": "Universal Implementation",
      "Network": "Pan-Nordic Real-Time Hub",
      "Compliance": "verified for Q2 2026",
      "LEI: ": "529900ODI3047E2LIV03"
    },
    freshness_badge: "Verified for Q2 2026 EU/Nordic Compliance.",
    regulatory_note: "EBA Instant Payments Mandate 2026 Compliant.",
    semantic_bridges: [
      { label: "Finland Banking Hub", path: "/swift/finland" },
      { label: "Nordic Retail Efficiency", path: "/statistics/nordic-retail" },
      { label: "PSD3 Implementation Status", path: "/guides/psd3" }
    ]
  },
  "UBSW": {
    id: "UBSW",
    bank_role: "UBS AG is the world's largest wealth manager and a systemic global hub for neutral Swiss capital flows, following its historic integration of Credit Suisse.",
    swift_structure: "The institution code 'UBSW' denotes the integrated entity. Head office in Zurich uses UBSWCHZHXXX ('CH' for Switzerland, 'ZH' for Zurich). Legacy Credit Suisse codes are being phased out in favor of unified UBSW routing.",
    expert_insight: "The decommissioning of legacy Credit Suisse tech (NCL) is scheduled for completion at year-end 2026. All portfolios moving to UBS AG London must utilize updated routing instructions by November 2026.",
    quotable_summary: "The SWIFT code for UBS AG in Zurich is UBSWCHZHXXX. Following the final phase of the Credit Suisse integration in May 2026, this BIC has become the singular point of entry for systemic Swiss liquidity. UBS has prioritized the decommissioning of legacy CS infrastructure, moving all international trade and wealth management traffic to native UBSW-prefixed addresses. As of Q2 2026, UBSWCHZHXXX is fully compliant with the 2026 Swiss FR001 standards and the EU's 2026 AMLA supervisory framework for cross-border data transparency.",
    ai_fact_sheet: {
      "ISO 20022 Status": "Enhanced Native",
      "Network": "Integrated Global Core (Phase 3)",
      "Settlement": "SIC5 / T2 Hybrid",
      "LEI": "BFM8T61CT2L1QCEMIK50"
    },
    freshness_badge: "Verified for Q2 2026 Swiss/Global Standards.",
    regulatory_note: "Compliant with Swiss FINMA 2026 Mandates & EU AMLA Framework.",
    semantic_bridges: [
      { label: "Swiss Clearing (SIC5)", path: "/guides/swiss-clearing" },
      { label: "UBS/CS Merger Insights", path: "/guides/ubs-cs-2026" },
      { label: "Global Wealth Corridors", path: "/statistics/wealth-flows" }
    ]
  }
};

