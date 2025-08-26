import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupUrl = 'https://reqres.in/api/register';
  private loginUrl = 'https://reqres.in/api/login';

  constructor(private http: HttpClient) {}

  signup(userData: { email: string; password: string }) {
    if (userData.email !== 'eve.holt@reqres.in' || userData.password !== 'pistol') {
      return throwError(() => ({ error: { error: ' invalid login and password ' } }));
    }

    const headers = new HttpHeaders({ 'x-api-key': 'reqres-free-v1' });
    return this.http.post(this.signupUrl, userData, { headers });
  }

  login(userData: { email: string; password: string }) {
    if (userData.email !== 'eve.holt@reqres.in' || userData.password !== 'cityslicka') {
      return throwError(() => ({ error: { error: ' Invalid login and Password' } }));
    }

    const headers = new HttpHeaders({ 'x-api-key': 'reqres-free-v1' });
    return this.http.post(this.loginUrl, userData, { headers });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
