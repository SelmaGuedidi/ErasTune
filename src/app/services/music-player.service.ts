import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  map } from 'rxjs';
import { Song } from '../Models/song';


@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  constructor(private http: HttpClient) { }

  accessToken: string;
  complete_url : string
 

  API_URL = "https://erastune-75bd7-default-rtdb.firebaseio.com/"
  spotifyapiService: any;

  ngOnInit(): void {
    this.spotifyapiService.getAccessToken().subscribe(
      (token) => {
        this.accessToken = token;
      },
      (error) => {
        console.error('Error getting access token:', error);
      }
    );
  }


  getMusicByCountryAndYear(countryAbrv:String, year: number): Observable<Song[]> {
    this.complete_url = this.API_URL+`${countryAbrv}/${year}.json`;
     console.log("accessing DATA  on url "+this.complete_url)
    const headers = new HttpHeaders({
      // 'key' : this.API_KEY
    })
    return this.http.get< Song[]>(this.complete_url,{headers})

  }

  searchAlbum(query: string): void {
    this.spotifyapiService.searchAlbum(query,this.accessToken).subscribe(
      (response) => {
        console.log(response);
        console.log('Album:', response.albums.items[0]); // Logging the first album result
      },
      (error) => {
        console.error('Error searching album:', error);
      }
    );
  }

  searchArtist(query: string): void {
    this.spotifyapiService.searchArtist(query,this.accessToken).subscribe(
      (response) => {
        console.log(response);
        console.log('Artist:', response.artists.items[0]); // Logging the first artist result
      },
      (error) => {
        console.error('Error searching artist:', error);
      }
    );
  }


}
