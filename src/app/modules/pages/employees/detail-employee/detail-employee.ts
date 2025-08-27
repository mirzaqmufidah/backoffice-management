import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { statusEmployee } from '../../../../model/model-employee';
import { groupEmployee } from '../../../../model/model-employee';
import { ToastComponent } from '../../../../model/toast';

import { EmployeeService } from '../../../../services/employee';
@Component({
  selector: 'app-detail-employee',
  imports: [UpperCasePipe, FormsModule, CommonModule, NgSelectModule, RouterModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './detail-employee.html',
  styleUrl: './detail-employee.css'
})
export class DetailEmployee implements OnInit {
  @ViewChild('toast') toast!: ToastComponent;

  act: any;
  id: any;
  tomorrow: any;

  status = statusEmployee;
  employees = groupEmployee;

  selectedEmployee: number | null = null;

  formEmployee = new FormGroup({
    id: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    basicSalary: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    description: new FormControl('')
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    // set date
    const date = new Date();
    this.tomorrow = (new Date(date.getTime() + (24 * 60 * 60 * 1000))).toISOString().split('T')[0];

    // Set format number
    this.formEmployee.get('basicSalary')?.valueChanges.subscribe(value => {
      if (value) {
        const formatted = this.formatAmount(value);
        this.formEmployee.get('basicSalary')?.setValue(formatted, { emitEvent: false });
      }
    });

    this.act = this.route.snapshot.params['action'];
    this.setValidator();
    if (this.act == 'update' || this.act == 'detail') {
      this.id = this.route.snapshot.params['id'];
      this.getEmployeebyId(this.id);
    }
  }

  removeDots(value: string) {
    const amount = value.replace(/\./g, '');
    return amount.replace(',', '.')
  }

  formatAmount(value: string): string {
    // Hapus semua titik dulu
    const raw = value.replace(/\./g, '');
    if (isNaN(Number(raw))) return value;
    return Number(raw).toLocaleString('id-ID'); // contoh: 1000000 -> 1.000.000
  }

  formatAmount1(value: string) {
    if (!value) return value;

    // Step 1: hapus semua spasi
    let raw = value.replace(/\s/g, '');

    // Step 2: deteksi ada koma atau titik untuk desimal
    let parts = raw.split(/[.,]/);

    let integerPart = parts[0].replace(/\./g, ''); // hapus ribuan
    let decimalPart = parts[1] ? parts[1] : '';

    // Step 3: gabungkan lagi dengan titik sebagai desimal
    let num = Number(integerPart + '.' + decimalPart);

    if (isNaN(num)) return value;

    // Step 4: format ulang dengan maksimal 6 desimal
    return num.toLocaleString('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 5
    });
  }

  setValidator() {
    if (this.act === 'update') {
      this.formEmployee.get('id')?.setValidators([Validators.required]);
    } else {
      this.formEmployee.get('id')?.clearValidators();
    }
    // refresh validasi
    this.formEmployee.get('id')?.updateValueAndValidity();
  }

  getEmployeebyId(id: any) {
    this.employeeService.getEmployeebyId(id).subscribe({
      next: (res: any) => {
        this.formEmployee.get('id')?.setValue(res.id);
        this.formEmployee.get('username')?.setValue(res.username);
        this.formEmployee.get('firstName')?.setValue(res.firstName);
        this.formEmployee.get('lastName')?.setValue(res.lastName);
        this.formEmployee.get('birthDate')?.setValue(res.birthDate.split('T')[0]);
        this.formEmployee.get('email')?.setValue(res.email);
        this.formEmployee.get('basicSalary')?.setValue(this.formatAmount1(String(res.basicSalary)), { emitEvent: false });
        this.formEmployee.get('status')?.setValue(res.status);
        this.formEmployee.get('group')?.setValue(res.group);
      }
    })
  }

  createEmployee() {
    let body = this.formEmployee.value;
    const salaryUpdated = this.removeDots(String(this.formEmployee.get('basicSalary')?.value));
    body.basicSalary = salaryUpdated;
    console.log(body);
    this.employeeService.postEmployee(body).subscribe({
      next: async (res: any) => {
        await this.toast.openWithRoute('Created employee successfull', 'warning');
        this.router.navigate([`/admin/employee/all`]);
      },
      error: () => {
        this.toast.open('Failed to create employee', 'danger');
      }
    })
  }

  updateEmployee() {
    const salaryUpdated = this.removeDots(String(this.formEmployee.get('basicSalary')?.value));
    let body = this.formEmployee.value;
    body.basicSalary = salaryUpdated;
    console.log(body);
    this.employeeService.updateEmployee(this.id, body).subscribe({
      next: async (res: any) => {
        await this.toast.openWithRoute('Updated employee successfull', 'warning');
        this.router.navigate([`/admin/employee/all`])
      }
    })

  }

  backTo() {
    // console.log(this.formEmployee.value);
    this.router.navigate(['/admin/employee/all'], { state: { username: history.state['username'], status: history.state['status'], act: this.act } });
  }


}
