import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UserCreationDTO, UserDTO } from '../users';

@Component({
  selector: 'app-form-users',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule],
  templateUrl: './form-users.component.html',
  styleUrl: './form-users.component.css'
})
export class FormUsersComponent implements OnInit{

  ngOnInit(): void {
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }


  private formBuilder = inject(FormBuilder);

  @Input()
  modelo?: UserDTO;

  @Output()
  postForms = new EventEmitter<UserCreationDTO>();

  form = this.formBuilder.group({
    name: ['', {validators: [Validators.required]}],
    email: ['', {validators: [Validators.required, Validators.email]}],
    password: ['', {validators: [Validators.required]}],
    phone: ['', {validators: [Validators.required]}],
  });

  guardarCambios(){
    if(this.form.invalid){
      return;
    }
    const user = this.form.value as UserCreationDTO;
    this.postForms.emit(user);

  }



}
