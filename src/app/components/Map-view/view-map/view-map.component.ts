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

  totalSalesCount: any = 0;
  totalSalesDist: any = 0;
  totalSalesDealer: any = 0;
  totalSaleSubdl: any = 0;
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
  rating: any = "0";

  filter: any = {
    type: this.empTypeId,
    state: this.stateId,
    district: this.districtId,
    zone: this.zoneId
  };

  filterBeat: any = {
    designation: "",
    empId: "",
    date: this.getCurrentDate()
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

  // ============================

  visitType: any = [];

  totalVisit: any = 0;
  pv: any = 0;
  upv: any = 0;

  customerCount: any = [];

  newCustCount: any = []

  meetingCount: any = {
    mason: 0,
    ifb: 0
  };

  totalInfCount: any = [];



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

  salesTabData: any = {
    isLead: true,
    isOpportunity: true,
    isEnquiry: true,
    isClosed: true
  }


  filterSales: any = {
    state: this.stateId,
    district: this.districtId,
    zone: this.zoneId
  };

  saleSideData: any = {
    totalCount: 0,
    dlCount: 0,
    dstCount: 0,
    sdCount: 0
  };
  selectedDate: any = "";
  allBeatSideData: any;

  allSalesMapData: any;



  ngOnInit(): void {
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    if (Object.keys(data).length > 0) {
      this.clientId = this.authUserData.clientId;
    }
    this.getLiveTrackingEmployeeData();
    // this.genSalesMap();
    this.getSalesMapData()
    this.getAllEmployeeDesignation();
    this.getAllLocationData();
    // this.getLiveTrackingEmployeeData();
    this.getValueForVisit();
    this.selectedDate = this.getCurrentDate();
  }

  ngAfterViewInit() {
    this.getValueForVisit();
    // this.genSalesMap();
    this.getSalesMapData()

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
    // this.getLiveTrackingEmployeeData();
    // console.log("Selected Employee Data::", event);
    // console.log("ALl Employee Data:", this.allEmployee)
    this.onChangeMainTab(2);
    this.selectedEmployeeData = event;
    this.empTypeId = event.emp_type_id;
    this.selectedEmployeeId = event.id;
    // console.log("Selected Employee Id:", this.selectedEmployeeId)
  }

  goToSalesSecond(event: any) {
    // console.log("Event Sales map data::", event);
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
    // console.log("Employee Type ::", this.empTypeId);
    this.filter = {
      type: this.empTypeId,
      state: this.stateId,
      district: this.districtId,
      zone: this.zoneId,
      rating: this.rating
    }
    this.getLiveTrackingEmployeeData()
  }

  onRatingChange() {
    this.filter = {
      type: this.empTypeId,
      state: this.stateId,
      district: this.districtId,
      zone: this.zoneId,
      rating: this.rating
    }
  }

  getAllLocationData() {
    let obj = {
      countryId: this.countryId,
      clientId: this.clientId
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
      zone: this.zoneId,
      rating: this.rating
    }
  }

  onDistrictChange() {
    this.allZone = this.getZoneData(this.stateId, this.districtId);
    this.zoneId = "0";
    this.filter = {
      type: this.empTypeId,
      state: this.stateId,
      district: this.districtId,
      zone: this.zoneId,
      rating: this.rating
    }
  }

  onZoneChange() {
    // console.log("Selected Zone Id::", this.zoneId);
    this.filter = {
      type: this.empTypeId,
      state: this.stateId,
      district: this.districtId,
      zone: this.zoneId,
      rating: this.rating
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

  setBeatSideData(event: any) {

    console.log("Side data from Beat::", event);
    this.allBeatSideData = event;
    this.visitType = [];
    this.customerCount = [];
    this.totalInfCount = [];
    this.newCustCount = [];

    if (Object.keys(this.allBeatSideData.visitType).length > 0) {
      // console.log("All Obj Array>>>>>>>>>>>>", Object.keys(this.allBeatSideData.visitType));
      let arr: any = Object.keys(this.allBeatSideData.visitType);
      arr.map((data: any) => {
        this.visitType.push({
          title: data,
          value: this.allBeatSideData.visitType[data]
        })
      });
      // console.log("New Visit Type Arry::", this.visitType)
    }

    if (Object.keys(this.allBeatSideData.customer).length > 0) {
      // console.log("All Obj Array>>>>>>>>>>>>", Object.keys(this.allBeatSideData.customer));
      let arr: any = Object.keys(this.allBeatSideData.customer);
      arr.map((data: any) => {
        this.customerCount.push({
          title: data,
          value: this.allBeatSideData.customer[data]
        })
      });
    }

    if (Object.keys(this.allBeatSideData.newcustomer).length > 0) {
      // console.log("All Obj Array>>>>>>>>>>>>", Object.keys(this.allBeatSideData.customer));
      let arr: any = Object.keys(this.allBeatSideData.newcustomer);
      arr.map((data: any) => {
        this.newCustCount.push({
          title: data,
          value: this.allBeatSideData.newcustomer[data]
        })
      });
    }

    if (Object.keys(this.allBeatSideData.influencer).length > 0) {
      // console.log("All Obj Array>>>>>>>>>>>>", Object.keys(this.allBeatSideData.customer));
      let arr: any = Object.keys(this.allBeatSideData.influencer);
      arr.map((data: any) => {
        this.totalInfCount.push({
          title: data,
          value: this.allBeatSideData.influencer[data]
        })
      });
    }

  }

  getLiveTrackingEmployeeData() {
    let req = {
      clientId: this.clientId,
      stateId: this.stateId,
      districtId: this.districtId,
      zoneId: this.zoneId,
      designationId: this.empTypeId,
      rating: this.rating
    }
    this.common.getUserLocationMapping(req).subscribe(res => {
      console.log("All Employee Data from View-map ::", res);
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
          } else {
            this.allEmployee = []
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


    for (let i = 0; i < empList.length - 10; i++) {
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
      totalCount: totCount,
      dlCount: dlrCount,
      dstCount: dstCount,
      sdCount: sdCount
    }

    this.salesMarker = {
      opMrkr: this.opportunityMarker,
      ldMrkr: this.leadMarker,
      enMrkr: this.enquiryMarker,
      clMrkr: this.closedMarker,
      btnData: this.salesTabData

    }

  }

  setSalesType(id: any) {
    if (this.allSalesMapData != undefined) {
      if (id == 1) {
        this.salesTabData = {
          isLead: true,
          isOpportunity: false,
          isEnquiry: false,
          isClosed: false
        }
        this.saleSideData = {
          totalCount: this.allSalesMapData.lead.total,
          dlCount: this.allSalesMapData.lead.contact.Dealer,
          dstCount: this.allSalesMapData.lead.contact.Distributor,
          sdCount: this.allSalesMapData.lead.contact['Sub-Dealer'],
        }
      } else if (id == 0) {
        this.salesTabData = {
          isLead: false,
          isOpportunity: false,
          isEnquiry: true,
          isClosed: false
        }
        this.saleSideData = {
          totalCount: this.allSalesMapData.enquiry.total,
          dlCount: this.allSalesMapData.enquiry.contact.Dealer,
          dstCount: this.allSalesMapData.enquiry.contact.Distributor,
          sdCount: this.allSalesMapData.enquiry.contact['Sub-Dealer'],
        }
      } else if (id == 2) {
        this.salesTabData = {
          isLead: false,
          isOpportunity: true,
          isEnquiry: false,
          isClosed: false
        }
        this.saleSideData = {
          totalCount: this.allSalesMapData.opportunity.total,
          dlCount: this.allSalesMapData.opportunity.contact.Dealer,
          dstCount: this.allSalesMapData.opportunity.contact.Distributor,
          sdCount: this.allSalesMapData.opportunity.contact['Sub-Dealer'],
        }
      } else if (id == 3) {
        this.salesTabData = {
          isLead: false,
          isOpportunity: false,
          isEnquiry: false,
          isClosed: true
        }
        this.saleSideData = {
          totalCount: this.allSalesMapData.closed.total,
          dlCount: this.allSalesMapData.closed.contact.Dealer,
          dstCount: this.allSalesMapData.closed.contact.Distributor,
          sdCount: this.allSalesMapData.closed.contact['Sub-Dealer'],
        }
      }

      this.salesMarker = {
        opMrkr: this.opportunityMarker,
        ldMrkr: this.leadMarker,
        enMrkr: this.enquiryMarker,
        clMrkr: this.closedMarker,
        btnData: this.salesTabData
      }
    }

  }

  getCurrentDate() {
    var dt = new Date();
    var day: any = dt.getDate();
    day = day > 9 ? day : "0" + day;
    var month: any = dt.getMonth() + 1;
    month = month > 9 ? month : "0" + month;
    var year: any = dt.getFullYear();
    // var finalDate = day + "-" + month + "-" + year;
    var finalDate = year + "-" + month + "-" + day;
    return finalDate;
  }

  changeEmployeeDesignationBeatRoute() {
    // console.log("Selected Employee Designation", this.empTypeId);
    this.filterBeat = {
      designation: this.empTypeId,
      empId: this.selectedEmployeeId,
      date: this.selectedDate
    }
    this.getLiveTrackingEmployeeData();
  }

  changeEmployeeNameBeatRoute() {
    // console.log("Selected Employee Name", this.selectedEmployeeId);
    this.filterBeat = {
      designation: this.empTypeId,
      empId: this.selectedEmployeeId,
      date: this.selectedDate
    }
  }

  changeDateBeatRoute() {
    // console.log("Selected Date", this.selectedDate);
    this.filterBeat = {
      designation: this.empTypeId,
      empId: this.selectedEmployeeId,
      date: this.selectedDate
    }
  }

  changeSalesState() {
    this.allDistrict = this.getDistrictData(this.stateId);
    this.districtId = "0";
    this.allZone = [];
    this.zoneId = "0";
    this.filterSales = {
      state: this.stateId,
      district: this.districtId,
      zone: this.zoneId
    }

    this.getSalesMapData()
  }

  onDistrictChangeSalesTab() {
    this.allZone = this.getZoneData(this.stateId, this.districtId);
    this.zoneId = "0";
    this.filterSales = {
      state: this.stateId,
      district: this.districtId,
      zone: this.zoneId
    }

    this.getSalesMapData()
  }

  onZoneChangeSalesTab() {
    // console.log("Selected Zone Id::", this.zoneId);
    this.filterSales = {
      state: this.stateId,
      district: this.districtId,
      zone: this.zoneId
    }

    this.getSalesMapData()
  }

  getSalesMapData() {
    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId,
      stateId: this.filter.state,
      districtId: this.filter.district,
      zoneId: this.filter.zone
    }

    this.common.getCrmSalesMap(req).subscribe((res: any) => {
      console.log("Sales Map Data::", res)
      if (res.respondcode == 200) {
        this.allSalesMapData = res.data;
        let opportunityMarker: any = [];
        let leadMarker: any = [];
        let enquiryMarker: any = [];
        let closedMarker: any = [];
        let dlrCount = 0;
        let dstCount = 0;
        let sdCount = 0;
        let empList: any = [];
        empList = res.data.map;

        for (let i = 0; i < empList.length - 10; i++) {
          if (empList[i].lat !== undefined && empList[i].lng !== undefined) {
            if (empList[i].contactType == "Dealer") {
              dlrCount++;
            } else if (empList[i].contactType == "Distributor") {
              dstCount++;
            } else if (empList[i].contactType == "Sub-Dealer") {
              sdCount++;
            }
            let colorCode = "#EC1F24";
            if (empList[i].type == "Lead") {
              colorCode = "#1DD94D";
              this.leadMarker.push(empList[i]);
            } else if (empList[i].type == "Opportunity") {
              colorCode = "#000000";
              this.opportunityMarker.push(empList[i]);
            } else if (empList[i].type == "Recently Converted") {
              colorCode = "#F1BB00";
              this.closedMarker.push(empList[i]);
            } else {
              this.enquiryMarker.push(empList[i]);
            }
          }
        }
        this.totalSalesCount = res.data.total;
        this.totalSalesDist = dstCount;
        this.totalSalesDealer = dlrCount;
        this.totalSaleSubdl = sdCount;

        this.saleSideData = {
          totalCount: this.totalSalesCount,
          dlCount: dlrCount,
          dstCount: dstCount,
          sdCount: sdCount
        }

        this.salesMarker = {
          opMrkr: this.opportunityMarker,
          ldMrkr: this.leadMarker,
          enMrkr: this.enquiryMarker,
          clMrkr: this.closedMarker,
          btnData: this.salesTabData

        }
      }
    })
  }



}
