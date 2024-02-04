import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DidyouknowFactService } from 'src/app/services/did-you-know-fact.service';
import { MapService } from 'src/app/services/map.service';
import { SpotifyapiService } from 'src/app/services/spotifyapi.service';
import { ZoomService } from 'src/app/services/zoom.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
  selectedCountry$: Observable<string[]>;

  constructor(
    public zoomService: ZoomService,
    public mapService: MapService,
    public didYouKnowFactService: DidyouknowFactService
  ) {
    this.selectedCountry$ = this.mapService.countryClicked$;
  }
}
