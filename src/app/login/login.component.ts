import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any = '';
  password: any = '';
  notifier: NotifierService;

  constructor(
    notifier: NotifierService,
    private router: Router,
    private rest: LoginService) {
    this.notifier = notifier
  }

  ngOnInit(): void {
    if (localStorage.getItem("AuthUserData") != undefined) {
      this.router.navigate(["/pages/user/dashboard"]);
      // alert("Not Find")
    }
  }
  title = 'sfaLogin';

  signIn() {
    if (this.email.trim() === '' || this.password === '') {
      this.notifier.notify('error', 'Please enter Email and password');
      return;
    }
    const data = {
      email: this.email,
      password: this.password,
      platform : "web",
      deviceId : "",
      fcmToken : "",
      businessType  : "2"
    };
    this.rest.signInV2(data).subscribe((res: any) => {
      if (res.success) {
        console.log("response Login===>", res)
        localStorage.setItem("AuthUserData", JSON.stringify(res.response[0]));
        this.router.navigate(["/pages/user/dashboard"]);

      } else {
        this.notifier.notify('error', res.message);
      }
    }
    );
  }

  goToTermsAndConditions() {
    this.router.navigate(["/terms-and-conditions"])
  }

  goToPolicy() {
    this.router.navigate(["/privacy-policy"])
  }

}
