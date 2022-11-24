import { Component, OnInit, ViewChild } from '@angular/core';
import app_config from 'src/app/app.config';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { StoreDataService } from 'src/app/services/store-data.service';
import { BRANDING_REQUISITION_LIST } from 'src/app/TableHeader';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from "ngx-spinner";
import { BRANDING_REQUISITION_LIST_STATUS } from 'src/app/dummyData';
import { CrmService } from 'src/app/services/crm.service';

@Component({
  selector: 'app-branding-list',
  templateUrl: './branding-list.component.html',
  styleUrls: ['./branding-list.component.css']
})
export class BrandingListComponent implements OnInit {

  constructor(private common: CommonService,
    private store: StoreDataService,
    private modalService: NgbModal,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService,
    private crm: CrmService) { }

  authUserData: any;
  isTable: any = 1;
  allReportList: any = [];
  paginationLimitDropdown: any = [];
  limit: any = "";
  offset: any = "0";
  totalRecords: any = "";
  tableHeader: any = [];
  currentPage: any = 1;
  totalPage = 1;
  startPage: any = 0;
  endPage: any = 0;
  totalCosting: any = 0;
  unitRate: any;
  modalData: any;
  allVendorList: any = [];
  selectedVendorData: any;
  allBrandingType: any = [];
  selectedBrandType: any = "";
  allStatusList: any = [];
  selectedStatus: any = "";
  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];
  fromDate: any = "";
  toDate: any = "";
  state: any = "";
  city: any = "";
  zone: any = "";
  customerType: any = "";
  allCustomerType: any = [];
  serachText: any = "";
  allUnitList: any = [];
  selectedUnit: any = "";
  permissionData: any;
  @ViewChild('addCostingModal') addCostingModal: any;
  @ViewChild('modifyBrandModal') modifyBrandModal: any;
  @ViewChild('vendorListModal') vendorListModal: any;
  uploadFileName: any = "";
  uploadPOFilePath: any = "";

  ngOnInit(): void {
    this.tableHeader = BRANDING_REQUISITION_LIST;
    this.allStatusList = BRANDING_REQUISITION_LIST_STATUS;
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.paginationLimitDropdown = this.store.getPaginationLimitList();
    this.limit = this.store.getDefaultPaginationLimit();
    this.getVisitReports();
    this.getAllBrandingTypeList();
    this.getAllState();
    this.getAllCustomerType();
    this.getAllUnitList();
    this.getPermissionData();
  }

  getPermissionData() {
    if (this.authUserData.moduleDetails.length > 0) {
      this.authUserData.moduleDetails.map((data: any) => {
        if (data.name == "Branding") {
          this.permissionData = data;
          // console.log("Branding Permission Dta:", this.permissionData);
        }
      })
    }
  }

  getVisitReports() {
    this.spinner.show();
    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId,
      userType: this.authUserData.userType,
      limit: this.limit.toString(),
      offset: this.offset.toString(),
      stateId: this.state,
      cityId: this.city,
      zoneId: this.zone,
      status: this.selectedStatus,
      brandingTypeId: this.selectedBrandType,
      contactTypeId: this.customerType,
      searchName: this.serachText,
      searchFrom: this.fromDate,
      searchTo: this.toDate
    }
    // this.common.getBrandingList(req).subscribe(res => {
    //   console.log("Branding Report response::", res);
    //   if (res.respondcode == 200) {
    //     let respObj = res.data;
    //     if (respObj.data.length > 0) {
    //       this.allReportList = respObj.data;
    //       this.totalRecords = respObj.count;
    //     } else {
    //       this.allReportList = [];
    //       this.totalRecords = 0;
    //     }
    //   }
    // });

    this.common.getBrandingRequisitionList(req).subscribe(response => {
      console.log("Brnading Requisition list:", response);
      let res: any = response;
      if (res.respondcode == 200) {
        let respObj: any = res.data;
        if (respObj.brandList.length > 0) {
          this.allReportList = respObj.brandList;
          this.totalRecords = respObj.totalCount;
        } else {
          this.allReportList = [];
          this.totalRecords = 0;
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

  getAllBrandingTypeList() {
    let req = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId
    }
    this.common.getBrandingTypeList(req).subscribe(response => {
      // console.log("Brnading Type list:", response);
      let res: any = response;
      if (res.respondcode == 200) {
        let respObj: any = res.data;
        if (respObj.length > 0) {
          this.allBrandingType = respObj;
        } else {
          this.allBrandingType = [];
        }
      }
    })
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

  getStatus(id: any) {
    let str: any = "";
    if (id == 0) {
      str = "Inactive";
    } else if (id == 1) {
      str = "Active";
    } else if (id == 2) {
      str = "Delete";
    }

    return str;
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
    this.getVisitReports();
  }

  onDownload = () => {
    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId,
      userType: this.authUserData.userType,
      limit: this.limit.toString(),
      offset: this.offset.toString(),
      stateId: this.state,
      cityId: this.city,
      zoneId: this.zone,
      status: this.selectedStatus,
      brandingTypeId: this.selectedBrandType,
      contactTypeId: this.customerType,
      searchName: this.serachText,
      searchFrom: this.fromDate,
      searchTo: this.toDate
    }
    this.common.getBrandingListDownloadCSV(req).subscribe(response => {
      let res: any = response;
      console.log("Download res", res);
      let path: any = res.data.path;
      console.log("File Path:", path)
      if (path != "") {
        var file_path = app_config.downloadUrlSFA + path;
        console.log("Main file path", file_path)
        var a = document.createElement('a');
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    })
  }

  startRecordNumber() {
    return Number(this.offset) + 1;
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


  closeModal() {
    this.modalService.dismissAll();
  }

  openCostingModal(data: any) {
    this.modalData = data;
    // this.unitRate = data.unitRate;
    // this.totalCosting = data.totalAmount;
    this.modalService.open(this.addCostingModal, { size: 'md', centered: true, animation: true })
  }

  submitCosting() {
    if (this.modalData.totalAmount == 0) {
      this.notifier.notify('error', 'Please input rate/unit');
    } else {
      let req = {
        clientId: this.authUserData.clientId,
        userId: this.authUserData.userId,
        brandId: this.modalData.id,
        unitRate: this.modalData.unitRate,
        totalAmount: this.modalData.totalAmount
      }

      // console.log("Submit Costing:", req);
      this.common.addCosting(req).subscribe(response => {
        let res: any = response;
        if (res.respondcode == 200) {
          this.closeModal();
          this.modalData = {};
          this.getVisitReports();
          this.notifier.notify('success', 'Costing added successfully');

        }
      })
    }
  }

  keyPressNumbersWithDecimal(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  onUnitRateChange(event: any) {
    let val: any = 0;
    val = Number(this.modalData.unitRate) * Number(this.modalData.allocatedQty);
    this.modalData.totalAmount = val;
  }

  onAllocateQuantityChange(event: any) {
    let val: any = 0;
    val = Number(this.modalData.unitRate) * Number(this.modalData.allocatedQty);
    this.modalData.totalAmount = val;
  }

  openBrandModify(data: any) {
    this.modalData = data;
    this.selectedUnit = data.unitId;
    this.modalService.open(this.modifyBrandModal, { size: 'md', centered: true, animation: true })

  }

  approveByHod() {
    if (this.modalData.totalAmount == 0) {
      this.notifier.notify('error', 'Invalid total cost');
    } else {
      let req = {
        clientId: this.authUserData.clientId,
        userId: this.authUserData.userId,
        brandId: this.modalData.id,
        unitRate: this.modalData.unitRate,
        totalAmount: this.modalData.totalAmount,
        allocatedQty: this.modalData.allocatedQty,
        unit: this.selectedUnit
      }

      // console.log("Approve By Branding HOD:", req);
      this.common.approvedByHod(req).subscribe(response => {
        let res: any = response;
        if (res.respondcode == 200) {
          this.closeModal();
          this.modalData = {};
          this.selectedUnit = "";
          this.getVisitReports();
          this.notifier.notify('success', 'Branding Request Approved successfully');
        }
      })
    }
  }

  openVendorListModal(data: any) {
    this.modalData = data;
    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId,
      limit: "",
      offse: ''
    }

    this.common.getVendorList(req).subscribe(response => {
      let res: any = response;
      if (res.respondcode == 200) {
        // console.log("Vendor List res:", res);
        this.allVendorList = res.data.list;
        this.modalService.open(this.vendorListModal, { size: 'lg', centered: true, animation: true })

      }
    })
  }

  selectVendor(event: any) {
    this.allVendorList.map((data: any) => {
      if (data.id == event.target.value) {
        this.selectedVendorData = data;
      }
    })
  }

  assignVendor() {
    if (this.uploadFileName != "") {
      if (this.selectedVendorData != undefined) {
        let req = {
          clientId: this.authUserData.clientId,
          userId: this.authUserData.userId,
          brandId: this.modalData.id,
          vendorId: this.selectedVendorData.id,
          poPath: this.uploadPOFilePath
        }
        this.common.assignVendor(req).subscribe(response => {
          let res: any = response;
          if (res.respondcode == 200) {
            this.closeModal();
            this.selectedVendorData = {};
            this.modalData = {};
            this.getVisitReports();
            this.notifier.notify('success', 'Vendor assigned successfully');
          }
        })
      } else {
        this.notifier.notify('error', 'Please Select a vendor');
      }
    } else {
      this.notifier.notify('error', 'Please upload PO');
    }
  }

  changeBrandingType() {

  }

  changeBrandingStatus() {

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
    this.state = "";
    this.city = "";
    this.zone = "";
    this.cityList = [];
    this.zoneList = [];
    this.fromDate = "";
    this.toDate = "";
    this.selectedBrandType = "";
    this.selectedStatus = "";
    this.customerType = "";
    this.serachText = "";
    this.getVisitReports();
  }

  getAllCustomerType() {
    let req = {
      clientId: this.authUserData.clientId
    }
    this.common.getVisitorListTypeByContactId(req).subscribe(response => {
      let res: any = response;
      if (res.respondcode == 200) {
        this.allCustomerType = res.data.visitorList;
      }
    })
  }

  searchFilterSubmit() {
    this.getVisitReports();
  }

  onChangeSearchText(e: any) {
    // console.log("Search Value:", this.serachText);
    this.getVisitReports();
  }

  getAllUnitList() {
    this.common.getMeasurementUnitList({}).subscribe(response => {
      let res: any = response;
      if (res.respondcode == 200) {
        this.allUnitList = res.data;
      }
    })
  }


  uploadFile() {

    const banner = document.getElementById('upload') as HTMLInputElement;
    const file: any = banner.files;
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        // this.bulkFile = reader.result as any;
        const fileData = new FormData();
        fileData.append('file', file[0]);
        this.common.uploadFile(fileData).subscribe((res: any) => {
          // console.log("File upload response>>>>", res);
          if (res.error == 0) {
            this.uploadFileName = res.data.filename;
            this.uploadPOFilePath = res.data.path + res.data.filename;
            // console.log("Upload Bulk File upload>>>>>>>>>>>", this.uploadBulkFile);
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }

        })
      }
    }
  }

}
