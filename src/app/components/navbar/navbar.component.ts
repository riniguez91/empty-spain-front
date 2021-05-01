import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  navbarOpen = false;
  profileLink = false;

  userCredentials: object;
  observable: Observable<any>;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void { if (sessionStorage.getItem('user')) this.profileLink = true; }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
