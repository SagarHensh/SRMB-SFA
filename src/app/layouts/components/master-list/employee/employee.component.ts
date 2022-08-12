import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private common : CommonService,
    private store : StoreDataService) { }

  authUserData: any;
  countryId: any = "1";
  clientId: any = "";
  employeeList : any = [];
  paginationLimitDropdown: any = [];
  limit: any = "";
  offset: any = "0";
  totalRecords: any = 0;

  ngOnInit(): void {
    let data: any = this.common.getAuthUserData();
    // console.log("authUserL::", JSON.parse(data));
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getEmployeeData();
  }

  getEmployeeData() {
    let obj = {
      countryId: this.authUserData.countryId,
      clientId: this.authUserData.clientId,
      stateId: "",
      districtId: "",
      name: "",
      designationId: ""
    }
    this.common.getEmployeeMapData(obj).subscribe(res => {
      console.log("All left Employee Response:", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        if (Object.keys(respObj).length > 0) {
          if (respObj.data.length > 0) {
            this.employeeList = respObj.data;
            this.totalRecords = respObj.data.length;
          } else {
            this.employeeList = [];
          }
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

  getApprovalStatus(id: any) {
    let str: any = "";
    if (id == 0) {
      str = "Not Approved";
    } else if (id == 1) {
      str = "Approved";
    }

    return str;
  }

  changeLimit() {
    // console.log("limit value::", this.limit);
    this.getEmployeeData();
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

}
