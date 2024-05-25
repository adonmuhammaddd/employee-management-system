/*
 * File: employees.component.ts                                                *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 25                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { Employee } from '../../interfaces/employee';
import { Employees } from '../../../assets/constant';

interface ColumnProps {
  name: string
  sort: boolean
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  column: Array<ColumnProps> = [
    { name: "username", sort: true },
    { name: "firstName", sort: true },
    { name: "lastName", sort: true },
    { name: "email", sort: true },
    { name: "birthDate", sort: true },
    { name: "basicSalary", sort: true },
    { name: "status", sort: true },
    { name: "group", sort: true },
    { name: "description", sort: true }
  ]

  employees: Array<Employee> = Employees
}
