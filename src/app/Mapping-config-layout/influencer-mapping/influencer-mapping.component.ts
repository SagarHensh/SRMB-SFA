import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { CrmService } from 'src/app/services/crm.service';
import { StoreDataService } from 'src/app/services/store-data.service';

@Component({
  selector: 'app-influencer-mapping',
  templateUrl: './influencer-mapping.component.html',
  styleUrls: ['./influencer-mapping.component.css']
})
export class InfluencerMappingComponent implements OnInit {

  constructor(
    private route: Router,
    private common: CommonService,
    private crm: CrmService,
    private store: StoreDataService,
    private modalService: NgbModal
  ) { }

  mapHeaderLeft: any = "2";
  isMappingTab: any = "1";
  authUserData: any;
  countryId: any = "1";
  clientId: any = "";
  schemePath: any = "";
  mapFor: any = "0";
  mapHeader: any = "Location";
  employeeMapType: any = "";
  allState: any = [];
  leftInfluencerList: any = [];
  leftInfluencerId: any = "";
  leftStateId: any = "";
  leftAllDistrict: any = [];
  leftDistrictId: any = "";
  leftAllZone: any = "";
  leftZoneId: any = "";
  leftAllType: any = "";
  leftTypeId: any = "";
  leftListSearchText: any = "";

  rightStateId: any = "";
  rightSelectedStateName: any = "";
  rightAllDistrict: any = [];
  rightDistrictId: any = "";
  rightSelectedDistrictName: any = "";
  rightAllZone: any = "";
  rightZoneId: any = "";
  rightSelectedZoneName: any = "";
  rightAllType: any = "";
  rightTypeId: any = "";
  rightListSearchText: any = "";

  mappingArray: any = [];

  infLocMapList: any = [];
  finalInfLocMapList: any = [];

  leftInfListDealerMapping: any = [];
  rightListData: any = [];
  rightListSelectedId: any = [];

  mappingList: any = [];


  imageUrl: any = "";
  allDynamicTabType: any = [];
  showDynamicTabType: any = [];
  mapHeaderData: any = {};
  mappingContactTypeId: any = '';

  mapLeftHeaderString: any = "";

  @ViewChild('successfullMap') successfullMap: any;


  ngOnInit(): void {
    this.load();
    this.imageUrl = this.crm.getImageUrl();
    this.schemePath = this.common.getLayoutSchemePath();
  }

  load() {

    let data: any = this.common.getAuthUserData();
    // console.log("authUserL::", JSON.parse(data));
    this.authUserData = JSON.parse(data);
    if (Object.keys(data).length > 0) {
      // alert(this.clientId)
      // console.log("data",data)
      this.clientId = this.authUserData.clientId;
    }
    this.imageUrl = this.crm.getImageUrl();
    this.getInfluencerDataForMapping();
    this.getAllLocationData();
    this.getInfluencerTypeData();
    this.getDynamicTabType();
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  changeMapLeftHeaderType(val: any) {
    this.mapHeaderLeft = val;
    this.mapHeader = 'Location';
    if (val == 1) {
      let brr: any = [];
      let arr: any = this.allDynamicTabType;
      arr.map((data: any) => {
        if (data.isLeaf == 0) {
          brr.push(data)
        } else {
          this.getAllDynamicLeftData('')
          this.mapLeftHeaderString = "Dealer, Subdealer or Distributor";
        }
      })

      console.log("brr::", brr)
      this.showDynamicTabType = brr;

    } else {
      this.showDynamicTabType = this.allDynamicTabType;
      this.getInfluencerDataForMapping();
    }


    if (document.getElementById('attandance')?.classList.contains('active')) {

    } else {
      var elms: any = document.querySelectorAll("[id='eod_cs']");
      for (var i = 0; i < elms.length; i++) {
        elms[i].classList.remove('active')
      }
      document.getElementById('attandance')?.classList.add('active');
      document.getElementById('pills_attandance')?.classList.add('active');
      document.getElementById('pills_attandance')?.classList.add('show');
      // document.getElementById('eod_cs')?.classList.remove("active");
      document.getElementById('pills_eod')?.classList.remove("active")
      document.getElementById('pills_eod')?.classList.remove("show");
    }

  }

  getDynamicTabType() {
    let obj = {
      clientId: this.authUserData.clientId,
      mstSlNo: 1
    }
    this.common.getInfluencorType(obj).subscribe(res => {
      console.log("Dynamic Tab:", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        this.allDynamicTabType = respObj.data;
        this.showDynamicTabType = respObj.data;
      }
    })

  }

  getInfluencerTypeData() {

    // ifcustomer mstSerial = 1; if influencer mstSeral = 4
    let obj = {
      clientId: this.authUserData.clientId,
      mstSlNo: 4
    }
    this.common.getInfluencorType(obj).subscribe(res => {
      // console.log("Influencer Type:", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        this.leftAllType = respObj.data;
      }
    })
  }

