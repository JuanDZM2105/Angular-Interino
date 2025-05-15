import { Component, Input, OnInit } from '@angular/core';
import { LogsService } from '../../../../services/logs.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-activity-log',
  imports: [NgFor,DatePipe, NgIf],
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  @Input() userId!: number;
  userLogs: any[] = [];

  constructor(private logsService: LogsService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.logsService.getLogsByUserId(this.userId).subscribe({
        next: (logs) => {
          this.userLogs = logs;
        },
        error: (err) => {
          if (err.status === 404) {
            this.userLogs = []; // No hay logs, tratamos como lista vacía
          } else {
            console.error('Error cargando logs del usuario:', err);
          }
        }
      });
    }
  }

}
