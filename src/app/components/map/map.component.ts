import { Component, Input } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { ZoomService } from 'src/app/services/zoom.service';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  countriesGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> | undefined;
  @Input() zoom: number;
  
  
  constructor(private mapService: MapService,public zoomService: ZoomService) {  }
  
  async ngOnInit(): Promise<void> {
    this.zoom = 1;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    this.mapService.loadMapData(windowWidth,windowHeight);
    console.log('Window Width:', windowWidth);
    console.log('Window Height:', windowHeight);
    }
 
    
  }

