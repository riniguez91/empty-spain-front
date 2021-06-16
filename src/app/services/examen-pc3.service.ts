import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenPc3Service {

  constructor(private http: HttpClient) { }

  getTwitter(body: object) {
    return this.http.post(environment.twitter_url, body);
  }

  getTwitterExamen(body: object) {
    return this.http.post(environment.twitter_examen_url, body);
  }

}
