import { Injectable } from '@angular/core';
import { API } from '../api-url';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployee(params: HttpParams) {
    return this.http.get(`${API.admin}/employees`, { params: params });
  }

  searchEmployee(params: HttpParams) {
    return this.http.get(`${API.admin}/employees/filter`, { params: params });
  }

  getEmployeebyId(id: any) {
    return this.http.get(`${API.admin}/api/employees/${id}`);
  }

  postEmployee(body: any) {
    return this.http.post(`${API.admin}/api/employees`, body);
  }

  updateEmployee(id: any, body: any) {
    return this.http.put(`${API.admin}/api/employees/${id}`, body);
  }

  deleteEmployee(id: any) {
    return this.http.delete(`${API.admin}/api/employees/${id}`);
  }
}
