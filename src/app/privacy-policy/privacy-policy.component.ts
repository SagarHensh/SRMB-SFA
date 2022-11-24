import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private router: Router, private common: CommonService) { }

  policyHtmlData: any;

  ngOnInit(): void {
    this.getPolicyData();
  }
  getPolicyData() {
    let req = {
      policyType: "privacyPolicy",
      appIndex: "1"
    }
    this.common.getApplicationPolicyHTML(req).subscribe((res: any) => {
      // console.log("Privacy policy response", res);
      if (res.error == 0) {
        this.policyHtmlData = res.data.body;
      }
    })
  }

  goToTermsAndConditions() {
    this.router.navigate(["/terms-and-conditions"])
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }

}
