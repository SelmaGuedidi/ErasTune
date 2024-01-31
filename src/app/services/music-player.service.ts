import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  map } from 'rxjs';
import { Song } from '../Models/song';


@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  API_URL = "https://erastune-75bd7-default-rtdb.firebaseio.com/"

  
  constructor(private http: HttpClient) { }

  complete_url : string
  API_KEY='AIzaSyADMRev8D_lIqhGLm9HAq0xhVnF5BlBgU0'
  

  getMusicByCountryAndYear(countryCode: String, year: number): Observable<Song[]> {
    this.complete_url = this.API_URL+`${countryCode}/${year}.json`;
    // console.log("accessing DATA  on url "+this.complete_url)
    const headers = new HttpHeaders({
      'key' : this.API_KEY
    })
    return this.http.get< Song[]>(this.complete_url,{headers})
    
  }

}
