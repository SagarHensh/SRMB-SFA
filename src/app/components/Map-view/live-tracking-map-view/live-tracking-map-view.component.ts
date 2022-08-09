import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-live-tracking-map-view',
  templateUrl: './live-tracking-map-view.component.html',
  styleUrls: ['./live-tracking-map-view.component.css']
})
export class LiveTrackingMapViewComponent implements OnInit {

  constructor() { }

  @Output() newItemEvent = new EventEmitter<any>();
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



  markers: any = [
    {
      id: 1,
      name: "PRANAB DAS",
      phone: "9230066106",
      email: "pranab.das@srmbsteel.com",
      zone_id: 1,
      district_id: 371,
      state_id: 35,
      lat: 22.587404900000003,
      lng: 88.40787700000001,
      emp_type_id: 1,
      isPresent: 1,
      isLate: 0,
    },
    {
      id: 2,
      name: "DEBOJIT GHOSH HAZRA",
      phone: "9232353029",
      email: "debojit.hazra@srmbsteel.com",
      zone_id: 2,
      district_id: 371,
      state_id: 35,
      emp_type_id: 1,
      lat: 22.553678594641333,
      lng: 88.33806895000001,
      isPresent: 1,
      isLate: 0,
    },
    {
      id: 3,
      name: "SANJIB CHANDA",
      phone: "9230066115",
      email: "sanjib.chanda@srmbsteel.com",
      zone_id: 3,
      district_id: 371,
      state_id: 35,
      emp_type_id: 1,
      lat: 22.520037601882475,
      lng: 88.36631055,
      isPresent: 1,
      isLate: 1,
    },
    {
      id: 4,
      name: "SANJIT CHATTERJEE",
      phone: 9230066147,
      email: "sanjit.chatterjee@srmbsteel.com",
      zone_id: 4,
      district_id: 371,
      state_id: 35,
      emp_type_id: 1,
      lat: 22.6211825,
      lng: 88.3931409,
      isPresent: 1,
      isLate: 0,
    },
    {
      id: 5,
      name: "RAMENDRA BHATTACHARJEE",
      phone: 8585081393,
      email: "ramendra.bhattacharyya@srmbsteel.com",
      zone_id: 1,
      district_id: 371,
      state_id: 35,
      emp_type_id: 1,
      lat: 22.474126829557175,
      lng: 88.32392655000001,
      isPresent: 1,
      isLate: 1,
    },
    {
      id: 6,
      name: "BIVAS PAL",
      phone: 9230066102,
      email: "bivas.pal@srmbsteel.com",
      zone_id: 2,
      district_id: 371,
      state_id: 35,
      emp_type_id: 1,
      lat: 22.474126829557175,
      lng: 88.32392655000001,
      isPresent: 0,
      isLate: 0,
    },
    {
      id: 7,
      name: "DEBASISH GHOSH",
      phone: 9903943311,
      email: "bebasish.ghosh@srmbsteel.com",
      zone_id: 3,
      district_id: 371,
      state_id: 35,
      emp_type_id: 2,
      lat: 22.539049000000002,
      lng: 88.3230111,
      isPresent: 0,
      isLate: 0,
    },
    {
      id: 8,
      name: "SIDDHARTHA SEN MAJUMDER",
      phone: 9230011666,
      email: "siddhartha.senmajumdar@srmbsteel.com",
      zone_id: 4,
      district_id: 371,
      state_id: 35,
      emp_type_id: 2,
      lat: 22.605972999999988,
      lng: 88.386353,
      isPresent: 1,
      isLate: 0,
    },
    {
      id: 9,
      name: "SANTANU DUTTA",
      phone: 9230066143,
      email: "santanu.dutta@srmbsteel.com",
      zone_id: 1,
      district_id: 371,
      state_id: 35,
      lat: 22.569053800000024,
      lng: 88.40904429999999,
      emp_type_id: 2,
      isPresent: 1,
      isLate: 0,
    }
  ];

  polyline: any;
  polylines: any;

  maxSpeed = 40;

  // ngOnInit(): void {
  //   this.getDirection();
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
    //set google maps defaults
    this.maxSpeed = 40;
    this.latitude = 22.5448;
    this.longitude = 88.3426;

    this.polyline = [
      {
        latitude: 22.5448,
        longitude: 88.3426,
        speed: 50
      },
      {
        latitude: 22.5653,
        longitude: 88.3519,
        speed: 20
      },
      {
        latitude: 22.5728,
        longitude: 88.3445,
        speed: 20
      },
      {
        latitude: 22.5553,
        longitude: 88.3312,
        speed: 20
      },
      {
        latitude: 22.5448,
        longitude: 88.3426,
        speed: 20
      }
    ]
    this.polylines = this.rebuildPolylines();


    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {

    // });
  }

  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };

    // Location within a string
    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }

  clickedMarker(val: any) {
    this.newItemEvent.emit(val);
  }

  onMouseOver(infoWindow: any, val: any) {
    infoWindow.open();
    let obj: any = {
      name: val.name,
      email: val.email,
      phone: val.phone,
      userId: val.id
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
}
