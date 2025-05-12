import { Component } from '@angular/core';

import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'pages-view-transition',
  imports: [TitleComponent],
  template: `
    <shared-title [title]="'View transition 2'" />

    <section class="flex justify-end">
      <img srcset="https://picsum.photos/id/237/200/300" alt="Dog image" width="200" height="300" style="view-transition-name: hero1;">

      <div class="fixed bottom-16 right-10 bg-blue-800 w-32 h-32 rounded" style="view-transition-name: hero2;"></div>
    </section>
  `
})
export default class ViewTransitionComponent { }
