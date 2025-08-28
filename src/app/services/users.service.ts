import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../users/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private api = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  /** List users with pagination */
  list(page = 1, perPage = 3): Observable<{ data: User[]; total: number }> {
    return this.http.get<{ data: User[]; total: number }>(
      `${this.api}/users?page=${page}&per_page=${perPage}`
    );
  }

  /** Get single user by ID */
  get(id: number): Observable<{ data: User }> {
    return this.http.get<{ data: User }>(`${this.api}/users/${id}`);
  }

  /** Create new user */
  createUser(payload: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.api}/users`, payload);
  }

  /** Update existing user */
  updateUser(id: number, payload: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.api}/users/${id}`, payload);
  }

  /** Delete user */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/users/${id}`);
  }
}
