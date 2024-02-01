import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import axios from "axios";
import { environment } from 'src/environments/environment';
// import ChatGPT from "chatgpt-api";

@Injectable({
  providedIn: 'root'
})

export class DidyouknowFactService {
  constructor() {}

  
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
  async getDidYouKnow(country: string, decade:number): Promise<string> {
    

    const apiKey: string = environment.API_KEY;
   // console.log("here",`Bearer ${apiKey}`)
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/question_answer",
      headers: {
        authorization: `Bearer ${apiKey}`,
      },
      data: {
        texts: [
          "You are an expert of music history",
        ],
        temperature: 0.8,
        examples: [
          ["Give me a super brief  and fun 'did you know fact' about music in France between 1990 and 1999", "Did you know that in 1997, the French electronic music duo Daft Punk released their debut album 'Homework,' which became a groundbreaking and influential work in the electronic music genre? The album featured hits like 'Around the World' and 'Da Funk' and played a significant role in popularizing French house music globally. "],
        ],
        providers: "openai",
        question: `Give me a super brief and fun 'did you know fact' about music in `+country+ `between ${decade} and ${decade+9}`,
        examples_context: "the decades are between 1950 and 2010",
        fallback_providers: "",
      },
    };
    
    try {
      const response = await axios.request(options);
      //console.log(response.data["openai"]["answers"][0]);
      return response.data["openai"]["answers"][0];
    } catch (error) {
      console.error(error);
      return "Unknown";
    }
  }
}
