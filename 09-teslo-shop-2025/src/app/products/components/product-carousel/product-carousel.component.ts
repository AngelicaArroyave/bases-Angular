import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { Navigation, Pagination } from 'swiper/modules'
import Swiper from 'swiper';

import { productImagePipe } from '@/products/pipes/product-image.pipe';

@Component({
  selector: 'product-carousel',
  imports: [productImagePipe],
  templateUrl: './product-carousel.component.html',
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  `
})
export class ProductCarouselComponent implements AfterViewInit {
  images = input.required<string[]>()

  swiperDiv = viewChild.required<ElementRef>('swiperDiv')

  ngAfterViewInit(): void {
    const element = this.swiperDiv().nativeElement

    if(!element) return

    const swiper = new Swiper(element, {
      direction: 'horizontal',
      loop: true,
      modules: [
        Navigation,
        Pagination
      ],
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
