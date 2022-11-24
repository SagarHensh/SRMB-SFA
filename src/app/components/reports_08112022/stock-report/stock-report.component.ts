import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreDataService } from 'src/app/services/store-data.service';
import { CommonService } from 'src/app/services/common.service';
import app_config from 'src/app/app.config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { STOCK_REPORT_LIST} from  'src/app/TableHeader';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent implements OnInit {


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
  tableHeader: any =[];

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
  isTable: any = 1;
  currentPage: any = 1;
  totalPage = 1;
  startPage: any = 0;
  endPage: any = 0;



  ngOnInit(): void {
    this.tableHeader=STOCK_REPORT_LIST;
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getStockReports();
    this.getContactType();
    this.getState();
  }

  getStockReports() {
    this.spinner.show();
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "userType": this.authUserData.userType,
      "searchName": this.searchName,
      "customerName": this.custName,
      "empName": this.empName,
      "custType": this.custType,
      "stateId": this.state,
      "cityId": this.city,
      "zoneId": this.zone,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate
    };
    // console.log("Request data for Stock report>>>>>>>>>>>>>>", req);
    this.common.getStockReportList(req).subscribe((res: any) => {
      console.log("Stock report response::", res);
      if (res.respondcode == 200) {
        let respObj: any = res.data;
        if (respObj.data.length > 0) {
          this.allReportList = respObj.data;
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

  changeLimit() {
    // console.log("limit value::", this.limit);
    this.getStockReports();
  }

  onDownload() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "userType": this.authUserData.userType,
      "customerName": this.custName,
      "empName": this.empName,
      "custType": this.custType,
      "stateId": this.state,
      "cityId": this.city,
      "zoneId": this.zone,
      "searchFrom": this.fromDate,
      "searchTo": this.toDate
    };
    this.common.getStockReportDownload(req).subscribe((res: any) => {
      // console.log("Stock report Response for download>>>>>>>>>>>>>", res);
      if (res.data.path != "") {
        var file_path = app_config.downloadUrlSFA + res.data.path;
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
    this.getStockReports();
  }

  resetDate() {
    this.fromDate = "";
    this.toDate = "";
    this.getStockReports();
  }

  reset() {
    this.custName = "";
    this.empName = "";
    this.custType = "";
    this.state = "";
    this.city = "";
    this.zone = "";
    this.getStockReports();
  }

  saveSearch() {
    this.getStockReports();
  }

  searchIndividual(event: any) {
    if (event.target.value.length > 1) {
      this.searchName = event.target.value;
      this.getStockReports();
    } else {
      this.searchName = "";
      this.getStockReports();
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

  tableDataView(data: any, pos: any) {
    let str: any = "";
    if (pos == 0) {
      str = data.stateName
    } 
    else if(pos == 1){
      str = data.cityName
    }
    else if(pos == 2){
      str = data.zoneName
    }
    else if(pos == 3){
      str = data.pincode
    }
    else if(pos == 4){
      str = data.customerName
    }
    else if(pos == 5){
      str = data.contactTypeName
    }
    else if(pos ==6)
    {
      str = data.phoneNumber
    }
    else if(pos ==7)
    {
      str = data.email
    }
    else if(pos ==8)
    {
      str = data.userName
    }
    else if(pos ==9)
    {
      str = data.designationName
    }
    else if(pos ==10)
    {
      str = data.erpNo
    }
    else if(pos ==11)
    {
      str = data.createDate
    }
    else if(pos ==12)
    {
      str = data.productName
    }
    else if(pos ==13)
    {
      str = data.stockValue
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
      this.getStockReports();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.offset = (this.currentPage - 1) * this.limit;
      this.getStockReports();
    }
  }
}
