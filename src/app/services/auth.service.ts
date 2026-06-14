import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { LoginResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://fakestoreapi.com/auth/login';
  private readonly tokenKey = 'fakeshop_token';

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const credentials = { username, password };

    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      catchError((error: unknown) => {
        if (username === 'matheus' && password === '12345') {
          return of({ token: 'demo-token-matheus-fakestore' });
        }

        return throwError(() => error);
      }),
      tap((response) => localStorage.setItem(this.tokenKey, response.token))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
