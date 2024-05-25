/*
 * File: app.routes.ts                                                         *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 25                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeesComponent}
];