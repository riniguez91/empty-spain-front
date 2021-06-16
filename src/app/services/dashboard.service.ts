import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  /**
   * Returns searched municipios with highlighted
   * 
   * @returns Observable<any>
   */
  municipiosWithHighlighted(): Observable<any> {
    return this.http.get(environment.municipios_with_highlighted_url);
  }

  /**
   * Update highlighted column on busqueda table
   * 
   * @param object JSON containing municipio_id and highlighted fields
   * @returns Observable<any>
   */
  updateHighlighted(body: object): Observable<any> {
    return this.http.post(environment.update_highlighted_url, body);
  }

  /**
   * Obtain top searches from the API server using GET and passing JWT token in its header
   *
   * @return Observable<any>
   */
   topSearches(): Observable<any> {
    return this.http.get(environment.top_searches_url);
  }

  /**
   * Take users from the API server using GET and passing JWT token in its header
   * 
   * @return Observable<any>
   */

   getUsers(): Observable<any> {
    return this.http.get(environment.all_users_url);
  }

  /**
   * Calls reset from the API server using GET and passing JWT token in its header
   * 
   * @returns Observable<any>
   */
  reset(): Observable<any> {
    return this.http.get(environment.reset_ccaa_provincias_municipios_url);
  }

  /**
   * Calls an update to the database of a specified Field in search table using POST 
   * 
   * @param body contains the townId, field to update, and the new content to update in Busqueda table
   * @returns Observable<any>
   */
   updateSearch(body: object): Observable<any> {
    return this.http.post(environment.update_search_url, body);
  }

  /**
   * Deletes a user from the db
   * 
   * @param body
   * @returns Observable<any>
   */
  deleteUser(body: object): Observable<any> {
    return this.http.post(environment.delete_user_url, body);
  }

  /**
   * Updates user credentials in the db
   * 
   * @param body
   * @returns Observable<any>
   */
   updateUser(body: object): Observable<any> {
    return this.http.post(environment.update_user_url, body);
  }


   /** Calls count of Despoblacion and No Despoblacion using GET and passing JWT token in its header
   * 
   * @returns Observable<any>
   */
  getDespoblacion():Observable<any>{ 
    return this.http.get(environment.get_despoblacion_url);
  }

  getTiempoOldJson(city: string){ 
    return this.http.post('http://localhost:5000/scrapers/tiempo_old', city)
  }
  getTiempoJson(city: string){ 
    return this.http.post('http://localhost:5000/scrapers/tiempo', city)
  }

  getTiempoNew(){ 
    return this.http.get('http://localhost:8000/getTiempoNew');
  }

  insertTiempoNew(body: object){ 
    return this.http.post('http://localhost:8000/insertTiempoNew', body);
  }

}
