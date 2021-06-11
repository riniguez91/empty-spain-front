import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  /**
   * Obtain user searches from the endpoint
   * 
   * @return Observable<any>
   */
  userSearchHistory(body: object) {
    return this.http.post(environment.user_searches_url, body);
  }

}
