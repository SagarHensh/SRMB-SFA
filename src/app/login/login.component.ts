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
  }
  title = 'sfaLogin';

  signIn() {
    // this.router.navigate(["/pages/user/dashboard"])
    if (this.email.trim() === '' || this.password === '') {
      this.notifier.notify('error', 'Please enter Email and password');
      return;
    }
    const data = {
      email: this.email,
      password: this.password
    };
    this.rest.signIn(data).subscribe((res: any) => {
      // this.common.removeLoaderUni();
      if (res.success) {
        console.log("response Login===>", res)
        // localStorage.setItem('userId', res.response.id);
        // localStorage.setItem('userName', res.response.name);
        localStorage.setItem("AuthUserData", JSON.stringify(res.response[0]))
        this.router.navigate(["/pages/user/dashboard"]);
        // window.location.href="http://3.7.173.54/sfa/";

      } else {
        this.notifier.notify('error', res.message);
      }
    }
    );
  }

}
