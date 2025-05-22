import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  getDashboardMetrics(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/admin/metrics/dashboard`;
    return this.http.get<any>(url, { headers });
  }
}
