import { Component, OnInit } from '@angular/core';
import { LegalProcessService } from '../services/legal-process.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  imports: [
    FormsModule, NgIf, MatButtonModule, MatOptionModule, MatFormFieldModule,
    MatNativeDateModule, MatDatepickerModule, MatInputModule, MatSelectModule, NgFor
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

  constructor(
    private legalProcessService: LegalProcessService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('legalProcessId');
      if (id) {
        this.procedure.legalProcessId = +id; // asigna el id como número
      }
    });
  }

  onSubmit() {
    this.legalProcessService.createProcedure(this.procedure).subscribe({
      next: (response) => {
        console.log('Procedimiento creado:', response);
        this.router.navigate(['/legal-processes']);
        // Aquí puedes agregar navegación o mensaje al usuario
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
