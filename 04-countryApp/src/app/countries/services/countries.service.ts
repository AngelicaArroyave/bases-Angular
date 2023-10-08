import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { CacheStore } from '../interfaces/cache-store.interface';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
  }

  // Guardar información en el LocalStorage
  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  // Leer la información almacenada en el LocalStorage
  private loadFromLocalStorage() {
    if(!localStorage.getItem('cacheStore')) return

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
            .pipe(
              catchError(() => of([]))
            )
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${API_URL}/capital/${term}`

    return this.getCountriesRequest(url)
            .pipe(
              tap(countries => this.cacheStore.byCapital = { term, countries }),
              tap(() => this.saveToLocalStorage())
            )
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${API_URL}/name/${term}`

    return this.getCountriesRequest(url)
            .pipe(
              tap(countries => this.cacheStore.byCountries = { term, countries }),
              tap(() => this.saveToLocalStorage())
            )
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`

    return this.getCountriesRequest(url)
            .pipe(
              tap(countries => this.cacheStore.byRegion = { region, countries }),
              tap(() => this.saveToLocalStorage())
            )
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${API_URL}/alpha/${code}`

    return this.http.get<Country[]>(url)
              .pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(() => of(null))
              )
  }
}
