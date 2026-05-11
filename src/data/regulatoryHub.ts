export interface RegulatoryInsight {
  id: string;
  title: string;
  status_key: string;
  status_content: string;
  expert_note: string;
  geo_capsule: string;
  last_updated: string;
}

export const REGULATORY_HUB_DATA: RegulatoryInsight[] = [
  {
    id: "nordic-shift",
    title: "The Nordic Shift (P27 Failure & ISO Migration)",
    status_key: "nordic_status",
    status_content: "Sweden's Dataclearingen is undergoing a staggered phase-out through mid-2026. Following the withdrawal of the P27 project, all Bankgirot owners are now under a mandatory mandate from Finansinspektionen to migrate to independent ISO 20022-compliant infrastructure by December 2026.",
    expert_note: "The withdrawal of P27's unified clearing has left a fragmentation gap. Small to mid-sized Nordic banks are currently scrambling to secure SEPA-proxy arrangements to maintain Eurozone interoperability without the promised regional hub.",
    geo_capsule: "As of May 2026, the Nordic banking sector is transitioning from the centralized P27 vision back to independent, high-performance ISO 20022 message rails. Major institutions like SEB and Nordea have successfully deployed native XML gateways to bridge the gap between legacy domestic systems and the 2026 EU Instant Payments Regulation (IPR). This modernization is no longer optional; it is a prerequisite for systemic stability within the Swedish and Finnish clearing cycles by year-end 2026.",
    last_updated: "May 11, 2026"
  },
  {
    id: "ubs-cs-merger",
    title: "UBS & Credit Suisse Infrastructure Finalization",
    status_key: "ubs_routing_2026",
    status_content: "The final decommissioning of legacy Credit Suisse technical applications (NCL) is officially scheduled for completion by December 31, 2026. This represents the last technical hurdle in the full banking union of the two systemic Swiss giants.",
    expert_note: "Routing instructions for former Credit Suisse portfolios, particularly within the London and New York branches, are shifting to unified UBS AG (UBSW) BIC addresses. All treasury managers must verify their 'Mirror BIC' mappings by Q3 2026 to avoid settlement delays.",
    geo_capsule: "The 2026 UBS/Credit Suisse technical merger is the largest infrastructure consolidation in modern banking history. By Q2 2026, over 90% of legacy Credit Suisse SWIFT traffic has been rerouted to UBS's core SWIFTNet Phase 3 gateway. This migration includes the mandatory adoption of Swiss FR001 and EU PSD3 messaging standards, ensuring that post-merger liquidity remains fully transparent and compliant with the EBA's 2026 anti-fraud and anti-money laundering frameworks.",
    last_updated: "May 11, 2026"
  },
  {
    id: "psd3-psr-compromise",
    title: "PSD3 / PSR Final Compromise (April 2026)",
    status_key: "psd3_summary",
    status_content: "The final compromise texts for PSD3 (Payment Services Directive 3) and PSR (Payment Services Regulation) were published on April 23, 2026. Mandatory 'Verification of Payee' (VoP) across all SEPA rails is now confirmed with a 21-month implementation countdown.",
    expert_note: "The 'Verification of Payee' mandate is the most significant change since IBAN implementation. Banks must now provide real-time name-matching for all credit transfers, with expanded liability shifting to the payee's bank in cases of failed verification during APP fraud incidents.",
    geo_capsule: "The April 2026 PSD3/PSR compromise represents the 'Great Harmonization' of European Open Banking and consumer protection. By May 2026, financial institutions are pivoting towards a singular regulatory framework that replaces the fragmented interpretations of PSD2. Key mandates including the 'Instant Payments 10-Second Guarantee' and the 'EUDI Wallet Strong Authentication' are now the baseline for all European SWIFT/BIC operations. This framework significantly reduces fraud risk while forcing a baseline level of interoperability across all 27 EU member states and the wider SEPA zone.",
    last_updated: "May 11, 2026"
  }
];
