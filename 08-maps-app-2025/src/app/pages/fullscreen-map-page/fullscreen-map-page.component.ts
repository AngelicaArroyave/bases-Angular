import 'maplibre-gl/dist/maplibre-gl.css';
import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { DecimalPipe, JsonPipe } from '@angular/common';
import maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [
    DecimalPipe,
    JsonPipe
  ],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 40px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px
    }
  `
})
export class FullscreenMapPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map')

  zoom = signal(8)
  map = signal<maplibregl.Map | null>(null)
  coordinates = signal({
    lng: -122.65,
    lat:  45.52
  })

  zoomEffect = effect(() => {
    if(!this.map()) return

    this.map()?.setZoom(this.zoom())
  })

  async ngAfterViewInit() {
    if(!this.divElement()) return

    await new Promise(resolve => setTimeout(resolve, 100))

    const element = this.divElement()?.nativeElement
    const { lng, lat } = this.coordinates()
    const map = new maplibregl.Map({
      container: element, // container id
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom() // starting zoom
    })

    this.mapListeners(map)
  }

  mapListeners(map: maplibregl.Map) {
    map.on('zoomend', event => {
      const newZoom = event.target.getZoom()
      this.zoom.set(newZoom)
    })

    map.on('moveend', () => {
      const center = map.getCenter()
      this.coordinates.set(center)
    })

    map.addControl(new maplibregl.FullscreenControl(), 'top-left')
    map.addControl(new maplibregl.NavigationControl(), 'top-right')
    map.addControl(new maplibregl.ScaleControl())

    this.map.set(map)
  }
}
