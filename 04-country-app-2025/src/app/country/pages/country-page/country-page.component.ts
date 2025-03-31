import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html'
})
export class CountryPageComponent {
  code = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['code'])
    )
  )
}
