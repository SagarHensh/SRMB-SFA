import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import app_config from 'src/app/app.config';
import { CommonService } from 'src/app/services/common.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { ODOMETER_REPORT } from 'src/app/TableHeader';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-odometer-report-list',
  templateUrl: './odometer-report-list.component.html',
  styleUrls: ['./odometer-report-list.component.css']
})
export class OdometerReportListComponent implements OnInit {

  constructor(private common: CommonService,
    private store: StoreDataService,
    private modalService: NgbModal,
    private notifier : NotifierService) { }

  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit = 50;
  offset = 0;
  totalRecords: any = "";
  @ViewChild('subordinateListModal') subordinateListModal: any;
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

  //--------------------  For Pagination -------------------//

  isdisable: boolean = false;
  isPrevious: boolean = true;

  ngOnInit(): void {
    this.tableHeader = ODOMETER_REPORT;
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);

    this.paginationLimitDropdown = this.store.getPaginationLimitList();


    //this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports();
    //-------------For Filter--------------------//
    this.getAllState();
  }

  getVisitReports() {
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
    console.log("Request data for odometer list>>>>>>>", req);
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

        } else {
          this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          this.isdisable = true;
          this.allReportList = [];
          this.totalRecords = 0;
          this.totalPage = 1;
          this.startPage = 1;
          this.endPage = 1;

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
    var day: any = dt.getUTCDate();
    day = day > 9 ? day : "0" + day;
    var month: any = dt.getUTCMonth() + 1;
    month = month > 9 ? month : "0" + month;
    var year: any = dt.getUTCFullYear();
    var finalDate = day + "-" + month + "-" + year
    return finalDate;
  }

  formatAMPM(val: any) {
    var date = new Date(val);
    var hours: any = date.getUTCHours();
    var minutes: any = date.getUTCMinutes();
    var ampm: any = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
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
    console.log("download function");
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit,
      "offset": this.offset.toString()
    };
    // console.log("request for odometer", req);
    this.common.getOdometerReportsDownload(req).subscribe(res => {
      // console.log("Download res for odometer", res);
      // console.log("Download res  path for odometer", res.data.path);
      if (res.data.path != "") {
        var file_path = app_config.downloadUrlSFA + res.data.path;
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
    // console.log("data::", data)
    let inTime: any = data.inTimePic != "" ? app_config.imageUrl + data.inTimePic : "";
    let outTime: any = data.outTimePic !== null ? app_config.imageUrl + data.outTimePic : ""


    this.odometerImagesModal = {
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
    if (this.fromDate < this.toDate) {
      this.getVisitReports();
    } else {
      this.notifier.notify('error', 'Please enter valid date range');
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

  tableDataView(data: any, pos: any) {
    let str: any = "";
    if (pos == 0) {
      str = data.userName
    } else if (pos == 1) {
      str = this.getDate(data.inTime)
    } else if (pos == 2) {
      str = this.formatAMPM(data.zoneName)
    } else if (pos == 3) {
      str = data.inMeter
    } else if (pos == 4) {
      str = this.formatAMPM(data.outTime)
    } else if (pos == 5) {
      str = data.outMeter
    } else if (pos == 6) {
      str = data.distance
    } else if (pos == 7) {
      str = data.email
    } else if (pos == 8) {
      str = data.phone
    } else if (pos == 9) {
      str = data.stateName
    } else if (pos == 10) {
      str = data.cityName
    }
    return str;
  }
}
