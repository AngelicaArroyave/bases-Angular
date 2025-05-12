import { CounterPageComponent } from './pages/counter/counter-page.component';
import { DragonballSuperPageComponent } from './pages/dragonball-super/dragonball-super-page.component';
import { DragonballPageComponent } from './pages/dragonball/dragonball-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: CounterPageComponent
  },
  {
    path: 'hero',
    component: HeroPageComponent
  },
  {
    path: 'dragonball',
    component: DragonballPageComponent
  },
  {
    path: 'dragonball-super',
    component: DragonballSuperPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
