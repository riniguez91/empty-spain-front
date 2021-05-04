import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) { }

  canActivate() {
    // Logged in so return true
    if (this.storageService.loadSessionData()) return true;

    // Not logged in so redirect to login page
    this.router.navigate(['/authentication']);
    return false;

  }
  
}
