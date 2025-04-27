import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';

import { Product } from '@/products/interfaces/product.interface';
import { productImagePipe } from '../../pipes/product-image.pipe';

@Component({
  selector: 'product-card',
  imports: [
    productImagePipe,
    RouterLink,
    SlicePipe
  ],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input.required<Product>()
}
