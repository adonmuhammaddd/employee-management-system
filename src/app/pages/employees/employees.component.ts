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
import { TableModule } from 'primeng/table';

interface ColumnProps {
  field: string
  header: string
  sort: boolean
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableComponent, TableModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  columns: Array<ColumnProps> = [
    { field: "username", header: "Username", sort: true },
    { field: "firstName", header: "First Name", sort: true },
    { field: "lastName", header: "Last Name", sort: true },
    { field: "email", header: "Email", sort: true },
    { field: "birthDate", header: "Birth Date", sort: true },
    { field: "basicSalary", header: "Basic Salary", sort: true },
    { field: "status", header: "Status", sort: true },
    { field: "group", header: "Group", sort: true },
    { field: "description", header: "Description", sort: true }
  ]

  employees: Array<Employee> = Employees
}
