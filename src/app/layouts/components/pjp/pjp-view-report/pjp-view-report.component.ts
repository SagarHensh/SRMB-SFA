import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import app_config from 'src/app/app.config';
import { CommonService } from 'src/app/services/common.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { CrmService } from 'src/app/services/crm.service';
import { NotifierService } from 'angular-notifier';
import { PJP_SCHEDULE_REPORT } from 'src/app/TableHeader';

@Component({
  selector: 'app-pjp-view-report',
  templateUrl: './pjp-view-report.component.html',
  styleUrls: ['./pjp-view-report.component.css']
})
export class PjpViewReportComponent implements OnInit {

  constructor(private common: CommonService,
    private store: StoreDataService,
    private crm: CrmService,
    private route: Router,
    private notifier: NotifierService) { }

  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit: any = "";
  offset: any = "0";
  totalRecords: any = "";

  //----------- For Filter----------------//

  searchName = "";
  fromDate = "";
  toDate = "";
  timePeriod = "";
  months = "";
  //visitType = "";
  customerName = "";
  customerPhone = "";
  //masterCustomerType = "" as any;
  customerType = "" as any;
  state = "";
  city = "";
  zone = "";
  employeeType = "";
  allContactCategoryType: any = [];
  contactTypeList: any = [];
  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];
  employeeTypeList: any = [];
  staticDropDown: boolean = true;
  staticDropDownCustType: boolean = true;
  pastTimeFlag: boolean = false;
  nextTimeFlag: boolean = false;
  customerVisitType = "" as any;
  allVisitorType: any = [];
  customerTypelistFlag: boolean = false;
  tableHeader: any = [];
  currentPage: any = 1;
  totalPage = 1;
  startPage: any = 0;
  endPage: any = 0;






  ngOnInit(): void {
    this.tableHeader = PJP_SCHEDULE_REPORT;
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    // console.log("authuserdata::", this.authUserData)
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports();
    this.getState();
    this.getEnquiryReportData();
    this.getAllContactCategoryType();
  }

  toggleBtnList() {
    var tb: any = document.getElementById("switchList");
    tb.classList.toggle("switchActiveList");
    var tbX: any = document.getElementById('switchGrid');
    tbX.classList.remove("switchActivegrid");
  }

  toggleBtnGrid() {
    var tb: any = document.getElementById("switchGrid");
    tb.classList.toggle("switchActivegrid");
    var tbX: any = document.getElementById('switchList');
    tbX.classList.remove("switchActiveList");
  }

  getVisitReports() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "searchName": this.searchName,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate,
      "timePeriod": this.timePeriod,
      "months": this.months,
      "searchTextCustomerName": this.customerName,
      "searchTextCustomerPhone": this.customerPhone,
      "customerType": this.customerType,
      "masterCustomerType": this.customerVisitType,
      "state": this.state,
      "district": this.city,
      "zone": this.zone,
      //"visitType":this.visitType.toString(),
      "employeeType": this.employeeType
    };
    // console.log("Request Data for pjp view report>>>>>>>>",req);
    this.common.getPjpUnplannedVisitReports(req).subscribe(res => {
      // console.log("PJP unplanned Visit response::", res);
      if (res.error == 0) {
        this.allReportList = res.data.reportList;
        //  console.log(">>>>>>>>>>>>>Report list ::::",this.allReportList);
        this.totalRecords = res.data.totalCount;
        this.totalPage = Math.ceil(this.totalRecords / this.limit);
        this.startPage = Number(this.offset) + 1;
        this.endPage = Number(this.offset) + Number(this.allReportList.length);
      } else {
        this.allReportList = [];
        this.totalRecords = 0;
        this.totalPage = 1;
        this.startPage = 1;
        this.endPage = 1;
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

  changeLimit() {
    // console.log("limit value::", this.limit);
    this.offset = 0;
    this.currentPage = 1;
    this.getVisitReports();
  }

  onDownload = () => {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString()
    }
    this.common.getPjpUnplannedVisitReportsDownload(req).subscribe(res => {
      console.log("Download res", res);
      if (res.data != "") {
        var file_path = app_config.downloadUrl + res.data;
        //console.log("file_path>>>>>>>>>>",file_path);
        var a = document.createElement('a');
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    })
  };

  startRecordNumber() {
    return Number(this.offset) + 1;
  }

  goToDetails() {
    this.route.navigate([this.common.getLayoutHomePath() + 'pjp-view-details'])
  }

  textTruncateData(str: any) {
    // let val : any = this.store.textTruncate(str, 15);
    // return val;
  }

  //----------------------- For Filter-----------------//

  // getContactType(){
  //   const data = {
  //     "clientId": this.authUserData.clientId,
  //     "userId": this.authUserData.userId,
  //   };
  //   this.common.getContactType(data).subscribe((res:any)=>{
  //     console.log("contact type res>>>>>>",res);
  //     if(res.respondcode == 200){
  //       this.contactTypeList = res.data;
  //     }
  //   })
  // }

  getState() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "countryId": this.authUserData.countryId
    };
    this.common.getAllStates(data).subscribe((res: any) => {
      // console.log("state res>>>>>>>>>",res);
      if (res.respondcode == 200) {
        this.stateList = res.data.stateList;
      }
    })
  }

  getCity() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "stateId": this.state
    };
    this.common.getAllDistrictByState(data).subscribe((res: any) => {
      // console.log("city res>>>>>>>>>",res);
      if (res.respondcode == 200) {
        this.cityList = res.data.districtList;
      }
    })
  }
  getZone() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "cityId": this.city
    };
    this.common.getAllZoneByCity(data).subscribe((res: any) => {
      //  console.log("zone res>>>>>>>>>",res);
      if (res.respondcode == 200) {
        this.zoneList = res.data.zoneList;
      }
    })
  }

  getEnquiryReportData() {

    const data = {
      userId: this.authUserData.userId,
      clientId: this.authUserData.clientId
    }
    this.crm.getEnquiryData(data).subscribe((res: any) => {
      // console.log("For Filter res>>>>>>>>>>>>>",res);
      if (res.success) {
        this.employeeTypeList = res.response.employeeType;
      }
    })
  }

  changeState() {
    this.getCity();
  }
  changeCity() {
    this.getZone();
  }



  searchByDateRange() {
    if (this.fromDate != "" && this.toDate == "") {
      this.getVisitReports();
    } else if (this.fromDate == "" && this.toDate != "") {
      this.getVisitReports();
    } else if (this.fromDate != "" && this.toDate != "") {
      if (this.fromDate < this.toDate) {
        this.getVisitReports();
      } else {
        this.notifier.notify('error', 'Please enter valid date range');
      }
    } else {
      this.notifier.notify('error', 'Please select date');
    }
  }
  resetDate() {
    this.fromDate = "";
    this.toDate = "";
    this.getVisitReports();
  }

  reset() {
    this.customerName = "";
    this.customerPhone = "";
    this.customerType = "";
    this.state = "";
    this.city = "";
    this.zone = "";
    this.employeeType = "";
    // this.visitType = "";
    this.timePeriod = "";
    this.months = "";
    this.customerVisitType = "";
    this.getVisitReports();
  }

  saveSearch() {
    this.getVisitReports();
  }

  pastTimePeriod() {
    this.timePeriod = "";
    this.months = "";
    this.staticDropDown = false;
    this.nextTimeFlag = false;
    this.pastTimeFlag = true;
    this.timePeriod = "past";
    this.months = "lastOneMonth";
  }

  nextTimePeriod() {
    this.timePeriod = "";
    this.months = "";
    this.staticDropDown = false;
    this.pastTimeFlag = false;
    this.nextTimeFlag = true;
    this.timePeriod = "next";
    this.months = "nextOneMonth";
  }


  getAllContactCategoryType() {
    this.common.getAllContactCategory({}).subscribe(res => {
      //console.log("All Contact Category Type 22ResPonse::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.contactList.length > 0) {
          this.allContactCategoryType = res.data.contactList;
        }
      }
    })

  }

  getAllVisitorListType() {
    let obj = {
      clientId: this.authUserData.clientId,
      contactType: this.customerVisitType
    };
    console.log("request data for visitor list>>>>", obj);
    this.common.getVisitorListTypeByContactId(obj).subscribe(res => {
      this.allVisitorType = [];
      console.log("All Contact Category Type ResPonse::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.visitorList.length > 0) {
          this.allVisitorType = res.data.visitorList;
        } else {
          this.allVisitorType = [];
        }
      }
    })

  }

  onChangeContactCategory(event: any) {
    this.customerVisitType = event;
    //console.log("visitor id>>>>>>>>>",this.customerVisitType);
    this.staticDropDownCustType = false;
    this.customerTypelistFlag = true;
    this.getAllVisitorListType();
  }


  searchIndividual(event: any) {
    if (event.target.value.length > 1) {
      this.searchName = event.target.value;
      this.getVisitReports();
    } else {
      this.searchName = "";
      this.getVisitReports();
    }
  }


  changeTableView(event: any, pos: any) {
    this.tableHeader.map((data: any, i: any) => {
      if (i == pos) {
        if (event.target.checked) {
          data.isView = true;
        } else {
          data.isView = false;
        }
      }
    })
  }



  nextPage() {
    if (this.currentPage < this.totalPage) {
      // alert("Offset "+ this.offset)
      this.currentPage++;
      this.offset = (this.currentPage - 1) * this.limit;
      this.getVisitReports();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.offset = (this.currentPage - 1) * this.limit;
      this.getVisitReports();
    }
  }

  tableDataView(data: any, pos: any) {
    let str: any = "";
    if (pos == 0) {
      str = data.contactFirstName + data.contactLastName;
    } else if (pos == 1) {
      str = data.state;
    } else if (pos == 2) {
      str = data.city;
    } else if (pos == 3) {
      str = data.Zone;
    } else if (pos == 4) {
      str = data.contactTypeName;
    } else if (pos == 5) {
      str = data.ContactPhone;
    } else if (pos == 6) {
      str = data.userFirstName + data.userLastName;
    } else if (pos == 7) {
      str = data.designationName;
    } else if (pos == 8) {
      str = this.getDate(data.plannedDate);
    } else if (pos == 9) {
      str = this.textTruncateData(data.customerFeedback);
    }
    return str;
  }
}
