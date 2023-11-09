import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';

import { environments } from 'src/environments/environments';

const BASE_URL: string = environments.baseUrl

@Injectable({providedIn: 'root'})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${BASE_URL}/heroes`)
  }
}
