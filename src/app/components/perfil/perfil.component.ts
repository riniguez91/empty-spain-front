import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { Session } from 'src/app/models/session.model';
import { User } from 'src/app/models/user.model';
import { throwError } from 'rxjs';

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
   * Adds all the scrapper info in the db
   * 
   * @param municipio_id number
   * @param usuario_id number {optional}
   * @return void
   */
  addSearch(): void {
    var municipioName = 'Madrid';
    var municipioId = 1001;
    var userId;
    this.loginService.getTripAdvisorJsonV2(municipioName).subscribe(result => {
      var json = {
        'tripadvisor_info': JSON.stringify(result),
        'municipio_id': municipioId
      }
      if (userId) json['usuario_id'] = userId;
      this.loginService.getTwitterJson(municipioName).subscribe(result => {
        json['twitter_info'] = JSON.stringify(result);
        this.loginService.getTiempoJson(municipioName).subscribe(result => {
          json['tiempo_info'] = JSON.stringify(result);
          this.loginService.getWikiJson(municipioName).subscribe(result => {
            json['wiki_info'] = JSON.stringify(result);
            this.loginService.addSearch(json).subscribe(
              result =>  console.log(result),
              err => throwError(err)
              );
          })
        })
      })
    })
  }



}
