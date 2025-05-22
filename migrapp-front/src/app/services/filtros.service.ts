import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  getFilters(): Observable<any> {
    const url = `${this.baseUrl}/admin/users/filters`; // La URL del endpoint
    return this.http.get<any>(url);
  }
}
