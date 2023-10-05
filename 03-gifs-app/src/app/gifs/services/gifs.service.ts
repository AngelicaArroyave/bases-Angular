import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY: string = 'oruZWtR05sAGeWlnzX82vnMpreaI2Wu6'
const SERVICE_URL: string = 'http://api.giphy.com/v1/gifs'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = []
  private _tagsHistory: string[] = []

  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory]
  }

  searchTag(tag: string): void {
    if(tag.length === 0) return
    this.organizeHistory(tag)

    // Crear la conexión y búsqueda de gifs con fetch
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=oruZWtR05sAGeWlnzX82vnMpreaI2Wu6&q=valorant&limit=10')
    //   .then(response => response.json())
    //   .then(data => console.log(data))

    // Crear la conexión y búsqueda de gifs con http
    const params = new HttpParams()
                        .set('api_key', GIPHY_API_KEY)
                        .set('limit', '10')
                        .set('q', tag)

    this.http.get<SearchResponse>(`${SERVICE_URL}/search`, { params })
      .subscribe(response => this.gifList = response.data)
  }

  private organizeHistory(tag: string) {
    tag = tag.toLocaleLowerCase()

    if(this._tagsHistory.includes(tag)) this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag)

    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0, 10)
    this.saveLocalStorage()
  }

  // Guardar la lista o el historial de gifs en el localstorage
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  // Leer la información almacenada en el localstorage
  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)

    if(this._tagsHistory.length === 0) return
    this.searchTag(this._tagsHistory[0])
  }
}
