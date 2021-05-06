import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) { }

  canActivate() {
    // Logged in so return false
    if (this.storageService.loadSessionData()) {
      this.router.navigate(['/perfil']);
      return false;
    }

    // Not logged in so just return true and allow access
    return true;
  }
  
}
