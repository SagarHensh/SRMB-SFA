import { Component, OnInit } from '@angular/core';
import app_config from 'src/app/app.config';
import { CommonService } from 'src/app/services/common.service';
import { CrmService } from 'src/app/services/crm.service';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css']
})
export class EnquiriesComponent implements OnInit {

  constructor(private common: CommonService,
    private crm : CrmService,
    private store: StoreDataService) { }

  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit: any = "";
  offset: any = "0";
  totalRecords: any = "";

  //---------------- For Filter----------//
  searchName = "";
  isAssigned :boolean = false;
  enquirySourceList:any = [];
  enquiryTypeList:any = [];
  productList:any = [];
  countryList:any = [];
  stateList:any = [];
  districtList:any = [];
  zoneList:any = [];
  employeeTypeList:any = [];
  stateId = "" as any;
  cityId = "" as any;
  zoneId = "" as any;
  
  enquirySourceText = "";
  enquiryTypeText = "";
  employeeType = "";
  fromDate = "";
  toDate = "";

//-------------------------//


  ngOnInit(): void {
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports();
    this.getEnquiryReportData();
    this.getStatesByCountryId();
  }

  getVisitReports() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "userType": this.authUserData.userType,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "searchName": this.searchName,
      "enquirySourceText":this.enquirySourceText,
      "enquiryTypeText":this.enquiryTypeText,
      "employeeType":this.employeeType,
      "state":this.stateId,
      "city":this.cityId,
      "zone":this.zoneId,
      "searchFrom":this.fromDate,
      "searchTo":this.toDate
    };
    console.log("Request Data for Enquery listing>>>>>>>",req);
    this.crm.getEnquiryList(req).subscribe(res => {
      console.log("Enquiry list response::", res);
      if(res.status == 200){
        let respObj  : any = res.response;
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


  // show01() {
  //   let elem: any;
  //   elem = document.getElementById('div01');
  //   elem.style.display = 'block';
  // }


  // show02() {
  //   let elem: any;
  //   elem = document.getElementById('div01');
  //   elem.style.display = 'none';
  // }

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
    if(val !== null){
    var dt = new Date(val);
    var day: any = dt.getDate();
    day = day > 9 ? day : "0" + day;
    var month: any = dt.getMonth() + 1;
    month = month > 9 ? month : "0" + month;
    var year: any = dt.getFullYear();
    var finalDate = day + "-" + month + "-" + year
    return finalDate;
    } else {
      return "";
    }
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

  onDownload = () => {
    console.log("download function");
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "userType": this.authUserData.userType,
      "offset": this.offset.toString()
    }
    
    this.common.getEnquiryReportDownload(req).subscribe((res:any)=>{
      console.log("res>>>>>>>>>>>",res);
      if (res.response.file != "") {
            var file_path = app_config.downloadUrlCRM + res.response.dir + res.response.file;
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

  textTruncateData(str : any){
    let val : any = this.store.textTruncate(str, 30);
    return val;
  }

  //------------------------------ For Filter-----------------------//


  filterSearch(){
    console.log("enquirySourceText>>>>>>>>",this.enquirySourceText);
    console.log("enquiryTypeText>>>>>>>>>>>>",this.enquiryTypeText);
    console.log("employeeType>>>>>>>>>>>>",this.employeeType);
    console.log("state>>>>>>>>>>>>",this.stateId);
    console.log("city>>>>>>>>>>>>",this.cityId);
    console.log("zone>>>>>>>>>>>>",this.zoneId);
  }

  show01(){
    this.isAssigned = true;
  }
  show02(){
    this.isAssigned = false;
    this.employeeType = "";
  }


  getEnquiryReportData(){
    
    const data  = {
      userId:  this.authUserData.userId,
      clientId: this.authUserData.clientId
    }
    this.crm.getEnquiryData(data).subscribe((res:any)=>{
      console.log("For Filter res>>>>>>>>>>>>>",res);
      if(res.success){
        this.enquirySourceList = res.response.enquirySource;
        this.enquiryTypeList = res.response.enquiryType;
        this.employeeTypeList = res.response.employeeType;
      }
    })
  }

  getStatesByCountryId(){
    const data  = {
      userId:  this.authUserData.userId,
      clientId: this.authUserData.clientId,
      countryId: this.authUserData.countryId
    };
    this.crm.getState(data).subscribe((res:any)=>{
      if(res.success){
        this.stateList = res.response;
        console.log("State list>>>>",this.stateList);
      }
    })
  }

  stateChange(){
    this.getDistrictByStateId();
  }
  getDistrictByStateId(){
    const data  = {
      userId:  this.authUserData.userId,
      clientId: this.authUserData.clientId,
      stateId: this.stateId
    };
    this.crm.getDistrict(data).subscribe((res:any)=>{
      console.log("district>>>>>>>>>>",res);
      if(res.success){
        this.districtList = res.response;
      }
    })
  }

  districtChange(){
    this.getZoneByDistrictId();
  }

  getZoneByDistrictId(){
    const data  = {
      userId:  this.authUserData.userId,
      clientId: this.authUserData.clientId,
      cityId: this.cityId
    };
    this.crm.getZone(data).subscribe((res:any)=>{
      if(res.success){
        this.zoneList = res.response;
      }
    })
  }

  search(){
    this.getVisitReports();
  }
  reset(){
    this.enquirySourceText = "";
    this.enquiryTypeText = "";
    this.employeeType = "";
    this.stateId = "";
    this.cityId = "";
    this.zoneId = "";
    this.getVisitReports();
  }

  searchDateRange(){
    this.getVisitReports();
  }

  resetDate(){
    this.fromDate = "";
    this.toDate ="";
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

}

      
