import { Component } from '@angular/core';
import { DidyouknowService } from 'src/app/services/didyouknow.service';
import { MapService } from 'src/app/services/map.service';
import { SpotifyapiService } from 'src/app/services/spotifyapi.service';
import { ZoomService } from 'src/app/services/zoom.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent{
showMusicPlayer = false;


constructor(public zoomService: ZoomService, public mapService: MapService,private didYouKnowService: DidyouknowService){}
ngOnInit(): void {

  this.mapService.countryClicked$.subscribe((country) => {
    // console.log(country);
    // Toggle the visibility of the music player based on the country click
    this.showMusicPlayer = country !== null;
  });
}
getDidYouKnow(): void {
  this.didYouKnowService.getDidYouKnow("Tunisia",2000).subscribe(response => {
    console.log(response);
  });
  // console.log(this.didYouKnowService.chat("Tunisia",2000));
}


}
