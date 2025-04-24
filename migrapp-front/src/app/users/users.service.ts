import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDto } from './create-user.dto'; // importa tu nuevo modelo

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'https://localhost:7045/api';

  constructor(private http: HttpClient) { }

  createUser(user: CreateUserDto, token: string): Observable<any> {
    const url = `${this.baseUrl}/admin/users`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, user, { headers });
  }

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');  // Obtener el token desde localStorage
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = `${this.baseUrl}/admin/users/full-info`;
    return this.http.get<any[]>(url, { headers });
  }

  getUsersWithFilters(userType: string, accountStatus: string, country: string, isActiveNow: boolean): Observable<any[]> {
    const token = localStorage.getItem('token');  // Obtener el token desde localStorage
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/admin/users/full-info`;

    // Puedes construir los filtros aquí como parámetros de consulta
    const params = {
      userType,
      accountStatus,
      country,
      isActiveNow
    };

    return this.http.get<any[]>(url, { params, headers });
  }

  exportUsers(filters: any): Observable<Blob> {

    const token = localStorage.getItem('token');  // Obtener el token desde localStorage
  
    const url = `${this.baseUrl}/admin/users/export-users`;

    // Si necesitas enviar filtros en la solicitud, puedes usar params o el body
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(url, { 
      headers: headers, 
      params: filters, 
      responseType: 'blob'// Para manejar el archivo CSV como un blob
    });
  }
}