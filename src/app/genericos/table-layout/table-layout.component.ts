import { Component, Input, input } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-layout',
  imports: [MatButtonModule,MatIconModule],
  templateUrl: './table-layout.component.html',
  styleUrl: './table-layout.component.css'
})
export class TableLayoutComponent {
  @Input({required: true})
  listado: any;
}
