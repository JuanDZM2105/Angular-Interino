// src/app/pages/create-legal-process/create-legal-process.component.ts
import { Component, OnInit } from '@angular/core';
import { LegalProcessService } from '../services/legal-process.service';
import { CreateLegalProcess } from './create-legal-process';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/create-user.dto';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  imports: [FormsModule, NgIf, MatButtonModule, MatOptionModule, MatFormFieldModule,MatNativeDateModule, MatDatepickerModule, MatInputModule, MatSelectModule,NgFor,RouterModule],
  selector: 'app-create-legal-process',
  templateUrl: './create-legal-process.component.html',
})
export class CreateLegalProcessComponent implements OnInit {
  legalProcess: CreateLegalProcess = {
    name: '',
    type: '',
    status: '',
    cost: 0,
    paymentStatus: '',
    startDate: '',
    endDate: '',
    clientUserId: 0,
    lawyerUserId: 0,
  };

  availableUsers: any[] = [];
  lawyerUsers: any[] = [];

  message = '';
  loading = false;

  constructor(
    private legalService: LegalProcessService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadUsersByType();
  }

  loadUsersByType() {
    this.usersService.getAvailableUsers().subscribe({
        next: (data) => {
          this.availableUsers = data; // Almacenar los usuarios disponibles
        },
        error: (err) => {
          console.error('Error al cargar usuarios:', err);
        }
    });
  }

  submitForm() {
    this.loading = true;

    this.legalService.createLegalProcess(this.legalProcess).subscribe({
      next: (res) => {
        this.message = res.message;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al crear proceso:', err);
        this.message = 'Ocurrió un error al crear el proceso legal';
        this.loading = false;
      }
    });
  }
}
