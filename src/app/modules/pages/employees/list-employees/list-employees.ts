import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../services/employee';
import { HttpParams } from '@angular/common/http';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './list-employees.html',
  styleUrl: './list-employees.css'
})
export class ListEmployees implements OnInit {
  employees: any;
  p: number = 1;
  perpage: number = 10;
  totalpage: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    let params = new HttpParams()
    params = params.append('page', this.p);
    params = params.append('perPage', this.perpage);
    this.employeeService.getAllEmployee(params).subscribe({
      next: (res: any) => {
        this.employees = res.data;
        this.totalpage = Math.ceil(res.total / this.p);
      }
    })
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
  }
}
