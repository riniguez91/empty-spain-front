import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

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

  constructor(private loginService: LoginService) {

    /* if (!this.userCredentials) this.router.navigate(['/inicio']); */
    this.observable = this.loginService.getUserCredentials();
    if (this.observable) this.observable.subscribe(result => {
      console.log(result);
      this.profileLink = true
    }
    );
    
}

  ngOnInit(): void { }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
