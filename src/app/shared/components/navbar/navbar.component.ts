import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  navbarOpen = false;
  profileLink = false;
  dashboardLink = false;
  loggedIn: Observable<boolean>;
  admin: Observable<boolean>;

  constructor(private storageService: StorageService) { }

  /**
   * Subscribe to BehaviouralSubject<boolean> variable in storage service so we can check if the user is logged in and change profile link display according to it
   * 
   * @return void
   */
  ngOnInit(): void { 
    this.storageService.isLoggedIn().subscribe( res => { this.profileLink = res; })
    this.storageService.isAdminLoggedIn().subscribe( res => { this.dashboardLink = res; })
  }

  toggleNavbar(): void { this.navbarOpen = !this.navbarOpen; }
  
  /**
   * Remove current user from localStorage
   * 
   * @return void
   */
  logout(): void { 
    this.storageService.logout(); 
    this.storageService.setLoggedIn(false);
    this.storageService.setAdminLoggedIn(false);
  }
}
