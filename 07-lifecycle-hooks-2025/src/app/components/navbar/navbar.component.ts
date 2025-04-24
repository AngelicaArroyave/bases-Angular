import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styles: `
    nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }

    .active {
      font-weight: bold;
      color: #341162;
    }
  `
})
export class NavbarComponent { }
