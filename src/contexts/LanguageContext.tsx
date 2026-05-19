import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "EN" | "DE" | "FR" | "ES" | "IT" | "PL";

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  "nav.swift": { 
    EN: "SWIFT/BIC", 
    DE: "SWIFT/BIC", 
    FR: "Code SWIFT/BIC",
    ES: "SWIFT/BIC",
    IT: "SWIFT/BIC",
    PL: "SWIFT/BIC"
  },
  "nav.iban": { 
    EN: "IBAN Directory", 
    DE: "IBAN Verzeichnis", 
    FR: "Annuaire IBAN",
    ES: "Directorio IBAN",
    IT: "Elenco IBAN",
    PL: "Katalog IBAN"
  },
  "nav.sortcode": { 
    EN: "UK Sort Codes", 
    DE: "UK Sort Codes", 
    FR: "Code de Tri UK",
    ES: "Códigos UK",
    IT: "Codici UK",
    PL: "Kody Sort UK"
  },
  "nav.blz": { 
    EN: "German BLZ", 
    DE: "Deutsche BLZ", 
    FR: "BLZ Allemand",
    ES: "BLZ Alemán",
    IT: "BLZ Tedesco",
    PL: "Niemieckie BLZ"
  },
  "home.title": { 
    EN: "Find European Bank Codes", 
    DE: "Finden Sie Europäische Bankleitzahlen", 
    FR: "Trouver des Codes Bancaires Européens",
    ES: "Buscar Códigos Bancarios Europeos",
    IT: "Trova Codici Bancari Europei",
    PL: "Znajdź Europejskie Kody Bankowe"
  },
  "home.subtitle": { 
    EN: "Access 186,000+ verified SWIFT/BIC, IBAN numbers & formats, Sort Codes, and BLZ records across 89 countries.", 
    DE: "Zugriff auf über 186.000 verifizierte SWIFT/BIC-, IBAN-Nummern und -Formate, Sortiercodes und BLZ-Einträge in 89 Ländern.", 
    FR: "Accédez à plus de 186 000 codes SWIFT/BIC, numéros et formats IBAN, codes de tri et enregistrements BLZ vérifiés dans 89 pays.",
    ES: "Acceda a más de 186.000 SWIFT/BIC verificados, números y formatos IBAN, códigos de clasificación y registros BLZ en 89 países.",
    IT: "Accedi a oltre 186.000 SWIFT/BIC verificati, numeri e formati IBAN, codici di ordinamento e record BLZ in 89 paesi.",
    PL: "Uzyskaj dostęp do ponad 186 000 zweryfikowanych kodów SWIFT/BIC, numerów i formatów IBAN, kodów rozliczeniowych i rekordów BLZ w 89 krajach."
  },
  "search.placeholder": { 
    EN: "Search Bank, City, or BIC Code...", 
    DE: "Bank, Stadt oder BIC suchen...", 
    FR: "Rechercher Banque, Ville, ou code BIC...",
    ES: "Buscar banco, ciudad o código BIC...",
    IT: "Cerca banca, città o codice BIC...",
    PL: "Szukaj banku, miasta lub kodu BIC..."
  },
  "search.button": { 
    EN: "Search", 
    DE: "Suchen", 
    FR: "Rechercher",
    ES: "Buscar",
    IT: "Cerca",
    PL: "Szukaj"
  },
  "iban.validator": { 
    EN: "IBAN Validator", 
    DE: "IBAN Prüfer", 
    FR: "Validateur IBAN",
    ES: "Validador IBAN",
    IT: "Validatore IBAN",
    PL: "Walidator IBAN"
  },
  "iban.verify": { 
    EN: "Verify European IBAN structures and checksums instantly.", 
    DE: "Überprüfen Sie sofort europäische IBAN-Strukturen und Prüfsummen.", 
    FR: "Vérifiez instantanément les structures et les sommes de contrôle IBAN.",
    ES: "Verifique estructuralmente y los dígitos de control de IBAN europeos al instante.",
    IT: "Verifica istantaneamente strutture e checksum IBAN europei.",
    PL: "Błyskawicznie weryfikuj europejskie struktury IBAN i sumy kontrolne."
  },
  "iban.enter": { 
    EN: "Enter IBAN Number", 
    DE: "IBAN-Nummer eingeben", 
    FR: "Entrez le numéro IBAN",
    ES: "Introduzcan el número IBAN",
    IT: "Inserisci il numero IBAN",
    PL: "Wprowadź numer IBAN"
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("EN");

  const t = (key: string) => {
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
