import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import app_config from 'src/app/app.config';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})
export class MasterListComponent implements OnInit {

  constructor(
    private store: StoreDataService,
    private common: CommonService,
    private routeParams: ActivatedRoute,
    private route: Router
  ) {

    // routeParams.params.subscribe((params) => {
      
    //   this.contactTypeId = params["id"];
      
    // });

  }

  limit = 10;
  offset = 0;
  authUserData: any;
  title: any;
  masterData: any;
  contactTypeId: any;
  listData: any = [];
  totalListData: any;
  allState : any = [];

  //------------------  For Filter-------------//

  stateList:any = [];
  cityList:any = [];
  state = "" as any;
  city = "" as any;
  searchStatus = "";
  searchContactName = "";
  searchPhone = "";
  searchOrgName = "";
  searchOwnerName = "";





  async ngOnInit() {

    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);

   this.routeParams.params.subscribe((params) => {
      this.contactTypeId = params["id"];
      this.getListData();
    });
    console.log("Auth user data",this.authUserData);
    this.getState();
  }

  // getDataFromStore() {
  //   this.masterData = this.store.getMasterType();
  //   this.getListData();
  //   // console.log("Master Component Data:", this.masterData);
  //   // if (this.masterData != undefined) {
  //   //   this.title = this.masterData.name;
  //   // } else {
  //   //   this.route.navigate([this.common.getLayoutHomePath() + 'dashboard'])
  //   // }
  // }

  getListData() {
    let obj = {
      contactType: this.contactTypeId,
      cityId: this.city,
      stateId: this.state,
      status: this.searchStatus.toString(),
      limit: this.limit,
      offset: this.offset.toString(),
      clientId: this.authUserData.clientId,
      contactName: this.searchContactName,
      organizationName: this.searchOrgName,
      ownerName: this.searchOwnerName,
      searchPhone:  this.searchPhone
    };
    console.log("Request data for master list data>>>>>>>>>>",obj);
    this.common.getContactList(obj).subscribe(res => {
      // console.log("customer Type response::", res);
      if (res.error == 0 && res.respondcode == 200) {
        this.title = res.data.contactType;
        this.totalListData = res.data.totalCount;
        if (res.data.contactListData.length > 0) {
          let arr = res.data.contactListData;
          if (arr.length > 0) {
            this.listData = arr;
          }
        } else {
          this.listData = [];
        }
      }

    })
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


//-------------------- For Download---------//

downloadList(){
  const data = {
    "clientId": this.authUserData.clientId,
    "contactType": this.contactTypeId
  };
  this.common.contactTypeListDownload(data).subscribe((res:any)=>{
    console.log("contact type list res>>>>>",res);
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
      //console.log("state res>>>>>>>>>", res);
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
  changeState(event:any) {
   // console.log("State id by",event.target.value);
    if(event.target.value == ''){
      this.state = "";
      this.getListData();
    } else{
      this.state = event.target.value;
      this.getListData();
      this.getCity();
    }

  }

  changeCity(event:any){
    if(event.target.value == ''){
      this.city = "";
      this.getListData();
    } else{
      this.city = event.target.value;
      this.getListData();
    }
  }

  searchByName(event:any){
    if(event.target.value.length >=2){
      this.searchContactName = event.target.value;
      this.getListData();
    } else{
      this.searchContactName = "";
      this.getListData();
    }

  }

  searchByPhone(event:any){
    if(event.target.value.length >= 2){
      this.searchPhone = event.target.value;
      this.getListData();
    } else{
      this.searchPhone = "";
      this.getListData();
    }
  }

  searchByOrgName(event:any){
    if(event.target.value.length >= 2){
      this.searchOrgName = event.target.value;
      this.getListData();
    } else{
      this.searchOrgName = "";
      this.getListData();
    }
  }

  searchByOwnerName(event:any){
    if(event.target.value.length >= 2){
      this.searchOwnerName = event.target.value;
      this.getListData();
    } else{
      this.searchOwnerName = "";
      this.getListData();
    }
  }

  changeByStatus(event:any){
    console.log("event target value>>>",event.target.value);
    if(event.target.value == '0'){
      this.searchStatus = event.target.value;
      this.getListData();
    }
    if(event.target.value == '1'){
      this.searchStatus = event.target.value;
      this.getListData();
    }
    if(event.target.value == ''){
      this.searchStatus = "";
      this.getListData();
    }
  }

}
