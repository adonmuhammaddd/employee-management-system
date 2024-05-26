/*
 * File: modal.component.ts                                                    *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 26                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { RupiahPipe } from '../../pipes/rupiah.pipe';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, RupiahPipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  showModal: boolean = false
  employees?: Employee
  firstName?: string
  lastName?: string

  toggleModal(data?: any, firstName?: string, lastName?: string) {
    console.log("data =========> ", data)
    this.showModal = !this.showModal

    this.firstName = firstName
    this.lastName = lastName
    this.employees = data
  }
}
