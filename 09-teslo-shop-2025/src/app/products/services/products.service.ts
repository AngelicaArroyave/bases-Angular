import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { Product, ProductResponse } from '../interfaces/product.interface';

const baseUrl = environment.baseUrl

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({providedIn: 'root'})
export class ProductsService {
  private http = inject(HttpClient)
  private productsCache = new Map<string, ProductResponse>()
  private productCache = new Map<string, Product>()

  getProducts(options: Options): Observable<ProductResponse> {
    const { limit = 9, offset = 0, gender = '' } = options
    const key = `${limit}-${offset}-${gender}`

    if(this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!)
    }

    return this.http.get<ProductResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    }).pipe(
      tap(response => this.productsCache.set(key, response))
    )
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if(this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!)
    }

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
      tap(response => this.productCache.set(idSlug, response))
    )
  }
}
