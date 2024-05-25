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

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RupiahPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  @Input() title: string = ''
  @Input() tableColumns: Array<any> = []
  @Input() tableData: Array<any> = []
  @Input() itemsPerPage: number = 0

  totalItems: number = 0
  totalPages: number = 0
  currentPage: number = 0
  displayedPages: number[] = []
  searchText = ''
  filteredData: any = []
  displayedData: any = []

  ngOnInit(): void {

    this.currentPage = 1
    this.filteredData = this.tableData
    this.updateDisplayedData()
  }

  getDisplayedPageNumbers(): number[] {
    const totalPageNumbers = Math.min(this.totalPages, 5)
    const displayedPageNumbers: number[] = [];

    let startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + totalPageNumbers - 1);
    startPage = Math.max(1, endPage - totalPageNumbers + 1);

    if (startPage > 1) {
        displayedPageNumbers.push(1);
        if (startPage > 2) {
            displayedPageNumbers.push(-1);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        displayedPageNumbers.push(i);
    }

    if (endPage < this.totalPages) {
        if (endPage < this.totalPages - 1) {
            displayedPageNumbers.push(-1);
        }
        displayedPageNumbers.push(this.totalPages);
    }

    return displayedPageNumbers;
  }


  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.displayedData = this.filteredData.slice(startIndex, endIndex)
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
          this.updateDisplayedData();
      }
  }

  nextPage() {
      if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.updateDisplayedData();
      }
  }

  filterData() {
    this.filteredData = this.tableData.filter((item: any) => {
        return this.tableColumns.some((column) =>
            String(item[column]).toLowerCase().includes(this.searchText.toLowerCase())
        )
    })
    this.currentPage = 1
    this.updateDisplayedData()
  }
}
