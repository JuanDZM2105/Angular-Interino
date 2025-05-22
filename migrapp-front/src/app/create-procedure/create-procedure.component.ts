import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LegalProcessService } from '../services/legal-process.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

// Servicio de autenticación
import { AuthService } from '../services/auth.service';

@Component({
  imports: [
    FormsModule, MatButtonModule, MatOptionModule, MatFormFieldModule,
    MatNativeDateModule, MatDatepickerModule, MatInputModule, MatSelectModule
  ],
  selector: 'app-create-procedure',
  templateUrl: './create-procedure.component.html',
})
export class CreateProcedureComponent implements OnInit {
  procedure: any = {
    name: '',
    status: '',
    dueDate: new Date().toISOString(),
    legalProcessId: 0
  };

  documents: any[] = [];
  loadingDocuments = false;
  currentUserId?: number;
  currentProcedureIdForUpload: number | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private legalProcessService: LegalProcessService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    // Obtener userId del perfil autenticado
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.currentUserId = profile.id; // Ajusta según estructura real
        console.log('UserId obtenido:', this.currentUserId);
      },
      error: (err) => {
        console.error('Error obteniendo perfil:', err);
      }
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('legalProcessId');
      if (id) {
        this.procedure.legalProcessId = +id;
        this.currentProcedureIdForUpload = +id;

        this.loadDocuments(this.procedure.legalProcessId);
      }
    });
  }

  onSubmit() {
    this.legalProcessService.createProcedure(this.procedure).subscribe({
      next: (response) => {
        console.log('Procedimiento creado:', response);
        this.location.back();
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  loadDocuments(procedureId: number) {
    this.loadingDocuments = true;
    this.legalProcessService.getProcedureDocuments(procedureId).subscribe({
      next: (docs) => {
        this.documents = docs;
        this.loadingDocuments = false;
      },
      error: (err) => {
        console.error('Error cargando documentos:', err);
        this.loadingDocuments = false;
      }
    });
  }

  openFileDialog() {
    if (!this.fileInput) {
      console.error('fileInput no está definido');
      return;
    }
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    console.log('onFileSelected triggered');

    if (!this.currentUserId) {
      console.error('UserId aún no está disponible');
      return;
    }

    const input = event.target as HTMLInputElement;
    if (!input.files?.length || this.currentProcedureIdForUpload === null) {
      console.warn('No hay archivos seleccionados o ProcedureId es null');
      return;
    }

    const file = input.files[0];
    console.log('Archivo seleccionado:', file.name);

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];

      const documentPayload = {
        Name: file.name,
        userId: this.currentUserId!,
        Description: 'Descripción aquí',
        Type: file.type,
        ProcedureId: this.currentProcedureIdForUpload!,
        File: base64String
      };

      this.legalProcessService.uploadProcedureDocument(documentPayload).subscribe({
        next: (res) => {
          console.log('Documento subido con éxito', res);
          this.loadDocuments(this.currentProcedureIdForUpload!);
        },
        error: (err) => {
          console.error('Error al subir documento', err);
        }
      });
    };

    reader.readAsDataURL(file);
  }
}
