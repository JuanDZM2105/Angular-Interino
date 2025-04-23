import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from './users.service';
import { environment } from '../../environments/environment.development';
import { TableLayoutComponent } from "../genericos/table-layout/table-layout.component";
import { CreateUserDto } from './create-user.dto';

@Component({
  selector: 'app-users',
  imports: [RouterLink, MatButtonModule, MatIconModule, TableLayoutComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = []; // La lista de usuarios que se mostrará

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadUsers(); // Cargar los usuarios cuando el componente se inicialice
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data; // Almacena los datos de los usuarios
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
      }
    });
  }
}
