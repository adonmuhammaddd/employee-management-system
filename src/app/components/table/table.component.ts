/*
 * File: table.component.ts                                                    *
 * Project: employee-management-system                                         *
 * Created Date: 2024 May 25                                                   *
 * Author: Adon Muhammad                                                       *
 * -----                                                                       *
 * Copyright (c) 2024 adonmuhammaddd                                           *
 * -----                                                                       *
 */



import { Component, Input, OnInit } from '@angular/core';
import { RupiahPipe } from '../../pipes/rupiah.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RupiahPipe, FormsModule, CommonModule, ModalComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  @Input() tableColumns: Array<any> = []
  @Input() tableData: Array<any> = []
  @Input() itemsPerPage: number = 0
  @Input() countEntries: number[] = []

  totalItems: number = 0
  totalPages: number = 0
  currentPage: number = 0
  displayedPages: number[] = []
  searchText = ''
  filteredData: any = []
  displayedData: any = []
  sortColumn: string | null = null
  sortDirection: 'asc' | 'desc' | null = null

  constructor(
    private globalService: GlobalService
  ){}

  ngOnInit(): void {

    this.currentPage = 1
    this.filteredData = this.tableData
    this.updateDisplayedData()
  }

  getDisplayedPageNumbers(): number[] {
    const totalPageNumbers = Math.min(this.totalPages, 5)
    const displayedPageNumbers: number[] = []

    let startPage = Math.max(1, this.currentPage - 2)
    const endPage = Math.min(this.totalPages, startPage + totalPageNumbers - 1)
    startPage = Math.max(1, endPage - totalPageNumbers + 1)

    if (startPage > 1) {
        displayedPageNumbers.push(1);
        if (startPage > 2) {
            displayedPageNumbers.push(-1)
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        displayedPageNumbers.push(i)
    }

    if (endPage < this.totalPages) {
        if (endPage < this.totalPages - 1) {
            displayedPageNumbers.push(-1)
        }
        displayedPageNumbers.push(this.totalPages)
    }

    return displayedPageNumbers
  }

  actionValidate(action: string, data: any) {
    if (action === 'delete') {
      this.globalService.setConfirmationAlert(
        action,
        'You will be delete '+data.firstName+' '+data.lastName+'!',
        '#d33'
      )
    } else {
      this.globalService.setConfirmationAlert(
        action,
        'You will be edit '+data.firstName+' '+data.lastName+'!',
        '#f90'
      )
    }
  }

  onEntriesChange() {
    this.updateDisplayedData()
  }

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.displayedData = this.filteredData.slice(startIndex, endIndex)
    console.log("this.displayedData ===========> ", this.displayedData)
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage)
    this.displayedPages = this.getDisplayedPageNumbers()
    this.totalItems = this.filteredData.length
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedData();
  }

  previousPage() {
      if (this.currentPage > 1) {
          this.currentPage--;
          this.updateDisplayedData()
      }
  }

  nextPage() {
      if (this.currentPage < this.totalPages) {
          this.currentPage++
          this.updateDisplayedData()
      }
  }

  filterData() {
    this.filteredData = this.tableData.filter((item: any) => {
        return this.tableColumns.some((column) =>
            String(item[column.field]).toLowerCase().includes(this.searchText.toLowerCase())
        )
    })
    this.currentPage = 1
    this.updateDisplayedData()
  }

  sort(column: string) {
    if (this.sortColumn === column) {
        // If the same column is clicked again, toggle the sort direction
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        // If a different column is clicked, set the sort column and default to ascending sort direction
        this.sortColumn = column
        this.sortDirection = 'asc'
    }

    // Sort the data based on this.sortColumn and this.sortDirection
    this.filteredData.sort((a: any, b: any) => {
        const valueA = a[column].toLowerCase()
        const valueB = b[column].toLowerCase()
        let comparison = 0;

        if (valueA > valueB) {
            comparison = 1
        } else if (valueA < valueB) {
            comparison = -1
        }

        return this.sortDirection === 'asc' ? comparison : -comparison
    });

    // After sorting, update the displayed data and pagination
    this.currentPage = 1;
    this.updateDisplayedData();

    // Reset the sort direction for inactive columns
    Object.keys(this.tableColumns).forEach((key: any) => {
        if (key !== column) {
            this.tableColumns[key] = ''
        }
    });
  }
}
