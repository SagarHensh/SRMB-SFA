import { Component, OnInit, ViewChild } from '@angular/core';
import app_config from 'src/app/app.config';
import { CommonService } from 'src/app/services/common.service';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {

  constructor(
    private common: CommonService,
    private store: StoreDataService
  ) { }

  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit: any = "";
  offset: any = "0";
  totalRecords: any = "";
  @ViewChild('subordinateListModal') subordinateListModal: any;
  odometerImagesModal: any;


  ngOnInit(): void {
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    console.log("authuserData:: ", this.authUserData);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports()
  }

  getVisitReports() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "searchFrom":"",
      "searchTo":"",
      "userName":""
    }
    this.common.getLeaveList(req).subscribe(res => {
      console.log("Leave Report response::", res);
      if (res.respondcode == 200) {
        let respObj = res.data;
        if (respObj.list.length > 0) {
          this.allReportList = respObj.list;
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

  formatAMPM(val: any) {
    var date = new Date(val);
    var hours: any = date.getHours();
    var minutes: any = date.getMinutes();
    var ampm: any = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  getTypeStatus(id: any) {
    let str: any = "";
    if (id == 0) {
      str = "Casual Leave";
    } else if (id == 1) {
      str = "Sick/Medical Leave";
    } else if (id == 2) {
      str = "Earnerd/Paid leave";
    }

    return str;
  }

  getApprovalStatus(id: any) {
    let str: any = "";
    if (id == 0) {
      str = "Pending";
    } else if (id == 1) {
      str = "Approve";
    } else if (id == 2) {
      str = "Rejected";
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

  openViewOdometerModal(data: any) {
    console.log("data::", data)
    let inTime: any = data.inTimePic != "" ? app_config.imageUrl + data.inTimePic : "";
    let outTime: any = data.outTimePic !== null ? app_config.imageUrl + data.outTimePic : ""


    this.odometerImagesModal = {
      inTime : this.formatAMPM(data.inTime),
      inTimeDate : this.getDate(data.inTime),
      outTime : this.formatAMPM(data.outTime),
      outTimeDate : this.getDate(data.outTime),
      inTimePic: inTime,
      outTimePic: outTime
    }
    console.log("odometer image modal::", inTime)
  }

}
