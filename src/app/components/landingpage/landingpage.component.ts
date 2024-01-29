import { Component } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { ZoomService } from 'src/app/services/zoom.service';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent{
showMusicPlayer = false;


constructor(public zoomService: ZoomService, public mapService: MapService){}
ngOnInit(): void {
  this.mapService.countryClicked$.subscribe((country) => {
    console.log(country);
    // Toggle the visibility of the music player based on the country click
    this.showMusicPlayer = country !== null;
  });
}

}
