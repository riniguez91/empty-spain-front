import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private currentSession: Session = null;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { if (this.loadSessionData()) this.setLoggedIn(true); }

  /**
   * Returns loggedIn: BehaviourSubject<boolean> as an observable
   * 
   * @returns Observable<boolean>
   */
  isLoggedIn(): Observable<boolean> { return this.loggedIn.asObservable(); }

  /**
   * Sets the next value in the BehaviourSubject<boolean> to be emitted to its subscriptions
   * 
   * @param bool: boolean
   */
  setLoggedIn(bool: boolean): void { this.loggedIn.next(bool); }

  /**
   * Sets the current session in localStorage 
   * 
   * @param session: Session
   */
  setCurrentSession(session: Session): void {
    this.currentSession = session;
    localStorage.setItem('currentUser', JSON.stringify(session));
  }

  /**
   * Returns current session info
   * 
   * @returns Session
   */
  getCurrentSession(): Session { return this.currentSession; }

  /**
   * Gets current session info from localStorage and returns null or Session object
   * 
   * @returns Session | null
   */
  loadSessionData(): Session {
    var sessionStr = localStorage.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  /**
   * Cleans currentUser from localStorage and navigates page to /authentication
   * 
   * @returns void
   */
  logout() : void {
    localStorage.removeItem('currentUser');
    this.currentSession = null;
    this.router.navigate(['/authentication']);
  }



}
