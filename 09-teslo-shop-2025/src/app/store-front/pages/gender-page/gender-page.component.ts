import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';

import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ProductsService } from '@/products/services/products.service';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PaginationService } from '@/shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [
    ProductCardComponent,
    TitleCasePipe,
    PaginationComponent
],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  private productsService = inject(ProductsService)
  route = inject(ActivatedRoute)
  paginationService = inject(PaginationService)

  gender = toSignal(this.route.params.pipe(map(params => params['gender'])))

  genderResource = rxResource({
    request: () => ({ gender: this.gender(), page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        gender: request.gender,
        offset: request.page * 9
      })
    }
  })
}
