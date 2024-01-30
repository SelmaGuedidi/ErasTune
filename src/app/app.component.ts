import { Component ,Renderer2,OnInit} from '@angular/core';
import * as d3 from 'd3';
import { MapService } from './map-service.service';
import { Song } from './model/song';
import { Observable } from 'rxjs';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { MusicPlayerService } from './services/music-player.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'Eras Tune';
  countriesGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any> | undefined;
  
  songs_obs$ : Observable<Song[]>
  songs : Song[]


  constructor(private mapService: MapService,private renderer: Renderer2) { 
    mapService.songs_obs$.subscribe(songs => {
      console.log('Received songs:', songs);
      this.songs = songs
    });
    // console.log(this.songs)

  }
  getSongs
 
  
  async ngOnInit(): Promise<void> {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    this.mapService.loadMapData(windowWidth,windowHeight);
    console.log('Window Width:', windowWidth);
    console.log('Window Height:', windowHeight);

    
    }
  }


