import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})

export class AuthenticationComponent implements OnInit {

  /*   constructor() { }
  
    ngOnInit(): void { }
  
    onSubmit(f: NgForm) {
      console.log(f.value);
    } */


  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }
  show() {
    this.showModal = true; // Show-Hide Modal Check 
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(16)]],
      surnames: ['', [Validators.required, Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],

    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit(f: NgForm) {
    console.log(f.value)
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.showModal = false;
    }

  }


}
