import { Component, Input, input } from '@angular/core';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  @Input() title : string ;
  @Input() body : string ;

  constructor() {}

}
