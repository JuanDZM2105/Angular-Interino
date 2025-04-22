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

  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6'; // Aquí debes traer el token JWT cuando el usuario esté logueado

  constructor(private usersService: UsersService) { }

  onSubmit(): void {
    this.usersService.createUser(this.newUser, this.token).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente', response);
        // Aquí podrías redirigir o limpiar el formulario
      },
      error: (error) => {
        console.error('Error al crear usuario', error);
        // Mostrar error en la interfaz
      }
    });
  }
}