import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'shared-sidemenu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  public menuItems = routes.map(route => route.children ?? [])
                            .flat()
                            .filter(route => route.path !== '**')
                            .filter(route => !route.path?.includes(':'))
}
