import { Component } from '@angular/core';
import { ZoomService } from './services/zoom.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Eras Tune';
  
  constructor(public zoomService: ZoomService) {} 
    
  }


