import { Component, OnInit } from '@angular/core';
import app_config from 'src/app/app.config';
import { CommonService } from 'src/app/services/common.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { NotifierService } from 'angular-notifier';
import { PLANNED_REPORT } from 'src/app/TableHeader';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-planned-unplanned-reports',
  templateUrl: './planned-unplanned-reports.component.html',
  styleUrls: ['./planned-unplanned-reports.component.css']
})
export class PlannedUnplannedReportsComponent implements OnInit {

  constructor(private common: CommonService,
    private store: StoreDataService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService) { }

  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit: any = "";
  offset: any = "0";
  totalRecords: any = "";
  tableHeader: any = [];
  currentPage: any = 1;
  totalPage = 1;
  startPage: any = 0;
  endPage: any = 0;

  //-------------------- For Filter-----------------//

  searchName = "";
  fromDate = "";
  toDate = "";
  customerName = "";
  contactType = "" as any;
  timePeriod = "";
  months = "";
  customerVisitType = "" as any;
  staticDropDown = true;
  nextTimeFlag = false;
  pastTimeFlag = false;
  staticDropDownCustType: boolean = true;
  customerTypelistFlag: boolean = false;
  phoneNo = "";
  state = "" as any;
  city = "" as any;
  zone = "" as any;
  visitType = "" as any;
  visitStatus = "" as any;
  allContactCategoryType: any = [];
  allVisitorType: any = [];
  contactTypeList: any = [];
  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];
  visitStatusList: any = [];
  isTable: any = 1;


  ngOnInit(): void {
    this.tableHeader = PLANNED_REPORT;
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports();
    this.getContactType();
    this.getState();
    this.getVisitList();
    this.getAllContactCategoryType();
  }

  getVisitReports() {
    this.spinner.show();
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
      "masterCustomerType": this.customerVisitType,
      "searchTextCustomerName": this.customerName,
      "searchTextCustomerPhone": this.phoneNo,
      "contactType": this.contactType,
      "stateId": this.state,
      "cityId": this.city,
      "zoneId": this.zone,
      "visitType": this.visitType,
      "visitStatus": this.visitStatus
    };
    // console.log("Request data for visit report listing>>>>>>>>", req);
    this.common.getPjpVisitReports(req).subscribe(res => {
      // console.log("Planned unplanned Visit response::", res);
      if (res.data.reportList.length > 0) {
        this.allReportList = res.data.reportList;
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
      this.spinner.hide();
    })
  }


  show01() {
    let elem: any;
    elem = document.getElementById('div01');
    elem.style.display = 'block';
  }
  show02() {
    let elem: any;
    elem = document.getElementById('div01');
    elem.style.display = 'none';
  }

  toggleBtnList() {
    var tb: any = document.getElementById("switchList");
    tb.classList.toggle("switchActiveList");
    var tbX: any = document.getElementById('switchGrid');
    tbX.classList.remove("switchActivegrid");
    this.isTable = 1;
  }

  toggleBtnGrid() {
    var tb: any = document.getElementById("switchGrid");
    tb.classList.toggle("switchActivegrid");
    var tbX: any = document.getElementById('switchList');
    tbX.classList.remove("switchActiveList");
    this.isTable = 0;
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

  getEnquiryStatus(id: any) {
    let str: any = "";
    if (id == 0) {
      str = "Not Decided";
    } else if (id == 1) {
      str = "Favourable";
    } else if (id == 2) {
      str = "not Favourable";
    }

    return str;
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
    this.common.getPjpVisitReportsDownload(req).subscribe(res => {
      // console.log("Download res", res);
      if (res.data != "") {
        var file_path = app_config.downloadUrl + res.data;
        var a = document.createElement('a');
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    })
  }

  startRecordNumber() {
    return Number(this.offset) + 1;
  }

  textTruncateData(str: any) {
    if (str != "" || str != null) {
      let val: any = this.store.textTruncate(str, 15);
      // console.log("Text Truncate value::", val)
      return val;
    } else {
      return "";
    }
  }

  //------------------------ For Filter------------------------//

  getContactType() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
    };
    this.common.getContactType(data).subscribe((res: any) => {
      // console.log("contact type res>>>>>>", res);
      if (res.respondcode == 200) {
        this.contactTypeList = res.data;
      }
    })
  }

  getState() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "countryId": this.authUserData.countryId
    };
    this.common.getAllStates(data).subscribe((res: any) => {
      // console.log("state res>>>>>>>>>", res);
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
      // console.log("city res>>>>>>>>>", res);
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
      // console.log("zone res>>>>>>>>>", res);
      if (res.respondcode == 200) {
        this.zoneList = res.data.zoneList;
      }
    })
  }

  getVisitList() {
    const data = {
      "clientId": this.authUserData.clientId
    };
    this.common.getVisitList(data).subscribe((res: any) => {
      // console.log("visit status list>>>>>>> res", res);
      if (res.respondcode == 200) {
        this.visitStatusList = res.data;
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
    this.phoneNo = "";
    this.timePeriod = "";
    this.months = "";
    this.customerVisitType = "";
    this.contactType = "";
    this.visitType = "";
    this.visitStatus = "";
    this.state = "";
    this.city = "";
    this.zone = "";
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
      // console.log("All Contact Category Type 22ResPonse::", res);
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
    // console.log("request data for visitor list>>>>", obj);
    this.common.getVisitorListTypeByContactId(obj).subscribe(res => {
      this.allVisitorType = [];
      // console.log("All Contact Category Type ResPonse::", res);
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
    let str2: any = "";
    if (pos == 0) {
      str = data.contactFirstName + data.contactLastName;
    } else if (pos == 1) {
      str = data.ContactPhone;
    } else if (pos == 2) {
      str = data.contactTypeName;
    } else if (pos == 3) {
      str = data.state;
    } else if (pos == 4) {
      str = data.city;
    } else if (pos == 5) {
      str = data.Zone;
    } else if (pos == 6) {
      str = this.getDate(data.visitDate);
    } else if (pos == 7) {
      str = this.getStatus(data.isPlanned);
    } else if (pos == 8) {
      str = data.userFirstName + data.userLastName;
    } else if (pos == 9) {
      str = this.getEnquiryStatus(data.visitStatus);
    } else if (pos == 10) {
      data.customerFeedback != null ?
        str = this.textTruncateData(data.customerFeedback) : "";
    }
    return str;
  }

  getStatus(str: any) {
    let val: any = "";
    if (str == 0) {
      val = "Unplanned";
    } else {
      val = "Planned";
    }
    return val;
  }

}
