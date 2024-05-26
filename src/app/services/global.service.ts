/*
 * File: global.service.ts                                                     *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 26                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  key: string = '4d0n'

  constructor() { }

  encrypt(txt: string): string {
    return crypto.AES.encrypt(txt, this.key).toString()
  }
  decrypt(txtToDecrypt: string) {
    return crypto.AES.decrypt(txtToDecrypt, this.key).toString(crypto.enc.Utf8)
  }
  public saveEncryptStorageData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value))
  }
  public saveStorageData(key: string, value: string) {
    localStorage.setItem(key, value)
  }
  public getEncryptedStorageData(key: string) {
    const data = localStorage.getItem(key) || ""
    return this.decrypt(data)
  }
  public getStorageData(key: string) {
    const data = localStorage.getItem(key) || ""
    return data
  }
  public removeStorageData(key: string) {
    localStorage.removeItem(key)
  }
  public clearStorage() {
    localStorage.clear()
  }

  setTinyAlert(duration: number, position: any, icon: any, title: string) {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: duration,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: title
    })
  }

  setConfirmationAlert(action: string, desc: string, confirmBtnColor: string) {
    Swal.fire({
      title: "Are you sure?",
      text: desc,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: confirmBtnColor,
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed && action === 'delete') {
        Swal.fire({
          title: "Deleted!",
          text: "Your data has been deleted.",
          icon: "success"
        })
      }
    })
  }
}
