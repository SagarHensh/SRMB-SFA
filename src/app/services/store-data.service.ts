import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService {

  constructor(private common: CommonService) { }

  masterType: any;
  allState: any = [];
  stateId: any = 1;
  allDistrictType: any = [];

  addMasterType(data: any) {
    this.masterType = data;
  }

  clearMasterType() {
    this.masterType = [];
  }

  getMasterType() {
    return this.masterType;
  }

  async getAllState() {
    let obj = {};
    let allState = [];
    this.common.getAllStates(obj).subscribe(res => {
      // console.log("All Satet ResPonse::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (res.data.stateList.length > 0) {
          allState = res.data.stateList;
        } else {
          allState = [];
        }
        console.log("all state from store:", allState)
        return allState;
      }
    })
  }

  getAllDistrict(state :any) {
    
    let obj = {
      stateId: state
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
}
