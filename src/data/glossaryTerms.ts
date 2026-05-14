export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDefinition: string;
  longDefinition: string;
  relatedSlugs?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "aba-routing-number",
    term: "ABA Routing Number",
    shortDefinition: "A 9-digit code used to identify banks in the United States.",
    longDefinition: "The ABA (American Bankers Association) Routing Number is a nine-digit code used exclusively in the United States to identify specific financial institutions. It is essential for domestic transactions including wire transfers, direct deposits, electronic funds transfers (EFT), and Automated Clearing House (ACH) payments. The routing number ensures that funds are directed to the exact bank holding the recipient's account.",
    relatedSlugs: ["ach-automated-clearing-house", "wire-transfer"]
  },
  {
    slug: "ach-automated-clearing-house",
    term: "ACH (Automated Clearing House)",
    shortDefinition: "A US electronic network for processing domestic retail payments and direct deposits.",
    longDefinition: "An Automated Clearing House (ACH) is an electronic network for financial transactions in the United States. ACH processes large volumes of credit and debit transactions in batches. Examples include payroll direct deposits, vendor payments, and automated bill deductions. While inexpensive and reliable, ACH transfers are generally slower than wire transfers, often taking 1 to 3 business days to clear, and they do not process cross-border international payments natively.",
    relatedSlugs: ["aba-routing-number", "eft-electronic-funds-transfer"]
  },
  {
    slug: "bacs",
    term: "BACS",
    shortDefinition: "A UK electronic system to make payments directly from one bank account to another.",
    longDefinition: "BACS (originally Bankers' Automated Clearing Services) is an electronic system used in the United Kingdom to process direct debits and direct credits. It is the most common way UK employers pay their staff. BACS payments typically take three working days to clear, meaning funds submitted on Monday will clear by Wednesday. It is designed for high-volume, regular domestic payments.",
    relatedSlugs: ["chaps", "fps-faster-payments", "sort-code"]
  },
  {
    slug: "bic-bank-identifier-code",
    term: "BIC (Bank Identifier Code)",
    shortDefinition: "An internationally recognized standard format to identify banks and financial institutions.",
    longDefinition: "A Bank Identifier Code (BIC) is a standard format of Business Identifier Codes approved by the International Organization for Standardization (ISO). It is frequently used interchangeably with 'SWIFT code' because the SWIFT network handles the registration of these codes. A BIC is either 8 or 11 alphanumeric characters long, detailing the bank name, country, location, and optionally the specific branch.",
    relatedSlugs: ["swift-society-worldwide-interbank", "iban-international-bank-account"]
  },
  {
    slug: "chaps",
    term: "CHAPS",
    shortDefinition: "A UK payment system offering same-day settlement for high-value transactions.",
    longDefinition: "CHAPS (Clearing House Automated Payment System) is a high-value, bank-to-bank payment system in the UK guaranteeing same-day settlement. It is commonly used for time-critical payments, such as buying a home, making high-value corporate transactions, or paying taxes. Unlike BACS, CHAPS incurs a relatively high processing fee, but there is no upper limit to the amount you can transfer.",
    relatedSlugs: ["bacs", "fps-faster-payments", "sort-code"]
  },
  {
    slug: "correspondent-bank",
    term: "Correspondent Bank",
    shortDefinition: "A financial institution that provides services on behalf of another, usually in a foreign country.",
    longDefinition: "A correspondent bank provides services—such as accepting deposits, gathering documents, and transferring funds—on behalf of another financial institution. When sending an international wire transfer, if the sender's bank and the recipient's bank do not have a direct relationship, they will route the funds through a correspondent bank. These banks act as an essential bridge in global finance but typically charge fees deducted directly from the wire amount.",
    relatedSlugs: ["intermediary-bank", "nostro-account", "vostro-account"]
  },
  {
    slug: "eft-electronic-funds-transfer",
    term: "EFT (Electronic Funds Transfer)",
    shortDefinition: "The electronic exchange or transfer of money from one account to another.",
    longDefinition: "Electronic Funds Transfer (EFT) is a broad umbrella term encompassing any transfer of funds initiated through an electronic terminal, telephone, computer, or magnetic tape. This includes direct deposits, ATM withdrawals, point-of-sale transactions, ACH payments, and wire transfers. It simply denotes that money moved digitally across banking networks.",
    relatedSlugs: ["ach-automated-clearing-house", "wire-transfer"]
  },
  {
    slug: "fps-faster-payments",
    term: "FPS (Faster Payments Service)",
    shortDefinition: "A UK banking initiative to reduce payment times between customer accounts.",
    longDefinition: "The Faster Payments Service (FPS) is a UK banking initiative launched in 2008 intended to speed up the time it takes to clear electronic payments between bank accounts. FPS generally processes payments within seconds (up to a maximum of two hours), making it vastly faster than BACS. It operates 24/7/365 and is the default rail for standard mobile and online banking transfers in the UK.",
    relatedSlugs: ["bacs", "chaps"]
  },
  {
    slug: "iban-international-bank-account",
    term: "IBAN",
    shortDefinition: "An internationally agreed system of identifying bank accounts across national borders.",
    longDefinition: "The International Bank Account Number (IBAN) is a globally recognized system for identifying an individual bank account. Created originally to facilitate payments within the European Union, it has since been adopted by many countries globally. An IBAN consists of up to 34 alphanumeric characters comprising a country code, two check digits, and a Basic Bank Account Number (BBAN) which includes routing and account details. It heavily reduces the risk of transcription errors during international wires.",
    relatedSlugs: ["bic-bank-identifier-code", "swift-society-worldwide-interbank", "sepa-single-euro-payments"]
  },
  {
    slug: "intermediary-bank",
    term: "Intermediary Bank",
    shortDefinition: "A third-party bank used to facilitate international funds transfers between two other banks.",
    longDefinition: "An intermediary bank acts as a middleman in an international money transfer when the originating bank and the receiving bank do not have a direct clearing relationship. There can sometimes be multiple intermediary banks in a single wire transfer chain. Each intermediary typically takes a 'processing fee' or 'network cost', which usually reduces the final amount the recipient receives.",
    relatedSlugs: ["correspondent-bank", "wire-transfer"]
  },
  {
    slug: "mid-market-rate",
    term: "Mid-Market Rate",
    shortDefinition: "The exact halfway point between global currency supply and demand prices.",
    longDefinition: "The Mid-Market Rate (also called the interbank or real exchange rate) is the exact midway point between what currency buyers are willing to pay and what currency sellers are willing to sell for. It is the rate you see on independent sources like Google or Reuters. Traditional consumer banks often hide high markup spreads, charging customers a much worse exchange rate than the true mid-market rate.",
    relatedSlugs: ["remittance", "wire-transfer"]
  },
  {
    slug: "mt103",
    term: "MT103 (Message Type 103)",
    shortDefinition: "A specific SWIFT message format used for cross-border wire transfers.",
    longDefinition: "MT103 is an internationally standardized SWIFT message type utilized to facilitate global customer credit transfers. When you send an international wire via SWIFT, the bank generates an MT103 document. This document acts as a universally accepted proof of payment, detailing the sender, receiver, amount, currency, timestamp, and the exact routing path (BICs and IBANs).",
    relatedSlugs: ["swift-society-worldwide-interbank", "bic-bank-identifier-code"]
  },
  {
    slug: "nostro-account",
    term: "NOSTRO Account",
    shortDefinition: "A bank account held by one bank in another bank, usually in the foreign country's currency.",
    longDefinition: "Originating from the Latin word for 'ours', a NOSTRO account is how a domestic bank refers to its account positioned at an overseas correspondent bank. For example, if a US bank holds an account in Euros at a German bank, the US bank refers to it as its NOSTRO account. These accounts are fundamental in settling international trade and clearing foreign currency wire transfers.",
    relatedSlugs: ["vostro-account", "correspondent-bank"]
  },
  {
    slug: "our-sha-ben",
    term: "OUR, SHA, BEN (Billing Codes)",
    shortDefinition: "Standardized instructions indicating who pays the fees for a SWIFT wire transfer.",
    longDefinition: "These three codes determine fee allocation in a SWIFT transfer. OUR means the sender pays all transaction fees, ensuring the exact principal amount arrives. SHA (Shared) means the sender pays the originating bank's fees, while the receiver covers intermediary and receiving bank fees. BEN (Beneficiary) dictates that the receiver pays all transfer fees, which are deducted directly from the transmitted amount.",
    relatedSlugs: ["swift-society-worldwide-interbank", "intermediary-bank"]
  },
  {
    slug: "remittance",
    term: "Remittance",
    shortDefinition: "The transfer of money by a foreign worker or expat back to their home country.",
    longDefinition: "A remittance refers to a sum of money sent as a payment or gift, most commonly denoting money sent by an individual working in a foreign country to their family or homeland. Remittances are a major economic contribution to many developing nations. The global remittance market has heavily shifted from cash-based agents (like Western Union) to digital transfer apps offering mid-market rates.",
    relatedSlugs: ["wire-transfer", "mid-market-rate"]
  },
  {
    slug: "sepa-single-euro-payments",
    term: "SEPA (Single Euro Payments Area)",
    shortDefinition: "An EU initiative to harmonize and streamline electronic Euro payments.",
    longDefinition: "SEPA is a payment-integration initiative of the European Union for simplification of bank transfers denominated in euro (EUR). Currently, 36 European countries participate. SEPA eliminates distinctions between domestic and cross-border European payments, ensuring transfers are fast, highly secure, and typically free of cross-border deductions. SEPA requires an IBAN for routing.",
    relatedSlugs: ["iban-international-bank-account", "swift-society-worldwide-interbank"]
  },
  {
    slug: "sort-code",
    term: "Sort Code",
    shortDefinition: "A six-digit integer used by the British and Irish banking industry to route money.",
    longDefinition: "A Sort Code is a numeric code consisting of six digits (usually formatted as two-digit pairs like 12-34-56). It is used to clear domestic checks and electronic transfers within the United Kingdom and Ireland. The Sort Code identifies both the parent bank and the specific branch keeping the customer's account. It is heavily embedded within UK IBANs.",
    relatedSlugs: ["bacs", "chaps", "fps-faster-payments"]
  },
  {
    slug: "swift-society-worldwide-interbank",
    term: "SWIFT",
    shortDefinition: "A vast messaging network used by financial institutions globally to transmit data.",
    longDefinition: "The Society for Worldwide Interbank Financial Telecommunication (SWIFT) is a Belgian cooperative society acting as the primary messaging artery for global finance. SWIFT does not hold funds itself; rather, it securely transmits payment orders (like the MT103) which must be settled by correspondent accounts. SWIFT codes (or BICs) use an 8 or 11 alphanumeric schema to identify banks.",
    relatedSlugs: ["bic-bank-identifier-code", "mt103", "our-sha-ben"]
  },
  {
    slug: "vostro-account",
    term: "VOSTRO Account",
    shortDefinition: "The term used by a correspondent bank describing an account held on behalf of a foreign bank.",
    longDefinition: "Originating from the Latin word for 'yours', a VOSTRO account describes the exact same account as a NOSTRO, just from the perspective of the opposite bank. If a German bank holds a Euro account for an American bank, the German bank views it as a VOSTRO account ('your money on our books'). It is the mirror-image counterpart required for international reconciliation.",
    relatedSlugs: ["nostro-account", "correspondent-bank"]
  },
  {
    slug: "wire-transfer",
    term: "Wire Transfer",
    shortDefinition: "An electronic transfer of funds across a network administered by banks and service agencies.",
    longDefinition: "A wire transfer is an electronic method to pass funds from one entity to another. Wire transfers can be domestic, utilizing local clearing networks (like Fedwire in the US or CHAPS in the UK), or international, utilizing the SWIFT messaging network. Unlike ACH or BACS, wire transfers are generally considered finalized near instantly upon clearing and are hard to reverse, making them prone to unrecoverable fraud if not verified.",
    relatedSlugs: ["swift-society-worldwide-interbank", "ach-automated-clearing-house", "sepa-single-euro-payments"]
  }
];
