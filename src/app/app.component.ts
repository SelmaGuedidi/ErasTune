import { Component ,Renderer2,OnInit} from '@angular/core';
import * as d3 from 'd3';
import { MapService } from './map-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'angular-github-actions';
  countriesGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> | undefined;

  constructor(private mapService: MapService,private renderer: Renderer2) { }
  async ngOnInit(): Promise<void> {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    this.mapService.loadMapData(windowWidth,windowHeight);
    console.log('Window Width:', windowWidth);
    console.log('Window Height:', windowHeight);
    }
 
  }


