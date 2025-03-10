import { Component, Input } from '@angular/core';
import { RouterLink} from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users',
  imports: [RouterLink, MatButtonModule,MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  //@Input({required: true})
  //users! : any[];

  users = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      password: 'password123',
      phone: '+54123456789'
    },
    {
      id: 2,
      name: 'Maria López',
      email: 'maria.lopez@example.com',
      password: 'qwerty456',
      phone: '+52345678901'
    },
    {
      id: 3,
      name: 'Carlos García',
      email: 'carlos.garcia@example.com',
      password: 'carlospass789',
      phone: '+34987654321'
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana.martinez@example.com',
      password: 'ana2023!',
      phone: '+573214567890'
    }
  ];

}
