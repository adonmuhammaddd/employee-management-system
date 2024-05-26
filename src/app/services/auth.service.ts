/*
 * File: auth.service.ts                                                       *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 26                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import { LoginProps } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private globalService: GlobalService,
    private router: Router
  ) { }


  isLoggedIn() {
    if (this.globalService.getStorageData('logged_user')) {
        return true
    } else {
        this.globalService.removeStorageData('logged_user')
        this.globalService.removeStorageData('user_privilege')
        this.router.navigate(["login"])
        return false
    }
  }

  login(credential: LoginProps) {
    if (credential.email === 'adon@mail.com' && credential.password === 'passw0rd') {
      this.globalService.saveEncryptStorageData('logged_user', JSON.stringify(credential))
      this.router.navigate(['employees'])
      return true
    } else {
      console.log('Not Authenticated')
      return false
    }
  }

  logout() {
    this.globalService.removeStorageData('logged_user')
    this.router.navigate(['login'])
  }
}
