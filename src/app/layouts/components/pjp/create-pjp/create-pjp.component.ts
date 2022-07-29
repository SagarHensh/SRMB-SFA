import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreDataService } from 'src/app/services/store-data.service';
// import { ModalDirective } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-create-pjp',
  templateUrl: './create-pjp.component.html',
  styleUrls: ['./create-pjp.component.css']
})
export class CreatePjpComponent implements OnInit {

  constructor(private common: CommonService,
    private modalService: NgbModal,
    private store: StoreDataService) { }

  countryId: any = "1";
  allState: any;
  stateId: any = 41;
  allVisitorType: any;
  visitorType: any = "";
  allDistrictType: any = [];
  districtType: any = "829";
  allZoneType: any;
  zoneType: any = "";
  allContactCategoryType: any;
  selectedContactCategory: any = "";
  allContactTypeList: any = [];
  contactType: any;
  allTaskType: any;
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
  selectedEmpDeails: any = {};
  isSelected: any = false;
  pjpArray: any = [];
  visitArray: any = [];
  currContactId: any = "";
  selectedTaskName: any = "";
  selectedTaskDescription: any = "";
  currPjp: any = false;
  authUserData: any = {};

  selectedPjpEmployeeDetails: any = "";

  ngOnInit(): void {
    this.load();
    this.getAlltaskType();
    this.getAllLocationData();
    this.getAllContactCategoryType();
    this.getAllVisitorListType();
    //dummy data from store
    this.getAllSubordinateList();
    this.getAllDummyContactPjp()
  }

  load() {
    this.authUserData = this.common.getAuthUserData();
    console.log("authUserL::", this.authUserData);
    if (this.isSelf) {
      this.selectedPjpEmployeeDetails = JSON.parse(this.authUserData);
    }
    if (Object.keys(this.selectedPjpEmployeeDetails).length > 0) {
      this.selectedEmpDeails = {
        userId: this.selectedPjpEmployeeDetails.userId,
        name: this.selectedPjpEmployeeDetails.firstName + " " + this.selectedPjpEmployeeDetails.lastName,
        designation: "Project Manager",
        profileImg: "",
        datesOfPrePlanVisit: "0"
      }
      this.isSelected = true;
    }

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
  }

  onChangeDistrict(value: any) {
    // console.log("Selected district:", value);
    this.districtType = value;
    this.zoneType = "";
    this.allZoneType = this.getZoneData(this.stateId, this.districtType)
  }

  onChangeZone(value: any) {
    // console.log("Selected zone:", value);
    this.zoneType = value;
  }

  getContactTypeList() {
    if (this.visitorType != "") {
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

        let obj = {
          districtId: this.districtType,
          zoneId: this.zoneType,
          contactTypeId: this.contactType,
          visitorTypeId: this.visitorType,
          contactName: this.contatName
        }

        this.common.getAllContactListTypeForPjp(obj).subscribe(res => {
          // console.log("Contact list type ResPonse::", res);
          if (res.error == 0 && res.respondcode == 200) {
            if (res.data.contactList.length > 0) {
              this.allContactTypeList = res.data.contactList;
              this.isContactList = true;
            } else {
              this.isContactList = false;
              this.allContactTypeList = [];
            }
          }
        })
      }
    } else {
      this.errorString = "Please select District, Zone & Visitor type to continue...";
      this.modalService.open(this.addContactModal2, { size: 'sm', centered: true, animation: true });
    }
  }

  getAllContactCategoryType() {
    this.common.getAllContactCategory({}).subscribe(res => {
      // console.log("All Contact Category Type ResPonse::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.contactList.length > 0) {
          this.allContactCategoryType = res.data.contactList;
        }
      }
    })

  }

  getAllVisitorListType() {
    let obj = {
      clientId: "1",
      contactType: this.selectedContactCategory
    }
    this.common.getVisitorListTypeByContactId(obj).subscribe(res => {
      // console.log("All Contact Category Type ResPonse::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.visitorList.length > 0) {
          this.allVisitorType = res.data.visitorList;
        } else {
          this.allVisitorType = [];
        }
      }
    })

  }

  getAlltaskType() {
    let obj = {}
    this.common.getAllTaskCategory(obj).subscribe(res => {
      // console.log("taskType all::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.taskList.length > 0) {
          this.allTaskType = res.data.taskList;
        } else {
          this.allTaskType = [];
        }
      }
    })

  }

  onChangeVisitorType(value: any) {
    console.log("Visitor Type::", value)
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
    // console.log("Category type ID :: ", event.target.value);
    this.selectedContactCategory = event.target.value;
    this.getAllVisitorListType();
  }

  onChangePjpType(event: any) {
    if (event.target.value == 0) {
      this.isSelf = true;
    } else {
      this.isSelf = false;
    }
  }

  viewPjpRouteMap() {
    this.modalService.open(this.addContactModal4, { size: 'lg', centered: true, animation: true });
  }

  getAllSubordinateList() {
    let arr = this.store.getAllEmployeeList();
    console.log("sub arr::", arr)
    this.allSubordinateList = arr;
  }

  openSubOrdinateModal() {
    this.modalService.open(this.subordinateListModal, { size: 'lg', centered: true, animation: true })
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

  getAllDummyContactPjp() {
    // this.allContactTypeList = this.store.getAllContactTypeList();
    let arr = this.store.getAllContactTypeList();
    arr.map((data: any) => {
      this.allContactTypeList.push({
        contactId: data.contactId,
        firstName: data.firstName,
        lastName: data.lastName,
        contactTypeName: data.contactTypeName,
        isSelected: false,
        pjpData: []
      })
    })
    this.isContactList = true;
  }

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
    this.currContactId = id;
    this.currPjp = false;
    let arr: any = [];
    this.allContactTypeList.map((data: any) => {
      if (data.contactId == id) {
        arr.push({
          contactId: data.contactId,
          firstName: data.firstName,
          lastName: data.lastName,
          contactTypeName: data.contactTypeName,
          pjpData: data.pjpData
        })
        if (data.pjpData.length > 0) {
          this.currPjp = true;
        }
      }
    })

    this.visitArray = arr;
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
    // console.log("currid::", this.currContactId);
    let arr = this.visitArray;
    arr.map((data: any) => {
      if (data.contactId == this.currContactId) {
        // console.log("hill::", this.currContactId);
        data.pjpData.push({
          taskId: this.selectedTaskType,
          taskName: this.selectedTaskName,
          taskDescription: this.selectedTaskDescription
        })
      }
    })
    this.visitArray = arr;
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

}
