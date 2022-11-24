import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private router:Router,private route:Router,private common: CommonService,) { }

  ngOnInit(): void {
    if (this.checkAuthetication()) {
      let data: any = this.common.getAuthUserData();
      this.authUserData = JSON.parse(data);
      // console.log("Module permission data::", this.authUserData.moduleDetails);
      
      
      
      this.getAllNotificationList();
    }
}
  mainPath: any;  
  authUserData: any;
  totalNotificationCount: any = 0;
  allNotificationList: any = [];
  schemePath: any;
  pagesPath: any;

  notificationClick() {
    this.getAllNotificationList();
  }
  getAllNotificationList() {
    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId,
      limit: "50",
      offset: "0"
    }
    this.common.getNotificationList(req).subscribe((response: any) => {
      let res: any = response;
      // console.log(response)

      if (res.respondcode == 200) {
        this.allNotificationList = res.data.data;
        console.log( this.allNotificationList)
        this.totalNotificationCount = res.data.count;
        console.log(res.data.count)
      }
    })
  }

  checkAuthetication() {
    if (localStorage.getItem("AuthUserData") == undefined) {
      this.route.navigate([""]);
      return false;
    } else {
      return true;
    }
  }

}
