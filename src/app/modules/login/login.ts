import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { userLogin } from '../../model/model-employee';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  dataUserLogin: any = userLogin;
  errorMessage: any;

  constructor(
    private route: Router
  ) { }

  onSubmit() {
    if (this.formLogin.valid) {
      const user = this.dataUserLogin.find((data: any) =>
        data.username == this.formLogin.value.username
      );

      if (!user) {
        this.errorMessage = 'User not found';
      } else if (user.password !== this.formLogin.value.password) {
        this.errorMessage = 'Password incorrect';
      } else {
        this.route.navigate([`/admin`]);
      }

    }
  }
}