  leftTypeChange(event: any) {

    if (this.mapHeaderLeft == 2) {
      this.getInfluencerDataForMapping();
    } else {
      this.getAllDynamicLeftData(this.leftTypeId);

    }
  }




  onChangeMapFor(event: any) {
    let value: any = event.target.value;
    console.log("Map for value:", value)
    this.mapFor = value;
    if (value == "1") {
      this.route.navigate([this.schemePath + "influencer-mapping"]);
    } else if (value == "0") {
      this.route.navigate([this.schemePath + "employee-mapping"])
    }
  }

  onChangeMappingOption(value: any) {
    this.isMappingTab = value;
    if (value == "1") {
      this.mapHeader = 'Location';
      this.mapLeftHeaderString = "Dealer, Subdealer or Distributor";
      this.getAllLocationData();
      if(this.mapHeaderLeft == 1){
        this.getAllDynamicLeftData('');
      } else {
        this.getInfluencerDataForMapping();
      }
    } else {
      this.mapHeader = value.contactTypeName;
      this.mapHeaderData = value;
      this.getDealerListData();
      if (this.mapHeaderLeft == 1) {
        this.allDynamicTabType.map((data: any) => {
          if (data.parentId == value.contactTypeId) {
            this.mapLeftHeaderString = data.contactTypeName;
            this.mappingContactTypeId = data.contactTypeId;
            this.getAllDynamicLeftData(this.mappingContactTypeId)

          }
        })
      }
    }
  }

