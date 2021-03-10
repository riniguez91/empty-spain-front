import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AnalisisSentimientoService {
  constructor(private http: HttpClient) { }

  /**
   * @param message 
   * Using message and sentimentUrl parameters calls API function using POST
   * @returns sentiment analysis result 
   */
  processText(message: String): Observable<any> {
    let sentimentUrl = 'http://127.0.0.1:5000/sentimiento';
    return this.http.post(sentimentUrl, message);
  }
}
