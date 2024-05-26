/*
 * File: login.component.ts                                                    *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 26                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { LoginProps } from '../../../interfaces/auth';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AppComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  submitted: boolean = false
  authenticated?: boolean = true

  credential: LoginProps = {
    email: "",
    password: ""
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(this.credential.email),
    password: new FormControl(this.credential.password),
  });

  constructor(
    private authService: AuthService,
    private globalService: GlobalService,
    private router: Router,
    public app: AppComponent,
    private fb: FormBuilder
  ){
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.required,
        Validators.email
      ],
      password: [
          '',
          Validators.required
      ],
    })
  }

  ngOnInit(): void {
    this.checkLoggedUser()
    console.log("this.authenticated ==========> ", this.authenticated)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  checkLoggedUser() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["employees"])
    }
  }

  signin() {
    this.submitted = true
    console.log("this.credential ==============> ", this.credential)
    if (this.loginForm.invalid) {
      this.globalService.setTinyAlert(2000, 'top-end', 'error', 'Please fill in the email and password')
      return;
    } else {
      if (this.authService.login(this.credential)) {
        this.authenticated = true
        this.globalService.setTinyAlert(2000, 'top-end', 'success', 'Success Login')
      } else {
        this.authenticated = false
        this.globalService.setTinyAlert(2000, 'top-end', 'error', 'Invalid email or password')
      }
    }
  }
}
