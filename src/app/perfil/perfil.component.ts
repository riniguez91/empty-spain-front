import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  userCredentials: object;

  constructor(private loginService: LoginService, private router: Router) {

      /* if (!this.userCredentials) this.router.navigate(['/inicio']); */
      this.loginService.getUserCredentials().subscribe(result => this.userCredentials = result);
      
  }

  ngOnInit(): void { }

  tripAdvisorScraper() {
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
