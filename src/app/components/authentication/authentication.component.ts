import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/user.model';
import { Session } from 'src/app/models/session.model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})

export class AuthenticationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private storageService: StorageService) { }

  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  userRegisterSuccess = false;
  validLoginEmail = true;
  validLoginPassword = true;
  validRegisterEmail = true;
  validRegisterPassword = true;
  validRegisterName = true;
  validRegisterSurnames = true;
  invalidLogin = false;
  invalidRegister = false;

  ngOnInit() : void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(8)]],
      surnames: ['', [Validators.required, Validators.maxLength(24)]],
      password: ['', [Validators.required, Validators.maxLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  } 

  show() {  this.showModal = true;  this.submitted = false};  // Show-Hide Modal Check 
  
  hide(registerform) { 
    //console.log(!registerform.invalid);
    if (!registerform.invalid){this.close()}
  }
  
  close() {this.showModal = false;}

  get f() { return this.registerForm.controls;}  // Convenience getter for easy access to form fields


  /**
  * Register the user inside the database
  *  
  * @param f NgForm 
  * @return void
  */
  onRegisterSubmit(f: NgForm): void {
    this.validRegisterEmail = f.form.controls['email'].valid;
    this.validRegisterPassword = f.form.controls['password'].valid;
    this.validRegisterName= f.form.controls['name'].valid;
    this.validRegisterSurnames= f.form.controls['surnames'].valid;
    if (this.validRegisterEmail && this.validRegisterName && this.validRegisterPassword && this.validRegisterSurnames){
    this.loginService.insertUser(f.value).subscribe(
      result => {
        this.userRegisterSuccess = !result['success'];
        if (!this.registerForm.invalid && !this.userRegisterSuccess) this.showModal = false;
      }
    );}
  }

  /**
   * Sets the user credentials from the API inside sessionStorage
   * 
   * @param f NgForm
   * @return void
   */
  onLoginSubmit(f: NgForm): void {
    this.validLoginEmail = f.form.controls['email'].valid;
    this.validLoginPassword = f.form.controls['password'].valid;
    if (this.validLoginEmail && this.validLoginPassword) {
      this.loginService.login(f.value).subscribe(
        result => { 
          var user = new User(result['name'], result['surnames'], result['role']);
          var session = new Session(result['access_token'], user);
          this.storageService.setCurrentSession(session);
          this.storageService.setLoggedIn(true);
          this.router.navigate(['/perfil']); 
        },
        err => { 
          this.invalidLogin = true;
          throwError(err);
        }
      );
    } 
  }


}
