import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../../services/employee';
import { HttpParams } from '@angular/common/http';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { statusEmployee } from '../../../../model/model-employee';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-employees',
  imports: [DatePipe, DecimalPipe, FormsModule],
  templateUrl: './list-employees.html',
  styleUrl: './list-employees.css'
})
export class ListEmployees implements OnInit {
  @ViewChild('closeModal') closeModal: any;

  employees: any;
  p: number = 1;
  perpage: any = 10;
  totalpage: number = 0;

  numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  status = statusEmployee;

  username: any;
  statusSelected: any;
  idEmployee: any;

  enableData: boolean = false;
  totalData: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  setFormatNumber(num: any) {
    const currentnum = num.split('.');
    currentnum[0] = currentnum[0].replace(/,/g, '.');
    return currentnum.join(',');
  }

  setId(id: any) {
    sessionStorage.setItem('id', id);
  }

  getEmployees() {
    let params = new HttpParams()
    params = params.append('page', this.p);
    params = params.append('perPage', this.perpage);
    this.username ? params = params.append('username', this.username) : '';
    this.statusSelected ? params = params.append('status', this.statusSelected) : '';
    this.employeeService.getAllEmployee(params).subscribe({
      next: (res: any) => {
        this.employees = res.data;
        this.totalData = res.total;

        if (res.total == 1) {
          this.enableData = true;
          this.idEmployee = res.data[0].id;
        }
        this.totalpage = Math.ceil(res.total / this.p);
      }
    })
  }

  deleteEmployee() {
    sessionStorage.getItem('id') ?
      this.employeeService.deleteEmployee(sessionStorage.getItem('id')).subscribe({
        next: (res: any) => {
          sessionStorage.removeItem('id');
          this.closeModal.nativeElement.click();
          this.getEmployees();
        }
      }) : '';
  }

  // searchEmployee() {


  //   this.employeeService.searchEmployee(params).subscribe({
  //     next: (res: any) => {
  //       this.employees = res.data;
  //       this.totalData = res.total;

  //       if (res.total == 1) {
  //         this.enableData = true;
  //         this.idEmployee = res.data[0].id;
  //       }
  //       this.totalpage = Math.ceil(res.total / this.p);
  //     }
  //   })
  // }

  resetFilter() {
    this.username = null;
    this.statusSelected = null;
  }

  getPerPage(e: any) {
    this.p = 1;
    this.perpage = e.target.value;
    this.getEmployees();
  }

  nextPage(e: any) {
    this.p = e + 1;
    this.getEmployees();
  }

  prevPage(e: any) {
    this.p = e - 1;
    this.getEmployees();
  }

  routePage(act: any, id: any) {
    if (act == 'create') {
      this.router.navigate([`/admin/employee/${act}/new`]);
    }
    else if (act == 'detail') {
      this.router.navigate([`/admin/employee/${act}/${id}`], { state: { username: this.username, status: this.statusSelected } });
    }
    else if (act == 'update') {
      this.router.navigate([`/admin/employee/${act}/${id}`]);

    }
  }
}
