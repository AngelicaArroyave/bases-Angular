import { ActivatedRoute } from '@angular/router';
import { Component, computed, inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { TitleComponent } from '@shared/title/title.component';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'pages-user',
  imports: [TitleComponent],
  template: `
    <shared-title [title]="titleLabel()" />

    @if (user()) {
      <section>
        <img [srcset]="user()!.avatar" [alt]="user()!.first_name">

        <div>
          <h3>{{ user()!.first_name }} {{ user()!.last_name }}</h3>
          <p>{{ user()!.email }}</p>
        </div>
      </section>
    }

    @else {
      <p>Loading information...</p>
    }
  `
})
export default class UserComponent {
  private route = inject(ActivatedRoute)
  public usersService = inject(UsersService)

  // public user = signal<User | undefined>(undefined)
  public user = toSignal(this.route.params.pipe(
    switchMap(({ id }) => this.usersService.getUserById(id))
  ))

  public titleLabel = computed(() => {
    if(this.user()) return `User information - ${this.user()!.first_name} ${this.user()!.last_name}`

    return 'User information'
  })
}
