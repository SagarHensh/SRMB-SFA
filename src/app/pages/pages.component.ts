import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { permissionData } from '../commonData';
import { CommonService } from '../services/common.service';
import { CrmService } from '../services/crm.service';
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
    private store: StoreDataService,
    private crm: CrmService) { }

  element: any;
  mainPath: any;
  schemePath: any;
  pagesPath: any;
  allMasterListType: any = [];
  authUserData: any;
  modulePermission: any = {
    "dashboard": 1,
    "analytics": 0,
    "mapAnalytics": 0,
    "advanceAnalytics": 0,
    "buildOwnReport": 0,
    "report": 0,
    "registrationReport": 0,
    "odometerReport": 0,
    "stockReport": 0,
    "surveyReport": 0,
    "csrReport": 0,
    "mapping": 0,
    "calender": 0,
    "activity": 0,
    "enquiries": 0,
    "visits": 0,
    "createPjp": 0,
    "pjpSchedule": 0,
    "visitReport": 0,
    "enquiryReport": 0,
    "branding": 0,
    "expenses": 0,
    "scheme": 0,
    "selfService": 0,
    "attendenceReport": 0,
    "leaveReport": 0,
    "raiseRequest": 0,
    "masterList": 0,
    "employee": 0,
    "dealer": 0,
    "subDealer": 0,
    "distributor": 0,
    "influencer": 0,
    "product": 0,
    "userSettings": 0,
    "remarks": 0,
    "email": 0,
    "contactSync": 0,
    "mailSignature": 0,
    "notification": 0,
    "followUp": 0,
    "tour": 0,
    "feedback": 0,
    "consolidatedReport": 0,
    "privacyPolicy": 0,
    "termsAndCondition": 0
  };
  allNotificationList: any = [];
  totalNotificationCount: any = 0;

  ngOnInit(): void {
    // let loginData: any = localStorage.getItem("loginData");
    if (this.checkAuthetication()) {
      let data: any = this.common.getAuthUserData();
      this.authUserData = JSON.parse(data);
      // console.log("Module permission data::", this.authUserData.moduleDetails);
      this.mainPath = this.common.getLayoutHomePath();
      this.schemePath = this.common.getLayoutSchemePath();
      this.pagesPath = this.common.getPagesPath();
      this.getMasterList();
      this.getPermissionData();
      this.getAllNotificationList();
    }
  }

  getPermissionData() {
    // this.modulePermission = permissionData;
    if (this.authUserData.moduleDetails.length > 0) {
      this.authUserData.moduleDetails.map((data: any, i: any) => {
        if (data.name == "Analytics" && data.isView == 1) {
          this.modulePermission.analytics = 1;
        }
        if (data.name == "Activity" && data.isView == 1) {
          this.modulePermission.activity = 1;
        }
        if (data.name == "Visits" && data.isView == 1) {
          this.modulePermission.visits = 1;
        } if (data.name == "Enquiries" && data.isView == 1) {
          this.modulePermission.enquiries = 1;
        } if (data.name == "Branding" && data.isView == 1) {
          this.modulePermission.branding = 1;
        } if (data.name == "Reports" && data.isView == 1) {
          this.modulePermission.report = 1;
        } if (data.name == "Feedback" && data.isView == 1) {
          this.modulePermission.feedback = 1;
        } if (data.name == "Map Analytics" && data.isView == 1) {
          this.modulePermission.mapAnalytics = 1;
        } if (data.name == "Advance Analytics" && data.isView == 1) {
          this.modulePermission.advanceAnalytics = 1;
        } if (data.name == "Build Own Report" && data.isView == 1) {
          this.modulePermission.buildOwnReport = 1;
        } if (data.name == "Create PJP" && data.isView == 1) {
          this.modulePermission.createPjp = 1;
        } if (data.name == "PJP Schedule" && data.isView == 1) {
          this.modulePermission.pjpSchedule = 1;
        } if (data.name == "Registration" && data.isView == 1) {
          this.modulePermission.registrationReport = 1;
        } if (data.name == "Odometer Reading" && data.isView == 1) {
          this.modulePermission.odometerReport = 1;
        } if (data.name == "Stock Report" && data.isView == 1) {
          this.modulePermission.stockReport = 1;
        } if (data.name == "Attendance" && data.isView == 1) {
          this.modulePermission.attendenceReport = 1;
        } if (data.name == "Apply Leave" && data.isView == 1) {
          this.modulePermission.leaveReport = 1;
        } if (data.name == "Raise Request" && data.isView == 1) {
          this.modulePermission.raiseRequest = 1;
        } if (data.name == "Survey Report" && data.isView == 1) {
          this.modulePermission.surveyReport = 1;
        } if (data.name == "CSR Report" && data.isView == 1) {
          this.modulePermission.csrReport = 1;
        } if (data.name == "Mapping" && data.isView == 1) {
          this.modulePermission.mapping = 1;
        } if (data.name == "Calendar" && data.isView == 1) {
          this.modulePermission.calender = 1;
        } if (data.name == "Tour" && data.isView == 1) {
          this.modulePermission.tour = 1;
        } if (data.name == "Scheme" && data.isView == 1) {
          this.modulePermission.scheme = 1;
        } if (data.name == "Expenses" && data.isView == 1) {
          this.modulePermission.expenses = 1;
        } if (data.name == "Visit Report" && data.isView == 1) {
          this.modulePermission.visitReport = 1;
        } if (data.name == "Masterlist" && data.isView == 1) {
          this.modulePermission.masterList = 1;
        } if (data.name == "Employee" && data.isView == 1) {
          this.modulePermission.employee = 1;
        } if (data.name == "Dealer" && data.isView == 1) {
          this.modulePermission.dealer = 1;
        } if (data.name == "Sub-Dealer" && data.isView == 1) {
          this.modulePermission.subDealer = 1;
        } if (data.name == "Distributor" && data.isView == 1) {
          this.modulePermission.distributor = 1;
        } if (data.name == "Product" && data.isView == 1) {
          this.modulePermission.product = 1;
        } if (data.name == "User Settings" && data.isView == 1) {
          this.modulePermission.userSettings = 1;
        } if (data.name == "Remarks" && data.isView == 1) {
          this.modulePermission.remarks = 1;
        } if (data.name == "Email" && data.isView == 1) {
          this.modulePermission.email = 1;
        } if (data.name == "Contact Sync" && data.isView == 1) {
          this.modulePermission.contactSync = 1;
        } if (data.name == "Mail Signature" && data.isView == 1) {
          this.modulePermission.mailSignature = 1;
        } if (data.name == "Enquiry Report" && data.isView == 1) {
          this.modulePermission.enquiryReport = 1;
        } if (data.name == "Notification" && data.isView == 1) {
          this.modulePermission.notification = 1;
        } if (data.name == "Follow Up" && data.isView == 1) {
          this.modulePermission.followUp = 1;
        } if (data.name == "Self Service" && data.isView == 1) {
          this.modulePermission.selfService = 1;
        } if (data.name == "consolidated visit report" && data.isView == 1) {
          this.modulePermission.consolidatedReport = 1;
        }
      });

    }
    // console.log("Module permission data::", this.modulePermission);
  }

  checkAuthetication() {
    if (localStorage.getItem("AuthUserData") == undefined) {
      this.route.navigate([""]);
      return false;
    } else {
      return true;
    }
  }

  // storeDataToLocalhost() {
  //   let data =
  //   {
  //     "firstName": "SANJIT",
  //     "lastName": "CHATTERJEE",
  //     "username": "SANJIT",
  //     "userType": "2",
  //     "profileImgUrl": "/images/moneyheist1659537590017.jpg",
  //     "clientId": 1,
  //     "userId": 7,
  //     "createdAt": "2022-08-03T14:39:51.000Z",
  //     "countryId": 1,
  //     "stateId": 41,
  //     "districtId": null,
  //     "cityId": 829,
  //     "zoneId": null,
  //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJlcXRpbWUiOjE2NTk5NTQ5ODc3NDN9LCJpYXQiOjE2NTk5NTQ5ODd9.gU3lJ7JBvWSGUzaA53fFtfQHiibHSdsQKleEb6S2DQA",
  //     "clientSettings": [
  //       {
  //         "settingsType": "userLimit",
  //         "settingsValue": "30"
  //       },
  //       {
  //         "settingsType": "systemApprovalRequired",
  //         "settingsValue": "1"
  //       },
  //       {
  //         "settingsType": "opportunityAsSales",
  //         "settingsValue": "0"
  //       },
  //       {
  //         "settingsType": "productListing",
  //         "settingsValue": "0"
  //       },
  //       {
  //         "settingsType": "hasCRM",
  //         "settingsValue": "1"
  //       },
  //       {
  //         "settingsType": "hasSFA",
  //         "settingsValue": "1"
  //       }
  //     ]
  //   }

  //   localStorage.setItem("AuthUserData", JSON.stringify(data));
  // }


  openNav() {
    this.element = document.getElementById("sidebar");
    // console.log("My nav::", this.element)
    this.element.classList.toggle("collapsed");
  }

  logout() {
    let req = {
      userId: this.authUserData.userId,
      userTypeId: this.authUserData.userType,
      platform: "web"
    }
    this.crm.logOut(req).subscribe(res => {
      let respObj: any = res;
      if (respObj.status == 200) {
        this.route.navigate([""]);
        localStorage.removeItem("AuthUserData");
      }
    })
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
      clientId: this.authUserData.clientId
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

  // ngOnDestroy() {
  //   this.modulePermission = permissionData;
  // }
  notificationClick() {
    this.getAllNotificationList();
  }

  getAllNotificationList() {
    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId,
      limit: "50",
      offset: "0"
    }
    this.common.getNotificationList(req).subscribe(response => {
      let res: any = response;

      if (res.respondcode == 200) {
        this.allNotificationList = res.data.data;
        this.totalNotificationCount = res.data.count;
      }
    })
  }

  getDate(val: any) {
    var dt = new Date(val);
    var day: any = dt.getDate();
    day = day > 9 ? day : "0" + day;
    var month: any = dt.getMonth() + 1;
    month = month > 9 ? month : "0" + month;
    var year: any = dt.getFullYear();
    var finalDate = day + "-" + month + "-" + year
    return finalDate;
  }

}
