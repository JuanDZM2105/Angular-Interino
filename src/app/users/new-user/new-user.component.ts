import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FormUsersComponent } from '../form-users/form-users.component';
import { UserCreationDTO } from '../users';
import { UsersService } from '../users.service';
import { ExtractErrors } from '../../shared/functions/ExractErrors';
import { ShowErrorsComponent } from "../../shared/components/show-errors/show-errors.component";

@Component({
  selector: 'app-new-user',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormUsersComponent, ShowErrorsComponent],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  private userService = inject(UsersService);
  router = inject(Router);
  errors: string[] = [];

  guardarCambios(user: UserCreationDTO){
    this.userService.crear(user).subscribe(() => {
       
        this.router.navigate(['/users'])
      });

  }
}
