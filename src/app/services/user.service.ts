import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://fakestoreapi.com/users';

  constructor(private readonly http: HttpClient) {}

  getUserById(id: number | string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
