import { Component, OnInit } from '@angular/core';
import { StoreDataService } from 'src/app/services/store-data.service';
import { CommonService } from 'src/app/services/common.service';
import app_config from 'src/app/app.config';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent implements OnInit {

  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit: any = "";
  offset: any = "0";
  totalRecords: any = "";

  //--------------------- For Filter----------------------------//
  searchName = "";
  fromDate = "";
  toDate = "";
  custName = "";
  empName = "";
  custType = "" as any;
  state = "" as any;
  city = "" as any;
  zone = "" as any;
  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];
  contactTypeList: any = [];




  constructor(private store: StoreDataService, private common: CommonService) { }

  ngOnInit(): void {

    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getStockReports();
    this.getContactType();
    this.getState();
  }

  getStockReports() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "userType": this.authUserData.userType,
      "searchName": this.searchName,
      "customerName": this.custName,
      "empName": this.empName,
      "custType": this.custType,
      "stateId": this.state,
      "cityId": this.city,
      "zoneId": this.zone,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate
    };
    console.log("Request data for Stock report>>>>>>>>>>>>>>",req);
    this.common.getStockReportList(req).subscribe((res: any) => {
      console.log("Stock response::", res);
      if (res.respondcode == 200) {
        let respObj: any = res.data;
        if (respObj.data.length > 0) {
          this.allReportList = respObj.data;
          this.totalRecords = respObj.count;
        } else {
          this.allReportList = [];
          this.totalRecords = 0;
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

  changeLimit() {
    // console.log("limit value::", this.limit);
    this.getStockReports();
  }

  onDownload() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "userType": this.authUserData.userType,
      "customerName": this.custName,
      "empName": this.empName,
      "custType": this.custType,
      "stateId": this.state,
      "cityId": this.city,
      "zoneId": this.zone,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate
    };
    this.common.getStockReportDownload(req).subscribe((res:any)=>{
      console.log("res for report download>>>>>>>>>>>>>",res);
      if (res.data.path != "") {
        var file_path = app_config.downloadUrlSFA + res.data.path;
        var a = document.createElement('a');
        a.href = file_path;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    })
  }

  startRecordNumber() {
    return Number(this.offset) + 1;
  }

  //-------------------------  For Filter------------------------//

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
      console.log("zone res>>>>>>>>>", res);
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
    this.getStockReports();
  }

  resetDate() {
    this.fromDate = "";
    this.toDate = "";
    this.getStockReports();
  }

  reset() {
    this.custName = "";
    this.empName = "";
    this.custType = "";
    this.state = "";
    this.city = "";
    this.zone = "";
    this.getStockReports();
  }

  saveSearch() {
    this.getStockReports();
  }

  searchIndividual(event:any){
    if(event.target.value.length >1){
      this.searchName = event.target.value;
      this.getStockReports();
    } else{
      this.searchName = "";
      this.getStockReports(); 
    }
  }
}
