import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ModalDirective } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-create-pjp',
  templateUrl: './create-pjp.component.html',
  styleUrls: ['./create-pjp.component.css']
})
export class CreatePjpComponent implements OnInit {

  constructor(private common: CommonService, private modalService: NgbModal) { }

  allState: any;
  stateId: any = 1;
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
  allTaskType: any;
  selectedTaskType: any = "";
  isSelf: any = true;
  isContactList: any = false;
  errorString: any = "";
  contatName: any = "";
  @ViewChild('blankView') blankView: any;
  @ViewChild('contactTypeList') contactTypeList: any;
  @ViewChild('addContactModal2') addContactModal2: any;
  @ViewChild('prePlannedVisitModal') prePlanVisitModal: any;
  @ViewChild('addContactModal4') addContactModal4: any;

  ngOnInit(): void {
    this.getAlltaskType();
    this.getAllState();
    this.getAllDistrict();
    this.getAllZone();
    this.getAllContactCategoryType();
    this.getAllVisitorListType();
    // this.getContactTypeList();
  }

  getAllState() {
    let obj = {}
    this.common.getAllStates(obj).subscribe(res => {
      // console.log("All Satet ResPonse::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.stateList.length > 0) {
          this.allState = res.data.stateList;
        }
      }
    })
  }

  getAllDistrict() {
    let obj = {
      stateId: this.stateId
    }
    this.common.getAllDistrictByState(obj).subscribe(res => {
      // console.log("All District ResPonse::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.districtList.length > 0) {
          this.allDistrictType = res.data.districtList;
        } else {
          this.allDistrictType = [];
        }
      }
    })
  }

  getAllZone() {
    let obj = {
      cityId: this.districtType
    }
    this.common.getAllZoneByCity(obj).subscribe(res => {
      // console.log("All Zone ResPonse::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.zoneList.length > 0) {
          this.allZoneType = res.data.zoneList;
          var flag = 0;
          this.allZoneType.map((data: any) => {
            if (this.zoneType == data.zoneId) {
              flag = 1;
            }
          });
          if (flag == 0) {
            this.zoneType = "";
          }
        } else {
          this.allZoneType = [];
        }
      }
    })
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

  onChangeTaskType(value: any) {
    // console.log("Selected district:", value);
    this.selectedTaskType = value;
  }

  onChangeState(value: any) {
    // console.log("Selected state:", value);
    this.stateId = value;
    this.getAllDistrict();
  }

  onChangeDistrict(value: any) {
    // console.log("Selected district:", value);
    this.districtType = value;
    this.getAllZone();
    this.getContactTypeList();
  }

  onChangeZone(value: any) {
    // console.log("Selected zone:", value);
    this.zoneType = value;
    this.getContactTypeList();
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

}
