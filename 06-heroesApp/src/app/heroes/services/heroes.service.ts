import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';

import { environments } from 'src/environments/environments';

const BASE_URL: string = environments.baseUrl

@Injectable({providedIn: 'root'})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${BASE_URL}/heroes`)
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${BASE_URL}/heroes/${id}`)
            .pipe(catchError(error => of(undefined)))
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${BASE_URL}/heroes?q=${query}&_limit=6`)
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${BASE_URL}/heroes`, hero)
  }

  // PATCH: Actualiza parcialmente la información de un héroe
  updateHero(hero: Hero): Observable<Hero> {
    if(!hero.id) throw Error('Hero id is required')
    return this.http.patch<Hero>(`${BASE_URL}/heroes/${hero.id}`, hero)
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete(`${BASE_URL}/heroes/${id}`)
            .pipe(
              map(response => true), // Si no hay un error devuelve true
              catchError(error => of(false)) // Si hay un error devuelve false
            )
  }
}
