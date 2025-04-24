import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';  // Asegúrate de que esta importación esté bien
import { FiltroService } from '../services/filtros.service'; // Importar FiltroService
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableLayoutComponent } from '../genericos/table-layout/table-layout.component';
import { NgFor } from '@angular/common';
import { NewUserComponent } from './new-user/new-user.component';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-users',
  imports: [MatButtonModule, MatIconModule, TableLayoutComponent, NgFor, NewUserComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = []; // La lista de usuarios
  filters: any; // Los filtros que se aplican

  constructor(private usersService: UsersService, private filtroService: FiltroService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();  // Cargar los usuarios cuando el componente se inicialice
  }

  loadUsers(): void {
    // Aquí se hace la consulta sin filtros al principio
    this.usersService.getUsers().subscribe({
      next: (data) => { 
        this.users = data;
        console.log(this.users); // Almacena los datos de los usuarios
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
      }
    });
  }

  applyFilters(filters: any): void {
    console.log('Filtros aplicados:', filters);
    // Llamada al servicio para obtener los usuarios filtrados
    this.usersService.getUsersWithFilters(
      filters.userType,
      filters.accountStatus,
      filters.country,
      filters.isActiveNow
    ).subscribe({
      next: (data) => {
        this.users = data; // Almacena los usuarios filtrados
      },
      error: (err) => {
        console.error('Error al obtener los usuarios filtrados:', err);
      }
    });
  }

  goToNewUser() {
    this.router.navigate(['/users/new-user']);  // Este es el método que navegará a la vista
  }
}
