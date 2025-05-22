import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LegalProcessService {

  private baseUrl = 'https://localhost:7045/api';

  constructor(private http: HttpClient) { }

  getLegalProcessesByUserId(userId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = `${this.baseUrl}/legalProcess/user/${userId}`;
    return this.http.get<any[]>(url, { headers });
  }

  getProcessWithProcedures(processId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = `${this.baseUrl}/legalProcess/${processId}`;
    return this.http.get<any>(url, { headers });
  }

  createLegalProcess(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/legalProcess`, data, { headers });
  }

  createProcedure(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/procedure`, data, { headers });
  }
}
