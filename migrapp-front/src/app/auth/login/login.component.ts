import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MfaVerificationComponent } from '../mfa-verification/mfa-verification.component'; // IMPORTAR el componente de MFA
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);  // INYECTAR MatDialog

  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    preferredMfaMethod: ['email' as 'email' | 'sms', Validators.required]  // Asumí que quieres guardar el método MFA preferido
  });

  login() {
    console.log("Login iniciado...");

    if (this.form.invalid) {
      console.log("Formulario inválido");
      this.form.markAllAsTouched();
      return;
    }

    const { email, password, preferredMfaMethod } = this.form.value;

    this.authService.login(email!, password!, preferredMfaMethod!).subscribe({
      next: (response) => {
        console.log('Código de verificación enviado:', response.message); // Log aquí
          
        // Abrir el modal de MFA para verificar el código
        const dialogRef = this.dialog.open(MfaVerificationComponent, {
          width: '400px',
          data: { email: email }
        });
      },
      error: (error) => {
        console.error('Error en login', error);
        alert('Credenciales incorrectas.');
      }
    });
  }
}

