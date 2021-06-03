import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) { }

  canActivate() {
    // Check if there is a session
    let session = this.storageService.loadSessionData();
    if (session) { 
      let adminToken = jwtDecode(session['access_token']);
      if (adminToken['is_admin']) return true;
    }
    this.router.navigate(['/inicio'])
    return false;
  }
  
}
