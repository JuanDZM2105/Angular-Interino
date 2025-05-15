import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
      // Importa CommonModule aquí
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  isEditing: boolean = false;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      phonePrefix: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        console.log('Perfil de usuario:', profile);
  
        // Asignar los valores al formulario cuando el perfil es recibido
        this.profileForm.patchValue({
          name: profile.name,
          lastName: profile.lastName,
          email: profile.email,
          country: profile.country,
          phone: profile.phone,
          phonePrefix: profile.phonePrefix
        });
      },
      error: (error) => {
        console.error('Error al obtener perfil:', error);
        alert('No se pudo obtener el perfil del usuario.');
      }
    });
  }
  

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }
  
    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: (response) => {
        console.log('Perfil actualizado', response);
  
        // Obtener los datos más recientes del perfil
        this.authService.getProfile().subscribe({
          next: (updatedProfile) => {
            this.userProfile = updatedProfile;
            this.profileForm.patchValue(this.userProfile); // Actualiza el formulario con los nuevos datos
            this.isEditing = false; // Salir del modo de edición
          },
          error: (error) => {
            console.error('Error al obtener el perfil actualizado:', error);
            alert('Hubo un error al obtener el perfil actualizado.');
          }
        });
      },
      error: (error) => {
        console.error('Error al actualizar el perfil', error);
        alert('Hubo un error al actualizar el perfil.');
      }
    });
  }

  editProfile() {
    this.isEditing = true;
  }
}


