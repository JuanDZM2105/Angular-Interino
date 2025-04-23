import { Component } from '@angular/core';
import { UsersService } from '../users.service'; // ojo a la ruta
import { CreateUserDto } from '../create-user.dto'; // ojo a la ruta
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { MatFormFieldModule } from '@angular/material/form-field'; // Para <mat-form-field>
import { MatInputModule } from '@angular/material/input'; // Para <input matInput>
import { MatSelectModule } from '@angular/material/select'; // Para <mat-select>
import { MatCheckboxModule } from '@angular/material/checkbox'; // Para <mat-checkbox>
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { MatOptionModule } from '@angular/material/core'; // Para <mat-option>
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  imports: [    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatOptionModule
  ],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

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

  // Obtener el token desde el localStorage
  token: string = localStorage.getItem('token') || ''; // O un valor vacío o nulo si no existe

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

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
