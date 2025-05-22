import { Component, Input, OnInit } from '@angular/core';
import { LegalProcessService } from '../../../../services/legal-process.service';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-legal-process',
  imports: [NgIf, NgFor, MatIconModule,RouterModule],
  templateUrl: './legal-process.component.html',
  styleUrls: ['./legal-process.component.css']
})
export class LegalProcessComponent implements OnInit {
  @Input() userId!: number;
  legalProcesses: any[] = [];
  expandedProcessId: number | null = null;

  constructor(private legalProcessService: LegalProcessService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.legalProcessService.getLegalProcessesByUserId(this.userId).subscribe({
        next: (data) => {
          this.legalProcesses = data;
        },
        error: (err) => {
          console.error('Error cargando procesos legales:', err);
        }
      });
    }
  }

  toggleProcedures(process: any): void {
    if (this.expandedProcessId === process.legalProcessId) {
      this.expandedProcessId = null;
      return;
    }

    this.legalProcessService.getProcessWithProcedures(process.legalProcessId).subscribe({
      next: (fullProcess) => {
        process.procedures = fullProcess.procedures;
        this.expandedProcessId = process.legalProcessId;
      },
      error: (err) => {
        console.error('Error obteniendo procedimientos:', err);
      }
    });
  }
}
