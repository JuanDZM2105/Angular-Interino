import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { UserCreationDTO, UserDTO } from '../users';
import { FormUsersComponent } from '../form-users/form-users.component';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-user',
  imports: [FormUsersComponent],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css'
})
export class DetailsUserComponent implements OnInit {
  ngOnInit(): void {
    this.userService.obtenerPorId(this.id).subscribe(user => {
      this.user = user;
    })    
  }

  @Input({transform: numberAttribute})
  id!:number;

  user?: UserDTO;
  userService = inject(UsersService);
  router = inject(Router);
  errors: string[] = [];
  
    guardarCambios(user: UserCreationDTO){
      this.userService.actualizar(this.id, user).subscribe(() => {         
          this.router.navigate(['/users'])
        });
  
    }
}
