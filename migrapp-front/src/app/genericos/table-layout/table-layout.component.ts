import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FiltroService } from '../../services/filtros.service';
import { MatFormFieldModule } from '@angular/material/form-field';  // Para mat-form-field
import { MatInputModule } from '@angular/material/input';  // Para mat-input
import { MatSelectModule } from '@angular/material/select';  // Para mat-select
import { MatOptionModule } from '@angular/material/core';  // Para mat-option
import { MatCheckboxModule } from '@angular/material/checkbox';  // Para mat-checkbox
import { UsersService } from '../../users/users.service'; // Importar el servicio de usuarios
@Component({
  selector: 'app-table-layout',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.css']
})
export class TableLayoutComponent implements OnInit {

  // Filtros
  selectedUserType: string = ''; 
  selectedAccountStatus: string = ''; 
  selectedCountry: string = '';
  selectedIsActiveNow: boolean = true;
  filters: any;
  filtersVisible = false;

  @Output() filtersChanged = new EventEmitter<any>();

  constructor(private filtroService: FiltroService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadFilters();  // Cargar los filtros al inicializar el componente
  }

  loadFilters(): void {
    this.filtroService.getFilters().subscribe({
      next: (data) => {
        this.filters = data;
        console.log('Filtros cargados:', this.filters);
      },
      error: (err) => {
        console.error('Error al cargar los filtros:', err);
      }
    });
  }

  applyFilters(): void {
    // Se invierte la visibilidad de los filtros
    this.filtersVisible = !this.filtersVisible;

    // Crear el objeto de filtros a aplicar
    const filters = {
      userType: this.selectedUserType,
      accountStatus: this.selectedAccountStatus,
      country: this.selectedCountry,
      isActiveNow: this.selectedIsActiveNow
    };

    // Emitir los filtros al componente padre
    this.filtersChanged.emit(filters);
  }

  toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible; // Cambiar el estado de la visibilidad
  }

  refreshFilters(): void {
    // Limpiar los filtros
    this.selectedUserType = '';
    this.selectedAccountStatus = '';
    this.selectedCountry = '';
    this.selectedIsActiveNow = true;

    // Emitir los filtros vacíos
    this.filtersChanged.emit({
      userType: '',
      accountStatus: '',
      country: '',
      isActiveNow: true
    });

    console.log("Filtros limpiados y refrescados");
  }

  exportUsers(): void {
    const filters = {
      userType: this.selectedUserType,
      accountStatus: this.selectedAccountStatus,
      country: this.selectedCountry,
      isActiveNow: this.selectedIsActiveNow
    };
  
    // Llamar al servicio para exportar los usuarios con los filtros
    this.usersService.exportUsers(filters).subscribe({
      next: (response) => {
        // Aquí asumimos que la respuesta contiene un archivo CSV
        const blob = new Blob([response], { type: 'application/csv' });
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = 'usuarios_filtrados.csv'; // Nombre del archivo
        link.click();
        window.URL.revokeObjectURL(url); // Limpiar el objeto URL después de la descarga
      },
      error: (err) => {
        console.error('Error al exportar los usuarios:', err);
      }
    });
  }
}
