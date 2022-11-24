import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  constructor(
    private router: Router,
    private common: CommonService
  ) { }
  policyHtmlData: any;

  ngOnInit(): void {
    this.getPolicyData();
  }

  getPolicyData() {
    let req = {
      policyType: "termCondition",
      appIndex: "1"
    }
    this.common.getApplicationPolicyHTML(req).subscribe((res: any) => {
      // console.log("Privacy policy response", res);
      if (res.error == 0) {
        this.policyHtmlData = res.data.body;
      }
    })
  }

  goToPolicy() {
    this.router.navigate(["/privacy-policy"])
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }



}
