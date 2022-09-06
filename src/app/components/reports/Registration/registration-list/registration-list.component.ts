import { Component, OnInit } from '@angular/core';
import app_config from 'src/app/app.config';
import { CommonService } from 'src/app/services/common.service';
import { CrmService } from 'src/app/services/crm.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { REGISTRATION_REPROT } from 'src/app/TableHeader';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {

  constructor(private common: CommonService,
    private crm: CrmService,
    private store: StoreDataService,
    private notifier : NotifierService) { }

  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit: any = "";
  offset: any = "0";
  totalRecords: any = "";
  currentPage = 1;
  totalPage = 1;

  //---------------------- For Filter-------------------//

  searchName = "";
  fromDate = "";
  toDate = "";
  ownerName = "";
  phone = "";
  contactType = "" as any;
  businessName = "";
  state = "" as any;
  city = "" as any;
  zone = "" as any;

  contactTypeList: any = [];
  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];

  tableHeader: any = [];

  startPage: any = 0;
  endPage: any = 0;

  ngOnInit(): void {
    this.tableHeader = REGISTRATION_REPROT;
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports();
    this.getContactType();
    this.getState();
  }

  getVisitReports() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "userType": this.authUserData.userType,
      "searchName": this.searchName,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate,
      "searchTextCustName": this.ownerName,
      "searchTextCustType": "",
      "contactTypeId": this.contactType,
      "searchTextCustPhone": this.phone,
      "searchTextCustBusinessName": this.businessName,
      "stateId": this.state,
      "cityId": this.city,
      "zoneId": this.zone
    };
    // console.log("Request Data For Registration list>>>>>>>", req);
    this.crm.getRegistrationList(req).subscribe(res => {
      // console.log("Registration response::", res);
      if (res.status == 200) {
        if (res.response.data.length > 0) {
          let respObj = res.response;
          this.allReportList = respObj.data;
          this.totalRecords = respObj.count;
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

      }
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
  }

  toggleBtnGrid() {
    var tb: any = document.getElementById("switchGrid");
    tb.classList.toggle("switchActivegrid");
    var tbX: any = document.getElementById('switchList');
    tbX.classList.remove("switchActiveList");
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
    this.getVisitReports();
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

  // startRecordNumber() {
  //   let num : any = Number(this.offset) + 1;
  //   console.log("Start PAge Number", num);
  //   return Number(this.offset) + 1;
  // }

  // endRecordNumber() {
  //   let num : any = Number(this.offset) + Number(this.allReportList.length);
  //   console.log("End PAge Number", num);
  //   return Number(this.offset) + Number(this.allReportList.length);
  // }

  onDownload() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "userType": this.authUserData.userType,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate,
      "searchTextCustName": this.ownerName,
      "searchTextCustType": "",
      "contactTypeId": this.contactType,
      "searchTextCustPhone": this.phone,
      "searchTextCustBusinessName": this.businessName,
      "stateId": this.state,
      "cityId": this.city,
      "zoneId": this.zone
    };

    this.common.getRegistrationReportDownload(req).subscribe((res: any) => {
      //console.log("registration report download res>>>>>>>>>>>", res);
      if (res.response.path.file != "") {
        var file_path = app_config.downloadUrlCRM + res.response.path.dir + res.response.path.file;
        var a = document.createElement('a');
        a.href = file_path;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    })
  }

  //---------------------- For Filter----------------------//

  getContactType() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
    };
    this.common.getContactType(data).subscribe((res: any) => {
      console.log("contact type res>>>>>>", res);
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
      console.log("state res>>>>>>>>>", res);
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
      console.log("city res>>>>>>>>>", res);
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

  changeState() {
    this.getCity();
  }
  changeCity() {
    this.getZone();
  }

  searchByDateRange() {
    if (this.fromDate < this.toDate) {
      this.getVisitReports();
    } else {
      this.notifier.notify('error', 'Please enter valid date range');
    }
    // 
  }

  resetDate() {
    this.fromDate = "";
    this.toDate = "";
    this.getVisitReports();
  }

  saveSearch() {
    this.getVisitReports();
  }

  reset() {
    this.contactType = "";
    this.fromDate = "";
    this.toDate = "";
    this.ownerName = "";
    this.phone = "";
    this.businessName = "";
    this.state = "";
    this.city = "";
    this.zone = "";
    this.getVisitReports();
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

  tableDataView(data: any, pos: any) {
    let str: any = "";
    if (pos == 0) {
      str = data.stateName
    } else if (pos == 1) {
      str = data.cityName
    } else if (pos == 2) {
      str = data.zoneName
    } else if (pos == 3) {
      str = data.pincode
    } else if (pos == 4) {
      str = data.contactTypeName
    } else if (pos == 5) {
      str = data.productName
    } else if (pos == 6) {
      str = data.custBusinessName
    } else if (pos == 7) {
      str = data.customerName
    } else if (pos == 8) {
      str = data.phoneNumber
    } else if (pos == 9) {
      str = data.email
    } else if (pos == 10) {
      str = data.createdByUserName
    } else if (pos == 11) {
      str = this.getDate(data.createdAt)
    }
    return str;
  }

}
