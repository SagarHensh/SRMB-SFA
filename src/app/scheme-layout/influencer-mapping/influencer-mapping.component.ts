import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-influencer-mapping',
  templateUrl: './influencer-mapping.component.html',
  styleUrls: ['./influencer-mapping.component.css']
})
export class InfluencerMappingComponent implements OnInit {

  constructor(
    private route: Router,
    private common: CommonService
    ) { }

    schemePath: any = "";
    mapFor: any = "0";
    mapHeader: any = "";
    employeeMapType: any = "";

  ngOnInit(): void {
    this.schemePath = this.common.getLayoutSchemePath();
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

}
