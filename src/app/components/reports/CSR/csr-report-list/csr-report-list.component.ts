import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-csr-report-list',
  templateUrl: './csr-report-list.component.html',
  styleUrls: ['./csr-report-list.component.css']
})
export class CsrReportListComponent implements OnInit {

  constructor(private common: CommonService,
    private store: StoreDataService) { }

  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit = 50;
  offset = 0;
  totalRecords: any = "";

  //------------------ For Filter ------------------//
  searchName = "";
  fromDate = "";
  toDate = "";
  custName = "";
  custType = "" as any;
  state = "" as any;
  city = "" as any;
  csrType = "" as any;
  contactTypeList:any = [];
  stateList:any =[];
  cityList:any =[];
  csrList:any = [];

//-------------------- For Pagination---------------------//

isdisable: boolean = false;
isPrevious: boolean = true;

  ngOnInit(): void {
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
   // this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports();
    this.getContactType();
    this.getState();
    this.getCSRActivity();
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
      "csrTypeId": this.csrType,
      "customerTypeId": this.custType,
      "customerName": this.custName,
      "stateId": this.state,
      "cityId": this.city
    };
    console.log("Request Data for csr report>>>>>>>>",req);
    this.common.getCsrReportList(req).subscribe(res => {
      console.log("CSR response::", res);
      if (res.respondcode == 200) {
        let respObj: any = res.data;
        if (respObj.data.length > 0) {
          this.allReportList = respObj.data;
          this.totalRecords = respObj.count;
        } else {
          this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          this.isdisable = true;
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

  onDownload() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString()
    }

    // this.common.getEnquiryVisitReportsDownload(req).subscribe(res => {
    //   // console.log("Download res", res);
    //   if (res.data != "") {
    //     var file_path = app_config.downloadUrl + res.data;
    //     var a = document.createElement('a');
    //     a.href = file_path;
    //     a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //   }
    // })

  }

  startRecordNumber() {
    return Number(this.offset) + 1;
  }

  textTruncateData(str : any){
    let val : any = this.store.textTruncate(str, 15);
    return val;
  }

  //-------------------------  For Filter-------------------------//


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
      //console.log("state res>>>>>>>>>", res);
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
      //console.log("city res>>>>>>>>>", res);
      if (res.respondcode == 200) {
        this.cityList = res.data.districtList;
      }
    })
  }

  getCSRActivity(){
    const data ={
      "clientId": this.authUserData.clientId
    };
    this.common.csrActivity(data).subscribe((res:any)=>{
      if(res.success){
        this.csrList = res.response.listData; 
      }
    })
  }

  changeState() {
    this.getCity();
  }

  searchByDateRange(){
    this.getVisitReports();
  }

  resetDate(){
    this.fromDate = "";
    this.toDate = "";
    this.getVisitReports();
  }

  saveSearch(){
    this.getVisitReports();
  }

  reset(){
    this.custName = "";
    this.custType = "";
    this.state = "";
    this.city = "";
    this.csrType = "";
    this.getVisitReports();
  }


  searchIndividual(event:any){
    if(event.target.value.length >1){
      this.searchName = event.target.value;
      this.getVisitReports();
    } else{
      this.searchName = "";
      this.getVisitReports(); 
    }
  }

  //------------------------ For pagination--------------------//

  previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getVisitReports();
    if (this.offset <= 0) {
      this.isPrevious = true;
    }

  }

  next() {
    console.log("isdisable::::::::::::::",this.isdisable);
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getVisitReports();
  }


}
