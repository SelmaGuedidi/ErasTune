import { Component, Input, inject } from '@angular/core';
import { Song } from 'src/app/Models/song';
import { SpotifyapiService } from 'src/app/services/spotifyapi.service';
import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  @Input() album_title : string = '' ;
  @Input() artist : string = '';

  sas = inject(SpotifyapiService)

  artist_image: string ='';
  artist_popularity: number = 0;
  artist_genres: string[] = [];
  artist_spotify_uri: string = '';

  album_spotify_uri: string = '';
  album_image: string;
  album_release_date: any;
  album_total_tracks: number = 0;
  constructor() {}
  
  ngOnInit(): void {

    this.sas.getAccessToken().subscribe(accessToken => {

      if (this.album_title != ''){
      this.sas.searchAlbum(this.album_title,accessToken ).subscribe(album => {
      // this.album_popularity = album.albums.items[0].popularity;
      this.album_spotify_uri = album.albums.items[0].uri;
      this.album_image = album.albums.items[0].images[0].url;
      this.album_release_date = album.albums.items[0].release_date;
      this.album_total_tracks = album.albums.items[0].total_tracks;
      console.log(this.album_title)
      
    });} 
    if (this.artist != ''){

      this.sas.searchArtist(this.artist,accessToken).subscribe(artist => { 
        this.artist_image = artist.artists.items[0].images[0].url;
        this.artist_popularity = artist.artists.items[0].popularity
        this.artist_spotify_uri = artist.artists.items[0].uri
        this.artist_genres= artist.artists.items[0].genres
        
       });
    }
    
    });
    
  }

}
