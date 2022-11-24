import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreDataService } from 'src/app/services/store-data.service';
import { CrmService } from 'src/app/services/crm.service';
// import { ModalDirective } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-create-pjp',
  templateUrl: './create-pjp.component.html',
  styleUrls: ['./create-pjp.component.css']
})
export class CreatePjpComponent implements OnInit {

  constructor(private common: CommonService,
    private crm: CrmService,
    private modalService: NgbModal,
    private store: StoreDataService) { }

  countryId: any = "1";
  allState: any;
  stateId: any = 41;
  allVisitorType: any;
  visitorType: any = "";
  allDistrictType: any = [];
  districtType: any = "";
  allZoneType: any;
  zoneType: any = "";
  allContactCategoryType: any;
  selectedContactCategory: any = "";
  allContactTypeList: any = [];
  contactType: any;
  allTaskType: any = [];
  selectedTaskType: any = "";
  isSelf: any = true;
  isContactList: any = false;
  errorString: any = "";
  contatName: any = "";
  allSubordinateList: any = [];
  @ViewChild('blankView') blankView: any;
  @ViewChild('contactTypeList') contactTypeList: any;
  @ViewChild('addContactModal2') addContactModal2: any;
  @ViewChild('prePlannedVisitModal') prePlanVisitModal: any;
  @ViewChild('addContactModal4') addContactModal4: any;
  @ViewChild('subordinateListModal') subordinateListModal: any;
  @ViewChild('selectDateModal') selectDateModal: any;
  @ViewChild('createPjpModal') createPjpModal: any;
  selectedEmpDeails: any = {};
  isSelected: any = false;
  visitArray: any = [];
  currContactId: any = "";
  selectedTaskName: any = "";
  selectedTaskDescription: any = "";
  currPjp: any = false;
  authUserData: any = {};

  selectedPjpEmployeeDetails: any = "";

  selectedDateDetails: any;
  imageUrl: any = "";
  sfaImageUrl: any = "";
  selectedPjpDate: any = "";

  preplanDataByCustomer: any = [];
  pjpDataArr: any = [];
  modalState: any = "";
  modalDistrict: any = "";

  finalAddPjpReq: any;


  getTaskCategoryString(id: any) {
    if (id == 0) {
      return null
    } else if (id == 1) {
      return "Follow Up";
    } else {
      return "Visit"
    }
  }


  ngOnInit(): void {
    this.load();
    this.getCurrentDate();
    this.getAllVisitorTaskType();
    this.getAllLocationData();
    this.getAllContactCategoryType();
    this.getAllVisitorListType();
    //dummy data from store
    this.getAllSubordinateList();
    // this.getAllDummyContactPjp()
  }

  load() {
    let data: any = this.common.getAuthUserData();
    // console.log("authUserL::", this.authUserData);
    this.authUserData = JSON.parse(data);
    this.districtType = this.authUserData.districtId;
    this.getSelfUserDetails();
    this.imageUrl = this.crm.getImageUrl();
    this.sfaImageUrl = this.crm.getSFAImageUrl();

  }



  getProfileImage(img: any) {
    // console.log(this.imageUrl + img);
    return this.imageUrl + img;
  }

  getSfaProfileImage(img: any) {
    return this.sfaImageUrl + img;
  }

