import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-user',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule,ReactiveFormsModule,MatInputModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  private router = inject(Router);
  private formbuilder = inject(FormBuilder);
  form = this.formbuilder.group({
    nombre: ['', {validators: [Validators.required]}]
  })

  obtenerErrorCampoNombre(): string{
    let nombre = this.form.controls.nombre;

    if (nombre.hasError('required')){
      return "el campo es requerido";
    }

    return '';
  }

  guardarCambios(){
    //this.router.navigate(['/users']);
    console.log(this.form.value);
  }

}
