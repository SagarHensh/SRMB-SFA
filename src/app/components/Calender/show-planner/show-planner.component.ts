import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { CrmService } from 'src/app/services/crm.service';
// import { NgxBootstrapDatetimePopupModule } from 'ngx-bootstrap-datetime-popup';


@Component({
  selector: 'app-show-planner',
  templateUrl: './show-planner.component.html',
  styleUrls: ['./show-planner.component.css']
})
export class ShowPlannerComponent implements OnInit {

  constructor(private common: CommonService,
    private crm: CrmService,) { }


  authUserData: any = {};
  imageUrl: any = "";
  sfaImageUrl: any = "";
  isSelf: any = true;
  selectedEmpDeails: any = {};
  isSelected: any = false;
  allSubordinateList: any = [];
  selectSelfDetails: any = "";


  ngOnInit(): void {
    this.load();

  }

  load() {
    let data: any = this.common.getAuthUserData();
    // console.log("authUserL::", this.authUserData);
    this.authUserData = JSON.parse(data);
    this.getSelfUserDetails();
    this.imageUrl = this.crm.getImageUrl();
    this.sfaImageUrl = this.crm.getSFAImageUrl();

  }

  getSfaProfileImage(img: any) {
    return this.sfaImageUrl + img;
  }

  getSelfUserDetails() {

    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId
    }
    this.common.getpjpUserDetailsById(req).subscribe(res => {
      console.log("Self User Details::", res);
      if (res.error == 0 && res.respondcode == 200) {
        if (this.isSelf) {
          this.selectSelfDetails = res.data[0];
        }
        if (Object.keys(this.selectSelfDetails).length > 0) {
          this.selectedEmpDeails = {
            userId: this.selectSelfDetails.userId,
            name: this.selectSelfDetails.userName,
            designation: this.selectSelfDetails.designationName,
            profileImg: this.selectSelfDetails.profileImgUrl,
            // datesOfPrePlanVisit: this.selectSelfDetails.datesOfPrePlanVisit,
          }
          this.isSelected = true;
        }
      }
    })
  }

  openSubOrdinate() {
    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId,
    }
    this.common.getSubordinateUser(req).subscribe(res => {
      this.allSubordinateList = [];
      if (res.error == 0 && res.respondcode == 200) {
        // console.log('aaaaaaaaaaa')
        console.log("All suborinate List:", res.data);
        if (res.data.length > 0) {
          res.data.map((data: any) => {
            this.allSubordinateList.push({
              userId: data.userId,
              name: data.name,
              designation: data.designationName,
              profileImg: data.profileImgUrl,
              datesOfPrePlanVisit: data.datesOfPrePlanVisit,
              allPrePlanVisit: data.allPrePlanVisit
            })
          })
        }
      }
    })
  }


  userTypeSelect(event: any) {
    // console.log(event.target.checked)
    this.isSelf = event.target.checked
    if (this.isSelf) {

      this.openSubOrdinate()
    } else {

      this.getSelfUserDetails()
    }
  }

  onSubmit() {
    // alert("submit button works")
    // console.log('submit button works')
  }


}
