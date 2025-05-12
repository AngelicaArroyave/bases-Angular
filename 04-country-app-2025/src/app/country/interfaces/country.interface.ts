export interface Country {
  cca2: string
  flagSvg: string
  name: string
  capital?: string
  population: number
  currencies: string[]
  region: string
  subregion?: string
  languages?: string[]
  area: number
  flags: string[]
  continent: string
  postalCode?: string
}
