import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,MatIconModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userType: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType');
  }

  // Método para comprobar si el usuario es 'admin'
  isAdmin(): boolean {
    return this.userType === 'admin'; // Verifica que el tipo de usuario sea 'admin'
  }
}
