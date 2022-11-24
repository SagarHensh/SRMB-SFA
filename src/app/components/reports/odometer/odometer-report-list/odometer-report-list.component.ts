import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import app_config from 'src/app/app.config';
import { CommonService } from 'src/app/services/common.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { ODOMETER_REPORT } from 'src/app/TableHeader';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-odometer-report-list',
  templateUrl: './odometer-report-list.component.html',
  styleUrls: ['./odometer-report-list.component.css']
})
export class OdometerReportListComponent implements OnInit {

  constructor(private common: CommonService,
    private store: StoreDataService,
    private modalService: NgbModal,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService) { }

  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit = 50;
  offset = 0;
  totalRecords: any = "";
  @ViewChild('subordinateListModal') subordinateListModal: any;
  @ViewChild('editOdometerModal') editOdometerModal: any;
  odometerImagesModal: any;
  tableHeader: any = [];
  currentPage = 1;
  totalPage = 1;

  startPage: any = 0;
  endPage: any = 0;

  //------------------- For Filter------------------//

  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];
  searchName = "";
  empName = "";
  empEmail = "";
  empPhone = "";
  fromDate = "";
  toDate = "";
  inDate = "";
  state = "";
  city = "";
  zone = "";

  permissionDetails: any;
  isTable: any = 1;

  //--------------------  For Pagination -------------------//

  isdisable: boolean = false;
  isPrevious: boolean = true;

  ngOnInit(): void {
    this.tableHeader = ODOMETER_REPORT;
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    console.log("All AuthuserDATA: ", this.authUserData)
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.getPermissionDetails();

    //this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports();
    //-------------For Filter--------------------//
    this.getAllState();

  }

  getVisitReports() {
    this.spinner.show();
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit,
      "offset": this.offset.toString(),
      "userType": this.authUserData.userType,
      "searchName": this.searchName,
      "userName": this.empName,
      "email": this.empEmail,
      "phone": this.empPhone,
      "state": this.state,
      "city": this.city,
      // "zone":this.zone,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate,
      "readingDate": this.inDate
    };
    // console.log("Request data for odometer list>>>>>>>", req);
    this.common.getOdometerReportList(req).subscribe(res => {
      console.log("Odometer Report response::", res);
      if (res.respondcode == 200) {
        let respObj = res.data;
        if (respObj.data.length > 0) {
          this.allReportList = respObj.data;
          this.totalRecords = respObj.count;
          this.totalPage = Math.ceil(this.totalRecords / this.limit);
          this.startPage = Number(this.offset) + 1;
          this.endPage = Number(this.offset) + Number(this.allReportList.length);
          this.spinner.hide();

        } else {
          this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          this.isdisable = true;
          this.allReportList = [];
          this.totalRecords = 0;
          this.totalPage = 1;
          this.startPage = 1;
          this.endPage = 1;
          this.spinner.hide();

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
    if (val != null) {
      var dt = new Date(val);
      // var day: any = dt.getUTCDate();
      var day: any = dt.getDate();
      day = day > 9 ? day : "0" + day;
      // var month: any = dt.getUTCMonth() + 1;
      var month: any = dt.getMonth() + 1;
      month = month > 9 ? month : "0" + month;
      // var year: any = dt.getUTCFullYear();
      var year: any = dt.getFullYear();
      var finalDate = day + "-" + month + "-" + year
      return finalDate;
    } else {
      return "N/A"
    }
  }

  formatAMPM(val: any) {
    if (val != null) {
      // console.log("Api Val:", val)
      var date = new Date(val);
      // var hours: any = date.getUTCHours();
      var hours: any = date.getHours();
      // console.log("Hours:", hours)
      // var minutes: any = date.getUTCMinutes();
      var minutes: any = date.getMinutes();
      // console.log("Minutes:", minutes)
      var ampm: any = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      // console.log("Main return Time:", strTime)
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
    this.getVisitReports();
  }

  onDownload() {
    // console.log("download function");
    // let req = {
    //   "clientId": this.authUserData.clientId,
    //   "userId": this.authUserData.userId,
    //   "limit": this.limit,
    //   "offset": this.offset.toString()
    // };
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit,
      "offset": this.offset.toString(),
      "userType": this.authUserData.userType,
      "searchName": this.searchName,
      "userName": this.empName,
      "email": this.empEmail,
      "phone": this.empPhone,
      "state": this.state,
      "city": this.city,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate,
      "readingDate": this.inDate
    };
    // console.log("request for odometer", req);
    this.common.getOdometerReportsDownload(req).subscribe(res => {
      // console.log("Download res for odometer", res);
      // console.log("Download res  path for odometer", res.data.path);
      if (res.data.path != "") {
        var file_path = app_config.downloadUrlExcel  + res.data.path;
        // console.log("file_path>>>>>>>>>>>>>>>", file_path);
        var a = document.createElement('a');
        a.href = file_path;
        // a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        a.download = file_path;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    })
  }


  closeModal() {
    this.modalService.dismissAll();
  }
  openViewOdometerModal(data: any) {
    console.log("data::", data)
    let inTime: any = data.inTimePic != "" ? app_config.imageUrl + data.inTimePic : "";
    let outTime: any = data.outTimePic !== null ? app_config.imageUrl + data.outTimePic : ""


    this.odometerImagesModal = {
      id: data.odoMeterId,
      inTime: this.formatAMPM(data.inTime),
      inTimeDate: this.getDate(data.inTime),
      outTime: this.formatAMPM(data.outTime),
      outTimeDate: this.getDate(data.outTime),
      inMeter: data.inMeter,
      outMeter: data.outMeter,
      inTimePic: inTime,
      outTimePic: outTime
    }
    // console.log("odometer image modal::", inTime)
    this.modalService.open(this.subordinateListModal, { size: 'lg', centered: true, animation: true })
  }

  //--------------------- For Filter------------------------//

  getAllState() {
    const data = {
      countryId: this.authUserData.countryId
    };
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
  cityChange() {
    this.getAllZone();
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

  getAllZone() {
    const data = {
      cityId: this.city
    };
    this.common.getAllZoneByCity(data).subscribe((res: any) => {
      // console.log("Zone res>>>>>>>>>>>>>", res);
      if (res.respondcode == 200) {
        this.zoneList = res.data.zoneList;
      }
    })
  }

  reset() {
    this.empName = "";
    this.empPhone = "";
    this.empEmail = "";
    this.state = "";
    this.city = "";
    this.zone = "";
    this.inDate = "";
    this.getVisitReports();
  }

  search() {
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
        this.getVisitReports();
        // this.notifier.notify('error', 'Please enter valid date range');
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

  searchIndividual(event: any) {
    if (event.target.value.length > 1) {
      this.searchName = event.target.value;
      this.getVisitReports();
    } else {
      this.searchName = "";
      this.getVisitReports();
    }
  }

  //---------------------  For Pagination-----------------------//

  //   changepagelimit(e: any) {

  //     this.limit = Number(e.target.value);
  //     this.getVisitReports();

  // }

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

  getDistanceData(val: any) {
    let str: any = "";
    if (val != null) {
      str = parseFloat(val).toFixed(2)
    } else {
      str = "";
    }
    return str;
  }

  tableDataView(data: any, pos: any) {
    let str: any = "";
    if (pos == 0) {
      str = data.userName
    } else if (pos == 1) {
      str = this.getDate(data.inTime)
    } else if (pos == 2) {
      str = this.formatAMPM(data.inTime)
    } else if (pos == 3) {
      str = data.inMeter
    } else if (pos == 4) {
      str = this.formatAMPM(data.outTime)
    } else if (pos == 5) {
      str = data.outMeter
    } else if (pos == 6) {
      str = this.getDistanceData(data.distance)
    } else if (pos == 7) {
      str = data.email
    } else if (pos == 8) {
      str = data.phone
    } else if (pos == 9) {
      str = data.stateName
    } else if (pos == 10) {
      str = data.cityName
    } else if (pos == 11) {
      str = data.UserType;
    } else if (pos == 12) {
      str = this.getApprovalStatus(data.approvedStatus);
    }
    return str;
  }

  openEditOdometerModal(data: any) {
    // console.log("data::", data)
    let inTime: any = data.inTimePic != "" ? app_config.imageUrl + data.inTimePic : "";
    let outTime: any = data.outTimePic !== null ? app_config.imageUrl + data.outTimePic : ""


    this.odometerImagesModal = {
      id: data.odometerId,
      inTime: this.formatAMPM(data.inTime),
      inTimeDate: this.getDate(data.inTime),
      outTime: this.formatAMPM(data.outTime),
      outTimeDate: this.getDate(data.outTime),
      inMeter: data.inMeter,
      outMeter: data.outMeter,
      inTimePic: inTime,
      outTimePic: outTime
    }
    // console.log("odometer image modal::", inTime)
    this.modalService.open(this.editOdometerModal, { size: 'lg', centered: true, animation: true })
  }

  getPermissionDetails() {
    if (this.authUserData.moduleDetails.length > 0) {
      for (let item of this.authUserData.moduleDetails) {
        if (item.name == "Odometer Reading" && item.isView == 1) {
          this.permissionDetails = item;
        }
      }
      // console.log(" Odometer Permission Details:", this.permissionDetails)
    }
  }

  approvedOdometer(id: any) {
    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId,
      odoMeterId: id
    }
    this.common.approvedOdometer(req).subscribe(response => {
      let res: any = response;
      if (res.respondcode == 200) {
        this.notifier.notify('success', 'Odometer Approved successfully');
        this.getVisitReports();
      } else {
        this.notifier.notify('error', res.message);
      }
    })
  }

  updateOdometer() {
    // console.log("Update odometer Details: ", this.odometerImagesModal);
    if (this.odometerImagesModal.outMeter == null) {
      // this.updateOdometerApi();
      this.notifier.notify('error', 'Outmeter cannot be blank');
    } else {
      if (Number(this.odometerImagesModal.outMeter) > Number(this.odometerImagesModal.inMeter)) {
        this.updateOdometerApi();
      } else {
        this.notifier.notify('error', 'Outmeter cannot be less than inmeter value');
      }
    }
  }

  updateOdometerApi() {
    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId,
      odoMeterId: this.odometerImagesModal.id,
      inMeter: this.odometerImagesModal.inMeter,
      outMeter: this.odometerImagesModal.outMeter == null ? '' : this.odometerImagesModal.outMeter,
    }
    console.log("Update odometer Request: ", req);
    this.common.updateOdometer(req).subscribe(response => {
      let res: any = response;
      if (res.respondcode == 200) {
        this.modalService.dismissAll();
        this.notifier.notify('success', 'Endmeter updated successfully');
        this.getVisitReports();
      } else {
        this.notifier.notify('error', res.message);
      }
    })
  }


  keyPressNumbersWithDecimal(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
