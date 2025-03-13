import { inject, Injectable } from '@angular/core';
import { UserCreationDTO, UserDTO } from './users';
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

  public obtenerPorId(id:number):Observable<UserDTO>{
    return this.http.get<UserDTO>(`${this.urlBase}/${id}`);
  }

  public actualizar(id: number, user: UserCreationDTO ){
    return this.http.put(`${this.urlBase}/${id}`,user);
  }

  public crear(user:UserCreationDTO){
    return this.http.post(this.urlBase, user);
  }
}
