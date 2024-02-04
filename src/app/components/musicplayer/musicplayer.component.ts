import { MapService } from 'src/app/services/map.service';
import { Component, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { MusicPlayerService } from 'src/app/services/music-player.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../popup/popup.component';
import { Song } from 'src/app/Models/song';

export interface AudioModel {
  volume: number;
  // other properties if needed
}

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.scss']
})
export class MusicplayerComponent {

  currentSongIndex: number = 0;
  isPlaying: boolean = false;
  audio!: HTMLAudioElement;
  isDragging = false;
  progress: number = 0;

  songs: Song[] = [];
  songSources: string[] = [];

  mapService = inject(MapService)
  musicPlayerService = inject(MusicPlayerService)
  toast= inject(ToastrService)
  private modalService = inject (NgbModal)

  openPopup(type : string) {

    const modalRef = this.modalService.open(PopupComponent, { centered: true });
        if (type == "artist"){
      modalRef.componentInstance.artist = this.songs[this.currentSongIndex].details.artist;
    }
    else if (type == "album"){
      modalRef.componentInstance.album_title = this.songs[this.currentSongIndex].details.album;
    }
  }
  constructor(){

    this.mapService.countryClicked$.subscribe(([country,abrv]) => {

      // console.log("in country observer")
      // console.log("country changed : ", country)
      var decade = this.mapService.decadeClickedSource.value
      // this.mapService.countryClicked$.subscribe(([country, abrv]) => {
        // console.log('in country observer');
        // console.log('country changed : ', country);
        var decade = this.mapService.decadeClickedSource.value;
        this.musicPlayerService
          .getMusicByCountryAndYear(abrv, decade)
          .pipe(
            map((songs) => {
              console.log("songs",songs);
              if (songs) {
                this.toast.success(`${country} in ${decade}`);
                this.songs = songs.map((song) => ({
                  source: song['Song Link'],
                  image: song['Image Link'],
                  details: {
                    name: song['Song Name'],
                    artist: song['Artist Name'],
                    album: song['Album Name'],
                  },
                }));
                this.songSources = this.songs.map((song) => song.source);
              } else {
                this.toast.error(`${country} or ${decade} is empty for now`);
                // console.log(`${country} or ${decade} is empty for now`);
                this.songs = [];
              }
            }),
            catchError((error) => {
              // console.error('Error fetching data:', error);
              this.toast.error('error fetching data');
              return of([]); // Return an empty array or handle the error as needed
            })
          )
          .subscribe(() => {
            this.changeSong();
          });
      // });
    })


    this.mapService.decadeClicked$.subscribe((decade) => {

      // console.log("in decade observer")
      // console.log("decade changed : ", decade)
      const [countryName, countryAbrv]  = this.mapService.countryClickedSource.value
      this.musicPlayerService.getMusicByCountryAndYear(countryAbrv,decade).pipe(
        map(songs => {
          if (songs) {
            this.toast.success(`${countryName} in ${decade}`);
            this.songs = songs.map((song) => ({
              source: song['Song Link'],
              image: song['Image Link'],
              details: {
                name: song['Song Name'],
                artist: song['Artist Name'],
                album: song['Album Name'],
              },
            }));

          this.songSources = this.songs.map((song) => song.source)
        }
          else {
            this.toast.error(`${countryName} or ${decade} is empty for now`);
            // console.log(`${countryName} or ${decade} is empty for now`);
            this.songs = [];
          }
        }),
        catchError(error => {
        // console.error("Error fetching data:", error);
        this.toast.error("error fetching data")
        return of([]);  // Return an empty array or handle the error as needed
        })

      ).subscribe(()=>{this.changeSong()})
    })


    }

  ngOnInit(): void {
    this.audio = new Audio();
    this.audio.src = this.songSources[this.currentSongIndex];
    this.audio.volume=0.5
    this.audio.addEventListener('timeupdate', () => {
    this.progress = (this.audio?.currentTime || 0) / (this.audio?.duration || 1) * 100;
    });
  }
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.updateProgress(event);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.updateProgress(event);
    }
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  updateProgress(event: MouseEvent): void {
    const progressContainer = event.currentTarget as HTMLElement;
    const clickX = event.clientX - progressContainer.getBoundingClientRect().left;
    const containerWidth = progressContainer.clientWidth;

    const newPosition = (clickX / containerWidth) * 100;

    this.audio.currentTime = (newPosition / 100) * this.audio.duration;
    this.progress = newPosition;
  }

  updateVolume(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.audio.volume=parseInt(target.value) / 100;
    console.log(parseInt(target.value) / 100 )

  }

  playPause(): void {
    if (this.isPlaying) {
      this.audio?.pause();
    } else {
      this.audio?.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  nextSong(): void {
    this.currentSongIndex = (this.currentSongIndex + 1) % this.songSources.length;
    this.changeSong();
  }

  prevSong(): void {
    this.currentSongIndex = (this.currentSongIndex - 1 + this.songSources.length) % this.songSources.length;
    this.changeSong();
  }

  private changeSong(): void {
    this.audio.src = this.songSources[this.currentSongIndex];
    this.audio.load();
    if (this.isPlaying) {
      this.audio.play();
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }




}
