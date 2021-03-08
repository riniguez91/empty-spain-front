import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AnalisisSentimientoService {
  sentimentResults: number[];
  constructor() {

  }

  getSentimentResults(): Observable {
    return this.HttpClient.get("localhost:5000/sentimiento");
  }
}
