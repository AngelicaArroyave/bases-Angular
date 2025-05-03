import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { AuthResponse } from '../interfaces/auth-response.interface';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

type AuthStatus = 'checking' | 'authenticated' | 'non-authenticated'
const baseUrl = environment.baseUrl

@Injectable({providedIn: 'root'})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking')
  private _user = signal<User | null>(null)
  private _token = signal<string | null>(localStorage.getItem('token'))

  private http = inject(HttpClient)

  checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  })

  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() === 'checking') return 'checking'

    if(this._user()) return 'authenticated'

    return 'non-authenticated'
  })
  user = computed<User | null>(() => this._user())
  token = computed<string | null>(() => this._token())

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {email, password}).pipe(
      map(response => this.handleAuthSuccess(response)),
      catchError((error: any) => this.handleAuthFailure(error))
    )
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token')

    if(!token) {
      this.logout()

      return of(false)
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`).pipe(
      map(response => this.handleAuthSuccess(response)),
      catchError((error: any) => this.handleAuthFailure(error))
    )
  }

  logout() {
    this._user.set(null)
    this._token.set(null)
    this._authStatus.set('non-authenticated')

    localStorage.removeItem('token')
  }

  register(fullName: string, email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, {fullName, email, password}).pipe(
      map(response => this.handleAuthSuccess(response)),
      catchError((error: any) => this.handleAuthFailure(error))
    )
  }

  private handleAuthSuccess({ user, token }: AuthResponse) {
    this._user.set(user)
    this._authStatus.set('authenticated')
    this._token.set(token)

    localStorage.setItem('token', token)

    return true
  }

  private handleAuthFailure(error: any) {
    this.logout()

    return of(false)
  }
}
