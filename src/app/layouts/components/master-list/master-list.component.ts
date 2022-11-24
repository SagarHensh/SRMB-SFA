import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import app_config from 'src/app/app.config';
import { StoreDataService } from 'src/app/services/store-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CrmService } from 'src/app/services/crm.service';
//import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from "ngx-spinner";

import { SUB_DEALAR } from 'src/app/TableHeader';
import { DISTRIBUTER_LIST } from 'src/app/TableHeader';




@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})

export class MasterListComponent implements OnInit {

  @ViewChild('masterListModal') masterModal: any;
  constructor(
    private store: StoreDataService,
    private common: CommonService,
    private routeParams: ActivatedRoute,
    private route: Router,
    private ngbModal: NgbModal,
    private notifier: NotifierService,
    private crm: CrmService,
    private spinner: NgxSpinnerService
  ) {

    // routeParams.params.subscribe((params) => {

    //   this.contactTypeId = params["id"];

    // });

  }


  limit = "" as any;
  offset = 0;
  currentPage: any = 1;
  authUserData: any;
  totalRecords: any = "";
  totalPage = 1;
  startPage: any = 0;
  endPage: any = 0;
  title: any;
  titleId: any
  masterData: any;
  contactTypeId: any;
  listData: any = [];
  totalListData: any;
  allState: any = [];
  contactTypeList: any = [];
  productList: any = [];
  paginationLimitDropdown: any = [];
  tableHeader: any = [];
  isTable: any = 1;