  getSelfUserDetails() {

    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId
    }
    this.common.getpjpUserDetailsById(req).subscribe(res => {
      // console.log("Self User Details::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (this.isSelf) {
          this.selectedPjpEmployeeDetails = res.data[0];
        }
        if (Object.keys(this.selectedPjpEmployeeDetails).length > 0) {
          this.selectedEmpDeails = {
            userId: this.selectedPjpEmployeeDetails.userId,
            name: this.selectedPjpEmployeeDetails.userName,
            designation: this.selectedPjpEmployeeDetails.designationName,
            profileImg: this.selectedPjpEmployeeDetails.profileImgUrl,
            datesOfPrePlanVisit: this.selectedPjpEmployeeDetails.datesOfPrePlanVisit,
          }
          this.isSelected = true;
        }
      }
    })

  }

  // getAllState() {
  //   let obj = {}
  //   this.common.getAllStates(obj).subscribe(res => {
  //     // console.log("All Satet ResPonse::", res);
  //     if (res.error == 0 && res.respondcode == 200) {
  //       if (res.data.stateList.length > 0) {
  //         this.allState = res.data.stateList;
  //       }
  //     }
  //   })
  // }

  // getAllDistrict() {
  //   let obj = {
  //     stateId: this.stateId
  //   }
  //   this.common.getAllDistrictByState(obj).subscribe(res => {
  //     // console.log("All District ResPonse::", res);
  //     if (res.error == 0 && res.respondcode == 200) {
  //       if (res.data.districtList.length > 0) {
  //         this.allDistrictType = res.data.districtList;
  //       } else {
  //         this.allDistrictType = [];
  //       }
  //     }
  //   })
  // }

  // getAllZone() {
  //   let obj = {
  //     cityId: this.districtType
  //   }
  //   this.common.getAllZoneByCity(obj).subscribe(res => {
  //     // console.log("All Zone ResPonse::", res);
  //     if (res.error == 0 && res.respondcode == 200) {
  //       if (res.data.zoneList.length > 0) {
  //         this.allZoneType = res.data.zoneList;
  //         var flag = 0;
  //         this.allZoneType.map((data: any) => {
  //           if (this.zoneType == data.zoneId) {
  //             flag = 1;
  //           }
  //         });
  //         if (flag == 0) {
  //           this.zoneType = "";
  //         }
  //       } else {
  //         this.allZoneType = [];
  //       }
  //     }
  //   })
  // }

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
            this.getDistrictData(this.stateId)
          }
        }
      }
    })
  }

  getStateName(id: any) {
    let str: any = "";
    this.allState.map((data: any) => {
      if (id == data.id) {
        str = data.name;
      }
    });

    return str;
  }

  getDistrictName(id: any) {
    let str: any = "";
    this.allDistrictType.map((data: any) => {
      if (id == data.id) {
        str = data.name;
      }
    });

    return str;
  }

  getDistrictData(sid: any) {
    let arr: any = [];
    this.allState.map((data: any) => {
      if (sid == data.id) {
        arr = data.district;
        this.allDistrictType = arr;
        this.getZoneData(this.stateId, this.districtType)
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
            this.allZoneType = arr
          }
        })
      }
    });
    return arr;
  }

  onChangeState(value: any) {
    // console.log("Selected state:", value);
    this.stateId = value;
    this.districtType = "";
    this.zoneType = "";
    this.allDistrictType = this.getDistrictData(this.stateId);
    this.getContactTypeList();
  }

  onChangeDistrict(value: any) {
    // console.log("Selected district:", value);
    this.districtType = value;
    this.zoneType = "";
    this.allZoneType = this.getZoneData(this.stateId, this.districtType);
    this.getContactTypeList();
  }

  onChangeZone(value: any) {
    // console.log("Selected zone:", value);
    this.zoneType = value;
    this.getContactTypeList();
  }

  getContactTypeList() {
    let errorCounter = 0;

    // if (this.visitorType == "" && this.districtType == "" && this.zoneType == "") {
    //   errorCounter++;
    //   this.errorString = "Please select District, Zone & Visitor type to continue...";
    //   this.modalService.open(this.addContactModal2, { size: 'sm', centered: true, animation: true });
    // } else if (this.districtType == "" && this.zoneType == "") {
    //   errorCounter++;
    //   this.errorString = "Please select District & Zone to continue...";
    //   this.modalService.open(this.addContactModal2, { size: 'sm', centered: true, animation: true });
    // } else if (this.districtType == "" && this.visitorType == "") {
    //   errorCounter++;
    //   this.errorString = "Please select District & Visitor type to continue...";
    //   this.modalService.open(this.addContactModal2, { size: 'sm', centered: true, animation: true });
    // } else if (this.districtType == "") {
    //   errorCounter++;
    //   this.errorString = "Please select District to continue...";
    //   this.modalService.open(this.addContactModal2, { size: 'sm', centered: true, animation: true });
    // }

    if (errorCounter == 0) {

      let obj = {
        clientId: this.authUserData.clientId,
        stateId: this.stateId,
        districtId: this.districtType,
        zoneId: this.zoneType,
        visitorTypeId: this.selectedContactCategory,
        contactTypeId: this.visitorType,
        contactName: this.contatName
      }

      this.common.getpjpCustomerList(obj).subscribe(res => {
        console.log("Contact left list type ResPonse::", res);
        if (res.error == 0 && res.respondcode == 200) {
          this.allContactTypeList = [];
          if (res.data.data.length > 0) {

            let arr = res.data.data;
            arr.map((data: any) => {
              this.allContactTypeList.push({
                contactId: data.contactId,
                name: data.contactName,
                contactTypeName: data.contactTypeName,
                profilePic: data.profileImage,
                lat: data.lat,
                lng: data.lng,
                leadId: "0",
                enqueryId: "0",
                isSelected: false,
                pjpData: []
              })
            })
            this.isContactList = true;
          } else {
            this.isContactList = false;
            this.allContactTypeList = [];
          }
        }
      })
    }
  }

  getAllContactCategoryType() {
    this.common.getAllContactCategory({}).subscribe(res => {
      console.log("All Contact Category Type ResPonse::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.contactList.length > 0) {
          this.allContactCategoryType = res.data.contactList;
          this.selectedContactCategory = res.data.contactList[0].slNo;
          this.getContactTypeList();
          this.getAllVisitorListType();
        }
      }
    })

  }

  getAllVisitorListType() {
    let obj = {
      clientId: this.authUserData.clientId,
      contactType: this.selectedContactCategory
    }
    this.common.getVisitorListTypeByContactId(obj).subscribe(res => {
      console.log("All Visitor Type ResPonse::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.visitorList.length > 0) {
          this.allVisitorType = res.data.visitorList;
        } else {
          this.allVisitorType = [];
        }
      }
    })

  }

  getAllVisitorTaskType() {
    let obj = {
      clientId: this.authUserData.clientId
    }
    this.common.getVisitorType(obj).subscribe(response => {
      let res: any = response;
      console.log("Visitor taskType all::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.length > 0) {
          let arr : any = [];
          res.data.map((data:any)=>{
            arr.push({
              taskId : data.contactTypeId,
              taskName : data.contactTypeName
            })
          })
          this.allTaskType = arr;
        } else {
          this.allTaskType = [];
        }
      }
    })

  }

  onChangeVisitorType(value: any) {
    // console.log("Visitor Type::", value)
    this.visitorType = value;
    // ===============================
    this.getContactTypeList();
  }

  getContactTypeListData() {
    if (this.districtType == "" && this.zoneType == "") {
      this.errorString = "Please select District & Zone to continue...";
      this.modalService.open(this.addContactModal2, { size: 'sm', centered: true, animation: true });
    } else if (this.districtType == "") {
      this.errorString = "Please select District to continue...";
      this.modalService.open(this.addContactModal2, { size: 'sm', centered: true, animation: true });
    } else if (this.zoneType == "") {
      this.errorString = "Please select Zone to continue...";
      this.modalService.open(this.addContactModal2, { size: 'sm', centered: true, animation: true });
    } else {
      this.getContactTypeList();
    }
  }

  closeModal() {
    this.modalService.dismissAll();
    this.visitorType = "";
  }

  onChangeContactCategory(event: any) {
    this.visitorType = "";
    // console.log("Category type ID :: ", event.target.value);
    if (event.target.value >= 0) {
      this.selectedContactCategory = event.target.value;
      this.getAllVisitorListType();
      this.getContactTypeList();
    } else {
      this.selectedContactCategory = "";
      this.getAllTargetUserList();
      this.getAllVisitorListType();
    }
  }

  getAllTargetUserList() {

    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId,
      zoneId: "",
      districtId: ""
    }

    this.common.getUserTargetList(req).subscribe(res => {
      console.log("Targeted User Response:", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        if (respObj.data.length > 0) {
          let arr = respObj.data;
          this.allContactTypeList = [];
          arr.map((data: any) => {
            this.allContactTypeList.push({
              contactId: data.customerId,
              name: data.customerName,
              contactTypeName: data.contactTypeName,
              profilePic: data.profilePic,
              leadId: data.leadId,
              enqueryId: data.enqueryId,
              isSelected: false,
              pjpData: []
            })
          })
          this.isContactList = true;

        }
      }
    })

  }

  onChangePjpType(event: any) {
    if (event.target.value == 0) {
      this.isSelf = true;
      this.isSelected = true;
    } else {
      this.isSelf = false;
      this.isSelected = false;
    }
  }

  viewPjpRouteMap() {
    this.modalState = this.getStateName(this.stateId);
    this.modalDistrict = this.getDistrictName(this.districtType);
    let arr: any = [];
    let reqArr: any = [];
    arr = this.allContactTypeList;
    // console.log("pjp array", arr);
    arr.map((data: any) => {
      if (data.isSelected && data.pjpData.length > 0) {
        reqArr.push({
          clientId: this.authUserData.clientId,
          userId: this.selectedEmpDeails.userId,
          contactId: data.contactId,
          pjpDate: this.selectedDateDetails.selectedDate,
          leadId: data.leadId,
          enqueryId: data.enqueryId,
          purposeId: data.pjpData[0].taskId,
          purposeNote: data.pjpData[0].taskDescription
        })

        this.pjpDataArr.push(data);
      }
    })

    if (this.pjpDataArr.length > 0) {
      // console.log("main array value:", reqArr);
      this.finalAddPjpReq = {
        pjvList: reqArr
      }
      this.modalService.open(this.addContactModal4, { size: 'lg', centered: true, animation: true });

    }

  }

  getAllSubordinateList() {
    let arr = this.store.getAllEmployeeList();
    // console.log("sub arr::", arr)
    this.allSubordinateList = arr;
  }

  openSubOrdinateModal() {
    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId,
      districtId: "",
      zoneId: "",
      name: ""
    }
    this.common.getSubordinateUser(req).subscribe(res => {
      this.allSubordinateList = [];
      if (res.error == 0 && res.respondcode == 200) {
        // console.log("All suborinate List:", res.data);
        if (res.data.length > 0) {
          res.data.map((data: any) => {
            this.allSubordinateList.push({
              userId: data.userId,
              name: data.name,
              designation: data.designationName,
              profileImg: data.profileImgUrl,
              datesOfPrePlanVisit: data.datesOfPrePlanVisit,
              allPrePlanVisit: data.allPrePlanVisit
            })
          })
          this.modalService.open(this.subordinateListModal, { size: 'lg', centered: true, animation: true })

        }
      }
    })
  }

  onchangeEmployeeSubList(event: any) {
    // console.log("Selected emp id:", event.target.value);
    this.allSubordinateList.map((data: any) => {
      if (data.userId == event.target.value) {
        this.selectedEmpDeails = {
          userId: data.userId,
          name: data.name,
          designation: data.designation,
          profileImg: data.profileImg,
          datesOfPrePlanVisit: data.datesOfPrePlanVisit
        };
      }
    })
  }

  selectEmployeeForPjP() {
    this.isSelected = true;
    this.closeModal();
  }

  // getAllDummyContactPjp() {
  //   // this.allContactTypeList = this.store.getAllContactTypeList();
  //   let arr = this.store.getAllContactTypeList();
  //   arr.map((data: any) => {
  //     this.allContactTypeList.push({
  //       contactId: data.contactId,
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       contactTypeName: data.contactTypeName,
  //       isSelected: false,
  //       pjpData: []
  //     })
  //   })
  //   this.isContactList = true;
  // }

  selectCheckboxOfContact(event: any) {
    // console.log("Check value::", event.target.checked, event.target.value)
    let arr = this.allContactTypeList;
    arr.map((data: any) => {
      if (event.target.value == data.contactId) {
        if (event.target.checked) {
          data.isSelected = true;
        } else {
          data.isSelected = false
        }
      }
    })
    this.allContactTypeList = arr;
  }

  visitInfoClick(id: any) {
    this.selectedTaskName = "";
    this.selectedTaskDescription = "";
    this.selectedTaskType = "";
    this.currContactId = id;
    this.currPjp = false;
    let arr: any = [];
    this.allContactTypeList.map((data: any) => {
      if (data.contactId == id) {
        arr.push({
          contactId: data.contactId,
          name: data.name,
          profilePic: data.profilePic,
          contactTypeName: data.contactTypeName,
          lat: data.lat,
          lng: data.lng,
          pjpData: data.pjpData
        })
        if (data.pjpData.length > 0) {
          this.currPjp = true;
        }
      }
    })

    this.visitArray = arr;

    let reqObj = {
      clientId: this.authUserData.clientId,
      userId: this.selectedEmpDeails.userId,
      contactId: id
    }

    this.common.getPjvByCustomerId(reqObj).subscribe(res => {
      // console.log("Response of details preplanned data:", res);
      let response: any = res;
      if (response.error == 0) {
        // console.log("Response data:", response.data);
        this.preplanDataByCustomer = response.data;
      }

    })
  }

  onChangeTaskType(value: any) {
    // console.log("Selected district:", value);
    this.selectedTaskType = value;
    this.allTaskType.map((data: any) => {
      if (data.taskId == this.selectedTaskType) {
        this.selectedTaskName = data.taskName;
      }
    })
  }

  onChangeTaskDescription() {

  }

  addVisitDataintoClient() {
    // console.log("visit Array::", this.visitArray);
    // console.log("ccccc Array::", this.allContactTypeList);
    let arr = this.visitArray;
    this.visitArray[0].pjpData.push({
      taskId: this.selectedTaskType,
      taskName: this.selectedTaskName,
      taskDescription: this.selectedTaskDescription
    })
    // arr.map((data: any) => {
    //   if (data.contactId == this.currContactId) {
    //     // console.log("hill::", this.currContactId);
    //     data.pjpData.push({
    //       taskId: this.selectedTaskType,
    //       taskName: this.selectedTaskName,
    //       taskDescription: this.selectedTaskDescription
    //     })
    //   }
    // })
    // this.visitArray = arr;
    this.currPjp = true;
    // this.allContactTypeList.map((data: any) => {
    //   if (data.contactId == this.currContactId) {
    //     data.pjpData.push({
    //       taskId: this.selectedTaskType,
    //       taskDescription: this.selectedTaskDescription
    //     })
    //   }
    // })

    this.selectedTaskName = "";
    this.selectedTaskDescription = "";
    this.selectedTaskType = "";
  }

  deletePjpTask(pos: any) {
    let arr = this.visitArray;
    arr.map((data: any) => {
      data.pjpData = [];
    })
    this.visitArray = arr;
    this.currPjp = false;
  }

  //Select Date Modal

  openDateCalenderModal() {
    this.modalService.open(this.selectDateModal, { size: 'md', centered: true, animation: true })
  }

  getCurrentDate() {
    let allMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var cd = new Date()
    var day: any = cd.getDate();
    day = day > 9 ? day : "0" + day;
    let ds = this.getOrdinalNum(day);
    var month = cd.getMonth() + 1;
    let mm = month > 9 ? month : "0" + month;
    var year = cd.getFullYear();

    let val = {
      selectedDate: year + "-" + mm + "-" + day,
      selectedDateString: ds + " " + allMonths[month - 1] + " " + year,
      current_Date_string: ds + " " + allMonths[month - 1] + " " + year
    }

    this.selectedPjpDate = ds + " " + allMonths[month - 1] + " " + year;

    console.log("Final selected DAte::", val);
    this.selectedDateDetails = val;


  }

  getOrdinalNum(n: any) {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
  }

  setDate(value: any) {
    console.log("Calender selecetd ::", value);
    this.selectedDateDetails = value;
    this.selectedPjpDate = value.current_Date_string;
  }

  savePjpDate() {
    this.selectedPjpDate = this.selectedDateDetails.selectedDateString;
    this.modalService.dismissAll();
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

  createPjp() {
    this.closeModal();

    this.common.pjvCreate(this.finalAddPjpReq).subscribe(res => {
      let response: any = res;
      if (response.error == 0) {
        this.errorString = "PJP Ceated Successfully";
        this.modalService.open(this.createPjpModal, { size: 'sm', centered: true, animation: true });
        this.ngOnInit();
        this.reset();
      } else {
        this.errorString = response.message;
        this.modalService.open(this.addContactModal2, { size: 'sm', centered: true, animation: true });
      }
    })
  }

  reset() {
    this.visitArray = [];
    this.preplanDataByCustomer = [];
    this.pjpDataArr = [];
    this.finalAddPjpReq = {};
    this.modalState = "";
    this.modalDistrict = "";
    this.currContactId = "";
    this.selectedTaskName = "";
    this.selectedTaskDescription = "";
    this.currPjp = false;

  }

}
