import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay } from 'rxjs';

import { CountryMapper } from '../mapper/country.mapper';
import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient)

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase()

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
      catchError(() => {
        return throwError(() => new Error(`No country was found with that capital ${query}`))
      })
    )
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase()

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
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
}
