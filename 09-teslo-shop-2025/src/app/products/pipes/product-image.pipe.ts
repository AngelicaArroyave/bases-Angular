import { Pipe, PipeTransform } from '@angular/core';

import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl

@Pipe({
  name: 'productImage'
})
export class productImagePipe implements PipeTransform {
  transform(value: null | string | string[]): string {
    if(value === null) return './public/assets/images/no-image.png'

    if(typeof value === 'string' && value.startsWith('blob:')) return value

    if(typeof value === 'string') return `${baseUrl}/files/product/${value}`

    const image = value.at(0)

    if(!image) return './public/assets/images/no-image.png'

    return `${baseUrl}/files/product/${image}`
  }
}
