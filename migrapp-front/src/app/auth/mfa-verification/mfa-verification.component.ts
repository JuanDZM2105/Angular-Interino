import { Component, inject, Inject, } from '@angular/core';
import { Router }  from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-mfa-verification',
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './mfa-verification.component.html',
  styleUrls: ['./mfa-verification.component.css'],
})
export class MfaVerificationComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.formBuilder.group({
    code: ['', Validators.required]
  });

  email: string | null = null;
  countdown: number = 60; // Tiempo de 60 segundos para la cuenta atrás

  constructor(
    private dialogRef: MatDialogRef<MfaVerificationComponent>,  // Inyectamos MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: { email: string }  // Recibimos el email del modal
  ) {
    this.email = this.data?.email || localStorage.getItem('emailParaMfa');
    console.log('Email MFA recibido:', this.email); // Verifica que se está recuperando correctamente
  }

  ngOnInit() {
    this.startCountdown(); // Inicia el temporizador
  }

  startCountdown(): void {
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval); // Detener el contador cuando llegue a 0
      }
    }, 1000); // Actualización cada 1000ms (1 segundo)
  }

  verificarCodigo() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const { code } = this.form.value;
    console.log('Verificando código MFA con email:', this.email, 'y código:', code); // Agregado para debug
  
    this.authService.verifyMfaCode(this.email!, code!).subscribe({
      next: (response) => {
        console.log('Token recibido:', response.token); // Si esto no aparece, revisa el flujo de datos
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.email);
        localStorage.setItem('userType', response.userType);
  
        this.dialogRef.close();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al verificar código MFA', error);
        alert('Código incorrecto o expirado.');
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
