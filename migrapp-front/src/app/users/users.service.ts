import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDto } from './create-user.dto'; // importa tu nuevo modelo

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  createUser(user: CreateUserDto, token: string): Observable<any> {
    const url = `${this.baseUrl}/admin/users`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, user, { headers });
  }

  getUserInfo(userId: number): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token desde localStorage
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/admin/users/${userId}/info`;
    return this.http.get<any>(url, { headers });
  }

    // Método para actualizar la información de un usuario
  updateUserInfo(userId: number, updatedUserData: any): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token desde localStorage
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Asegúrate de que el contenido sea JSON
    });

    const url = `${this.baseUrl}/admin/users/${userId}/info/edit`;

    return this.http.patch<any>(url, updatedUserData, { headers });
  }

  getUsers(
    page: number = 1,
    pageSize: number = 10,
    filters: {
      name?: string;
      email?: string;
      userType?: string;
      accountStatus?: string;
      country?: string;
      sortBy?: string;
      sortDirection?: 'asc' | 'desc';
    } = {}
  ): Observable<CreateUserDto[]> { // 👈 cambia aquí
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params = params.set(key, value);
      }
    });

    const url = `${this.baseUrl}/admin/users/full-info`;
    return this.http.get<CreateUserDto[]>(url, { headers, params });
  }

  // Método para obtener los usuarios disponibles
  getAvailableUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = `${this.baseUrl}/admin/users/available-users`;
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

  // Método para obtener las columnas disponibles para la tabla
  getAvailableColumns(): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token desde localStorage
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/admin/users/columns/available`;

    return this.http.get<any>(url, { headers });
  }

    // Método para guardar la configuración de las columnas visibles
  saveVisibleColumns(visibleColumns: string[]): Observable<any> {
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.baseUrl}/admin/users/columns`;
    
    const body = {
      visibleColumns: visibleColumns
    };

    return this.http.post<any>(url, body, { headers });
  }
}