import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './services/common.service';
import { StoreDataService } from './services/store-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'srmb-SFA';

  constructor(private route: Router,
    private common: CommonService,
    private store: StoreDataService) { }

  element: any;
  mainPath: any;
  schemePath: any;
  allMasterListType: any = [];

  ngOnInit(): void {
    this.mainPath = this.common.getLayoutHomePath();
    this.schemePath = this.common.getLayoutSchemePath();
    this.getMasterList();

    this.storeDataToLocalhost();
  }

  storeDataToLocalhost() {
    let data = {
      "firstName": "SRMB",
      "lastName": "Admin",
      "username": "Admin",
      "userType": "1",
      "profileImgUrl": null,
      "clientId": 1,
      "userId": 2,
      "createdAt": "2022-05-27T12:47:25.000Z",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJlcXRpbWUiOjE2NTk1MDY2NzM1ODh9LCJpYXQiOjE2NTk1MDY2NzN9.MaDQUtoMqDxPPnlzBaKNtmTQqd_OvJ-hCM1DK0nDaL0",
      "clientSettings": [
          {
              "settingsType": "userLimit",
              "settingsValue": "10"
          },
          {
              "settingsType": "systemApprovalRequired",
              "settingsValue": "1"
          },
          {
              "settingsType": "opportunityAsSales",
              "settingsValue": "0"
          },
          {
              "settingsType": "productListing",
              "settingsValue": "0"
          },
          {
              "settingsType": "hasCRM",
              "settingsValue": "1"
          },
          {
              "settingsType": "hasSFA",
              "settingsValue": "1"
          }
      ]
  }

    localStorage.setItem("AuthUserData", JSON.stringify(data));
  }


  openNav() {
    this.element = document.getElementById("sidebar");
    // console.log("My nav::", this.element)
    this.element.classList.toggle("collapsed");
  }

  logout() {
    this.route.navigate([""]);
  }

  goTo(path: any) {
    this.route.navigate([this.mainPath + path])
  }

  goToMasterType(data: any) {
    this.store.addMasterType(data);
    this.route.navigate([this.mainPath + 'master/' + data.id]);
  }

  goToScheme(path: any) {
    this.route.navigate([this.schemePath + path])

  }

  redirect(path:any){
    this.route.navigate(["/"+path])
  }

  getMasterList() {
    let obj = {
      contactType: "1",
      clientId: "1"
    }
    this.common.getCustomerType(obj).subscribe(res => {
      // console.log("customer Type response::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.customerType.length > 0) {
          let arr = res.data.customerType;
          if (arr.length > 0) {
            arr.map((data: any) => {
              this.allMasterListType.push({
                id: data.contactTypeId,
                name: data.contactTypeName
              })
            })
          }
          // console.log("allMasterListType::", this.allMasterListType)
        } else {
          this.allMasterListType = [];
        }
      }

    })
  }
}
