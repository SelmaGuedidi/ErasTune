import { Component, Input, OnDestroy } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { ZoomService } from 'src/app/services/zoom.service';
import { ToastrService } from 'ngx-toastr';
import { DidyouknowFactService } from 'src/app/services/did-you-know-fact.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy {
  countriesGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> | undefined;
  @Input() zoom: number;

  currentCountry: string;
  currentDecade: number;

  constructor(
    private mapService: MapService,
    public zoomService: ZoomService,
    private didyouknowFactService: DidyouknowFactService,
    private toast: ToastrService
  ) { }

  ngOnDestroy(): void {
    // Unsubscribe here if needed
  }

  async ngOnInit(): Promise<void> {
    this.zoom = 1;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    this.mapService.decadeClicked$.subscribe((value) => {
      this.currentDecade = value;
      this.mapService.loadMapData(value);
      if(this.currentCountry)
      {
        console.log("This is info :");
        this.showFunFactToast();
      }
      });

    this.mapService.countryClicked$.subscribe((countries: string[] | null) => {
      if (countries) {
        this.currentCountry = countries[0];
        console.log("This is info :");
        this.showFunFactToast();
      }
    });

    console.log('Window Width:', windowWidth);
    console.log('Window Height:', windowHeight);
  }

  private showFunFactToast(): void {

    this.didyouknowFactService.getDidYouKnow(this.currentCountry, this.currentDecade)
      .pipe(take(1))
      .subscribe(didYouKnowFact => {
        this.toast.info(didYouKnowFact, 'Fun Fact', {
          positionClass: 'toast-bottom-right',
          timeOut: 20500,
        });
      });

  }
}
