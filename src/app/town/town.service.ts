import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class TownService {

  constructor(private http: HttpClient) { }

  /**
   * Get list of all the towns so we can pass them to the search bar
   * 
   * @return Observable<any>
   */
  getMunicipios(): Observable<any> {
    return this.http.get(environment.municipios_url);
  }

  /**
   * Inserts a search inside the search history table
   * 
   * @param body 
   * @returns Observable<any>
   */
  insertUserSearch(body: object): Observable<any> {
    return this.http.post(environment.insert_user_search_url, body);
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
  getTwitterJson_old(city: String): Observable<any> {
    return this.http.post(environment.twitter_scrapper_url_old, city);
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
   * Gets information belonging to a specific municipio
   * 
   * @param id number | string
   * @return Observable<any>
   */
  getTown(id: number): Observable<any> {
    return this.http.get(environment.municipios_url + '/' + id);
  }

  /**
   * Gets the result based on the pre-trained model predictions
   * 
   * @param city 
   * @returns result
   */
  getModelResult(city: string): Observable<any> {
    return this.http.post(environment.model_url, city)
  }

  /**
   * Calls the various scrapers and adds the information in the database
   * 
   * @param json object
   * @return Observable<any> 
   */
   addScrapersTown(json: object) {
    return this.http.post(environment.add_search_url, json);
  }

  /**
   * Obtain highlighted towns from backend
   * 
   * @return Observable<any>
   */
  getHighlightedMunicipios() {
    return this.http.get(environment.highlighted_municipios_url);
  }
  
}
