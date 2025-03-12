import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FormUsersComponent } from '../form-users/form-users.component';
import { UserCreationDTO } from '../users';

@Component({
  selector: 'app-new-user',
  imports: [MatButtonModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule,FormUsersComponent],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  guardarCambios(user: UserCreationDTO){
    console.log("creando user", user);
  }

}
