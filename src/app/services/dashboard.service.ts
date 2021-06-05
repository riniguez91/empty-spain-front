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

}
