import { Component, OnInit } from '@angular/core';
import { CUS_TYPE, employee_data, SALES_TYPE } from 'src/app/dummyData';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.css']
})
export class ViewMapComponent implements OnInit {

  constructor(
    private common: CommonService
  ) { }

  totalSalesCount : any = 0;
  totalSalesDist : any = 0;
  totalSalesDealer : any = 0;
  totalSaleSubdl : any = 0;
  countryId: any = "1";
  clientId: any = "";
  authUserData: any;
  mainTab: any = '1';
  isSalesClick: any = false;
  employeeDesignationList: any = [];
  empTypeId: any = 0;
  stateId: any = 0;
  allState: any = [];
  districtId: any = 0;
  allDistrict: any = [];
  zoneId: any = 0;
  allZone: any = [];
  allRating: any = [
    "3.5 and above",
    "4 and above",
    "4.5 and above",
    "5"
  ];
  filter: any = {
    type: this.empTypeId,
    state: this.stateId,
    district: this.districtId,
    zone: this.zoneId
  };
  sideData: any = {
    total: 0,
    present: 0,
    absent: 0,
    leave: 0,
    late: 0
  }

  selectedEmployeeData: any = {
    lat: 22.5448,
    lng: 88.3426
  };
  allEmployee: any = [];
  selectedEmployeeId: any;

  totalVisit: any = 0;
  pv: any = 0;
  upv: any = 0;

  customerCount: any = {
    dist: 0,
    dl: 0,
    sdl: 0
  }

  newCustCount: any = {
    dist: 0,
    dl: 0,
    sdl: 0
  }

  meetingCount: any = {
    mason: 0,
    ifb: 0
  };

  totalInfCount: any = {
    mason: 0,
    ifb: 0
  };



  opportunityMarker: any = [{
    lat: 22.5448,
    lng: 88.3426
  }];
  leadMarker: any = [{
    lat: 22.5448,
    lng: 88.3426
  }];
  enquiryMarker: any = [{
    lat: 22.5448,
    lng: 88.3426
  }];
  closedMarker: any = [{
    lat: 22.5448,
    lng: 88.3426
  }];

  salesMarker: any = {
    opMrkr: this.opportunityMarker,
    ldMrkr: this.leadMarker,
    enMrkr: this.enquiryMarker,
    clMrkr: this.closedMarker
  }

  salesTabData:any={
    isLead : true,
    isOpportunity : true,
    isEnquiry : true,
    isClosed : true
  }

  saleSideData : any ;

  ngOnInit(): void {
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    if (Object.keys(data).length > 0) {
      this.clientId = this.authUserData.clientId;
    }
    this.genSalesMap();
    this.getAllEmployeeDesignation();
    this.getAllLocationData();
    this.getLiveTrackingEmployeeData();
    this.getValueForVisit();
  }

  ngAfterViewInit() {
    this.getValueForVisit();
    this.genSalesMap();

  }

  getValueForVisit() {
    this.totalVisit = this.generateRandom(5, 10);
    this.upv = Math.ceil(this.totalVisit * (13 / 100));
    this.pv = (this.totalVisit - this.upv);
    // console.log("total Visit Count::", this.totalVisit);
    this.customerCount = {
      dist: Math.ceil(this.totalVisit * (8 / 100)),
      dl: Math.ceil(this.totalVisit * (16 / 100)),
      sdl: Math.ceil(this.totalVisit * (33 / 100))
    }

    let newRand: any = this.generateRandom(3, 10);
    this.newCustCount = {
      dist: Math.ceil(newRand * (10 / 100)),
      dl: Math.ceil(newRand * (30 / 100)),
      sdl: newRand - ((Math.ceil(newRand * (10 / 100))) + (Math.ceil(newRand * (30 / 100))))
    }

    let totalInf: any = this.totalVisit - (this.customerCount.dist + this.customerCount.dl + this.customerCount.sdl);
    this.meetingCount = {
      mason: this.generateRandom(3, 9),
      ifb: this.generateRandom(1, 5)
    }

    this.totalInfCount = {
      mason: Math.ceil(totalInf * (60 / 100)),
      ifb: totalInf - (Math.ceil(totalInf * (60 / 100)))
    }

  }



