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

}
