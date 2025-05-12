import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, of, tap } from 'rxjs';

import { CountryMapper } from '../mapper/country.mapper';
import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import type { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>()
  private queryCacheCountry = new Map<string, Country[]>()
  private queryCacheRegion = new Map<string, Country[]>()

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase()

    if(this.queryCacheCapital.has(query)) return of(this.queryCacheCapital.get(query) ?? [])

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(() => {
        return throwError(() => new Error(`No country was found with that capital ${query}`))
      })
    )
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase()

    if(this.queryCacheCountry.has(query)) return of(this.queryCacheCountry.get(query) ?? [])

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      catchError(() => {
        return throwError(() => new Error(`No country was found with that country ${query}`))
      })
    )
  }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map(data => CountryMapper.mapRestCountryArrayToCountryArray(data)),
      map(countries => countries.at(0)),
      catchError(() => {
        return throwError(() => new Error(`No country was found with that country ${code}`))
      })
    )
  }

  searchByRegion(region: Region): Observable<Country[]> {
    if(this.queryCacheRegion.has(region)) return of(this.queryCacheRegion.get(region) ?? [])

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map(data => CountryMapper.mapRestCountryArrayToCountryArray(data)),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      catchError(() => {
        return throwError(() => new Error(`No country was found with that region ${region}`))
      })
    )
  }
}
