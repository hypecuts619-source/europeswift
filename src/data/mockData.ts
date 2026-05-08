import swiftDataJson from './swift.json';
import ibanFormatsJson from './iban-formats.json';

export const swiftData: Record<string, any> = swiftDataJson;
export const ibanFormats = ibanFormatsJson;

export const countriesData = Object.entries(swiftData).map(([slug, data]) => ({
  slug,
  name: data.name,
  code: data.iso2,
  flag: data.flag,
  ibanLength: data.ibanLength,
  topBanks: data.topBanks.map((b: any) => b.slug)
}));

export const mockBanksData: Record<string, any> = {};
Object.entries(swiftData).forEach(([countrySlug, country]) => {
  country.topBanks.forEach((bank: any) => {
    mockBanksData[bank.slug] = {
      slug: bank.slug,
      name: bank.name,
      country: country.name,
      countrySlug: countrySlug,
      sepa: country.sepa,
      bic: bank.bic,
      headquarters: bank.headquarters,
      branches: bank.branches
    };
  });
});

