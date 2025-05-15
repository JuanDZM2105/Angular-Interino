import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service'; // ojo a la ruta
import { CreateUserDto } from '../create-user.dto'; // ojo a la ruta
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { MatFormFieldModule } from '@angular/material/form-field'; // Para <mat-form-field>
import { MatInputModule } from '@angular/material/input'; // Para <input matInput>
import { MatSelectModule } from '@angular/material/select'; // Para <mat-select>
import { MatCheckboxModule } from '@angular/material/checkbox'; // Para <mat-checkbox>
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { MatOptionModule } from '@angular/material/core'; // Para <mat-option>
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-new-user',
  imports: [    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatOptionModule,
    NgIf,
    NgFor,
    RouterModule
  ],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit{

  newUser: CreateUserDto = {
    email: '',
    name: '',
    lastName: '',
    country: '',
    phonePrefix: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'lawyer',
    hasAccessToAllUsers: false,
    assignedUserIds: []
  };

  availableUsers: any[] = [];

  // Obtener el token desde el localStorage
  token: string = localStorage.getItem('token') || ''; // O un valor vacío o nulo si no existe

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Llamar al servicio para obtener los usuarios disponibles
    if (this.token) {
      this.usersService.getAvailableUsers().subscribe({
        next: (data) => {
          this.availableUsers = data; // Almacenar los usuarios disponibles
        },
        error: (error) => {
          console.error('Error al obtener usuarios disponibles', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.token) {
      console.error('No se encontró un token de autenticación.');
      return;
    }

    console.log('Datos del nuevo usuario:', this.newUser);

    this.usersService.createUser(this.newUser, this.token).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente', response);
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error al crear usuario', error);
        // Mostrar error en la interfaz
      }
    });
  }
}
