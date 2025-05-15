import { Component } from '@angular/core';
import { TableLayoutComponent } from "../genericos/table-layout/table-layout.component";
import { RouterLink } from '@angular/router';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router'; 
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-roles',
  imports: [TableLayoutComponent,NgFor],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  users: any[] = []; // La lista de usuarios
  filters: any;

  constructor(private usersService: UsersService, private router: Router) { }

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
