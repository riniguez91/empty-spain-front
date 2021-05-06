import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  navbarOpen = false;
  profileLink = false;
  loggedIn: Observable<boolean>;

  constructor(private storageService: StorageService) { }

  /**
   * Subscribe to BehaviouralSubject<boolean> variable in storage service so we can check if the user is logged in and change profile link display according to it
   * 
   * @return void
   */
  ngOnInit(): void { this.storageService.isLoggedIn().subscribe( res => {console.log(res); this.profileLink = res;}) }

  toggleNavbar(): void { this.navbarOpen = !this.navbarOpen; }

  /**
   * Remove current user from localStorage
   * 
   * @return void
   */
  logout(): void { 
    this.storageService.logout(); 
    this.storageService.setLoggedIn(false);
  }
}
