import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
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
    private store: StoreDataService
  ) { }

  isMappingTab: any = "1";
  authUserData: any;
  countryId: any = "1";
  clientId: any = "";
  schemePath: any = "";
  mapFor: any = "0";
  mapHeader: any = "";
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
  rightSelectedStateName : any = "";
  rightAllDistrict: any = [];
  rightDistrictId: any = "";
  rightSelectedDistrictName : any = "";
  rightAllZone: any = "";
  rightZoneId: any = "";
  rightSelectedZoneName : any = "";
  rightAllType: any = "";
  rightTypeId: any = "";
  rightListSearchText: any = "";

  mappingArray: any = [];

  infLocMapList: any = [];
  finalInfLocMapList: any = [];

  leftInfListDealerMapping: any = [];
  rightListData: any = [];
  rightListSelectedId : any = [];

  mappingList : any = [];


  ngOnInit(): void {
    this.load();
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
    this.getInfluencerDataForMapping();
    this.getAllLocationData();

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
    if(value == "2"){
      this.getDealerListData();
    }
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
    // this.getInfluencerDataForMapping();
  }

  leftDistrictChange(value: any) {
    // console.log("district::", this.leftDistrictId);
    // this.getInfluencerDataForMapping();
  }

  leftSearchClick() {
    // this.getInfluencerDataForMapping();
  }

  rightStateChange(value: any) {
    this.allState.map((st:any)=>{
      if(st.id == this.rightStateId){
        this.rightSelectedStateName = st.name;
      }
    })
    this.rightDistrictId = "";
    this.rightAllZone = [];
    this.rightZoneId = "";
    this.rightAllDistrict = this.getDistrictData(this.rightStateId);
    let arr = this.mappingArray;
    arr.map((data: any) => {
      if (data.id == this.rightStateId) {
        data.isDelete = 0;
      } else {
        data.isDelete = 1;
      }
    });
    this.mappingArray = arr;
  }

  rightDistrictChange(value: any) {
    this.rightAllDistrict.map((st:any)=>{
      if(st.id == this.rightDistrictId){
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
    this.rightAllZone.map((st:any)=>{
      if(st.id == this.rightZoneId){
        this.rightSelectedZoneName = st.name;
      }
    })
    // console.log("district::", this.leftDistrictId);
    // this.getInfluencerDataForMapping();
  }

  rightSearchClick() {
    // this.getInfluencerDataForMapping();
  }

  getInfluencerDataForMapping() {
    let obj = {
      countryId: this.countryId,
      clientId: this.clientId,
      stateId: this.leftStateId,
      districtId: this.leftDistrictId,
      name: this.leftListSearchText,
      designationId: this.leftTypeId
    }


    this.leftInfluencerList = this.store.getAllInfluencerList();
    console.log("All influencer list:", this.leftInfluencerList);
    this.setInfluencerListForDealerMapping(this.leftInfluencerList);
    // this.common.getEmployeeMapData(obj).subscribe(res => {
    //   // console.log("All Employee Response:", res);
    //   if (res.error == 0 && res.respondcode == 200) {
    //     let respObj = res.data;
    //     if (Object.keys(respObj).length > 0) {
    //       if (respObj.data.length > 0) {
    //         this.employeeList = respObj.data;
    //         this.setEmployeeListForHier(respObj.data);
    //       } else {
    //         this.employeeList = [];
    //       }
    //     }
    //   }
    // })

  }

  ChangeLeftSideInfluencerRadio(event: any) {
    this.leftInfluencerId = event.target.value;
    this.getMapArrayData(this.allState);
    this.showDataInMap();
  }

  showDataInMap() {
    let arr = this.mappingArray;
    this.leftInfluencerList.map((data: any) => {
      if (data.userId == this.leftInfluencerId) {
        if (data.stateId != null) {
          arr.map((st: any) => {

            if (st.id == data.stateId) {
              st.isActive = 1;
            }
            if (data.districtId != null) {
              st.district.map((ds: any) => {
                let dsArr = data.districtId.split(",");
                dsArr.map((dd: any) => {
                  if (ds.id == dd) {
                    ds.isActive = 1;
                  }

                  if (data.zoneId != null) {
                    ds.zone.map((zn: any) => {
                      let znArr = data.zoneId.split(",");
                      znArr.map((zz: any) => {
                        if (zn.id == zz) {
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
      if (data.userId == this.leftInfluencerId) {
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
      assignedBy: "2",
      location: this.finalInfLocMapList
    }

    // this.common.setEmployeeMapData(reqObj).subscribe(res => {
    //   console.log("Submit empoyee location map response::", res)
    //   // if (res.error == 0 && res.respondcode == 200) {
    //   //   this.route.navigate(["/admin/dashboard"]);
    //   // }
    // })

    console.log("Main Location Arr::", reqObj);
  }

  setInfluencerListForDealerMapping(arr: any) {
    let temp: any = [];
    arr.map((data: any) => {
      temp.push({
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        designationName: data.designationName,
        isActive: 0
      })
    })
    this.leftInfluencerList = temp
  }

  selectInfDealerMapListData(event: any) {
    let arr = this.leftInfluencerList;

    arr.map((data: any) => {
      if (data.userId == event.target.value) {
        if (event.target.checked) {
          data.isActive = 1;
        } else {
          data.isActive = 0;
        }
      }
    })

    this.leftInfluencerList = arr;
  }

  getDealerListData(){
    this.rightListData = this.store.getAllDealerList()
  }

  onselectFromRightListRadio(event: any) {
    this.mappingList = [];
    let temp: any = [];
    let brr: any = this.leftInfluencerList;
    brr.map((data: any) => {
      temp.push({
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        designationName: data.designationName,
        isActive: 0
      })
    })
    this.leftInfluencerList = temp
    // this.getHierarchyEmployeeDataForMapping();
    this.rightListSelectedId = event.target.value;
    let arr: any = this.leftInfluencerList;
    this.rightListData.map((data: any) => {
      if (data.userId == this.rightListSelectedId) {
        if (data.team.length > 0) {
          arr.map((hm: any) => {
            data.team.map((tm: any) => {
              if (hm.userId == tm) {
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
    let arr: any = [];
    this.leftInfluencerList.map((data: any) => {
      if (data.isActive == 1) {
        arr.push(data);
      }
    })

    this.mappingList = arr;
  }

  submitMappingData() {
    let arr: any = [];
    this.mappingList.map((data: any) => {
      arr.push(data.userId);
    });

    let reqObj = {
      addedBy: "1",
      clientId: this.clientId,
      mapData: [{
        userId: this.rightListSelectedId,
        team: arr
      }]
    }

    console.log("Mapping Final request Array::", reqObj);

    // this.common.setEmployeeHierarchyMapping(reqObj).subscribe(res => {
    //   // console.log("Submit Response::", res);
    //   if (res.error == 0 && res.respondcode == 200) {

    //     this.modalService.open(this.successfullMap, { size: 'sm', centered: true, animation: true });
    //     setTimeout(() => {
    //       this.getHierarchyEmployeeList();
    //       this.getHierarchyEmployeeDataForMapping();
    //       this.allMappingHierarchyList = [];
    //       this.closeModal();
    //     }, 1000)
    //   }
    // })
  }

  setInfluencerListForSubDealerMapping(arr: any) {
    let temp: any = [];
    arr.map((data: any) => {
      temp.push({
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        designationName: data.designationName,
        isActive: 0
      })
    })
    this.leftInfluencerList = temp
  }

}
