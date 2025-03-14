import { Component, inject, Input } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from './users.service';
import { environment } from '../../environments/environment.development';
import { TableLayoutComponent } from "../genericos/table-layout/table-layout.component";
import { UserDTO } from './users';

@Component({
  selector: 'app-users',
  imports: [RouterLink, MatButtonModule, MatIconModule, TableLayoutComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent{

 
  usersService = inject(UsersService);
  users!: UserDTO[];
  columnsToShow = ['id','name','email','phone'];

  constructor() {
    this.usersService.obtenertodo().subscribe(users =>
      { this.users = users; });
  }

  title = "Users"

}
