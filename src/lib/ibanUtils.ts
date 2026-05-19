
import IBAN from 'iban';

/**
 * IBAN Utility functions for validation and calculation
 * Based on ISO 7064 MOD 97-10 algorithm
 */

/**
 * Validates the checksum and format of an IBAN using the 'iban' library
 */
export function validateIbanChecksum(iban: string): boolean {
  return IBAN.isValid(iban);
}

/**
 * Calculates the checksum digits for a given country and BBAN
 */
export function calculateIbanChecksum(countryCode: string, bban: string): string {
  const cleanCountry = countryCode.toUpperCase();
  const cleanBban = bban.toUpperCase().replace(/\s+/g, '');
  
  // The 'iban' library can calculate the full IBAN
  const fullIban = IBAN.fromBBAN(cleanCountry, cleanBban);
  // Return just the checksum (chars 2 and 3)
  return fullIban.substring(2, 4);
}

/**
 * Formats an IBAN with spaces every 4 characters
 */
export function formatIban(iban: string): string {
  return IBAN.printFormat(iban, ' ');
}

/**
 * Gets info about the IBAN format for a country
 */
export function getCountryIbanInfo(countryCode: string) {
  // Use IBAN.countries if available, or fallback to custom logic if needed
  // arhs/iban.js has a countries object
  return (IBAN as any).countries?.[countryCode.toUpperCase()];
}
