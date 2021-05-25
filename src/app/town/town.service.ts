import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
   * Gets information belonging to a specific municipio
   * 
   * @param id number | string
   * @return Observable<any>
   */
  getTown(id: number | string): Observable<any> {
    return this.http.get(environment.municipios_url + '/' + id);
  }
}
