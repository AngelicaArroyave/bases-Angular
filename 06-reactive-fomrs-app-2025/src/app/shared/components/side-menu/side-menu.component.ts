import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { reactiveRoutes } from '../../../reactive/reactive.routes';

interface MenuItem {
  title: string,
  route: string
}

const reactiveItems = reactiveRoutes[0].children ?? []

@Component({
  selector: 'side-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu.component.html'
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveItems.filter(item => item.path !== '**')
                              .map(item => ({
                                title: `${item.title}`,
                                route: `reactive/${item.path}`
                              }))

  authMenu: MenuItem[] = [{
    title: 'Registro',
    route: './auth'
  }]

  countryMenu: MenuItem[] = [{
    title: 'Países',
    route: './country'
  }]
}
