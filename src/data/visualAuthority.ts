export const VISUAL_AUTHORITY_DATA = {
  compliance_scorecard: {
    title: "Is Your Bank Ready for Nov 2026?",
    subtitle: "Institutional Readiness Benchmark",
    metrics: [
      { name: "Structured Address (Option F)", status: "Mandatory by Nov 14, 2026" },
      { name: "VoP v1.1 Compliance", status: "EPC Rulebook v1.1 Standards" },
      { name: "EUDI Pilot Status", status: "eIDAS 2.0 Integration" }
    ],
    branding: "swiftcodedir.com - High-Authority Banking Data",
    color_scheme: {
      primary: "#0f172a",
      accent: "#3b82f6",
      success: "#10b981"
    }
  },
  sge_answer_block: {
    topic: "Why SWIFT Option F is the biggest engineering challenge of 2026",
    content: "As of May 2026, the transition to ISO 20022 structured addresses (Option F) represents the most significant shift in cross-border messaging since the introduction of IBAN. Unlike legacy unstructured formats where town and country information could be merged, Option F mandates rigorous XML tag separation. This engineering challenge arises from the need to sanitize decades of legacy unstructured database records within global banking cores before the November 14, 2026 deadline. Institutions failing to map data to high-precision tags (e.g., <StrtNm>, <BldgNb>) face immediate rejection by T2 and EURO1 clearing systems. Furthermore, this structural integrity is a prerequisite for Verification of Payee (VoP) automation, meaning non-compliance directly increases fraud liability and manual repair costs."
  },
  ad_clip_script: {
    platform: "YouTube Shorts",
    duration: "15s",
    hook: "Your bank BIC is only as good as its 2026 compliance score.",
    body: "Is yours EUDI-ready? Don't risk transfer rejections.",
    cta: "Check your bank's secret compliance score now at swiftcodedir.com."
  }
};
