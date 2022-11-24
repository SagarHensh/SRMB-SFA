import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { STOCK_REPORT_LIST } from 'src/app/TableHeader';

@Component({
  selector: 'app-survey-report-list',
  templateUrl: './survey-report-list.component.html',
  styleUrls: ['./survey-report-list.component.css']
})
export class SurveyReportListComponent implements OnInit {

  constructor(private common: CommonService,
    private store: StoreDataService) { }

  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit: any = "";
  offset: any = "0";
  totalRecords: any = "";

  //---------------------- For Filter-----------------------//

  searchName = "";
  fromDate = "";
  toDate = "";
  orgName = "";
  contactName = "";
  state = "" as any;
  city = "" as any;
  address = "";
  stateList:any = [];
  cityList:any = [];
  tableHeader=[] as any


  ngOnInit(): void {
    
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports();
    this.getState();
    this.getCity();
    this.tableHeader=STOCK_REPORT_LIST;
  }

  getVisitReports() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "userType": this.authUserData.userType,
      "searchName": this.searchName,
      "userName":"",
      "customerName": this.contactName,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate,
      "orgTextName" : this.orgName,
      "stateId": this.state,
      "cityId": this.city
    };
    console.log("Request Data for survey report",req);
    this.common.getSurveyReportList(req).subscribe(res => {
      console.log("Survey response::", res);
      if (res.respondcode == 200) {
        let respObj: any = res.data;
        if (respObj.surveyReportList.length > 0) {
          this.allReportList = respObj.surveyReportList;
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



  tableDataView(data: any, pos: any) {
    let str: any = "";
    if (pos == 0) {
      str = data.stateName
    }
    else if(pos ==1){
      str=data.cityName
    }
    else if(pos == 2){
      str=data.zoneName
    }
    else if(pos == 3){
      str=data.pincode
    }
    else if(pos == 4){
      str = data.organizationName
    }
    else if(pos == 5){
      str = data.ownerName

    }
    else if(pos == 6){
      str = data.phone
    }
    else if(pos == 7){
      str =data.email

    }
    else if(pos==8)
    {
      str=data.address
    }
    else if(pos==9)
    {
      str=""
    }
    else if(pos==10)
    {
      str=data.surveyDate
    }
    else if(pos==11)
    {
      str=data.remarks
    }
    return str;
  }













  onDownload = () => {
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


  //----------------------------- For Filter--------------------------//


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
    this.orgName = "";
    this.contactName = "";
    this.state = "";
    this.city = "";
    this.address = "";
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

}
