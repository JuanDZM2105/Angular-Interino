import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {}
