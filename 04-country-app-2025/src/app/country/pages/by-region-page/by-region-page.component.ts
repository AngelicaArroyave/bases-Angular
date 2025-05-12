import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { Country } from '../../interfaces/country.interface';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import type { Region } from '../../interfaces/region.type';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase()

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'antarctic': 'Antarctic',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania'
  }

  return validRegions[queryParam] ?? 'Antarctic'
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent {
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Antarctic',
    'Asia',
    'Europe',
    'Oceania'
  ]

  countries = signal<Country[]>([])
  countryService = inject(CountryService)

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? ''
  regionSignal = linkedSignal<Region>(() => validateQueryParam(this.queryParam))

  regionResource = rxResource({
    request: () => ({ region: this.regionSignal() }),
    loader: ({ request }) => {
      if(!request.region) return of([])

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region
        }
      })

      return this.countryService.searchByRegion(request.region)
    }
  })
}
