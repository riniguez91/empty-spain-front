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
    return this.http.get("localhost:5000/sentimiento");
  }
}
