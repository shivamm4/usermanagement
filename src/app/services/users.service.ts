import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../users/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private api = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  list(page = 1, perPage = 3): Observable<any> {
    return this.http.get(`${this.api}/users?page=${page}&per_page=${perPage}`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.api}/users/${id}`);
  }

  createUser(payload: Partial<User>): Observable<any> {
    return this.http.post(`${this.api}/users`, payload);
  }

  updateUser(id: number, payload: Partial<User>): Observable<any> {
    return this.http.put(`${this.api}/users/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/users/${id}`);
  }
}
