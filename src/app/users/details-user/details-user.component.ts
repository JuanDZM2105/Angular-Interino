import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-details-user',
  imports: [],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css'
})
export class DetailsUserComponent {

  @Input({transform: numberAttribute})
  id!:number

}
