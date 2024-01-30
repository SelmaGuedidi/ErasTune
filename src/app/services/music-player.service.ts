import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  API_URL = "http://localhost:3000/"
  constructor(private http: HttpClient) { }

  complete_url : string
  

  getMusicByCountryAndYear(countryCode: string, year: number): Observable<any> {
    this.complete_url = this.API_URL+countryCode+'/'+year
    console.log("accessing DATA  on url "+this.complete_url)
    return this.http.get<any>(this.complete_url)
    
  }




}
