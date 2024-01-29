import { Component } from '@angular/core';
import { ZoomService } from 'src/app/services/zoom.service';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {
constructor(public zoomService: ZoomService){}
}
