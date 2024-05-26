/*
 * File: add-employee.component.ts                                             *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 26                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { Component } from '@angular/core';
import { NumberOnlyDirective } from '../../directives/number-only.directive';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [NumberOnlyDirective],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  title: string = 'Add Employee'
}
