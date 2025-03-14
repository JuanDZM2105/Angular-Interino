import { Component, inject} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: ['', {validators: [Validators.required]}],
    password: ['', {validators: [Validators.required]}],
  });
  
  login(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.router.navigate(['/home']);
  }
}
