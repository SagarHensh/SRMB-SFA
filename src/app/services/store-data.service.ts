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
  allEmployeeList: any = [
    {
      userId: "1",
      name: "Bhuban Goswami",
      designation: "Project Manager",
      profileImg: "",
      datesOfPrePlanVisit: "4",
      allPrePlanVisit: [
        {
          id: "1",
          date: "2022-07-29",
          visitorName: "Laxmi Hardware",
          state: "West Bengal",
          district: "Kolkata",
          zone: "Zone 3",
          task: "Payment followup",
          description: "I will visit for a final price negotiation"
        },
        {
          id: "2",
          date: "2022-07-30",
          visitorName: "Maa Tara Hardware",
          state: "West Bengal",
          district: "Howrah",
          zone: "Bally",
          task: "Stock View",
          description: "I will visit for review stocks"
        }
      ]
    },
    {
      userId: "2",
      name: "Abhisek Sen",
      designation: "Marketing Executive",
      profileImg: "",
      datesOfPrePlanVisit: "2",
      allPrePlanVisit: [
        {
          id: "3",
          date: "2022-07-29",
          visitorName: "Laxmi Hardware",
          state: "West Bengal",
          district: "Kolkata",
          zone: "Zone 3",
          task: "Payment followup",
          description: "I will visit for a final price negotiation"
        },
        {
          id: "4",
          date: "2022-07-30",
          visitorName: "Maa Tara Hardware",
          state: "West Bengal",
          district: "Howrah",
          zone: "Bally",
          task: "Stock View",
          description: "I will visit for review stocks"
        }
      ]
    }
  ];

  allContactTypeList : any = [
    {
        "contactId": 9,
        "firstName": "Ghosh",
        "lastName": "Hardware",
        "contactTypeName": "Distributor"
    },
    {
        "contactId": 10,
        "firstName": "Kamal",
        "lastName": "Hardware",
        "contactTypeName": "Distributor"
    },
    {
        "contactId":11,
        "firstName": "Biswanath",
        "lastName": "Steel",
        "contactTypeName": "Distributor"
    }
  ]

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

  getAllDistrict(state: any) {

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

  getAllEmployeeList() {
    return this.allEmployeeList;
  }

  getAllContactTypeList(){
    return this.allContactTypeList;
  }


}
