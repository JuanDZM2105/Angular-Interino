import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-mainlayout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './mainlayout.component.html',
  styleUrl: './mainlayout.component.css'
})
export class MainlayoutComponent {
  // Variable para almacenar el correo del usuario
  userEmail: string | null = null;

  constructor(private router: Router) {
    // Obtener el correo del usuario desde localStorage
    this.userEmail = localStorage.getItem('email');  // Asegúrate de que 'email' esté guardado en localStorage al iniciar sesión
  }

  // Método para redirigir al perfil del usuario
  goToProfile() {
    this.router.navigate(['/profile']);  // Ruta de perfil del usuario
  }
}