  onChangeMainTab(id: any) {
    this.mainTab = id;
    this.isSalesClick = false;

    if (id == 1) {
      document.getElementById("pills-beat-tab")?.classList.remove('active');
      document.getElementById("pills-beat")?.classList.remove('active');
      document.getElementById("pills-sales-tab")?.classList.remove('active');
      document.getElementById("pills-sales")?.classList.remove('active');
      document.getElementById("pills-area-tab")?.classList.remove('active');
      document.getElementById("pills-area")?.classList.remove('active');
      document.getElementById("pills-live-tab")?.classList.add('active');
      document.getElementById("pills-live")?.classList.add('active');
    } else if (id == 2) {
      document.getElementById("pills-live-tab")?.classList.remove('active');
      document.getElementById("pills-live")?.classList.remove('active');
      document.getElementById("pills-sales-tab")?.classList.remove('active');
      document.getElementById("pills-sales")?.classList.remove('active');
      document.getElementById("pills-area-tab")?.classList.remove('active');
      document.getElementById("pills-area")?.classList.remove('active');
      document.getElementById("pills-beat-tab")?.classList.add('active');
      document.getElementById("pills-beat")?.classList.add('active');
      document.getElementById("pills-beat")?.classList.add('show');
    } else if (id == 3) {
      document.getElementById("pills-live-tab")?.classList.remove('active');
      document.getElementById("pills-live")?.classList.remove('active');
      document.getElementById("pills-beat-tab")?.classList.remove('active');
      document.getElementById("pills-beat")?.classList.remove('active');
      document.getElementById("pills-area-tab")?.classList.remove('active');
      document.getElementById("pills-area")?.classList.remove('active');
      document.getElementById("pills-sales-tab")?.classList.add('active');
      document.getElementById("pills-sales")?.classList.add('active');
      let elem: any = document.querySelector('#pills-tab');
      elem.style.display = 'flex';
    } else if (id == 4) {
      document.getElementById("pills-live-tab")?.classList.remove('active');
      document.getElementById("pills-live")?.classList.remove('active');
      document.getElementById("pills-beat-tab")?.classList.remove('active');
      document.getElementById("pills-beat")?.classList.remove('active');
      document.getElementById("pills-sales-tab")?.classList.remove('active');
      document.getElementById("pills-sales")?.classList.remove('active');
      document.getElementById("pills-area-tab")?.classList.add('active');
      document.getElementById("pills-area")?.classList.add('active');
    }
    this.getValueForVisit();
  }

  goToBit(event: any) {
    console.log("Selected Employee Data::", event);
    this.onChangeMainTab(2);
    this.selectedEmployeeData = event;
    this.empTypeId = event.emp_type_id;
    this.selectedEmployeeId = event.id;
  }

  goToSalesSecond(event: any) {
    console.log("Event Sales map data::", event);
    this.isSalesClick = true;
  }

