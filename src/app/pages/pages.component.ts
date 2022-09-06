import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { StoreDataService } from '../services/store-data.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  title = 'srmb-SFA';

  constructor(private route: Router,
    private common: CommonService,
    private store: StoreDataService) { }

  element: any;
  mainPath: any;
  schemePath: any;
  pagesPath: any;
  allMasterListType: any = [];

  ngOnInit(): void {
    // let loginData: any = localStorage.getItem("loginData");
    if (this.checkAuthetication()) {
      this.mainPath = this.common.getLayoutHomePath();
      this.schemePath = this.common.getLayoutSchemePath();
      this.pagesPath = this.common.getPagesPath();
      this.getMasterList();
    }
  }

  checkAuthetication() {
    if (localStorage.getItem("AuthUserData") == undefined) {
      this.route.navigate([""]);
      return false;
    } else {
      return true;
    }
  }

  storeDataToLocalhost() {
    let data =
    {
      "firstName": "SANJIT",
      "lastName": "CHATTERJEE",
      "username": "SANJIT",
      "userType": "2",
      "profileImgUrl": "/images/moneyheist1659537590017.jpg",
      "clientId": 1,
      "userId": 7,
      "createdAt": "2022-08-03T14:39:51.000Z",
      "countryId": 1,
      "stateId": 41,
      "districtId": null,
      "cityId": 829,
      "zoneId": null,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJlcXRpbWUiOjE2NTk5NTQ5ODc3NDN9LCJpYXQiOjE2NTk5NTQ5ODd9.gU3lJ7JBvWSGUzaA53fFtfQHiibHSdsQKleEb6S2DQA",
      "clientSettings": [
        {
          "settingsType": "userLimit",
          "settingsValue": "30"
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
    localStorage.removeItem("AuthUserData");
    // localStorage.removeItem("AuthUserData");
    // window.location.href = "http://3.7.173.54/sfaLogin/";
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

  redirect(path: any) {
    this.route.navigate([this.pagesPath + path])
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
