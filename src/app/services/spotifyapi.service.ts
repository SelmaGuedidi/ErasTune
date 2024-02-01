import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { SPOTIFY_API_KEY, SPOTIFY_CLIENT_ID } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class SpotifyapiService {
  private readonly tokenEndpoint: string = 'https://accounts.spotify.com/api/token';
  private readonly spotifyApiUrl: string = 'https://api.spotify.com/v1/search';

  constructor(private http: HttpClient) {}
  getAccessToken(): Observable<string> {
    const authHeader = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_API_KEY}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authHeader}`,
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    return this.http.post<any>(this.tokenEndpoint, body.toString(), { headers }).pipe(
      map(response => response.access_token),
      catchError(error => {
        throw error;
      })
    );
  }
  searchAlbum(query: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
    });

    const params = {
      q: query,
      type: 'album',
      limit: 1,
    };

    return this.http.get<any>(this.spotifyApiUrl, { headers, params });
  }

  searchArtist(query: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
    });

    const params = {
      q: query,
      type: 'artist',
      limit: 1,
    };

    return this.http.get<any>(this.spotifyApiUrl, { headers, params });
  }

}
