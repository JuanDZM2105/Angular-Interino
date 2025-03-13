import { Component } from '@angular/core';
import { TableLayoutComponent } from "../genericos/table-layout/table-layout.component";

@Component({
  selector: 'app-audits',
  imports: [TableLayoutComponent],
  templateUrl: './audits.component.html',
  styleUrl: './audits.component.css'
})
export class AuditsComponent {
  title = 'Audits and Reports';

  audits: any[] = [];
}