  getAllDynamicLeftData(id: any) {
    let obj = {
      clientId: this.authUserData.clientId,
      countryId: "1",
      contactTypeId: id,
      stateId: this.leftStateId,
      districtId: this.leftDistrictId,
      zoneId: this.leftZoneId,
      name: this.leftListSearchText,
    }
    console.log("req::", obj)
    // this.rightListData = this.store.getAllDealerList()
    this.common.getCustomerMapData(obj).subscribe(res => {
      console.log("Dynamic Left Data", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        this.leftInfluencerList = respObj.data;
        this.setInfluencerListForDealerMapping(this.leftInfluencerList);
      }
    })
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
            this.getMapArrayData(this.allState);
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
    // console.log("All district array::", arr)
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

  leftStateChange(value: any) {
    this.leftDistrictId = "";
    this.leftAllDistrict = this.getDistrictData(this.leftStateId);
    this.getInfluencerDataForMapping();
  }

  leftDistrictChange(value: any) {
    // console.log("district::", this.leftDistrictId);
    this.getInfluencerDataForMapping();
    this.leftAllZone = this.getZoneData(this.leftStateId, this.leftDistrictId);
  }

  leftZoneChange() {
    console.log("Left zone::", this.leftZoneId);
    this.getInfluencerDataForMapping();
  }

  leftSearchClick() {
    if (this.mapHeaderLeft == 2) {
      this.getInfluencerDataForMapping();
    } else {
      // console.log("Search data::")
      this.getAllDynamicLeftData(this.mappingContactTypeId);

    }
  }

  rightStateChange(value: any) {
    this.allState.map((st: any) => {
      if (st.id == this.rightStateId) {
        this.rightSelectedStateName = st.name;
      }
    })
    this.rightDistrictId = "";
    this.rightAllZone = [];
    this.rightZoneId = "";
    this.rightAllDistrict = this.getDistrictData(this.rightStateId);
    if (this.mapHeader == "Location") {
      let arr = this.mappingArray;
      arr.map((data: any) => {
        if (data.id == this.rightStateId) {
          data.isDelete = 0;
        } else {
          data.isDelete = 1;
        }
      });
      this.mappingArray = arr;
    } else {
      this.getDealerListData();
    }
  }

  rightDistrictChange(value: any) {
    this.rightAllDistrict.map((st: any) => {
      if (st.id == this.rightDistrictId) {
        this.rightSelectedDistrictName = st.name;
      }
    })
    this.rightAllZone = [];
    this.rightZoneId = "";
    this.rightAllZone = this.getZoneData(this.rightStateId, this.rightDistrictId)
    // console.log("district::", this.leftDistrictId);
    let arr: any = this.mappingArray;
    arr.map((map: any) => {
      if (map.id == this.rightStateId) {
        map.district.map((ds: any) => {
          if (this.rightDistrictId != "") {
            if (ds.id == this.rightDistrictId) {
              ds.isDelete = 0;
            } else {
              ds.isDelete = 1;
            }
          } else {
            ds.isDelete = 0;
          }
        })
      }
    })
  }

  rightZoneChange(value: any) {
    this.rightAllZone.map((st: any) => {
      if (st.id == this.rightZoneId) {
        this.rightSelectedZoneName = st.name;
      }
    })
    // console.log("district::", this.leftDistrictId);
    // this.getInfluencerDataForMapping();
  }

  rightSearchClick() {
    // this.getInfluencerDataForMapping();
  }

  getProfileImage(img: any) {
    return this.imageUrl + img;
  }

  getInfluencerDataForMapping() {
    let obj = {
      countryId: this.countryId,
      clientId: this.clientId,
      stateId: this.leftStateId,
      districtId: this.leftDistrictId,
      zoneId: this.leftZoneId,
      name: this.leftListSearchText,
      contactTypeId: this.leftTypeId
    }


    // this.leftInfluencerList = this.store.getAllInfluencerList();
    // console.log("All influencer list:", this.leftInfluencerList);
    // this.setInfluencerListForDealerMapping(this.leftInfluencerList);
    this.common.getInfluencorForLoc(obj).subscribe(res => {
      console.log("All influencer Response:", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        if (Object.keys(respObj).length > 0) {
          if (respObj.data.length > 0) {
            this.leftInfluencerList = respObj.data;
            this.setInfluencerListForDealerMapping(this.leftInfluencerList);
          } else {
            this.leftInfluencerList = [];
          }
        }
      }
    })

  }

  ChangeLeftSideInfluencerRadio(event: any) {
    this.leftInfluencerId = event.target.value;
    console.log("leftInfluencerId::", this.leftInfluencerId)
    this.getMapArrayData(this.allState);
    this.showDataInMap();
  }

  showDataInMap() {
    let arr = this.mappingArray;
    console.log("leftInfluencerId in show map::", this.leftInfluencerId)
    console.log("leftInfluencer List::", this.leftInfluencerList)
    this.leftInfluencerList.map((data: any) => {
      if (data.customerId == this.leftInfluencerId) {
        if (data.stateId != null) {
          arr.map((st: any) => {

            if (st.id == data.stateId) {
              st.isActive = 1;
            }
            if (data.districtId != null) {
              st.district.map((ds: any) => {
                let dsArr = data.districtId.split(",");
                console.log("dsArr::", dsArr)
                dsArr.map((dd: any) => {
                  if (ds.id == dd) {
                    console.log("selected district::", ds)
                    ds.isActive = 1;
                  }

                  if (data.zoneId != null) {
                    ds.zone.map((zn: any) => {
                      let znArr = data.zoneId.split(",");
                      console.log("znArr::", znArr)
                      znArr.map((zz: any) => {
                        if (zn.id == zz) {
                          console.log("selected Zone::", ds)
                          zn.isActive = 1;
                        }

                      })
                    })
                  }
                })
              })
            }
          })
        }
      }
    });

    this.mappingArray = arr;

  }

  getMapArrayData(val: any) {
    // console.log("Array for mapping data:", val);
    let arr: any = [];
    val.map((st: any) => {
      let districtArr: any = [];
      st.district.map((ds: any) => {
        let zoneArr: any = [];
        ds.zone.map((zn: any) => {
          zoneArr.push({
            id: zn.id,
            name: zn.name,
            isActive: 0
          })
        })
        districtArr.push({
          id: ds.id,
          name: ds.name,
          zone: zoneArr,
          isActive: 0,
          isDelete: 0
        })
      })
      arr.push({
        id: st.id,
        name: st.name,
        district: districtArr,
        isActive: 0,
        isDelete: 0
      })
    })

    // console.log("Final Array :: ", arr);
    this.mappingArray = arr;
  }

  deleteState(id: any) {
    // this.resourceEmployeeList.map((rr: any) => {
    //   if (rr.id == this.empMapId) {
    //     this.mappingArray = rr.mappingData;
    //   }
    // })
    let arr: any = this.mappingArray;

    arr.map((map: any) => {
      if (map.id == id) {
        map.isDelete = 1;
      }
    })
    this.mappingArray = arr;
    // this.resourceEmployeeList.map((rr: any) => {
    //   if (rr.id == this.empMapId) {
    //     rr.mappingData = this.mappingArray;
    //   }
    // })

  }

  deleteDistrict(sid: any, did: any) {
    // this.resourceEmployeeList.map((rr: any) => {
    //   if (rr.id == this.empMapId) {
    //     this.mappingArray = rr.mappingData;
    //   }
    // })
    let arr: any = this.mappingArray;
    // console.log("SID :", sid, "did:", did);

    arr.map((map: any) => {
      if (map.id == sid) {
        map.district.map((ds: any) => {
          if (ds.id == did) {
            ds.isDelete = 1;
          }
        })
      }
    })

    this.mappingArray = arr;
    // this.resourceEmployeeList.map((rr: any) => {
    //   if (rr.id == this.empMapId) {
    //     rr.mappingData = this.mappingArray;
    //   }
    // })

  }

  changeZone(event: any, sid: any, did: any) {
    // this.resourceEmployeeList.map((rr: any) => {
    //   if (rr.id == this.empMapId) {
    //     this.mappingArray = rr.mappingData;
    //   }
    // })
    let arr: any = this.mappingArray;

    arr.map((map: any) => {
      if (map.id == sid) {
        map.district.map((ds: any) => {
          if (ds.id == did) {
            ds.zone.map((zn: any) => {
              if (zn.id == event.target.value) {
                if (event.target.checked) {
                  zn.isActive = 1;
                } else {
                  zn.isActive = 0;
                }
              }
            })

          }
        })
      }
    })
    this.mappingArray = arr;
    // console.log("Mapping Array:", arr)
    // this.resourceEmployeeList.map((rr: any) => {
    //   if (rr.id == this.empMapId) {
    //     rr.mappingData = this.mappingArray;
    //   }
    // })
  }

  addInfluencerWithLocation() {
    let arr = this.mappingArray;
    this.leftInfluencerList.map((data: any) => {
      if (data.customerId == this.leftInfluencerId) {
        this.infLocMapList.push({
          id: this.leftInfluencerId,
          listData: data,
          mappingData: arr
        });

      }
    })

  }

  onSubmitLocationMapping() {
    this.infLocMapList.map((rr: any) => {
      let arr = rr.mappingData;
      let brr: any = [];

      arr.map((st: any) => {
        if (st.isDelete == 0) {
          let districtArr: any = [];
          st.district.map((ds: any) => {
            if (ds.isDelete == 0) {
              let zoneArr: any = [];
              ds.zone.map((zn: any) => {
                if (zn.isActive == 1) {
                  zoneArr.push({
                    id: zn.id,
                    name: zn.name
                  })
                }
              })
              if (zoneArr.length > 0) {
                districtArr.push({
                  id: ds.id,
                  name: ds.name,
                  zone: zoneArr
                })
              }
            }
          })
          if (districtArr.length > 0) {
            brr.push({
              id: st.id,
              name: st.name,
              district: districtArr
            })
          }
        }
      })

      let obj = {
        userId: rr.id,
        countryId: this.countryId,
        state: brr
      }

      this.finalInfLocMapList.push(obj);
    })

    // ======================
    let reqObj = {
      clientId: this.clientId,
      assignedBy: this.authUserData.userId,
      location: this.finalInfLocMapList
    }

    this.common.getMapCustomerLoc(reqObj).subscribe(res => {
      // console.log("Submit empoyee location map response::", res)
      if (res.error == 0 && res.respondcode == 200) {
        this.modalService.open(this.successfullMap, { size: 'sm', centered: true, animation: true });
        setTimeout(() => {
          this.getAllLocationData();
          if(this.mapHeaderLeft == 1){
            this.getAllDynamicLeftData('');
          } else {
            this.getInfluencerDataForMapping();
          }
          this.finalInfLocMapList = [];
          this.infLocMapList = [];
          this.closeModal();
        }, 3000)
      }
    })

    // console.log("Main Location Arr::", reqObj);
  }

  setInfluencerListForDealerMapping(arr: any) {
    let temp: any = [];
    arr.map((data: any) => {
      temp.push({
        customerId: data.customerId,
        firstName: data.firstName,
        lastName: data.lastName,
        designationName: data.contactTypeName,
        profilePic: data.profilePic,
        contactTypeName: data.contactTypeName,
        countryId: data.countryId,
        countryName: data.countryName,
        stateId: data.stateId,
        stateName: data.stateName,
        districtId: data.districtId,
        cityName: data.cityName,
        zoneId: data.zoneId,
        zoneName: data.zoneName,
        isActive: 0
      })
    })
    this.leftInfluencerList = temp
  }

  selectInfDealerMapListData(event: any) {
    let arr = this.leftInfluencerList;

    arr.map((data: any) => {
      if (data.customerId == event.target.value) {
        if (event.target.checked) {
          data.isActive = 1;
        } else {
          data.isActive = 0;
        }
      }
    })

    this.leftInfluencerList = arr;
  }

  getDealerListData() {
    let obj = {
      clientId: this.authUserData.clientId,
      countryId: "1",
      contactTypeId: this.mapHeaderData.contactTypeId,
      stateId: this.rightStateId,
      districtId: this.rightDistrictId,
      zoneId: this.rightZoneId,
      name: this.rightListSearchText,
    }
    // this.rightListData = this.store.getAllDealerList()
    this.common.getCustomerMapData(obj).subscribe(res => {
      console.log("Right Map Data", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        this.rightListData = respObj.data;
      }
    })
  }

  onselectFromRightListRadio(event: any) {
    this.mappingList = [];
    let temp: any = [];
    let brr: any = this.leftInfluencerList;
    brr.map((data: any) => {
      temp.push({
        customerId: data.customerId,
        firstName: data.firstName,
        lastName: data.lastName,
        designationName: data.contactTypeName,
        profilePic: data.profilePic,
        contactTypeName: data.contactTypeName,
        countryId: data.countryId,
        countryName: data.countryName,
        stateId: data.stateId,
        stateName: data.stateName,
        districtId: data.districtId,
        cityName: data.cityName,
        zoneId: data.zoneId,
        zoneName: data.zoneName,
        isActive: 0
      })
    })
    this.leftInfluencerList = temp
    // this.getHierarchyEmployeeDataForMapping();
    this.rightListSelectedId = event.target.value;
    let arr: any = this.leftInfluencerList;
    this.rightListData.map((data: any) => {
      if (data.customerId == this.rightListSelectedId) {
        if (data.team.length > 0) {
          arr.map((hm: any) => {
            data.team.map((tm: any) => {
              if (hm.customerId == tm) {
                hm.isActive = 1;
              }
            })

          })
        }
      }
    })

    this.leftInfluencerList = arr;
    console.log("show left emp data:: ", arr)
  }

  addMappingList() {

    // console.log("Add mapping List")
    let arr: any = [];
    this.leftInfluencerList.map((data: any) => {
      if (data.isActive == 1) {
        arr.push(data);
      }
    })

    // console.log("Mapping List Array::", this.mappingList)

    this.mappingList = arr;
  }

  submitMappingData() {
    let arr: any = [];
    this.mappingList.map((data: any) => {
      arr.push(data.customerId);
    });

    let reqObj = {
      addedBy: this.authUserData.userId,
      clientId: this.clientId,
      mapData: [{
        userId: this.rightListSelectedId,
        team: arr
      }]
    }

    console.log("Mapping Final request Array::", reqObj);

    this.common.getMapParentChildCustomer(reqObj).subscribe(res => {
      // console.log("Submit Response::", res);
      if (res.error == 0 && res.respondcode == 200) {

        this.modalService.open(this.successfullMap, { size: 'sm', centered: true, animation: true });
        setTimeout(() => {
          this.getDealerListData();
          //   this.getAllDynamicLeftData(this.mappingContactTypeId)

          if(this.mapHeaderLeft == 1){
            this.getAllDynamicLeftData(this.mappingContactTypeId);
          } else {
            this.getInfluencerDataForMapping();
          }
          this.mappingList = [];
          this.closeModal();
        }, 3000)
      }
    })
  }

  setInfluencerListForSubDealerMapping(arr: any) {
    let temp: any = [];
    arr.map((data: any) => {
      temp.push({
        customerId: data.customerId,
        firstName: data.firstName,
        lastName: data.lastName,
        designationName: data.contactTypeName,
        profilePic: data.profilePic,
        contactTypeName: data.contactTypeName,
        countryId: data.countryId,
        countryName: data.countryName,
        stateId: data.stateId,
        stateName: data.stateName,
        districtId: data.districtId,
        cityName: data.cityName,
        zoneId: data.zoneId,
        zoneName: data.zoneName,
        isActive: 0
      })
    })
    this.leftInfluencerList = temp
  }

  getSearchRight() {
    this.getDealerListData();
  }

}