  //------------------  For Filter-------------//
  searchName = "";
  fromDate = "";
  toDate = "";
  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];
  state = "" as any;
  city = "" as any;
  zone = "" as any;
  searchStatus = "";
  searchContactName = "";
  searchPhone = "";
  searchOrgName = "";
  searchOwnerName = "";
  masterId = "";
  masterListData: any = [];

  //------------------  For Add or  Update ------------------//

  modalFlag: boolean = false;
  contactType = "" as any;
  fName = "";
  lName = "";
  gender = "";
  dob = "";
  contactTitle = "";
  contactPhone: any = [{ item: "" }];
  contactEmail: any = [];
  phoneNumber: any = [];
  emailId: any = [];
  contactAddress = "";
  description = "";
  country = "";
  contactState = "";
  contactCity = "";
  contactZone = "";
  landmark = "";
  geoLoc = "";
  lattitude = "";
  longitude = "";
  pincode = "";
  residentAddress = "";
  custBusinessName = "";
  erpCode = "";
  yearOfEstd = "";
  imageUrl = this.common.imageUrl;
  imageSrc = "";
  fileUploadStatus: boolean = false;
  fileUpload = "";
  orgFileName = "";
  godownLoc = "";
  godownCapacity = "";
  advanced = "";
  appliedCrLimit = "";
  primaryItem = "" as any;
  //capacity = "";

  //---------- For Multi select dropdown ----------------//

  stateListDropdown: any = [];
  cityListDropdown: any;

  selectedStates: any = [];
  selectedCitys: any = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 6,
    allowSearchFilter: true
  };
  permissionData: any;





  async ngOnInit() {

    this.tableHeader = SUB_DEALAR;
    this.tableHeader = DISTRIBUTER_LIST;


    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();

    this.routeParams.params.subscribe((params) => {
      this.contactTypeId = params["id"];
      this.getListData();
    });
    //console.log("Auth user data", this.authUserData);
    this.getState();
    this.getContactType();
    this.getPermissionData();
  }



  getPermissionData() {
    if (this.authUserData.moduleDetails.length > 0) {
      this.authUserData.moduleDetails.map((data: any) => {
        if (data.name == "Masterlist") {
          this.permissionData = data;
          // console.log("Branding Permission Dta:", this.permissionData);
        }
      })
    }
  }

  getListData() {
    this.spinner.show();
    let obj = {
      contactType: this.contactTypeId,
      cityId: this.city,
      stateId: this.state,
      status: this.searchStatus.toString(),
      limit: this.limit,
      offset: this.offset.toString(),
      clientId: this.authUserData.clientId,
      searchName: this.searchName,
      searchFrom: this.fromDate,
      searchTo: this.toDate,
      contactName: this.searchContactName,
      organizationName: this.searchOrgName,
      ownerName: this.searchOwnerName,
      searchPhone: this.searchPhone
    };
    //console.log("Request data for master list data>>>>>>>>>>", obj);
    this.common.getContactList(obj).subscribe(res => {
      console.log("contact list response::", res);
      if (res.error == 0 && res.respondcode == 200) {
        this.title = res.data.contactType;
        this.titleId = res.data.contactTypeId;
        this.totalListData = res.data.totalCount;
        if (res.data.contactListData.length > 0) {
          let arr = res.data.contactListData;
          if (arr.length > 0) {
            this.listData = arr;
            // console.log(this.listData)
            this.totalRecords = res.data.totalCount;
            this.totalPage = Math.ceil(this.totalRecords / this.limit);
            this.startPage = Number(this.offset) + 1;
            this.endPage = Number(this.offset) + Number(this.listData.length);
            // console.log("listData>>>>>>>>", this.listData);
          }
        } else {
          this.listData = [];
          this.totalRecords = 0;
          this.totalPage = 1;
          this.startPage = 1;
          this.endPage = 1;
        }
        this.spinner.hide();

        //   if (arr.length > 0) {
        //     this.listData = arr;
        //     console.log("listData>>>>>>>>", this.listData);
        //   }
        // } else {
        //   this.listData = [];
        // }
      }

    })
  }


  changeLimit() {
    // console.log("limit value::", this.limit);
    this.offset = 0;
    this.currentPage = 1;
    this.getListData();
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


  //-------------------- For Download---------//

  downloadList() {
    const data = {
      "clientId": this.authUserData.clientId,
      "contactType": this.contactTypeId
    };
    this.common.contactTypeListDownload(data).subscribe((res: any) => {
      console.log("contact type list res>>>>>", res);
      if (res.data.path != "") {
        var file_path = app_config.downloadUrlSFA + res.data.path;
        var a = document.createElement('a');
        a.href = file_path;
        // a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    })
  }

  //------------------  For Filter-----------------//

  getState() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "countryId": this.authUserData.countryId
    };
    this.common.getAllStates(data).subscribe((res: any) => {
      //console.log(" res>>>>>>>>>", res);
      if (res.respondcode == 200) {
        this.stateList = res.data.stateList;
        for (let obj of this.stateList) {
          this.stateListDropdown.push({ id: obj.stateId, name: obj.stateName });
        }
        //console.log("stateListDropdown>>>>>>>>>", this.stateListDropdown);
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
      //console.log("city res>>>>>>>>>", res);
      if (res.respondcode == 200) {
        this.cityList = res.data.districtList;
        let arr: any = [];
        for (let obj of this.cityList) {
          arr.push({ id: obj.cityId, name: obj.cityName });
        }
        this.cityListDropdown = arr;
        //console.log("city List dropdown>>>", this.cityListDropdown);
      }
    })
  }

  changeState() {
    this.getCity();
  }

  getZoneByCityId() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "cityId": this.contactCity
    };
    this.common.getAllZoneByCity(data).subscribe((res: any) => {
      if (res.respondcode == 200) {
        this.zoneList = res.data.zoneList;
      }
    })
  }

  //------------------ For Column wise Filter -------------------//


  // changeState(event:any) {
  //   if(event.target.value == ''){
  //     this.state = "";
  //     this.getListData();
  //   } else{
  //     this.state = event.target.value;
  //     this.getListData();
  //     this.getCity();
  //   }

  // }

  // changeCity(event:any){
  //   if(event.target.value == ''){
  //     this.city = "";
  //     this.getListData();
  //   } else{
  //     this.city = event.target.value;
  //     this.getListData();
  //   }
  // }

  // searchByName(event:any){
  //   if(event.target.value.length >=2){
  //     this.searchContactName = event.target.value;
  //     this.getListData();
  //   } else{
  //     this.searchContactName = "";
  //     this.getListData();
  //   }

  // }

  // searchByPhone(event:any){
  //   if(event.target.value.length >= 2){
  //     this.searchPhone = event.target.value;
  //     this.getListData();
  //   } else{
  //     this.searchPhone = "";
  //     this.getListData();
  //   }
  // }

  // searchByOrgName(event:any){
  //   if(event.target.value.length >= 2){
  //     this.searchOrgName = event.target.value;
  //     this.getListData();
  //   } else{
  //     this.searchOrgName = "";
  //     this.getListData();
  //   }
  // }

  // searchByOwnerName(event:any){
  //   if(event.target.value.length >= 2){
  //     this.searchOwnerName = event.target.value;
  //     this.getListData();
  //   } else{
  //     this.searchOwnerName = "";
  //     this.getListData();
  //   }
  // }

  // changeByStatus(event:any){
  //   console.log("event target value>>>",event.target.value);
  //   if(event.target.value == '0'){
  //     this.searchStatus = event.target.value;
  //     this.getListData();
  //   }
  //   if(event.target.value == '1'){
  //     this.searchStatus = event.target.value;
  //     this.getListData();
  //   }
  //   if(event.target.value == ''){
  //     this.searchStatus = "";
  //     this.getListData();
  //   }
  // }

  searchByDateRange() {
    if (this.fromDate != "" && this.toDate != "") {
      if (this.fromDate > this.toDate) {
        this.notifier.notify('error', "Please select valid date range");
        return;
      }
    }
    if (this.fromDate == "" && this.toDate == "") {
      this.notifier.notify('error', "Please select Date");
      return;
    }
    this.getListData();
  }

  resetDate() {
    this.fromDate = "";
    this.toDate = "";
    this.getListData();
  }



  saveSearch() {
    this.getListData();
  }

  reset() {
    this.searchOrgName = "";
    this.searchOwnerName = "";
    this.searchContactName = "";
    this.searchPhone = "";
    this.searchStatus = "";
    this.state = "";
    this.city = "";
    this.getListData();
  }

  //----------------- Add Master List -------------------//

  addNew() {
    //console.log("this.titleId>>>>>",this.titleId);
    this.contactType = Number(this.titleId);
    this.getProduct();
    this.modalFlag = false;
    this.erpCode = "";
    this.fName = "";
    this.lName = "";
    this.gender = "";
    this.dob = "";
    this.contactPhone = [{ item: "" }];
    this.contactEmail = [{ item: "" }];
    this.contactTitle = "";
    this.contactAddress = "";
    this.state = "";
    this.contactCity = "";
    this.contactZone = "";
    this.landmark = "";
    this.geoLoc = "";
    this.lattitude = "";
    this.longitude = "";
    this.pincode = "";
    this.residentAddress = "";
    this.description = "";
    this.custBusinessName = "";
    this.yearOfEstd = "";
    this.godownLoc = "";
    this.godownCapacity = "";
    this.advanced = "";
    this.appliedCrLimit = "";
    this.primaryItem = "";
    this.primaryItem = "";
    this.fileUploadStatus = false;
    this.ngbModal.open(this.masterModal, { size: "lg" });
  }
  addMaster() {

    if (this.fName == "" || this.fName == null) {
      this.notifier.notify('error', "Please enter contact first name");
      return;
    }
    if (this.lName == "" || this.lName == null) {
      this.notifier.notify('error', "Please enter contact last name");
      return;
    }
    for (let obj of this.contactPhone) {
      if (obj.item == "" || obj.item == null) {
        this.notifier.notify('error', "Please enter phone number");
        return;
      }
    }
    // for (let obj of this.contactEmail) {

    //   if (obj.item != "") {
    //     if (this.common.mailFormatCheck(obj.item) == false) {
    //       this.notifier.notify('error', "Please enter valid email id");
    //       return;
    //     }
    //   }
    // }

    if (this.contactAddress == "" || this.contactAddress == null) {
      this.notifier.notify('error', "Please enter address");
      return;
    }

    if (!this.modalFlag) {
      if (this.state == "" || this.state == null) {
        this.notifier.notify('error', "Please select state");
        return;
      }
      if (this.contactCity == "" || this.contactCity == null) {
        this.notifier.notify('error', "Please select city");
        return;
      }
      if (this.contactZone == "" || this.contactZone == null) {
        this.notifier.notify('error', "Please select zone");
        return;
      }
    }

    // if (this.landmark == "" || this.landmark == null) {
    //   this.notifier.notify('error', "Please enter landmark");
    //   return;
    // }
    if (this.geoLoc == "" || this.geoLoc == null) {
      this.notifier.notify('error', "Please enter geo location");
      return;
    }
    if (this.lattitude == "" || this.lattitude == null) {
      this.notifier.notify('error', "Please enter lattitude");
      return;
    }
    if (this.longitude == "" || this.longitude == null) {
      this.notifier.notify('error', "Please enter longitude");
      return;
    }
    if (this.pincode == "" || this.pincode == null) {
      this.notifier.notify('error', "Please enter pincode");
      return;
    }
    if (this.custBusinessName == "" || this.custBusinessName == null) {
      this.notifier.notify('error', "Please enter customer business name");
      return;
    }

    this.phoneNumber = [];
    this.emailId = [];
    for (let obj of this.contactPhone) {
      this.phoneNumber.push(obj.item);
    }
    for (let obj of this.contactEmail) {
      this.emailId.push(obj.item);
    }
    const data = {
      userId: this.authUserData.userId,
      clientId: this.authUserData.clientId,
      //customerId: this.masterId,
      customerTypeId: this.titleId,
      custBusinessName: this.custBusinessName,
      firstName: this.fName,
      lastName: this.lName,
      gender: this.gender,
      dob: this.dob,
      phoneNumber: this.phoneNumber,
      email: this.emailId,
      //title: this.title,
      title: this.contactTitle,
      address: this.contactAddress,
      residentAddress: this.residentAddress,
      countryId: this.authUserData.countryId,
      stateId: this.state,
      cityId: this.contactCity,
      zoneId: this.contactZone,
      landmark: this.landmark,
      geoLocation: this.geoLoc,
      lattitude: this.lattitude,
      longitude: this.longitude,
      pinCode: this.pincode,
      customerDescription: this.description,
      erpCode: this.erpCode,
      yearOfEstd: this.yearOfEstd,
      godownLocation: this.godownLoc,
      godownCapacity: this.godownCapacity,
      advanced: this.advanced,
      appliedCreditLimit: this.appliedCrLimit,
      primaryItemId: this.primaryItem,
      profilePic: this.fileUpload,
    };
    //console.log("Request data for Add Master",data);
    this.crm.addMaster(data).subscribe((res: any) => {
      if (res.success) {
        this.state = "";
        this.city = "";
        this.getListData();
        this.closeModal();
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    })

  }

  //----------------------------- Edit Master List -----------------------//

  editMaster(id: any) {
    this.modalFlag = true;
    this.masterId = id;
    // console.log("Contact id for update>>>", id);
    const data = {
      clientId: this.authUserData.clientId,
      contactId: this.masterId
    }
    this.common.fetchMasterData(data).subscribe((res: any) => {
      console.log("res>>>>>>", res)
      if (res.respondcode == "200") {
        this.masterListData = res.data.details;
        console.log("Master Fetch Data For Update:===", this.masterListData);
        if (this.masterListData.length > 0) {
          this.contactType = this.masterListData[0].contactTypeId;
          this.erpCode = this.masterListData[0].ERPCode;
          this.fName = this.masterListData[0].firstName;
          this.lName = this.masterListData[0].lastName;
          if (this.masterListData[0].phoneNumber.length > 0) {
            this.contactPhone = [];
            for (let p of this.masterListData[0].phoneNumber.split(",")) {
              this.contactPhone.push({ item: p });
            }
          } else {
            this.contactPhone.push({ item: this.masterListData[0].phoneNumber });
          }
          if (this.masterListData[0].email != null) {
            if (this.masterListData[0].email.includes(",")) {
              this.contactEmail = [];
              for (let e of this.masterListData[0].email.split(",")) {
                this.contactEmail.push({ item: e })
              }
            } else {
              this.contactEmail.push({ item: this.masterListData[0].email });
            }
          } else {
            this.contactEmail = [];
            console.log("Null check else::");
            this.contactEmail.push({ item: '' });
            console.log("Contact Email: ", this.contactEmail)
          }
          this.gender = this.masterListData[0].gender;
          if (this.masterListData[0].dob != null) {
            this.dob = this.common.getDateFormatNew3(this.masterListData[0].dob).split(" ")[0];
          } else {
            this.dob = "";
          }
          this.contactAddress = this.masterListData[0].address;
          //this.capacity = this.masterListData[0].capacity;
          this.contactTitle = this.masterListData[0].title;
          this.geoLoc = this.masterListData[0].geoLocation;
          this.godownLoc = this.masterListData[0].godownLocation;
          this.godownCapacity = this.masterListData[0].godowncapacity_mt;
          this.landmark = this.masterListData[0].landmark;
          this.lattitude = this.masterListData[0].latitude;
          this.longitude = this.masterListData[0].longitude;
          this.country = this.masterListData[0].countryId;
          this.state = this.masterListData[0].stateId;
          this.city = this.masterListData[0].cityId;
          this.zone = this.masterListData[0].zoneId;
          this.pincode = this.masterListData[0].pincode;
          this.description = this.masterListData[0].description;
          this.primaryItem = this.masterListData[0].primaryitem;
          this.residentAddress = this.masterListData[0].residentAddress;
          this.custBusinessName = this.masterListData[0].custBusinessName;
          if (this.masterListData[0].yrOfEstablmnt != null) {
            this.yearOfEstd = this.common.getDateFormatNew3(this.masterListData[0].yrOfEstablmnt).split(" ")[0];
          } else {
            this.yearOfEstd = "";
          }
          this.advanced = this.masterListData[0].advance;
          this.appliedCrLimit = this.masterListData[0].appliedCreditlimit;
          if (this.masterListData[0].profilePic != null) {
            this.fileUploadStatus = true;
            this.imageSrc = this.imageUrl + this.masterListData[0].profilePic;
            this.fileUpload = this.masterListData[0].profilePic;
            //console.log("==================== fileUpload ==========",this.fileUpload);
          } else {
            this.fileUploadStatus = false;
          }
        }

      }
    })
    this.editMasterModal();
  }


  editMasterModal() {
    this.getProduct();
    this.ngbModal.open(this.masterModal, { size: 'lg' })
  }

  closeModal() {
    this.ngbModal.dismissAll();
  }

  update() {

    if (this.fName == "" || this.fName == null) {
      this.notifier.notify('error', "Please enter contact first name");
      return;
    }
    if (this.lName == "" || this.lName == null) {
      this.notifier.notify('error', "Please enter contact last name");
      return;
    }
    for (let obj of this.contactPhone) {
      if (obj.item == "" || obj.item == null) {
        this.notifier.notify('error', "Please enter phone number");
        return;
      }
    }

    // for (let obj of this.contactEmail) {

    //   if (obj.item != "" || obj.item !=null) {
    //     console.log("obj.item>>>>>",obj.item);
    //     console.log(">>>>>>>>",this.common.mailFormatCheck(obj.item));
    //     if (this.common.mailFormatCheck(obj.item) == false) {
    //       this.notifier.notify('error', "Please enter valid email id");
    //       return;
    //     }
    //   }
    // }

    if (this.contactAddress == "" || this.contactAddress == null) {
      this.notifier.notify('error', "Please enter address");
      return;
    }

    if (!this.modalFlag) {
      if (this.state == "" || this.state == null) {
        this.notifier.notify('error', "Please select state");
        return;
      }
      if (this.contactCity == "" || this.contactCity == null) {
        this.notifier.notify('error', "Please select city");
        return;
      }
      if (this.contactZone == "" || this.contactZone == null) {
        this.notifier.notify('error', "Please select zone");
        return;
      }
    }

    // if (this.landmark == "" || this.landmark == null) {
    //   this.notifier.notify('error', "Please enter landmark");
    //   return;
    // }
    if (this.geoLoc == "" || this.geoLoc == null) {
      this.notifier.notify('error', "Please enter geo location");
      return;
    }
    if (this.lattitude == "" || this.lattitude == null) {
      this.notifier.notify('error', "Please enter lattitude");
      return;
    }
    if (this.longitude == "" || this.longitude == null) {
      this.notifier.notify('error', "Please enter longitude");
      return;
    }
    if (this.pincode == "" || this.pincode == null) {
      this.notifier.notify('error', "Please enter pincode");
      return;
    }
    if (this.custBusinessName == "" || this.custBusinessName == null) {
      this.notifier.notify('error', "Please enter customer business name");
      return;
    }

    this.phoneNumber = [];
    this.emailId = [];
    for (let obj of this.contactPhone) {
      this.phoneNumber.push(obj.item);
    }
    for (let obj of this.contactEmail) {
      this.emailId.push(obj.item);
    }
    const data = {
      userId: this.authUserData.userId,
      clientId: this.authUserData.clientId,
      customerId: this.masterId,
      customerTypeId: this.contactType,
      custBusinessName: this.custBusinessName,
      firstName: this.fName,
      lastName: this.lName,
      gender: this.gender,
      dob: this.dob,
      phoneNumber: this.phoneNumber,
      email: this.emailId,
      title: this.contactTitle,
      address: this.contactAddress,
      residentAddress: this.residentAddress,
      countryId: this.country,
      stateId: this.state,
      cityId: this.city,
      zoneId: this.zone,
      landmark: this.landmark,
      geoLocation: this.geoLoc,
      lattitude: this.lattitude,
      longitude: this.longitude,
      pinCode: this.pincode,
      customerDescription: this.description,
      erpCode: this.erpCode,
      yearOfEstd: this.yearOfEstd,
      godownLocation: this.godownLoc,
      godownCapacity: this.godownCapacity,
      advanced: this.advanced,
      appliedCreditLimit: this.appliedCrLimit,
      primaryItemId: this.primaryItem,
      profilePic: this.fileUpload,
    };
    //console.log("Request data for update>>>>>>>", data);
    this.crm.masterUpdate(data).subscribe((res: any) => {
      //console.log("update res>>>", res);
      this.state = "";
      this.city = "";
      if (res.success) {
        this.getListData();
        this.closeModal();
      }
    })
  }



  getContactType() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
    };
    this.common.getContactType(data).subscribe((res: any) => {
      // console.log("getContactType res>>>>>",res);
      if (res.respondcode == 200) {
        this.contactTypeList = res.data;
      }
    })
  }

  getProduct() {
    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
    }
    this.crm.getProductList(data).subscribe((res: any) => {
      if (res.success) {
        this.productList = res.response;
        //console.log("Product List>>>>>>>>>", this.productList);
      }
    })
  }

  //-----------------------For Multi select dropdown ---------------------//

  // onItemSelectState(item: any) {
  //   console.log("state1>>>", item);
  //   console.log("selected state list>>>>>", this.selectedStates);
  //   this.state = item.id;
  //   this.getCity();
  // }

  // onSelectAllState(item: any) {
  //   console.log("state2>>>", item);
  //   this.state = item.id;
  //   this.getCity();
  // }

  // onItemDeSelect(item: any) {
  //   console.log("deselect item>>", item);
  //   this.getCity();
  // }

  // onItemSelectCity(item: any) {
  //   console.log("item>>>", item);
  // }

  // onSelectAllCity(item: any) {
  //   console.log("itemmmm>>>", item);
  // }

  //------------------ End------------------------//
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
  getDistanceData(val: any) {
    let str: any = "";
    if (val != null) {
      str = parseFloat(val).toFixed(2)
    } else {
      str = "";
    }
    return str;
  }

  textTruncateData(str: any) {
    if (str != "") {
      let val: any = this.store.textTruncate(str, 30);
      return val;
    } else {
      return "N/A"
    }
  }

  tableDataView(data: any, pos: any) {
    let str: any = "";
    if (pos == 0) {
      str = data.stateName;
    } else if (pos == 1) {
      str = data.cityName;
    } else if (pos == 2) {
      str = data.name;
    } else if (pos == 3) {
      str = data.phoneNumber
    } else if (pos == 4) {
      str = data.organizationName
    } else if (pos == 5) {
      str = data.ownerName
    }
    else if (pos == 6) {
      str = data.status
    }
    return str;
  }


  uploadFile() {
    const banner = document.getElementById('upload') as HTMLInputElement;
    const file: any = banner.files;
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        const fileData = new FormData();
        fileData.append('file', file[0]);
        this.common.uploadFile(fileData).subscribe((res: any) => {
          if (res.error == 0) {
            this.fileUploadStatus = true;
            this.fileUpload = "";
            this.fileUpload = res.data.path + res.data.filename;
            //console.log("res>>>>>>upload======= fileUpload",this.fileUpload);
            // this.orgFileName = res.response.orgfilename;
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }

        })
      }
    }
  }


  nextPage() {
    if (this.currentPage < this.totalPage) {
      // alert("Offset "+ this.offset)
      this.currentPage++;
      this.offset = (this.currentPage - 1) * this.limit;
      this.getListData();
    }

  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.offset = (this.currentPage - 1) * this.limit;
      this.getListData();
    }

  }

  searchIndividual(event: any) {
    if (event.target.value.length >= 2) {
      this.searchName = event.target.value;
      this.getListData();
    } else {
      this.searchName = "";
      this.getListData();
    }
  }


  // getCityByStateId() {
  //   const data = {
  //     stateId: this.state
  //   };
  //   this.common.getAllDistrictByState(data).subscribe((res: any) => {
  //     if (res.success) {
  //       this.cityList = res.response;
  //     }
  //   })
  // }

  // getProduct() {
  //   this.registration.getProductList({}).subscribe((res: any) => {
  //     if (res.success) {
  //       this.productList = res.response;
  //     }
  //   })
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



  //----------------  Add or Delete Multiple Phone Number -----------------//


  addContactPhone() {
    this.contactPhone.push({ item: "" })
  }

  removePhoneNumber(index: any) {
    this.contactPhone.splice(index, 1);
  }

  addContactEmail() {
    this.contactEmail.push({ item: "" })
  }
  removeContactEmail(index: any) {
    this.contactEmail.splice(index, 1);
  }

  validateDob(): any {
    return new Date().toISOString().split("T")[0];
  }
}
