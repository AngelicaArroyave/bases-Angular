import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import { Country } from '../interfaces/country';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${API_URL}/capital/${term}`

    return this.http.get<Country[]>(url)
              .pipe(
                catchError(() => of([]))
              )
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${API_URL}/name/${term}`

    return this.http.get<Country[]>(url)
              .pipe(
                catchError(() => of([]))
              )
  }

  searchRegion(term: string): Observable<Country[]> {
    const url = `${API_URL}/region/${term}`

    return this.http.get<Country[]>(url)
              .pipe(
                catchError(() => of([]))
              )
  }
}
