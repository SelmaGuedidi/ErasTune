import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, take } from 'rxjs/operators';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyapiService {
  private readonly tokenEndpoint: string = 'https://accounts.spotify.com/api/token';
  private readonly spotifyApiUrl: string = 'https://api.spotify.com/v1/search';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  private getAccessToken(): Observable<string> {
    if (!this.token) {
      const SPOTIFY_CLIENT_ID = `${process.env['SPOTIFY_CLIENT_ID']}`;
      const SPOTIFY_API_KEY = `${process.env['SPOTIFY_API_KEY']}`;
      const authHeader = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_API_KEY}`);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authHeader}`,
      });

      const body = new URLSearchParams();
      body.set('grant_type', 'client_credentials');

      return this.http
        .post<any>(this.tokenEndpoint, body.toString(), { headers })
        .pipe(
          switchMap((response) => {
            this.token = response.access_token;
            return of(this.token);
          }),
          catchError((error) => {
            throw error;
          })
        );
    } else {
      return of(this.token);
    }
  }
  search(query: string,typeofsearch:string): Observable<any>{
    return this.getAccessToken().pipe(
      take(1),
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        const params = {
          q: query,
          type: typeofsearch,
          limit: 1,
        };

        return this.http.get<any>(this.spotifyApiUrl, { headers, params });
      })
    );
  }
  searchAlbum(query: string): Observable<any> {
    return this.search(query,'album')
  }

  searchArtist(query: string): Observable<any> {
    return this.search(query,'artist')
}
}
