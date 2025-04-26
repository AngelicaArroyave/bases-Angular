import 'maplibre-gl/dist/maplibre-gl.css';
import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html'
})
export class MiniMapComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map')

  lngLat = input.required<{ lng: number, lat: number }>()
  zoom = input<number>(14)

  map = signal<maplibregl.Map | null>(null)

  async ngAfterViewInit() {
    if (!this.divElement()) return

    await new Promise(resolve => setTimeout(resolve, 100))

    const element = this.divElement()?.nativeElement
    const map = new maplibregl.Map({
      container: element,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false,
      pitch: 30
    })

    new maplibregl.Marker({ color: 'purple' })
          .setLngLat(this.lngLat())
          .addTo(map)
  }
}
