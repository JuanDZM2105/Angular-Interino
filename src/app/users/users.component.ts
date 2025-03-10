import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-users',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
