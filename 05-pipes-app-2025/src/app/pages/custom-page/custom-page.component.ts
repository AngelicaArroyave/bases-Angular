import { Component, signal } from '@angular/core';

import { CanFlyPipe } from '../../pipes/can-fly.pipe';
import { Hero } from '../../interfaces/hero.interface';
import { HeroColorPipe } from '../../pipes/hero-color.pipe';
import { HeroCreatorPipe } from '../../pipes/hero-creator.pipe';
import { heroes } from '../../data/heroes.data';
import { HeroFilterPipe } from '../../pipes/hero-filter.pipe';
import { HeroSortByPipe } from '../../pipes/hero-sort-by.pipe';
import { HeroTextColorPipe } from '../../pipes/hero-text-color.pipe';
import { TitleCasePipe } from '@angular/common';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [
    CanFlyPipe,
    HeroColorPipe,
    HeroCreatorPipe,
    HeroFilterPipe,
    HeroSortByPipe,
    HeroTextColorPipe,
    TitleCasePipe,
    ToggleCasePipe
  ],
  templateUrl: './custom-page.component.html'
})
export default class CustomPageComponent {
  name = signal('Angie Arias')
  upperCase = signal(true)
  heroes = signal(heroes)
  sortBy = signal<keyof Hero | null>(null)
  searchQuery = signal('')
}
