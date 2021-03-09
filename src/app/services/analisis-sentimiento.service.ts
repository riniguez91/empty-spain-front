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

  processText(message: String): Observable<any> {
    let sentimentUrl = 'http://127.0.0.1:5000/sentimiento';
    return this.http.post(sentimentUrl, message);
  }
}
