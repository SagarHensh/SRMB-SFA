import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrmService } from 'src/app/services/crm.service';

@Component({
  selector: 'app-employee-mapping',
  templateUrl: './employee-mapping.component.html',
  styleUrls: ['./employee-mapping.component.css']
})
export class EmployeeMappingComponent implements OnInit {

  constructor(
    private route: Router,
    private common: CommonService,
    private crm: CrmService,
    private modalService: NgbModal
  ) { }

  @ViewChild('successfullMap') successfullMap: any;

  countryId: any = "1";
  schemePath: any = "";
  mapFor: any = "0";
  mapHeader: any = "Location";
  employeeMapType: any = "";
  mapType: any = "0";
  stateArr: any = [];
  empStateId: any = "";
  empCityArr: any = [];
  empCityId: any = "";
  mapStateId: any = "";
  mapCityArr: any = [];
  mapCityId: any = "";
  mapZoneArr: any = [];
  mapZoneId: any = "";
  mappingArray: any = [];
  empMappingArr: any = [];
  clientId: any = "";
  employeeList: any = [];
  empMapId: any = "";
  employeeDesignationList: any = [];
  empDesignationId: any = "";
  resourceEmployeeList: any = [];
  resourceEmpLocMapList: any = [];
  empSearch: any = "";

  // HierarchyUsage

  hempStateId: any = "";
  hempDistrictArray: any = [];
  hempDistrictId: any = "";
  hempZoneArr: any = [];
  hempZoneId: any = "";
  hempHierarchyTypeId: any = "";
  allHierarchyType: any = [];
  hempSearchText: any = "";
  allHierarchyEmpList: any = [];
  hempId: any = "";
  allMappingHierarchyList: any = [];
  hempList: any = [];
  imageUrl: any = "";
  hempTypeId: any = "";
  authUserData: any;


  ngOnInit(): void {
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.clientId = this.authUserData.clientId;
    this.getAllLocationData();
    this.schemePath = this.common.getLayoutSchemePath();
    this.imageUrl = this.crm.getImageUrl();
    this.getEmployeeDataForMapping();
    this.getAllEmployeeDesignation();
    this.getHierarchyEmployeeList();
    this.getHierarchyEmployeeDataForMapping();
  }

  getProfileImage(img: any) {
    return this.imageUrl + img;
  }

