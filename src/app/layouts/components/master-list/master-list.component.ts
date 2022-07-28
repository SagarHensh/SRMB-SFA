import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
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
    routeParams.params.subscribe((params) => {
      // console.log("Params id::", params)
      this.contactTypeId = params["id"];
      this.getListData();
    });
  }

  title: any;
  masterData: any;
  contactTypeId: any;
  listData: any = [];
  totalListData: any;
  allState : any = [];

  async ngOnInit() {
    // this.allState = await this.store.getAllState();
    console.log("All State :",await this.store.getAllState())
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
      cityId: "",
      stateId: "",
      contactName: "",
      status: "",
      limit: "",
      offset: "",
      clientId: "1",
      organizationName: "",
      ownerName: ""
    }
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

}
