import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { Session } from 'src/app/models/session.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  session: Session;
  userCredentials: User;

  constructor(private loginService: LoginService, private storageService: StorageService) { }

  /**
   * Load session and user data on component load
   * 
   * @return void
   */
  ngOnInit(): void { 
    this.session = this.storageService.loadSessionData();
    this.userCredentials = this.session['user'];
  }

  /**
   * Remove current user from localStorage and logout 
   * 
   * @return void
   */
  logout(): void { this.storageService.logout(); }

  /**
   * TEST FUNCTION!! (Inserts tripadvisor information on the database)
   * 
   * @return void
   */

  tripAdvisorScraper(): void {
    var defaultName = 'Madrid';
    this.loginService.getTripAdvisorJson(defaultName).subscribe(result => {
      var json = {
        'tripadvisor_info': JSON.stringify(result),
        'search_date': '2021-04-26 13:23:12',
        'municipio_id': '1001',
        'usuario_id': '1'
      }
      this.loginService.insertTripAdvisor(json).subscribe(result => console.log(result));
    })
  }



}
