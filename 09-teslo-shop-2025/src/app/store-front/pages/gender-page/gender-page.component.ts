import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';

import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ProductsService } from '@/products/services/products.service';

@Component({
  selector: 'app-gender-page',
  imports: [
    ProductCardComponent,
    TitleCasePipe
  ],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  private productService = inject(ProductsService)
  route = inject(ActivatedRoute)

  gender = toSignal(this.route.params.pipe(map(params => params['gender'])))

  genderResource = rxResource({
    request: () => ({ gender: this.gender() }),
    loader: ({ request }) => {
      return this.productService.getProductsByGender(request.gender)
    }
  })
}
