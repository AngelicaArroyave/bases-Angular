import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import type { Giphy } from '../interfaces/giphy.interfaces';

const GIF_KEY = 'historyGifs'

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'

  return JSON.parse(gifsFromLocalStorage)
}

@Injectable({providedIn: 'root'})
export class GifService {
  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(true)

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage())
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  saveHistoryToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()))
  })

  constructor() {
    this.loadTrendingGifs()
  }

  loadTrendingGifs(): void {
    this.http.get<Giphy>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.api_key,
        limit: 20
      }
    }).subscribe(response => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data)

      this.trendingGifs.set(gifs)
      this.trendingGifsLoading.set(false)
    })
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<Giphy>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.api_key,
        q: query,
        limit: 20
      }
    }).pipe(
      map(({ data }) => data),
      map(items => GifMapper.mapGiphyItemsToGifArray(items)),
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]: items
        }))
      })
    )
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? []
  }
}
