import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private common: CommonService) { }

  email = "";
  password = "";
  isEmailErr = false;
  isPasswordErr = false;

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(["/admin/dashboard"]);
    // let reqObj = {
    //   email: "skh@gmail.com",
    //   password: "password"
    // }
    // this.common.signin(reqObj).subscribe(res => {
    //   console.log("API Response sign in : ", res);
    //   if (res.error == 0 && res.respondcode == 200) {
    //     this.router.navigate(["/admin/dashboard"]);
    //   }
    // })
  }

}
