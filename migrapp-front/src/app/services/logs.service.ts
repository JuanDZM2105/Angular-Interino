import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private baseUrl = 'https://localhost:7045/api';

  constructor(private http: HttpClient) {}

  getAllUserLogs(page: number = 1, pageSize: number = 10): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = `${this.baseUrl}/admin/users/logs?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url, { headers });
  }

  getLogsByUserId(userId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = `${this.baseUrl}/admin/users/${userId}/logs`;
    return this.http.get<any[]>(url, { headers });
  }
}

