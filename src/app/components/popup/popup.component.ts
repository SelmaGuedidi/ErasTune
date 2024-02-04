import { Component, Input, inject } from '@angular/core';
import { Song } from 'src/app/Models/song';
import { SpotifyapiService } from 'src/app/services/spotifyapi.service';
import { NgFor,NgIf } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';

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
  sanitizer: any;
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
  openSpotifyUrl(uri: string): void {
    // Convert Spotify URI to URL
    const spotifyUrl = this.getSpotifyUrlFromUri(uri);
    // Open the URL in a new tab
    window.open(spotifyUrl.toString(), '_blank');
  }

  private getSpotifyUrlFromUri(uri: string): SafeResourceUrl {
    // Assuming the URI format is "spotify:album:2up3OPMp9Tb4dAKM2erWXQ"
    const parts = uri.split(':');
    const type = parts[1]; // "album", "artist", etc.
    const id = parts[2]; // The unique identifier

    // Build the Spotify URL
    console.log(`https://open.spotify.com/${type}/${id}`);
    const spotifyUrl = `https://open.spotify.com/${type}/${id}`;

    // Sanitize the URL to make it safe for use in href
    return this.sanitizer.bypassSecurityTrustResourceUrl(spotifyUrl);
  }

}
