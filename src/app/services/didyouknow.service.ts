import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


// import ChatGPT from "chatgpt-api";

@Injectable({
  providedIn: 'root'
})
export class DidyouknowService {
  constructor(private http: HttpClient) {}

  private apiKey = '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'; // Replace with your GPT-3 API key
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  // private chatgpt = new ChatGPT(this.apiKey);

  // public async chat(country: string, decade:number): Promise<string> {
  //   try {
  //     // Use chatgpt.query method with optional parameters
  //     const response = await this.chatgpt.sendPrompt(`Give me a 'did you know fact' about `+country+ `between ${decade} and ${decade+9}`);
  //     // Return the response text
  //     return response.message;
  //   } catch (error) {
  //     // Handle any errors
  //     console.error(error);
  //     return 'Something went wrong.';
  //   }
  // }
  getDidYouKnow(country: string, decade:number): Observable<any> {
    const prompt = `Give me a 'did you know fact' about `+country+ `between ${decade} and ${decade+9}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    const data = {

      prompt,
      // "input":prompt,
      // "model": "text-embedding-ada-002",
      // "encoding_format": "float",
      max_tokens: 150,
    };

    return this.http.post(this.apiUrl, data, { headers });
  }
}
