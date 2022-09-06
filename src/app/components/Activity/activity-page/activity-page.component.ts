import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-page',
  templateUrl: './activity-page.component.html',
  styleUrls: ['./activity-page.component.css']
})
export class ActivityPageComponent implements OnInit {

  constructor() { }

  images: any = ["assets/images/activity-page-icon1.png", "assets/images/activity-page-icon2.png", "assets/images/activity-page-icon3.png"];

  ngOnInit(): void {
  }

}
