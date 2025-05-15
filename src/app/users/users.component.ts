import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './users.service';  // Asegúrate de que esta importación esté bien
import { FiltroService } from '../services/filtros.service'; // Importar FiltroService
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableLayoutComponent } from '../genericos/table-layout/table-layout.component';
import { NgFor, NgIf } from '@angular/common';
import { NewUserComponent } from './new-user/new-user.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { TableColumn } from './create-user.dto';
@Component({
  selector: 'app-users',
  imports: [MatButtonModule, MatIconModule, TableLayoutComponent, NgFor, RouterLink,NgIf, MatIconModule, FormsModule, MatMenuModule, MatCheckboxModule,MatMenuTrigger, MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  users: any[] = []; // La lista de usuarios
  filters: any; // Los filtros que se aplican
  availableColumns: any[] = [];
  isColumnSelectorVisible = false;
  selectedColumns: string[] = [];
  totalUsers = 0;
  currentPage = 0;
  pageSize = 10;
  readonlyColumns: string[] = ['name'];

  constructor(
    private usersService: UsersService, 
    private filtroService: FiltroService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadUsers();  // Cargar los usuarios cuando el componente se inicialice
    this.loadAvailableColumns();
  }

  loadUsers(): void {
    this.usersService.getUsers(this.currentPage + 1, this.pageSize, {}).subscribe({
      next: (data) => {
        this.users = data;
        this.totalUsers = data.length < this.pageSize && this.currentPage > 0
          ? (this.currentPage * this.pageSize) + data.length
          : (this.currentPage + 1) * this.pageSize; // estimación básica si no tienes total
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  loadAvailableColumns(): void {
    this.usersService.getAvailableColumns().subscribe({
      next: (response: { columns: TableColumn[] }) => {
        this.availableColumns = response.columns.filter(col => col.key !== 'name');
      },
      error: (err) => {
        console.error('Error cargando columnas disponibles', err);
      }
    });
  }

  // Método para     alternar la visibilidad del selector de columnas
  toggleColumnSelector(): void {
    this.isColumnSelectorVisible = !this.isColumnSelectorVisible;
  }

  applySelectedColumns(): void {
    // Tomamos solo las columnas marcadas como seleccionadas
    this.selectedColumns = this.availableColumns
      .filter(col => col.selected)
      .map(col => col.field);

    // Enviamos el array completo de columnas seleccionadas al backend
    this.usersService.saveVisibleColumns(this.selectedColumns).subscribe({
      next: (response) => {
        console.log('Configuración de columnas actualizada:', response);
      },
      error: (err) => {
        console.error('Error al guardar configuración de columnas', err);
      }
    });
  }

  // Método para verificar si una columna debe ser visible
  isColumnVisible(column: string): boolean {
    return this.selectedColumns.includes(column);  // Si la columna está seleccionada, la mostramos
  }

  // Método para evitar que el menú se cierre cuando se selecciona un checkbox
  onCheckboxClick(event: Event): void {
    event.stopPropagation();  // Evitar que el menú se cierre al hacer clic en un checkbox
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
