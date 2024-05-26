/*
 * File: layout.component.ts                                                   *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 26                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
