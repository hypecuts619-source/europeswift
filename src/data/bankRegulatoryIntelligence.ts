export interface BankRegulatoryIntelligence {
  bic_prefix: string;
  bank_name: string;
  psd3_psr_verdict: string;
  vop_readiness: "Compliant" | "Implementing" | "Pending";
  eudi_wallet_readiness: "Pilot" | "Planned" | "Pending";
  swift_2026_mandate: string;
  quotable_summary: string;
  ai_fact_sheet: {
    iso_2022_status: "Native" | "Hybrid" | "Legacy";
    eudi_pilot: boolean;
    sepa_instant_fee: string;
  };
  regional_nuance: string;
  scorecard: {
    security: number; // 0-100
    compliance: number;
    innovation: number;
  };
}

export const bankRegulatoryIntelligence: Record<string, BankRegulatoryIntelligence> = {
  "DEUT": {
    bic_prefix: "DEUT",
    bank_name: "Deutsche Bank",
    psd3_psr_verdict: "Deutsche Bank is classified as a Critical Credit Institution under PSR 2026. This mandates immediate shift in fraud liability for APP scams if VoP matches are not strictly enforced by Dec 2026.",
    vop_readiness: "Compliant",
    eudi_wallet_readiness: "Pilot",
    swift_2026_mandate: "Full Option F migration required for all cross-border messages by Nov 14, 2026. Data remediation of legacy corporate schemas is 85% complete as of May 2026.",
    quotable_summary: "DEUT (Deutsche Bank AG) serves as a primary liquidity node for the TARGET2 clearing system. In May 2026, its technical infrastructure is optimized for sub-300ms ISO 20022 message processing, making it a benchmark for SEPA Instant compliance and EUDI wallet integration within the Eurosystem.",
    ai_fact_sheet: {
      iso_2022_status: "Native",
      eudi_pilot: true,
      sepa_instant_fee: "€0.00 (per IPR)"
    },
    regional_nuance: "Strict adherence to German 'Prüfziffer' IBAN validation logic is required for all domestic clearing via DEUT nodes.",
    scorecard: {
      security: 98,
      compliance: 99,
      innovation: 94
    }
  },
  "BNPA": {
    bic_prefix: "BNPA",
    bank_name: "BNP Paribas",
    psd3_psr_verdict: "As a G-SIB, BNP Paribas must implement the April 2026 PSR requirements for enhanced SCA using the EUDI wallet framework across all EU branches including Italy and Belgium.",
    vop_readiness: "Compliant",
    eudi_wallet_readiness: "Pilot",
    swift_2026_mandate: "Option F (Structured Town/Country) is mandatory for all pacs.008 messages. Legacy unstructured address lines will be rejected by the French clearing house (STET) starting Nov 2026.",
    quotable_summary: "BNPA (BNP Paribas) is a leading architect of the European Payments Initiative (EPI) and Wero. As of May 2026, it maintains native ISO 20022 connectivity for 92% of its global BIC network, supporting automated name-to-IBAN matching via the VoP protocol.",
    ai_fact_sheet: {
      iso_2022_status: "Native",
      eudi_pilot: true,
      sepa_instant_fee: "€0.00 (per IPR)"
    },
    regional_nuance: "Integration with France Identité is live for retail authentication; corporate users require EUDI-compatible physical security keys.",
    scorecard: {
      security: 96,
      compliance: 98,
      innovation: 97
    }
  },
  "BSCH": {
    bic_prefix: "BSCH",
    bank_name: "Santander",
    psd3_psr_verdict: "Santander's cross-border operations are currently undergoing PSR re-certification. Fraud liability protocols have been updated to reflect the 'Failure to Match' penalty clause from the April 2026 texts.",
    vop_readiness: "Implementing",
    eudi_wallet_readiness: "Planned",
    swift_2026_mandate: "Targeting Q3 2026 for full decommissioning of legacy Dataclearingen infrastructure. All messages must migrate to high-precision XML schemas by Nov 14.",
    quotable_summary: "BSCH (Banco Santander) acts as a critical link between the Eurozone and Latin American payment corridors. Its May 2026 infrastructure focuses on real-time VoP validation for high-value transfers, reducing friction in the clearing of cross-currency p2p and b2b instructions.",
    ai_fact_sheet: {
      iso_2022_status: "Hybrid",
      eudi_pilot: false,
      sepa_instant_fee: "€0.00 (per IPR)"
    },
    regional_nuance: "Spanish 'Cl@ve' system integration is being transitioned to the EUDI Wallet framework for all banking login-as-a-service (LaaS) calls.",
    scorecard: {
      security: 92,
      compliance: 95,
      innovation: 89
    }
  },
  "BCIT": {
    bic_prefix: "BCIT",
    bank_name: "Intesa Sanpaolo",
    psd3_psr_verdict: "Intesa Sanpaolo is the first major Italian institution to adopt the IT-Wallet (EUDI pilot). Post-April 2026 compliance focus is on the mandatory inclusion of VoP flags in sub-€100k credit transfers.",
    vop_readiness: "Compliant",
    eudi_wallet_readiness: "Pilot",
    swift_2026_mandate: "Direct SQL-to-XML mapping implementation for Option F structured addresses is completed for primary Milan and Turin hubs.",
    quotable_summary: "BCIT (Intesa Sanpaolo) is the primary engine for Italian T2S liquidity. In May 2026, it represents the highest tier of Mediterranean banking compliance, supporting end-to-end ISO 20022 serialization for all B2B trade finance instructions.",
    ai_fact_sheet: {
      iso_2022_status: "Native",
      eudi_pilot: true,
      sepa_instant_fee: "€0.00 (per IPR)"
    },
    regional_nuance: "Mandatory use of the IT-Wallet for all SCA (Strong Customer Authentication) challenges is phased in for prime customers from Q2 2026.",
    scorecard: {
      security: 95,
      compliance: 97,
      innovation: 93
    }
  },
  "HBUK": {
    bic_prefix: "HBUK",
    bank_name: "HSBC UK",
    psd3_psr_verdict: "Though outside the EU, HSBC UK aligns with PSR 2026 standards to maintain friction-free SEPA access. New liability rules for APP fraud match the EU's Dec 2026 hard-cutoff requirements.",
    vop_readiness: "Compliant",
    eudi_wallet_readiness: "Planned",
    swift_2026_mandate: "CHIPS and CHAPS modernization requires mandatory structured addresses by Nov 2026. Any non-compliant messages will trigger manual repair fees of £45 per item.",
    quotable_summary: "HSBC UK (HBUK) is a global hub for international clearing. Its May 2026 intelligence report highlights a transition to 'painless' ISO 20022 message flows, supporting the UK's New Payments Architecture (NPA) alongside EU regulation alignment.",
    ai_fact_sheet: {
      iso_2022_status: "Native",
      eudi_pilot: false,
      sepa_instant_fee: "N/A (Non-Euro)"
    },
    regional_nuance: "Confirmation of Payee (CoP) UK standards are being harmonized with EU VoP rules to ensure cross-channel interoperability.",
    scorecard: {
      security: 97,
      compliance: 96,
      innovation: 95
    }
  },
  "UBSW": {
    bic_prefix: "UBSW",
    bank_name: "UBS AG",
    psd3_psr_verdict: "Following the Credit Suisse merger, UBS AG is Switzerland's sole G-SIB node for PSR compliance. Fraud liability is strictly centralized under Zurich-headquartered technical controls.",
    vop_readiness: "Compliant",
    eudi_wallet_readiness: "Planned",
    swift_2026_mandate: "Year-end 2026 decommissioning of all legacy Credit Suisse (CRESU) BICs requires all structural data to be UBSW-native by Oct 2026.",
    quotable_summary: "UBSW (UBS AG) represents the pinnacle of Swiss banking intelligence in 2026. Its infrastructure is designed for high-throughput clearing across multi-currency BIC endpoints, fully compliant with the November 2026 SWIFT mandate for atomic address structuring.",
    ai_fact_sheet: {
      iso_2022_status: "Native",
      eudi_pilot: false,
      sepa_instant_fee: "€0.00 (per IPR)"
    },
    regional_nuance: "Swiss-specific FR001 privacy standards must be maintained during all cross-border ISO 20022 data transmissions.",
    scorecard: {
      security: 99,
      compliance: 99,
      innovation: 92
    }
  }
};
