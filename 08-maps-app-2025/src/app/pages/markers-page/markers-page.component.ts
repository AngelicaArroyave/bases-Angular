import 'maplibre-gl/dist/maplibre-gl.css';
import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { v4 as uuid } from 'uuid';
import maplibregl, { LngLatLike } from 'maplibre-gl';

interface Marker {
  id: string
  mapboxMarker: maplibregl.Marker
}

@Component({
  selector: 'app-markers-page',
  imports: [DecimalPipe],
  templateUrl: './markers-page.component.html'
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map')

  map = signal<maplibregl.Map | null>(null)
  markers = signal<Marker[]>([])

  async ngAfterViewInit() {
    if (!this.divElement()) return

    await new Promise(resolve => setTimeout(resolve, 100))

    const element = this.divElement()?.nativeElement
    const map = new maplibregl.Map({
      container: element, // container id
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // style URL
      center: [-93.30643604504708, 37.254325905708846], // starting position [lng, lat]
      zoom: 12 // starting zoom
    })

    this.mapListeners(map)
  }

  mapListeners(map: maplibregl.Map) {
    map.on('click', event => this.mapClick(event))

    this.map.set(map)
  }

  mapClick(event: maplibregl.MapMouseEvent) {
    if (!this.map()) return

    const color = '#xxxxxx'.replace(/x/g, y => ((Math.random() * 16) | 0).toString(16))
    const coordinates = event.lngLat
    const marker = new maplibregl.Marker({ color })
      .setLngLat(coordinates)
      .addTo(this.map()!)

    const newMarker: Marker = {
      id: uuid(),
      mapboxMarker: marker
    }

    this.markers.set([newMarker, ...this.markers()])
  }

  flyToMarker(lngLat: LngLatLike) {
    if(!this.map) return

    this.map()?.flyTo({ center: lngLat })
  }

  deleteMarker(marker: Marker) {
    if(!this.map) return

    marker.mapboxMarker.remove()
    this.markers.set(this.markers().filter(mk => mk.id !== marker.id))
  }
}
