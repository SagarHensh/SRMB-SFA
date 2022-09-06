import { Component, OnInit, ViewChild } from '@angular/core';
import app_config from 'src/app/app.config';
import { CommonService } from 'src/app/services/common.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { CrmService } from 'src/app/services/crm.service';

@Component({
  selector: 'app-attendence-list',
  templateUrl: './attendence-list.component.html',
  styleUrls: ['./attendence-list.component.css']
})
export class AttendenceListComponent implements OnInit {

  constructor(
    private common: CommonService,
    private store: StoreDataService,
    private crm: CrmService
  ) { }

  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit: any = "";
  offset: any = "0";
  totalRecords: any = "";
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
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    console.log("authuserData:: ", this.authUserData);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports();
    this.getEnquiryReportData();
    this.getAllState();
  }

  getVisitReports() {
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
    console.log("Request dat for attendance listing>>>>>>>>>>>>>>>>", req);
    this.common.getAttendanceList(req).subscribe(res => {
      console.log("Attendance Report response::", res);
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
    this.getVisitReports();
  }

  onDownload() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString()
    }
    this.common.getAttendanceReportsDownload(req).subscribe((res: any) => {

      console.log("Download res", res);
      if (res.data.path != "") {
        var file_path = app_config.downloadUrlSFA + res.data.path;
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
      console.log("For Filter res>>>>>>>>>>>>>", res);
      if (res.success) {
        this.employeeTypeList = res.response.employeeType;
      }
    })
  }
  getAllState() {
    const data = {
      countryId: this.authUserData.countryId
    };
    console.log("Request data for state>>>>>>>>>",data);
    this.common.getAllStates(data).subscribe((res: any) => {
      console.log("Satate>>>>>>>", res);
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
      console.log("City res", res);
      if (res.respondcode == 200) {
        this.cityList = res.data.districtList;
      }
    })
  }

  saveSearch() {
    this.getVisitReports();
  }

  searchByDateRange() {
    this.getVisitReports();
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
