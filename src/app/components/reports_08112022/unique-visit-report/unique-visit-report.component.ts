import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreDataService } from 'src/app/services/store-data.service';
import { CommonService } from 'src/app/services/common.service';
import app_config from 'src/app/app.config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { UNIQUE_VISIT_REPORT_LIST } from 'src/app/TableHeader';

@Component({
  selector: 'app-unique-visit-report',
  templateUrl: './unique-visit-report.component.html',
  styleUrls: ['./unique-visit-report.component.css']
})
export class UniqueVisitReportComponent implements OnInit {


  constructor(private store: StoreDataService,
    private common: CommonService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

  @ViewChild('stockViewModal') stockViewModal: any;
  authUserData: any;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit: any = "";
  offset: any = "0";
  totalRecords: any = "";

  //--------------------- For Filter----------------------------//
  searchName = "";
  fromDate = "";
  toDate = "";
  custName = "";
  empName = "";
  custType = "" as any;
  state = "" as any;
  city = "" as any;
  zone = "" as any;
  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];
  contactTypeList: any = [];
  stockViewList: any = [];
  stockViewDeatils: any;
  tableHeader: any = [];
  isTable: any = 1;
  currentPage = 1;
  totalPage = 1;

  startPage: any = 0;
  endPage: any = 0;



  ngOnInit(): void {
    this.tableHeader = UNIQUE_VISIT_REPORT_LIST;
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getReport();
    this.getContactType();
    this.getState();
  }

  getReport() {
    console.log('searcForm',this.fromDate)
    console.log('searcTo',this.toDate)
    this.spinner.show();
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      // "userType": this.authUserData.userType,
      // "searchName": this.searchName,
      // "customerName": this.custName,
      // "empName": this.empName,
      // "custType": this.custType,
      // "stateId": this.state,
      // "cityId": this.city,
      // "zoneId": this.zone,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate
    };
    // console.log("Request data for Stock report>>>>>>>>>>>>>>", req);
    this.common.getUniqueVisitReport(req).subscribe((res: any) => {
      // console.log("unique visit Report response::", res);
      if (res.respondcode == 200) {
        let respObj: any = res.data;
        if (respObj.list.length > 0) {
          this.allReportList = respObj.list;
          this.totalRecords = respObj.count == undefined ? 0 : respObj.count;
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
        this.spinner.hide();
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

  changeLimit() {
    // console.log("limit value::", this.limit);
    this.getReport();
  }

  onDownload() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
    };
    this.common.getUniqueVisitReportDownload(req).subscribe(response => {
      let res: any = response;
      // console.log("unique report Response for download>>>>>>>>>>>>>", res);
      if (res.respondcode == 200) {
        var file_path = app_config.downloadUrl + res.data;
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

  //-------------------------  For Filter------------------------//

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
      // console.log("state res>>>>>>>>>", res);
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
      // console.log("city res>>>>>>>>>", res);
      if (res.respondcode == 200) {
        this.cityList = res.data.districtList;
      }
    })
  }
  getZone() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "cityId": this.city
    };
    this.common.getAllZoneByCity(data).subscribe((res: any) => {
      // console.log("zone res>>>>>>>>>", res);
      if (res.respondcode == 200) {
        this.zoneList = res.data.zoneList;
      }
    })
  }

  changeState() {
    this.getCity();
  }
  changeCity() {
    this.getZone();
  }

  searchByDateRange() {
    this.getReport();
  }

  resetDate() {
    this.fromDate = "";
    this.toDate = "";
    this.getReport();
  }

  reset() {
    this.custName = "";
    this.empName = "";
    this.custType = "";
    this.state = "";
    this.city = "";
    this.zone = "";
    this.getReport();
  }

  saveSearch() {
    this.getReport();
  }

  searchIndividual(event: any) {
    if (event.target.value.length > 1) {
      this.searchName = event.target.value;
      this.getReport();
    } else {
      this.searchName = "";
      this.getReport();
    }
  }

  viewStockDetails(data: any) {
    // console.log("Stock details:", data);
    this.stockViewDeatils = data;
    let req = {
      clientId: this.authUserData.clientId,
      stockId: data.stockReportId,
      customerId: data.customerId
    }

    // console.log("req for stock details:", req);

    this.common.getStockDetails(req).subscribe(response => {
      // console.log("Stock details response:", response);
      let res: any = response;
      if (res.respondcode == 200) {
        this.stockViewList = res.data;
      }
    })
    this.modalService.open(this.stockViewModal, { size: 'lg', centered: true, animation: true })
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  getStockQty(val: any) {
    let str: any = "";
    if (val != null) {
      str = parseFloat(val).toFixed(2);
    } else {
      str = "";
    }

    return str;
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
      this.getReport();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.offset = (this.currentPage - 1) * this.limit;
      this.getReport();
    }
  }

}
