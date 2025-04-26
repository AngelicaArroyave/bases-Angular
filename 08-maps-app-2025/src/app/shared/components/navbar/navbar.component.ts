import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { filter, map } from 'rxjs';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { routes } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  router = inject(Router)

  routes = routes.map(route => ({
    path: route.path,
    title: `${route.title ?? 'Maps in Angular'}`
  })).filter(route => route.path !== '**')

  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => event.url),
    map(url => routes.find(route => `/${route.path}` === url)?.title ?? 'Maps')
  )

  pageTitle = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => event.url),
    map(url => routes.find(route => `/${route.path}` === url)?.title ?? 'Maps')
  ))
}