  getEmployeeDataForMapping() {
    let obj = {
      countryId: this.countryId,
      clientId: this.clientId,
      stateId: this.empStateId,
      districtId: this.empCityId,
      name: this.empSearch,
      designationId: this.empDesignationId
    }
    this.common.getEmployeeMapData(obj).subscribe(res => {
      console.log("All left Employee Response:", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        if (Object.keys(respObj).length > 0) {
          if (respObj.data.length > 0) {
            this.employeeList = respObj.data;
            this.setEmployeeListForHier(respObj.data);
          } else {
            this.employeeList = [];
          }
        }
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
            this.stateArr = respObj.state;
            this.getMapArrayData(this.stateArr);
          }
        }
      }
    })
  }

  getDistrictData(sid: any) {
    let arr: any = [];
    this.stateArr.map((data: any) => {
      if (sid == data.id) {
        arr = data.district;
      }
    });
    return arr;
  }

  getZoneData(sid: any, did: any) {
    let arr: any = [];
    this.stateArr.map((data: any) => {
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

  onChangeMapFor(event: any) {
    let value: any = event.target.value;
    // console.log("Map for value:", value)
    this.mapFor = value;
    if (value == "1") {
      this.route.navigate([this.schemePath + "influencer-mapping"]);
    } else if (value == "0") {
      this.route.navigate([this.schemePath + "employee-mapping"])
    }
  }

  onMapTypeTabChange(value: any) {
    if (value == "0") {
      this.mapHeader = "Location";
    } else {
      this.mapHeader = "Hierarchy";
    }
  }

  employeeStateChange(value: any) {
    this.empCityId = "";
    this.empCityArr = this.getDistrictData(this.empStateId);
    this.getEmployeeDataForMapping();
  }

  employeeDistrictChange(value: any) {
    // console.log("district::", this.empCityId);
    this.getEmployeeDataForMapping();
  }

  employeeSearchClick() {
    this.getEmployeeDataForMapping();
  }

  mapStateChange(value: any) {
    this.mapCityId = "";
    this.mapZoneId = "";
    this.mapCityArr = this.getDistrictData(this.mapStateId);
    // this.getMapArrayData(this.stateArr);

    this.resourceEmployeeList.map((rr: any) => {
      if (rr.id == this.empMapId) {
        this.mappingArray = rr.mappingData;
      }
    })
    let arr = this.mappingArray;
    arr.map((data: any) => {
      if (data.id == this.mapStateId) {
        data.isDelete = 0;
      } else {
        data.isDelete = 1;
      }
    });
    this.mappingArray = arr;
    this.resourceEmployeeList.map((rr: any) => {
      if (rr.id == this.empMapId) {
        rr.mappingData = this.mappingArray;
      }
    })
  }

  mapDistrictChange(value: any) {
    // console.log("district::", this.empCityId);
    this.mapZoneId = "";
    this.mapZoneArr = this.getZoneData(this.mapStateId, this.mapCityId);


    let arr: any = this.mappingArray;
    arr.map((map: any) => {
      if (map.id == this.mapStateId) {
        map.district.map((ds: any) => {
          if (this.mapCityId != "") {
            if (ds.id == this.mapCityId) {
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
    this.mappingArray = arr;
    this.resourceEmployeeList.map((rr: any) => {
      if (rr.id == this.empMapId) {
        rr.mappingData = this.mappingArray;
      }
    })
  }

  mapZoneChange(value: any) {
    console.log("Map Zone Id:", this.mapZoneId);
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

  changeState(event: any) {
    let arr: any = this.mappingArray;
    // console.log("State Checkbox::", event.target.checked);
    // console.log("State value::", event.target.value);

    arr.map((map: any) => {
      if (map.id == event.target.value) {
        if (event.target.checked) {
          map.isActive = 1;
        } else {
          map.isActive = 0;
        }
      }
    })
    this.mappingArray = arr;
    // console.log("Mapping Array:", arr)
  }

  changeDistrict(event: any, sid: any) {
    this.resourceEmployeeList.map((rr: any) => {
      if (rr.id == this.empMapId) {
        this.mappingArray = rr.mappingData;
      }
    })
    let arr: any = this.mappingArray;

    arr.map((map: any) => {
      if (map.id == sid) {
        map.district.map((ds: any) => {
          if (ds.id == event.target.value) {
            if (event.target.checked) {
              ds.isActive = 1;
            } else {
              ds.isActive = 0;
            }
          }
        })
      }
    })
    this.mappingArray = arr;
    // console.log("Mapping Array:", arr)
  }

  changeZone(event: any, sid: any, did: any) {
    this.resourceEmployeeList.map((rr: any) => {
      if (rr.id == this.empMapId) {
        this.mappingArray = rr.mappingData;
      }
    })
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
    this.resourceEmployeeList.map((rr: any) => {
      if (rr.id == this.empMapId) {
        rr.mappingData = this.mappingArray;
      }
    })
  }

  deleteState(id: any) {
    this.resourceEmployeeList.map((rr: any) => {
      if (rr.id == this.empMapId) {
        this.mappingArray = rr.mappingData;
      }
    })
    let arr: any = this.mappingArray;

    arr.map((map: any) => {
      if (map.id == id) {
        map.isDelete = 1;
      }
    })
    this.mappingArray = arr;
    this.resourceEmployeeList.map((rr: any) => {
      if (rr.id == this.empMapId) {
        rr.mappingData = this.mappingArray;
      }
    })

  }

  deleteDistrict(sid: any, did: any) {
    this.resourceEmployeeList.map((rr: any) => {
      if (rr.id == this.empMapId) {
        this.mappingArray = rr.mappingData;
      }
    })
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
    this.resourceEmployeeList.map((rr: any) => {
      if (rr.id == this.empMapId) {
        rr.mappingData = this.mappingArray;
      }
    })

  }



  onChangeEmployee(event: any) {
    // console.log(event.target.value);
    this.empMapId = event.target.value;
    this.mapStateId = "";
    this.mapCityId = "";
    this.getMapArrayData(this.stateArr);
    this.showDataInMap();
  }

  showDataInMap() {
    let arr = this.mappingArray;
    this.employeeList.map((data: any) => {
      if (data.userId == this.empMapId) {
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

  addEmployeInResources() {
    let arr = this.mappingArray;
    this.employeeList.map((data: any) => {
      if (data.userId == this.empMapId) {
        // if (data.stateId != null) {
        //   arr.map((st: any) => {

        //     if (st.id == data.stateId) {
        //       st.isActive = 1;
        //     }
        //     if (data.districtId != null) {
        //       st.district.map((ds: any) => {
        //         let dsArr = data.districtId.split(",");
        //         dsArr.map((dd: any) => {
        //           if (ds.id == dd) {
        //             ds.isActive = 1;
        //           }

        //           if (data.zoneId != null) {
        //             ds.zone.map((zn: any) => {
        //               let znArr = data.zoneId.split(",");
        //               znArr.map((zz: any) => {
        //                 if (zn.id == zz) {
        //                   zn.isActive = 1;
        //                 }

        //               })
        //             })
        //           }
        //         })
        //       })
        //     }
        //   })
        // }
        this.resourceEmployeeList.push({
          id: this.empMapId,
          listData: data,
          mappingData: arr
        });
      }
    });

    // console.log("Mapping Array ::", arr)

    this.mappingArray = arr;
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
    this.getEmployeeDataForMapping()
  }

  onSubmitLocationMapping() {
    this.resourceEmployeeList.map((rr: any) => {
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

      this.resourceEmpLocMapList.push(obj);
    })

    // ======================
    let reqObj = {
      clientId: this.clientId,
      assignedBy: "2",
      location: this.resourceEmpLocMapList
    }

    this.common.setEmployeeMapData(reqObj).subscribe(res => {
      console.log("Submit empoyee location map response::", res)
      if (res.error == 0 && res.respondcode == 200) {

        this.modalService.open(this.successfullMap, { size: 'sm', centered: true, animation: true });
        setTimeout(() => {
          this.getEmployeeDataForMapping();
          this.getAllLocationData();
          this.resourceEmployeeList = [];
          this.resourceEmpLocMapList = [];
          this.closeModal();
        }, 1000)
      }
    })

    // console.log("Main Location Arr::", reqObj);
  }


  // ==================== Hierarchy Tab functionalities ================================





  //get Left side employee list for hierarchy


  getHierarchyEmployeeDataForMapping() {
    let obj = {
      countryId: this.countryId,
      clientId: this.clientId,
      stateId: this.empStateId,
      districtId: this.empCityId,
      name: this.empSearch,
      designationId: this.empDesignationId
    }
    this.common.getEmployeeMapData(obj).subscribe(res => {
      // console.log("All Employee Response:", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        if (Object.keys(respObj).length > 0) {
          if (respObj.data.length > 0) {
            this.setEmployeeListForHier(respObj.data);
          } else {
            this.hempList = [];
          }
        }
      }
    })

  }

  setEmployeeListForHier(arr: any) {
    let temp: any = [];
    arr.map((data: any) => {
      temp.push({
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        designationName: data.designationName,
        profileImgUrl: data.profileImgUrl,
        isActive: 0
      })
    })
    this.hempList = temp
  }

  hempStateChange(event: any) {
    this.hempDistrictId = "";
    this.hempZoneId = "";
    this.hempDistrictArray = this.getDistrictData(this.hempStateId);

    this.getHierarchyEmployeeList();
  }

  hempDistrictChange(value: any) {
    // console.log("district::", this.empCityId);
    this.hempZoneId = "";
    this.hempZoneArr = this.getZoneData(this.hempStateId, this.hempDistrictId);

    this.getHierarchyEmployeeList();
  }

  hempZoneChange(event: any) {
    this.getHierarchyEmployeeList();

  }

  onChangeHempSearchText = () => {
    this.getHierarchyEmployeeList();
  }

  getHierarchyEmployeeList() {
    let obj = {
      countryId: this.countryId,
      clientId: this.clientId,
      stateId: this.hempStateId,
      districtId: this.hempDistrictId,
      zoneId: this.hempZoneId,
      name: this.hempSearchText,
      designationId: this.hempTypeId
    }
    this.common.getEmpParentForChild(obj).subscribe(res => {
      console.log("All Employee for hierarchy Response:", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        if (Object.keys(respObj).length > 0) {
          if (respObj.data.length > 0) {
            this.allHierarchyEmpList = respObj.data;
          } else {
            this.allHierarchyEmpList = [];
          }
        }
      }
    })

  }

  onselectHierarchyEmployee(event: any) {
    let temp: any = [];
    let brr: any = this.hempList;
    brr.map((data: any) => {
      temp.push({
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        designationName: data.designationName,
        profileImgUrl: data.profileImgUrl,
        isActive: 0
      })
    })
    this.hempList = temp
    // this.getHierarchyEmployeeDataForMapping();
    this.hempId = event.target.value;
    let arr: any = this.hempList;
    this.allHierarchyEmpList.map((data: any) => {
      if (data.userId == this.hempId) {
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

    this.hempList = arr;
    console.log("show left emp data:: ", arr)
  }

  selectHempData(event: any) {
    let arr = this.hempList;

    arr.map((data: any) => {
      if (data.userId == event.target.value) {
        if (event.target.checked) {
          data.isActive = 1;
        } else {
          data.isActive = 0;
        }
      }
    })

    this.hempList = arr;
  }

  addHierarchyEmployeeMappingData() {
    let arr: any = [];
    this.hempList.map((data: any) => {
      if (data.isActive == 1) {
        arr.push(data);
      }
    })

    this.allMappingHierarchyList = arr;
  }

  saveHierarchyMapping() {
    let arr: any = [];
    this.allMappingHierarchyList.map((data: any) => {
      arr.push(data.userId);
    });

    let reqObj = {
      addedBy: "1",
      clientId: this.clientId,
      mapData: [{
        userId: this.hempId,
        team: arr
      }]
    }

    // console.log("Mapping Hierarchy Array::", reqObj);

    this.common.setEmployeeHierarchyMapping(reqObj).subscribe(res => {
      // console.log("Submit Response::", res);
      if (res.error == 0 && res.respondcode == 200) {

        this.modalService.open(this.successfullMap, { size: 'sm', centered: true, animation: true });
        setTimeout(() => {
          this.getHierarchyEmployeeList();
          this.getHierarchyEmployeeDataForMapping();
          this.allMappingHierarchyList = [];
          this.closeModal();
        }, 1000)
      }
    })
  }



  closeModal() {
    this.modalService.dismissAll();
  }

}
