import { Component } from '@angular/core';
import { TableLayoutComponent } from "../genericos/table-layout/table-layout.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-roles',
  imports: [TableLayoutComponent,RouterLink],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  title = "Roles";

  roles = [
    {
      id: 1,
      name: 'Juan Pérez',
      state: 'Active',
      rol: 'Usuario',
      email: 'juan.perez@example.com'
    },
    {
      id: 2,
      name: 'Maria López',
      state: 'Inactive',
      rol: 'Contributor',
      email: 'maria.lopez@example.com'
    },
    {
      id: 3,
      name: 'Carlos García',
      state: 'Suspendido',
      rol: 'Global Admin',
      email: 'carlos.garcia@example.com'
    },
    {
      id: 4,
      name: 'Ana Martínez',
      state: 'Blocked',
      rol: 'Auditor',
      email: 'ana.martinez@example.com'
    }
  ];

}
