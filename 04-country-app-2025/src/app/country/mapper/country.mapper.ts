import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No spanish name',
      capital: restCountry.capital?.join(',') ?? 'No capital',
      population: restCountry.population,
      currencies: Object.values(restCountry.currencies ?? {}).map(currency => Object.values(currency).join(',')),
      region: restCountry.region,
      subregion: restCountry.subregion,
      languages: Object.values(restCountry.languages ?? {}),
      area: restCountry.area,
      flags: [restCountry.flags.svg, restCountry.flags.alt ?? ''],
      continent: restCountry.continents[0],
      postalCode: restCountry.postalCode?.format,
    }
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry)
  }
}
