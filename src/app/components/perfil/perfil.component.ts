import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Session } from 'src/app/models/session.model';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  session: Session;
  userCredentials: User;
  userId: number;
  searchedTowns: object;

  constructor(private profileService: ProfileService, private storageService: StorageService) { }

  /**
   * Load session and user data on component load
   * 
   * @return void
   */
  ngOnInit(): void { 
    this.session = this.storageService.loadSessionData();
    this.userCredentials = this.session['user'];
    // Load the HTML inside the component
    this.paintSearchHistory()
  }

  paintSearchHistory() {
    this.userId = this.session ? jwtDecode(this.session['access_token'])['sub'] : null;
    let body = {"user_id" : this.userId}
    this.profileService.userSearchHistory(body).subscribe(
      result => { 
        this.searchedTowns = result;
        // Cast the object to an array so we can obtain its .length attribute
        let len = <Array<any>>this.searchedTowns;
        // Parse wiki_info JSON
        for (let i = 0; i < len.length; i++) 
          this.searchedTowns[i].wiki_info = JSON.parse(this.searchedTowns[i].wiki_info);
      }
    )
  }

  /**
   * Remove current user from localStorage and logout 
   * 
   * @return void
   */
  logout(): void { this.storageService.logout(); }

}
