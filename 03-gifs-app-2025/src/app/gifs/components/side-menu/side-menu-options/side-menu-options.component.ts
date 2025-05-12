import { Component, inject } from '@angular/core';
import { GifService } from 'src/app/gifs/services/gifs.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  icon: string,
  label: string,
  route: string,
  subLabel: string
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu-options.component.html'
})
export class SideMenuOptionsComponent {
  gifsService = inject(GifService)

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Popular Gifs',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      subLabel: 'Search Gifs',
      route: '/dashboard/search'
    }
  ]
}
