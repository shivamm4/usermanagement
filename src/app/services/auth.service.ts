import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupUrl = 'https://reqres.in/api/register';  
  private loginUrl = 'https://reqres.in/api/login';      

  constructor(private http: HttpClient) {}

  // Signup
  signup(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(this.signupUrl, userData);
  }

  // Login (no manual checking, directly call API)
  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, userData);
  }

  // Token handling
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
