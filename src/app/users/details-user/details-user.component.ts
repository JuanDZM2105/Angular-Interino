import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { GeneralInfoComponent } from './tabs/general-info/general-info.component';
import { LegalProcessComponent } from './tabs/legal-process/legal-process.component';
import { ActivityLogComponent } from './tabs/activity-log/activity-log.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-details-user',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    GeneralInfoComponent,
    LegalProcessComponent,
    ActivityLogComponent,
    NgIf,
  ],
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  userId: number | null = null;
  userInfo: any = null;

  constructor(private route: ActivatedRoute, private usersService: UsersService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId = idParam ? +idParam : null;

    if (this.userId) {
      this.usersService.getUserInfo(this.userId).subscribe({
        next: (data) => {
          this.userInfo = data;
        },
        error: (err) => {
          console.error('Error al obtener usuario', err);
        }
      });
    }
  }
}

