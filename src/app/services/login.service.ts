import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Allows us to bypass CORS policy on API server
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'localhost:4200',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Obtain user credentials obtained from the API server using POST with the JSON in the body
   * 
   * @param userJsonRequest object
   * @return Observable<any>
   */
  login(userJsonRequest: object): Observable<any> {
    return this.http.post(environment.login_url, userJsonRequest);
  }

  /**
   * Insert user data inside the database
   * 
   * @param userJson object
   * @return Observable<any>
   */
  insertUser(userJson: object) : Observable<any> {
    return this.http.post(environment.register_url, userJson);
  }

  /**
   * Obtains JSON from the tripadvisor scrapper
   * 
   * @returns JSON
   */
  getTripAdvisorJson(city: String): Observable<any> {
    return this.http.post(environment.tripadvisor_scrapper_url, city);
  }

  /**
   * Obtains JSON from the tripadvisor scrapper
   * 
   * @returns JSON
   */
   getTripAdvisorJsonV2(city: String): Observable<any> {
    return this.http.post(environment.tripadvisor_scrapper_url_v2, city);
  }

  /**
   * Obtain JSON from the twitter scrapper
   * 
   * @returns JSON 
   */
  getTwitterJson(city: String): Observable<any> {
    return this.http.post(environment.twitter_scrapper_url, city);
  }

  /**
   * Obtain JSON from the tiempo scrapper
   * 
   * @returns JSON 
   */
   getTiempoJson(city: String): Observable<any> {
    return this.http.post(environment.tiempo_scrapper_url, city);
  }

  /**
   * Obtain JSON from the wiki scrapper
   * 
   * @returns JSON 
   */
   getWikiJson(city: String): Observable<any> {
    return this.http.post(environment.wiki_scrapper_url, city);
  }


  /**
   * Calls add search controller on the API backend and inserts the data in the database
   * (We would need to pass extra db information inside the request, but we will simulate it for now)
   */
  addSearch(json: object): Observable<any> {
    return this.http.post(environment.add_search_url, json);
  }

}
