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
}