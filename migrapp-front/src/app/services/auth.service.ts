import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7045/api'; // Asegúrate que apunta bien

  constructor(private http: HttpClient) {}

  login(email: string, password: string, preferredMfaMethod: 'email' | 'sms'): Observable<any> {
    const url = `${this.baseUrl}/admin/auth/login`;

    const body = {
      email,
      password,
      preferredMfaMethod
    };

    return this.http.post(url, body);
  }

  verifyMfaCode(email: string, code: string): Observable<any> {
    const url = `${this.baseUrl}/admin/auth/verify-mfa`;
    const body = { email, code };
    return this.http.post(url, body);
  }
}