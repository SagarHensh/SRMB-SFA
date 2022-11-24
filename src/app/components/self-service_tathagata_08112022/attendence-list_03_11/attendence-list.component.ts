import { Component, OnInit, ViewChild } from '@angular/core';
import app_config from 'src/app/app.config';
import { CommonService } from 'src/app/services/common.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { CrmService } from 'src/app/services/crm.service';
import { NotifierService } from 'angular-notifier';
import { ATTENDANCE_REPORT } from 'src/app/TableHeader';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-attendence-list',
  templateUrl: './attendence-list.component.html',
  styleUrls: ['./attendence-list.component.css']
})
export class AttendenceListComponent implements OnInit {

  constructor(
    private common: CommonService,
    private store: StoreDataService,
    private crm: CrmService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService
  ) { }

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
  isTable: any = 1;
  @ViewChild('subordinateListModal') subordinateListModal: any;
  odometerImagesModal: any;

  //-------------- For  Filter-----------------//

  searchName = "";
  fromDate = "";
  toDate = "";
  userName = "";
  empType = "";
  state = "";
  city = "";
  empStatus = "" as any;
  employeeTypeList: any = [];
  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];





  ngOnInit(): void {
    this.tableHeader = ATTENDANCE_REPORT;
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    // console.log("authuserData:: ", this.authUserData);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports();
    this.getEnquiryReportData();
    this.getAllState();
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
      "userName": this.userName,
      "designationId": this.empType,
      "stateId": this.state,
      "cityId": this.city,
      "status": this.empStatus.toString()
    };
    // console.log("Request dat for attendance listing>>>>>>>>>>>>>>>>", req);
    this.common.getAttendanceList(req).subscribe(res => {
      console.log("Attendance Report response::", res);
      if (res.respondcode == 200) {
        let respObj = res.data;
        if (respObj.list.length > 0) {
          this.allReportList = respObj.list;
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
    // console.log("date val:", val)
    if (val != null) {
      var dt = new Date(val);
      var day: any = dt.getDate();
      day = day > 9 ? day : "0" + day;
      var month: any = dt.getMonth() + 1;
      month = month > 9 ? month : "0" + month;
      var year: any = dt.getFullYear();
      var finalDate = day + "-" + month + "-" + year
      return finalDate;
    } else {
      return "N/A"
    }
  }

  formatAMPM(val: any) {
    if (val != null) {
      var date = new Date(val);
      var hours: any = date.getHours();
      var minutes: any = date.getMinutes();
      var ampm: any = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    } else {
      return "N/A";
    }
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
    this.offset = 0;
    this.currentPage = 1;
    this.getVisitReports();
  }

  onDownload() {
    // let req = {
    //   "clientId": this.authUserData.clientId,
    //   "userId": this.authUserData.userId,
    //   "limit": this.limit.toString(),
    //   "offset": this.offset.toString()
    // }
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "searchName": this.searchName,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate,
      "userName": this.userName,
      "designationId": this.empType,
      "stateId": this.state,
      "cityId": this.city,
      "status": this.empStatus.toString()
    };
    this.common.getAttendanceReportsDownload(req).subscribe((res: any) => {

      console.log("Download res", res);
      if (res.data.path != "") {
        var file_path = app_config.downloadUrlExcel  + res.data.path;
        var a = document.createElement('a');
        a.href = file_path;
        // a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    })
  }

  startRecordNumber() {
    return Number(this.offset) + 1;
  }

  //------------------------------ For Filter----------------------//

  getEnquiryReportData() {

    const data = {
      userId: this.authUserData.userId,
      clientId: this.authUserData.clientId
    }
    this.crm.getEnquiryData(data).subscribe((res: any) => {
      // console.log("For Filter res>>>>>>>>>>>>>", res);
      if (res.success) {
        this.employeeTypeList = res.response.employeeType;
      }
    })
  }
  getAllState() {
    const data = {
      countryId: this.authUserData.countryId
    };
    // console.log("Request data for state>>>>>>>>>", data);
    this.common.getAllStates(data).subscribe((res: any) => {
      // console.log("Satate>>>>>>>", res);
      if (res.respondcode == 200) {
        this.stateList = res.data.stateList;
      }
    })
  }

  stateChange() {
    this.getAllCity();
  }

  getAllCity() {
    const data = {
      stateId: this.state
    };
    this.common.getAllDistrictByState(data).subscribe((res: any) => {
      // console.log("City res", res);
      if (res.respondcode == 200) {
        this.cityList = res.data.districtList;
      }
    })
  }

  saveSearch() {
    this.getVisitReports();
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
    this.fromDate = "";
    this.toDate = "";
    this.userName = "";
    this.empType = "";
    this.state = "";
    this.city = "";
    this.empStatus = "";
    this.offset = 0;
    this.currentPage = 1;
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
      str = data.name;
    } else if (pos == 1) {
      str = data.designationName;
    } else if (pos == 2) {
      str = this.getDate(data.inTime);
    } else if (pos == 3) {
      str = this.formatAMPM(data.inTime);
    } else if (pos == 4) {
      str = this.getDate(data.outTime);
    } else if (pos == 5) {
      str = this.formatAMPM(data.outTime);
    } else if (pos == 6) {
      str = this.getApprovalStatus(data.approveStatus);
    } else if (pos == 7) {
      str = data.stateName;
    } else if (pos == 8) {
      str = this.textTruncateData(data.cityName);
    }
    return str;
  }

  textTruncateData(str : any){
    let val : any = this.store.textTruncate(str, 30);
    return val;
  }

}
