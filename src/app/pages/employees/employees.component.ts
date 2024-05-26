/*
 * File: employees.component.ts                                                *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 25                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { Employee } from '../../interfaces/employee';
import { TableModule } from 'primeng/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ColumnProps {
  field: string
  header: string
  sort: boolean
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableComponent, TableModule, HttpClientModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  isDataLoaded: boolean = false

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

  employees: Array<Employee> = []

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.http.get('/assets/constant.json')
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.employees = data;
          this.isDataLoaded = true
        }
    });
  }
}
