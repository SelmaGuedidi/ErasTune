import { Component } from '@angular/core';
import { DidyouknowFactService } from 'src/app/services/did-you-know-fact.service';
import { MapService } from 'src/app/services/map.service';
import { ZoomService } from 'src/app/services/zoom.service';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent{
showMusicPlayer = false;
  


constructor(public zoomService: ZoomService, public mapService: MapService, public didYouKnowFactService:DidyouknowFactService){
  
}

ngOnInit(): void {
  this.mapService.countryClicked$.subscribe((country) => {
    // console.log(country);
    // Toggle the visibility of the music player based on the country click
    this.showMusicPlayer = country !== null;
  });
}

}
