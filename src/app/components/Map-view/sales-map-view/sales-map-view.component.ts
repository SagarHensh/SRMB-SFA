import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sales-map-view',
  templateUrl: './sales-map-view.component.html',
  styleUrls: ['./sales-map-view.component.css']
})
export class SalesMapViewComponent implements OnInit {

  constructor(
    private common: CommonService
  ) { }

  authUserData: any;

  @Output() salesItemEvent = new EventEmitter<any>();
  @Input() btnData: any;
  @Input() filterData: any;
  @Input() salesMarkerData: any = {
    opMrkr: [],
    ldMrkr: [],
    enMrkr: [],
    clMrkr: []
  };
  zoom: number = 30;
  lat: any = 22.5448;
  lng: any = 88.3426;
  public origin: any;
  public destination: any;
  infoLabel: any = "";
  infoData: any = '';

  latitude: any;
  longitude: any;

  icon = {
    url: 'assets/images/locn-md-icon.png',
    scaledSize: { height: 50, width: 40 }
  }



  markers: any = [];

  polyline: any;
  polylines: any;

  opportunityMarker: any = [{
    lat: "",
    lng: ""
  }];
  leadMarker: any = [{
    lat: "",
    lng: ""
  }];
  enquiryMarker: any = [{
    lat: "",
    lng: ""
  }];
  closedMarker: any = [{
    lat: "",
    lng: ""
  }];


  icongreen = {
    url: 'assets/images/loc-icn2.png',
    scaledSize: { height: 40, width: 30 }
  }
  iconRed = {
    url: 'assets/images/loc-icn1.png',
    scaledSize: { height: 40, width: 30 }
  }
  iconBlue = {
    url: 'assets/images/loc-icn3.png',
    scaledSize: { height: 40, width: 30 }
  }
  iconYlw = {
    url: 'assets/images/loc-icn4.png',
    scaledSize: { height: 40, width: 30 }
  }

  btnFlag: any = {
    isLead: true,
    isOpportunity: true,
    isEnquiry: true,
    isClosed: true
  };

  filter: any = {
    state: "",
    district: "",
    zone: ""
  };


  ngOnChanges(changes: SimpleChanges) {
    // console.log("Sales Changes:", changes)
    let data: any = changes;
    // console.log("Filter Data:", data.filterData.currentValue);
    if (data.salesMarkerData != undefined) {
      // console.log("Final Sales Changes:", data.salesMarkerData);
      this.opportunityMarker = data.salesMarkerData.currentValue.opMrkr;
      this.leadMarker = data.salesMarkerData.currentValue.ldMrkr;
      this.enquiryMarker = data.salesMarkerData.currentValue.enMrkr;
      this.closedMarker = data.salesMarkerData.currentValue.clMrkr;

      // console.log("opMarker", this.opportunityMarker);
      if (data.salesMarkerData.currentValue.btnData != undefined) {
        this.btnFlag = data.salesMarkerData.currentValue.btnData;
      }
    }

    // if (data.filterData != undefined) {
    //   console.log("Filter Data:", data.filterData)
    //   this.filter = data.filterData.currentValue;
    //   console.log("Changes in filter:", this.filter);
    //   this.getSalesMapData();
    // }



  }

  // getSalesMapData() {
  //   let req = {
  //     clientId: this.authUserData.clientId,
  //     userId: this.authUserData.userId,
  //     stateId: this.filter.state,
  //     districtId: this.filter.district,
  //     zoneId: this.filter.zone
  //   }

  //   this.common.getCrmSalesMap(req).subscribe((res: any) => {
  //     console.log("Sales Map Data::", res)
  //     if (res.respondcode == 200) {

  //     }
  //   })
  // }



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

  ngOnInit() {
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    //set google maps defaults
    // this.latitude = 22.5448;
    // this.longitude = 88.3426;


    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {

    // });
  }



  ngAfterViewInit() {
  }

  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };

    // Location within a string
    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }

  clickedMarker(val: any) {
    this.salesItemEvent.emit(val);
  }

  onMouseOver(infoWindow: any, val: any) {
    infoWindow.open();
    console.log("val of marker::", val)
    let obj: any = {
      name: val.name,
      type: val.type,
      phone : val.phone,
      contactType : val.contactType
    }
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

  getStatus(id: any) {
    if (id == 2 && this.btnFlag.isOpportunity == true) {

    }
  }

}
