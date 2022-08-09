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

  allContactTypeList: any = [
    {
      "contactId": 9,
      "firstName": "Ghosh",
      "lastName": "Hardware",
      "profileImage" : "",
      "contactTypeName": "Distributor"
    },
    {
      "contactId": 10,
      "firstName": "Kamal",
      "lastName": "Hardware",
      "contactTypeName": "Distributor"
    },
    {
      "contactId": 11,
      "firstName": "Biswanath",
      "lastName": "Steel",
      "contactTypeName": "Distributor"
    }
  ];

  allInfluencerList: any = [
    {
      "userId": 7,
      "firstName": "sumit",
      "lastName": "james",
      "countryId": null,
      "countryName": null,
      "stateId": null,
      "stateName": null,
      "districtId": null,
      "cityName": null,
      "zoneId": null,
      "zoneName": null,
      "designationName": "Field Sales Executive"
    },
    {
      "userId": 12,
      "firstName": "Saroj",
      "lastName": "Kumar",
      "countryId": null,
      "countryName": null,
      "stateId": null,
      "stateName": null,
      "districtId": null,
      "cityName": null,
      "zoneId": null,
      "zoneName": null,
      "designationName": "HR"
    },
    {
      "userId": 14,
      "firstName": "Sourav",
      "lastName": "Debnath",
      "countryId": null,
      "countryName": null,
      "stateId": null,
      "stateName": null,
      "districtId": null,
      "cityName": null,
      "zoneId": null,
      "zoneName": null,
      "designationName": "Project Manager"
    },
    {
      "userId": 15,
      "firstName": "Debaditta",
      "lastName": "Sarkar",
      "countryId": "1",
      "countryName": "India",
      "stateId": "41",
      "stateName": "West Bengal",
      "districtId": "827,829",
      "cityName": "Howrah,Kolkata",
      "zoneId": "1,2,3,5,7,9",
      "zoneName": "Bhawanipur,Garia,Mandirtola,North Zone,Saltlake,Santragachi",
      "designationName": "Automation Tester"
    }
  ]

  allDealerDummyList: any = [
    {
      "userId": 7,
      "firstName": "sumit",
      "lastName": "james",
      "countryId": null,
      "countryName": null,
      "stateId": null,
      "stateName": null,
      "districtId": null,
      "cityName": null,
      "zoneId": null,
      "zoneName": null,
      "designationName": "Field Sales Executive",
      "empCount": 3,
      "sellerCount": 0,
      "team": [
        12,
        14,
        15
      ]
    },
    {
      "userId": 12,
      "firstName": "Saroj",
      "lastName": "Kumar",
      "countryId": null,
      "countryName": null,
      "stateId": null,
      "stateName": null,
      "districtId": null,
      "cityName": null,
      "zoneId": null,
      "zoneName": null,
      "designationName": "HR",
      "empCount": 3,
      "sellerCount": 0,
      "team": [
        7,
        14,
        15
      ]
    },
    {
      "userId": 14,
      "firstName": "Sourav",
      "lastName": "Debnath",
      "countryId": null,
      "countryName": null,
      "stateId": null,
      "stateName": null,
      "districtId": null,
      "cityName": null,
      "zoneId": null,
      "zoneName": null,
      "designationName": "Project Manager",
      "empCount": 2,
      "sellerCount": 0,
      "team": [
        12,
        15
      ]
    },
    {
      "userId": 15,
      "firstName": "Debaditta",
      "lastName": "Sarkar",
      "countryId": "1",
      "countryName": "India",
      "stateId": "41",
      "stateName": "West Bengal",
      "districtId": "827,829",
      "cityName": "Howrah,Kolkata",
      "zoneId": "1,2,3,5,7,9",
      "zoneName": "Bhawanipur,Garia,Mandirtola,North Zone,Saltlake,Santragachi",
      "designationName": "Automation Tester",
      "empCount": 0,
      "sellerCount": 0,
      "team": []
    }
  ];

  allPaginationDropdown = [{
    "label": "50",
    "value": "50"
  }, {
    "label": "100",
    "value": "100"
  }, {
    "label": "150",
    "value": "150"
  }, {
    "label": "200",
    "value": "200"
  }]

  selectedDate: any = "";
  selectedDateString: any = "";

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

  getAllContactTypeList() {
    return this.allContactTypeList;
  }

  getAllInfluencerList() {
    return this.allInfluencerList;
  }

  getAllDealerList() {
    return this.allDealerDummyList;
  }

  getPjpSelectedDateDetails() {
    let data = {
      date: this.selectedDate,
      dateString: this.selectedDateString
    }

    return data;
  }

  getPaginationLimitList() {
    return this.allPaginationDropdown;
  }

  getDefaultPaginationLimit(){
    const limit = "50";
    return limit;
  }


}
