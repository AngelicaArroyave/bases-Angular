import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { AfterViewInit, Component, ElementRef, input, OnChanges, SimpleChanges, viewChild } from '@angular/core';
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
export class ProductCarouselComponent implements AfterViewInit, OnChanges {
  images = input.required<string[]>()

  swiperDiv = viewChild.required<ElementRef>('swiperDiv')

  swiper: Swiper | undefined = undefined

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['images'].firstChange) return

    if(!this.swiper) return

    this.swiper.destroy(true, true)

    const pagElement: HTMLDivElement = this.swiperDiv().nativeElement?.querySelector('.swiper-pagination')

    pagElement.innerHTML = ''

    setTimeout(() => {
      this.swiperInit()
    }, 100);
  }

  ngAfterViewInit(): void {
    this.swiperInit()
  }

  swiperInit() {
    const element = this.swiperDiv().nativeElement

    if(!element) return

    this.swiper = new Swiper(element, {
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
