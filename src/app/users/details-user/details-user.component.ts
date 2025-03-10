import { Component, Input, numberAttribute } from '@angular/core';
import { UserCreationDTO, UserDTO } from '../users';
import { FormUsersComponent } from '../form-users/form-users.component';

@Component({
  selector: 'app-details-user',
  imports: [FormUsersComponent],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css'
})
export class DetailsUserComponent {

  @Input({transform: numberAttribute})
  id!:number;

  user: UserDTO = {id: 1, name: 'Juan', email: 'juanzm@gmail.com', password: '1234', phone: '123456789'};

  guardarCambios(User: UserCreationDTO){
    console.log("editando user", User);
  }

}
