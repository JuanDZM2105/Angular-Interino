import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = '/api'; // Asegúrate que apunta bien

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

  getProfile(): Observable<any> {
    const url = `${this.baseUrl}/admin/users/profile`;
  
    // Se incluye el token JWT en los headers de la solicitud
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
  
    return this.http.get(url, { headers });
  }

  updateProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.baseUrl}/admin/users/profile`, profileData, { headers });
  }

}