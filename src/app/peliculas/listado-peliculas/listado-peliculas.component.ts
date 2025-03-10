import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-listado-peliculas',
  imports: [DatePipe],
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.css'
})
export class ListadoPeliculasComponent {
  title = 'angular-peliculas';
  date1 = new Date();

  
  @Input({required: true})
  peliculas! : any[];

}
