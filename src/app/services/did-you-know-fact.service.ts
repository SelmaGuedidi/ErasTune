import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

//import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class DidyouknowFactService {
  private apiUrl = 'https://api.edenai.run/v2/text/question_answer';
  constructor(private http: HttpClient) {}

  getDidYouKnow(country: string, decade: number): Observable<string> {
    const apiKey: string = process.env['API_KEY'];

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    });

    const data = {
      texts: [
        "You are an expert of music history",
      ],
      temperature: 0.8,
      examples: [
        ["Give me a super brief  and fun 'did you know fact' about music in France between 1990 and 1999", "Did you know that in 1997, the French electronic music duo Daft Punk released their debut album 'Homework,' which became a groundbreaking and influential work in the electronic music genre? The album featured hits like 'Around the World' and 'Da Funk' and played a significant role in popularizing French house music globally. "],
      ],
      providers: "openai",
      question: `Give me a super brief and fun 'did you know fact' about music in ${country} between ${decade} and ${decade + 9}`,
      examples_context: "the decades are between 1950 and 2010",
      fallback_providers: "",
    };

    return this.http.post<any>(this.apiUrl, data, { headers }).pipe(
      map(response => response.openai.answers[0]),
      catchError(error => {
        console.error(error);
        return 'Unknown';
      })
    );
  }
}
