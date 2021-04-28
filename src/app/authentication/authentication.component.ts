import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})

export class AuthenticationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  user_register_success = false;
  subscription: Subscription;

  ngOnInit() : void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(16)]],
      surnames: ['', [Validators.required, Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  } 

  show() {  this.showModal = true; }  // Show-Hide Modal Check 
  
  hide() { this.showModal = false; }  // Bootstrap Modal Close event

  get f() { return this.registerForm.controls; }  // Convenience getter for easy access to form fields

  onRegisterSubmit(f: NgForm) {
    this.loginService.insertUser(f.value).subscribe(
      result => {
        this.user_register_success = !result['success'];
        if (!this.registerForm.invalid && !this.user_register_success) this.showModal = false;
      }
    );
  }

  /**
   * Gets the user credentials from the API
   * 
   * @param f NgForm
   * @return void
   */
  onLoginSubmit(f: NgForm): void {
    this.subscription = this.loginService.updateUserCredentials(f.value).subscribe(
      result => {
        if (result) this.router.navigate(['/perfil']); 
      }
    ); 
  }


}
