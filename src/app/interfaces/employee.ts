/*
 * File: employee.ts                                                           *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 25                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



export interface Employee {
  username: string
  firstName: string
  lastName: string
  email: string
  birthDate: string
  basicSalary: number
  status: string
  group: string
  description: string
  [key: string]: any
}
