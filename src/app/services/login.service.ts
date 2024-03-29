import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

}