  getAllEmployeeDesignation() {
    let obj = {
      clientId: this.clientId
    }
    this.common.getEmployeeDesignation(obj).subscribe(res => {
      // console.log("Response Employee designation::", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        if (Object.keys(respObj).length > 0) {
          if (respObj.designationList.length > 0) {
            this.employeeDesignationList = respObj.designationList;
          }
        }
      }
    })
  }

  onChangeEmployeeDesignationType() {
    console.log("Employee Type ::", this.empTypeId);
  }

  getAllLocationData() {
    let obj = {
      countryId: this.countryId
    }
    this.common.getLocationHierarchy(obj).subscribe(res => {
      // console.log("Response:", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data.resData;
        if (Object.keys(respObj).length > 0) {
          if (respObj.state.length > 0) {
            this.allState = respObj.state;
          }
        }
      }
    })
  }

  getDistrictData(sid: any) {
    let arr: any = [];
    this.allState.map((data: any) => {
      if (sid == data.id) {
        arr = data.district;
      }
    });
    return arr;
  }

  getZoneData(sid: any, did: any) {
    let arr: any = [];
    this.allState.map((data: any) => {
      if (sid == data.id) {
        data.district.map((dd: any) => {
          if (dd.id == did) {
            arr = dd.zone;
          }
        })
      }
    });
    return arr;
  }

  onStateChange() {
    this.allDistrict = this.getDistrictData(this.stateId);
    this.districtId = "0";
    this.allZone = [];
    this.zoneId = "0";
    this.filter = {
      type: this.empTypeId,
      state: this.stateId,
      district: this.districtId,
      zone: this.zoneId
    }
  }

  onDistrictChange() {
    this.allZone = this.getZoneData(this.stateId, this.districtId);
    this.zoneId = "0";
    this.filter = {
      type: this.empTypeId,
      state: this.stateId,
      district: this.districtId,
      zone: this.zoneId
    }
  }

  onZoneChange() {
    // console.log("Selected Zone Id::", this.zoneId);
    this.filter = {
      type: this.empTypeId,
      state: this.stateId,
      district: this.districtId,
      zone: this.zoneId
    }
  }

  setSideData(event: any) {

    // console.log("Side dataL::", event);
    let data = {
      total: event.total,
      present: event.present,
      absent: event.absent,
      leave: event.leave,
      late: event.late
    }

    this.sideData = data;

  }

  getLiveTrackingEmployeeData() {
    let req = {
      clientId: this.clientId
    }
    this.common.getUserLocationMapping(req).subscribe(res => {
      console.log("All Employee Data::", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        if (Object.keys(respObj).length > 0) {
          if (respObj.data.length > 0) {
            let arr: any = [];
            respObj.data.map((item: any) => {

              arr.push({
                id: item.userId,
                name: item.firstName + " " + item.lastName,
                phone: item.phone,
                email: item.email,
                zone_id: item.zoneId,
                district_id: item.districtId,
                state_id: item.stateId,
                lat: item.lat,
                lng: item.lng,
                emp_type_id: item.designationId,
                isPresent: item.isPresent,
                isLate: item.isLate,

              })
            });
            this.allEmployee = arr;
          }
        }
      }
    })

    // this.markers = employee_data;

  }


  generateRandom(min = 0, max = 100) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor(rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
  }

  genSalesMap() {
    console.log("Generate salesMAP")

    let sysTot: any = 0;
    let EMP_LIST: any = employee_data;
    let empList: any = [];
    for (let i = 0; i < EMP_LIST.length; i++) {
      let dd = EMP_LIST[i];
      dd.name = dd.name + " Traders";
      dd["salesType"] = SALES_TYPE[this.generateRandom(0, 3)];
      dd["custType"] = CUS_TYPE[this.generateRandom(0, 3)];
      empList.push(dd);
    }


    let totCount = empList.length;
    let dlrCount = 0;
    let dstCount = 0;
    let sdCount = 0;
    let ec = 0,
      lc = 0,
      oc = 0,
      rcc = 0;

    let opportunityMarker: any = [];
    let leadMarker: any = [];
    let enquiryMarker: any = [];
    let closedMarker: any = [];


    for (let i = 0; i < empList.length-10; i++) {
      if (empList[i].lat !== undefined && empList[i].lng !== undefined) {
        if (empList[i].custType == "DLR") {
          dlrCount++;
        } else if (empList[i].custType == "DST") {
          dstCount++;
        } else if (empList[i].custType == "SD") {
          sdCount++;
        }
        let colorCode = "#EC1F24";
        if (empList[i].salesType == "Lead") {
          colorCode = "#1DD94D";
          lc++;
          this.leadMarker.push(empList[i]);
        } else if (empList[i].salesType == "Opportunity") {
          colorCode = "#000000";
          oc++;
          this.opportunityMarker.push(empList[i]);
        } else if (empList[i].salesType == "Recently Converted") {
          colorCode = "#F1BB00";
          rcc++;
          this.closedMarker.push(empList[i]);
        } else {
          ec++;
          this.enquiryMarker.push(empList[i]);
        }
      }
    }



    console.log("Generate salesMAp Obj ::", this.salesMarker)

    let mm = 15;
    totCount = totCount * mm;
    dlrCount = dlrCount * mm;
    dstCount = dstCount * mm;
    sdCount = sdCount * mm;

    this.totalSalesCount = totCount;
    this.totalSalesDist = dstCount;
    this.totalSalesDealer = dlrCount;
    this.totalSaleSubdl = sdCount;

    this.saleSideData = {
      totalCount : totCount,
      dlCount : dlrCount,
      dstCount : dstCount,
      sdCount : sdCount
    }

    this.salesMarker = {
      opMrkr: this.opportunityMarker,
      ldMrkr: this.leadMarker,
      enMrkr: this.enquiryMarker,
      clMrkr: this.closedMarker,
      btnData : this.salesTabData
      
    }

  }

  setSalesType(id:any){
    if(id == 1){
      this.salesTabData={
        isLead : true,
        isOpportunity : false,
        isEnquiry :false,
        isClosed : false
      }
      this.saleSideData={
        totalCount : Math.ceil(this.totalSalesCount *(25/100)),
        dlCount : Math.ceil(this.totalSalesDealer *(25/100)),
        dstCount : Math.ceil(this.totalSalesDist *(25/100)),
        sdCount : Math.ceil(this.totalSaleSubdl *(25/100)),
      }
    } else if(id == 0){
      this.salesTabData={
        isLead : false,
        isOpportunity : false,
        isEnquiry : true,
        isClosed : false
      }
      this.saleSideData={
        totalCount : Math.ceil(this.totalSalesCount *(55/100)),
        dlCount : Math.ceil(this.totalSalesDealer *(55/100)),
        dstCount : Math.ceil(this.totalSalesDist *(55/100)),
        sdCount : Math.ceil(this.totalSaleSubdl *(55/100)),
      }
    } else if(id == 2){
      this.salesTabData={
        isLead : false,
        isOpportunity : true,
        isEnquiry : false,
        isClosed : false
      }
      this.saleSideData={
        totalCount : Math.ceil(this.totalSalesCount *(12/100)),
        dlCount : Math.ceil(this.totalSalesDealer *(12/100)),
        dstCount : Math.ceil(this.totalSalesDist *(12/100)),
        sdCount : Math.ceil(this.totalSaleSubdl *(12/100)),
      }
    } else if(id == 3){
      this.salesTabData={
        isLead : false,
        isOpportunity : false,
        isEnquiry : false,
        isClosed : true
      }
      this.saleSideData={
        totalCount : Math.ceil(this.totalSalesCount *(8/100)),
        dlCount : Math.ceil(this.totalSalesDealer *(8/100)),
        dstCount : Math.ceil(this.totalSalesDist *(8/100)),
        sdCount : Math.ceil(this.totalSaleSubdl *(8/100)),
      }
    }

    this.salesMarker = {
      opMrkr: this.opportunityMarker,
      ldMrkr: this.leadMarker,
      enMrkr: this.enquiryMarker,
      clMrkr: this.closedMarker,
      btnData : this.salesTabData
    }
    
  }

}
