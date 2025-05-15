import { Component, OnInit } from '@angular/core';
import { LogsService } from '../services/logs.service';  // ajusta si tu ruta cambia
import { DatePipe, NgFor } from '@angular/common';
import { TableLayoutComponent } from '../genericos/table-layout/table-layout.component';

@Component({
  selector: 'app-audits',
  imports: [NgFor, DatePipe, TableLayoutComponent],
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css']
})
export class AuditsComponent implements OnInit {
  logs: any[] = [];

  constructor(private logsService: LogsService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.logsService.getAllUserLogs().subscribe({
      next: (response) => {
        this.logs = response.logs;
      },
      error: (error) => {
        console.error('Error al cargar los logs:', error);
      }
    });
  }
}
