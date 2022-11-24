import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-activity-page',
  templateUrl: './activity-page.component.html',
  styleUrls: ['./activity-page.component.css']
})
export class ActivityPageComponent implements OnInit {

  constructor(private common: CommonService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) { }

  images: any = ["assets/images/activity-page-icon1.png", "assets/images/activity-page-icon2.png", "assets/images/activity-page-icon3.png"];

  authUserData: any = [];
  createdDate = "";
  reqUserId = "";
  activityDetails: any = [];
  activityOwner = "";
  selectedEmpDeails: any = {};
  selectedPjpEmployeeDetails: any = "";
  imageUrl = this.common.imageUrl;
  subordinateLists: any = [];
  detailsInformation: boolean = true;
  @ViewChild('activityModal') activityModal: any;
  // ================ For Map===================
  zoom: number = 30;
  lat: any = 22.5448;
  lng: any = 88.3426;
  public origin: any;
  public destination: any;
  infoLabel: any = "";

  latitude: any;
  longitude: any;

  polyline: any;
  polylines: any;

  maxSpeed = 40;
  infoData: any = {
    name: '',
    type: '',
    userId: ''
  };

  icon = {
    url: 'assets/images/locn-md-icon.png',
    scaledSize: { height: 50, width: 40 }
  }

  markers: any = [];
  isSelf: any = true;
  subOrdinateId: any = "";


  ngOnInit(): void {
    var today: any = new Date().toISOString().slice(0, 10);
    this.createdDate = today;
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    this.activityOwner = this.authUserData.firstName + " " + this.authUserData.lastName;
    this.getActivityDetails();
    this.getSelfUserDetails();
    this.latitude = 22.5448;
    this.longitude = 88.3426;
  }

  getActivityDetails() {
    this.spinner.show();

    const data = {
      "clientId": this.authUserData.clientId,
      "userId": this.authUserData.userId,
      "createDate": this.createdDate,
      "reqUserId": this.isSelf ? this.authUserData.userId : this.subOrdinateId
    };
    //console.log("Request Data For activity:", data);
    this.common.getActivityDetails(data).subscribe((res: any) => {
      if (res.error == 0 && res.respondcode == 200) {
        this.activityDetails = res.data.beatData;
        // console.log("activityDetails res>>>>>", this.activityDetails);
        let mkr: any = [];
        this.activityDetails.map((data: any, i: any) => {
          mkr.push({
            id: data.id,
            title: data.title,
            description: data.description,
            latitude: data.latitude,
            longitude: data.longitude,
            eventTime: data.eventTime,
            slNo: i + 1
          })
        })
        this.markers = mkr;
        let arr: any = [];
        this.markers.map((data: any) => {
          arr.push({
            id: data.id,
            lat: Number(data.latitude),
            lng: Number(data.longitude)
          })
        })
        this.polyline = arr;
        this.polylines = this.rebuildPolylines();
        this.spinner.hide();
      }
    })
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  searchActivityByDate() {
    this.getActivityDetails();
  }

  self() {
    this.detailsInformation = true;
    this.isSelf = true;
    this.activityOwner = this.authUserData.firstName + " " + this.authUserData.lastName;
    this.getActivityDetails();
  }

  subordinateList() {
    this.detailsInformation = false;
    this.isSelf = false;
    this.getSubordinateList();
  }

  getSubordinateList() {
    const data = {
      "clientId": this.authUserData.clientId,
      "districtId": '',
      "userId": this.authUserData.userId,
    };
    this.spinner.show();
    this.common.getSubordinateUser(data).subscribe((res: any) => {
      //console.log("Subordinate Res>>>>>>>", res);
      if (res.error == 0 && res.respondcode == 200) {
        this.spinner.hide();
        this.subordinateLists = res.data;
      }
    })
  }

  getSelfUserDetails() {

    let req = {
      clientId: this.authUserData.clientId,
      userId: this.authUserData.userId
    }
    this.common.getpjpUserDetailsById(req).subscribe(res => {
      //console.log("Self User Details::", res);
      if (res.error == 0 && res.respondcode == 200) {
        let empDetail = []
        empDetail = res.data[0];
        this.selectedEmpDeails = {
          userId: empDetail.userId,
          name: empDetail.userName,
          designation: empDetail.designationName,
          profileImg: empDetail.profileImgUrl
        }
      }
    })

  }

  resetDate() {
    this.createdDate = "";
    var today: any = new Date().toISOString().slice(0, 10);
    this.createdDate = today;
    this.getActivityDetails();
  }


  dateFormat(date: any) {
    var tempDate = new Date(date);
    return tempDate.toLocaleDateString();
  }
  timeFormat(time: any) {
    var tempTime = time.split("T")[1];
    return tempTime.split(".")[0];
  }

  timeAmPm(date: any) {
    let ampm;
    let actualTime;
    let resDate = { "hour": "0", "minutes": "0", "second": "0", "ampm": "", "rawTime": "", "viewTime": "" };
    if (date) {
      const currentDate = new Date(date);
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let second = currentDate.getSeconds();
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      actualTime = hours + ":" + minutes + ' ' + ampm;
    }
    return actualTime;
  }

  openActivityMap() {

    this.modalService.open(this.activityModal, { size: 'xl', centered: true, animation: true });
  }

  // ================== Google Map Functionality ==================================


  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };
  }

  clickedMarker(label: string, index: number) {
    // console.log(`clicked the marker: ${label || index}`)
    this.infoLabel = label;
  }

  onMouseOver(infoWindow: any, val: any) {
    infoWindow.open();
    let obj: any = {
      name: val.description,
      time: this.timeAmPm(val.eventTime),
      slNo: val.slNo
    }
    // console.log("fhghg:", obj)
    this.infoData = obj;
  }

  onMouseOut(infoWindow: any, val: any) {
    infoWindow.close();
  }

  mapClicked($event: MouseEvent) {
  }


  private rebuildPolylines() {
    var polylines: any = [];
    var i = 0;
    var newPolyline: any = { path: [], color: 'red' };
    for (let point of this.polyline) {
      console.log(point);
      // let aa = point;
      newPolyline.path.push(point);
      const speedChanged: any = this.polyline[i + 1]
      // && (point.speed < this.maxSpeed && this.polyline[i + 1].speed < this.maxSpeed) || (point.speed > this.maxSpeed && this.polyline[i + 1].speed > this.maxSpeed)
      // if (point.speed > this.maxSpeed) {
      newPolyline.color = 'red';
      // }
      // console.log("speed Change::", speedChanged)
      if (speedChanged) {
        newPolyline.path.push(this.polyline[i + 1]);
        polylines.push(newPolyline);
        newPolyline = { path: [], color: 'red' };
      }
      i++;
    }
    console.log(polylines);
    return polylines;

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 30;
      });
    }
  }

  mapReady(map: any) {
    map.setOptions({
      zoomControl: 'true',
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
      },
      streetViewControl: true,

    });
    //this.loader = true;
    map.addListener('dragend', () => {
      //console.log(this.centerLatitude, this.centerLongitude)
      // do something with centerLatitude/centerLongitude
      //api call to load dynamic marker for your application
      //this.loader = false;
    });
  }

  selectSuborinateUser(data: any) {

    // console.log("Usr Details:", data);
    this.subOrdinateId = data.userId;
    this.activityOwner = data.name;
    this.getActivityDetails();
  }
}
