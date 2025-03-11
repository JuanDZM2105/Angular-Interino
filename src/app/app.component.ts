
import { Component, OnInit } from '@angular/core';
import { ListadoPeliculasComponent } from './peliculas/listado-peliculas/listado-peliculas.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.peliculasEnCines = [{
        titulo: 'Inside Out 2',
        fechaLanzamiento: new Date(),
        precio: 1400.99,
        poster: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg?20240514232832'
      },
      {
        titulo: 'Moana 2',
        fechaLanzamiento: new Date('2016-05-03'),
        precio: 300.99,
        poster: 'https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg'
      }];

      this.users = [
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


      this.peliculasProximosEstrenos = [
        {
          titulo: 'Bad Boys: Ride or Die',
          fechaLanzamiento: new Date('2016-05-03'),
          precio: 300.99,
          poster: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Bad_Boys_Ride_or_Die_%282024%29_poster.jpg'
        },
        {
          titulo: 'Deadpool & Wolverine',
          fechaLanzamiento: new Date('2016-05-03'),
          precio: 300.99,
          poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Deadpool_%26_Wolverine_poster.jpg/220px-Deadpool_%26_Wolverine_poster.jpg'
        },
        {
          titulo: 'Oppenheimer',
          fechaLanzamiento: new Date('2016-05-03'),
          precio: 300.99,
          poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg'
        },
        {
          titulo: 'The Flash',
          fechaLanzamiento: new Date('2016-05-03'),
          precio: 300.99,
          poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/The_Flash_%28film%29_poster.jpg/220px-The_Flash_%28film%29_poster.jpg'
        }];
    }, 2000);
  }

  peliculasEnCines!: any[];
  peliculasProximosEstrenos!: any[];
  users!: any[];

}
