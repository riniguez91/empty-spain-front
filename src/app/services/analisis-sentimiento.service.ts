import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AnalisisSentimientoService {
  sentimentResults: number[];
  constructor(private http: HttpClient) {

  }

  getSentimentResults(): Observable<any> {
    let sentimentUrl = 'http://127.0.0.1:5000/sentimiento';
    let testText = 'No me gusto nada la pelicula! Fue un horror y las escenas eran malisimas';
    return this.http.post(sentimentUrl, testText);
  }
}
