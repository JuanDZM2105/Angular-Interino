import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../services/metrics.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-metrics',
  imports:[NgChartsModule, CommonModule,],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  metrics: any = {};

  // Gráfico de pastel para tipos de usuario
  public userTypeData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Administradores', 'Abogados', 'Auditores', 'Lectores'],
    datasets: [{
      label: 'Tipos de usuario',
      data: [],
      backgroundColor: ['#3f51b5', '#e91e63', '#009688', '#ff9800']
    }]
  };
  public userTypeOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  // Gráfico de barras para estado de procesos
  public processStatusData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Abiertos', 'Completados'],
    datasets: [{
      label: 'Procesos Legales',
      data: [],
      backgroundColor: ['#2196f3', '#4caf50']
    }]
  };
  public processStatusOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  // Gráfico de barras para estado de cuenta
  public accountStatusData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Activos', 'Eliminados', 'Bloqueados'],
    datasets: [{
      label: 'Estado de Cuenta',
      data: [],
      backgroundColor: ['#4caf50', '#f44336', '#ff9800']
    }]
  };
  public accountStatusOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.loadMetrics();
  }

  loadMetrics(): void {
    this.metricsService.getDashboardMetrics().subscribe({
      next: (data) => {
        this.metrics = data;

        // Actualizar datos para gráfico tipos de usuario
        this.userTypeData.datasets[0].data = [
          data.totalAdmins,
          data.totalLawyers,
          data.totalAuditors,
          data.totalReaders
        ];

        // Actualizar datos para gráfico estado de procesos
        this.processStatusData.datasets[0].data = [
          data.totalOpenLegalProcesses,
          data.totalCompletedLegalProcesses
        ];

        // Actualizar datos para gráfico estado de cuenta
        this.accountStatusData.datasets[0].data = [
          data.totalActiveAccountStatus,
          data.totalEliminatedAccountStatus,
          data.totalBlockedAccountStatus
        ];
      },
      error: (error) => console.error('Error cargando métricas:', error)
    });
  }
}
