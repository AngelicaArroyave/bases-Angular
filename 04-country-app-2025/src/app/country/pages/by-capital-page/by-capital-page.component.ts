import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, linkedSignal } from '@angular/core';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { SearchInputComponent } from '../../components/search-input/search-input.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [
    CountryListComponent,
    SearchInputComponent
  ],
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService)

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  query = linkedSignal(() => this.queryParam)

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if(!request.query) return of([])

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      })

      return this.countryService.searchByCapital(request.query)
    }
  })
}
