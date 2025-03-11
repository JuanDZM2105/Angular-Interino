import { inject, Injectable } from '@angular/core';
import { UserDTO } from './users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Users';

  constructor() { }

  public obtenertodo():Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.urlBase);
  }
}
