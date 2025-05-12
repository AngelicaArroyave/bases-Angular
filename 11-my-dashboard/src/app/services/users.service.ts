import { computed, inject, Injectable, signal } from '@angular/core';
import { delay, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User, UserResponse, UsersResponse } from '@interfaces/req-res';

interface State {
  users: User[]
  loading: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient)

  #state = signal<State>({
    users: [],
    loading: true
  })

  public users = computed(() => this.#state().users)
  public loading = computed(() => this.#state().loading)

  constructor() {
    this.getUsers()
  }

  getUsers() {
    this.http.get<UsersResponse>('https://reqres.in/api/users').pipe(
      delay(1000),
      map(response => {
        this.#state.set({
          users: response.data,
          loading: false
        })
      })
    )
  }

  getUserById(id: string) {
    return this.http.get<UserResponse>(`https://reqres.in/api/users/${id}`).pipe(
      delay(1000),
      map(response => response.data)
    )
  }
}
