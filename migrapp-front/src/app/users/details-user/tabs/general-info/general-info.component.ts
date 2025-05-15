import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { UsersService } from '../../../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-general-info',
  imports: [
    NgIf,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.css'
})
export class GeneralInfoComponent implements OnInit {
  @Input() userId!: number;  // Variable para almacenar el ID de usuario
  userInfo: any = {};  // Aquí guardaremos los detalles del usuario
  isEditing: boolean = false;  // Controla si estamos editando o viendo el perfil
  detailsForm: FormGroup;  // Formulario reactivo para editar el perfil

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario con valores vacíos
    this.detailsForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      phonePrefix: [''] 
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.usersService.getUserInfo(this.userId).subscribe({
        next: (data) => {
          this.userInfo = data;
          this.detailsForm.patchValue(this.userInfo); // Poner los valores del usuario en el formulario
        },
        error: (error) => {
          console.error('Error al obtener la información del usuario', error);
        }
      });
    }
  }

  // Método para activar el modo de edición
  editProfile(): void {
    this.isEditing = true;
  }

  onSubmit(): void {
    if (this.detailsForm.invalid) {
      return;  // Evitar que se envíe si el formulario es inválido
    }

    const updatedUserInfo = this.detailsForm.value;
    console.log('Datos actualizados del usuario:', updatedUserInfo);

    // Llamar al servicio para actualizar la información del usuario
    this.usersService.updateUserInfo(this.userId!, updatedUserInfo).subscribe({
      next: (response) => {
        console.log('Usuario actualizado:', response);

        // Una vez actualizado, obtener los datos más recientes del usuario
        this.usersService.getUserInfo(this.userId!).subscribe({
          next: (updatedUserInfo) => {
            // Actualizar los datos del formulario con los nuevos datos
            this.userInfo = updatedUserInfo;
            this.detailsForm.patchValue(updatedUserInfo);  // Actualizar el formulario con los nuevos datos
            this.isEditing = false;  // Volver a la vista no editable
          },
          error: (error) => {
            console.error('Error al obtener la información actualizada del usuario:', error);
            alert('Hubo un error al obtener la información actualizada.');
          }
        });
      },
      error: (error) => {
        console.error('Error al actualizar la información del usuario', error);
        alert('Hubo un error al actualizar la información del usuario.');
      }
    });
  }
}


