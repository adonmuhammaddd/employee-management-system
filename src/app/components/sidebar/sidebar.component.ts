/*
 * File: sidebar.component.ts                                                  *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 25                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { Component } from '@angular/core'
import { SidebarModule } from 'primeng/sidebar'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ SidebarModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
