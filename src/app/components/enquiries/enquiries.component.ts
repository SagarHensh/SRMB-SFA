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

  ngOnInit(): void {
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports()
  }

  getVisitReports() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "userType": this.authUserData.userType,
      "limit": this.limit.toString(),
      "offset": this.offset.toString()
    }
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
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString()
    }
    this.common.getEnquiryVisitReportsDownload(req).subscribe(res => {
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

  textTruncateData(str : any){
    let val : any = this.store.textTruncate(str, 30);
    return val;
  }


}
