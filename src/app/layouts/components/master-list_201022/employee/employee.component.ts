import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import app_config from 'src/app/app.config';
import { StoreDataService } from 'src/app/services/store-data.service';
import { CrmService } from 'src/app/services/crm.service';
import { EMPLOYEE_LIST } from 'src/app/TableHeader';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private common: CommonService,
    private store: StoreDataService, private crm: CrmService) { }

  authUserData: any;
  countryId: any = "1";
  clientId: any = "";
  employeeList: any = [];
  paginationLimitDropdown: any = [];
  limit: any = 10;
  offset: any = "0";
  totalRecords: any = 0;
  tableHeader: any = [];
  currentPage = 1;
  totalPage = 1;

  startPage: any = 0;
  endPage: any = 0;


  //---------------- For Filter----------------//
  searchName = "";
  fromDate = "";
  toDate = "";
  empName = "";
  empType = "";
  state = "" as any;
  city = "" as any;
  employeeTypeList: any = [];
  stateList: any = [];
  cityList: any = [];



  ngOnInit(): void {
    this.tableHeader = EMPLOYEE_LIST;
    let data: any = this.common.getAuthUserData();
    // console.log("authUserL::", JSON.parse(data));
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getEmployeeData();
    this.getEnquiryReportData();
    this.getState();
  }

  getEmployeeData() {
    let obj = {
      countryId: this.authUserData.countryId,
      clientId: this.authUserData.clientId,
      limit: this.limit,
      offset: this.offset.toString(),
      searchName: this.searchName,
      searchFrom: this.fromDate,
      searchTo: this.toDate,
      stateId: this.state,
      districtId: this.city,
      name: this.empName,
      designationId: this.empType
    };
    console.log("Request Data for employee data", obj);
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

  onDownload() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "limit": this.limit.toString(),
      "offset": this.offset.toString()
    };

    this.common.employeeListDownload(req).subscribe((res: any) => {
      console.log("employee res>>>>>>>>>", res);
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

  //--------------------- For Filter -----------------//

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

  getState() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "countryId": this.authUserData.countryId
    };
    this.common.getAllStates(data).subscribe((res: any) => {
      console.log("state res>>>>>>>>>", res);
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
      console.log("city res>>>>>>>>>", res);
      if (res.respondcode == 200) {
        this.cityList = res.data.districtList;
      }
    })
  }

  changeState() {
    this.getCity();
  }

  searchIndividual(event: any) {
    if (event.target.value.length > 1) {
      this.searchName = event.target.value;
      this.getEmployeeData();
    } else {
      this.searchName = "";
      this.getEmployeeData();
    }
  }
  searchByDateRange() {
    this.getEmployeeData();
  }
  resetDate() {
    this.fromDate = "";
    this.toDate = "";
    this.getEmployeeData();
  }

  saveSearch() {
    this.getEmployeeData();
  }

  reset() {
    this.fromDate = "";
    this.toDate = "";
    this.searchName = "";
    this.empName = "";
    this.empType = "";
    this.state = "";
    this.city = "";
    this.getEmployeeData();
  }
  tableDataView(data: any, pos: any) {
    let str: any = "";
    if (pos == 0) {
      str = data.firstName
    } else if (pos == 1) {
      str = data.phone
    } else if (pos == 2) {
      str = data.email
    } else if (pos == 3) {
      str = data.designationName
    } else if (pos == 4) {
      str = data.stateName
    } else if (pos == 5) {
      str =this.textTruncateData(data.cityName)
    } 
    return str;
  }

  textTruncateData(str : any){
    let val : any = this.store.textTruncate(str, 20);
    return val;
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
