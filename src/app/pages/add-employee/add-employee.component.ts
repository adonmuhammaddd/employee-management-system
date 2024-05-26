/*
 * File: add-employee.component.ts                                             *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 26                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { Component, OnInit } from '@angular/core';
import { NumberOnlyDirective } from '../../directives/number-only.directive';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Group } from '../../interfaces/employee';
import { CommonModule, Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import moment from 'moment';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [NumberOnlyDirective, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  maxDate = moment().format('YYYY-MM-DD')
  maxDateDesc = moment().format('YYYY-MM-DD HH:mm:ss')

  title: string = 'Add Employee'

  groups: Group[] = []

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    birthDate: new FormControl(''),
    basicSalary: new FormControl(''),
    status: new FormControl(''),
    group:  new FormControl(''),
    description: new FormControl('')
  })

  submitted = false

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _location: Location,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.http.get('/assets/group-constant.json')
      .subscribe({
        next: (data: any) => {
          console.log(data)
          this.groups = data
        }
    })

    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        birthDate: ['', Validators.required],
        basicSalary: ['', Validators.required],
        status: ['', Validators.required],
        group: ['', Validators.required],
        description: ['', Validators.required]
      }
    )
  }


  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls
  }

  onSubmit(): void {
    this.submitted = true

    if (this.registerForm.invalid) {
      return
    } else {
      this.globalService.setConfirmationAlert(
        'submit',
        'You will be save this record!',
        '#006'
      )
    }
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

  back() {
    this._location.back()
  }

}
