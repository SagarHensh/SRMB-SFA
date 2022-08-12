import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SHOP_LIST } from 'src/app/dummyData';

@Component({
  selector: 'app-beat-route-map-view',
  templateUrl: './beat-route-map-view.component.html',
  styleUrls: ['./beat-route-map-view.component.css']
})
export class BeatRouteMapViewComponent implements OnInit {

  constructor() { }
  @Input() selectedEmployeeData: any ={
    lat : 22.5448,
    lng : 88.3426
  };
  zoom: number = 30;
  lat: any = 22.5448;
  lng: any = 88.3426;
  public origin: any;
  public destination: any;
  infoLabel: any = "";

  latitude: any;
  longitude: any;

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



  markers: any = SHOP_LIST;

  polyline: any = [];
  polylines: any = [];



  maxSpeed = 40;

  uvPolyLine: any;
  pvMarkers: any = [];
  upvMarkers: any = [];
  nvMarkers: any = [];
  isSetEmployee: any = false;
  infoData : any={
      name: "",
      email: "",
      phone: "",
      userId: ""
    };

  




  ngOnChanges(changes: SimpleChanges) {
    console.log("Hello ChangesL::", changes)
    let data: any = changes;
    console.log("Final change data:", data.selectedEmployeeData);
    this.selectedEmployeeData = data.selectedEmployeeData.currentValue;
    this.isSetEmployee = true;

  }
  mapReady(map: any) {
    map.setOptions({
      // zoomControl: 'true',
      // zoomControlOptions: {
      //   position: google.maps.ControlPosition.TOP_RIGHT,
      // },
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

  onMouseOver(infoWindow: any, val: any) {
    infoWindow.open();
    // console.log("infoVal:", val)
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

  ngOnInit() {
    //set google maps defaults
    this.maxSpeed = 40;
    this.latitude = 22.5448;
    this.longitude = 88.3426;


    this.polyline = [
      {
        id: 1,
        name: "Baba Loknath H/W",
        lat: 22.4853113,
        lng: 88.3657988,
        type: "Dealer",
        isNew: 0,
      },
      {
        id: 2,
        name: "Paul H/W",
        lat: 22.4852909,
        lng: 88.3661579,
        type: "Dealer",
        isNew: 0,
      },
      {
        id: 3,
        name: "Garg Enterprise",
        lat: 22.4830579,
        lng: 88.3728338,
        type: "Dealer",
        isNew: 0,
      },
      {
        id: 4,
        name: "Gobinda H/W",
        lat: 22.4957897,
        lng: 88.3729642,
        type: "Dealer",
        isNew: 0,
      },
    ];

    this.uvPolyLine = [

      {
        id: 16,
        name: "Built Tech",
        lat: 22.5747463,
        lng: 88.4315684,
        type: "Sub Distributor",
        isNew: 0,
      },
      {
        id: 17,
        name: "GL Cement Hardware",
        lat: 22.5831991,
        lng: 88.4370691,
        type: "Sub Distributor",
        isNew: 1,
      },
      {
        id: 18,
        name: "Hardware Corner",
        lat: 22.5829666,
        lng: 88.4175377,
        type: "Sub Distributor",
        isNew: 0,
      },
    ]
    this.pvMarkers = this.polyline;
    this.upvMarkers = this.uvPolyLine;

    this.nvMarkers = [

      {
        id: 10,
        name: "Maa Tara Enterprise",
        lat: 22.5135084,
        lng: 88.40069,
        type: "Sub Dealer",
        isNew: 1,
      },
      {
        id: 11,
        name: "Mithun Roy",
        lat: 22.5253419,
        lng: 88.3931309,
        type: "Distributor",
        isNew: 0,
      }
    ]

    this.polylines = this.rebuildPolylines();

    this.uvPolyLine = this.rebuildPolylinesUV();




    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {

    // });
  }



  ngAfterViewInit() {
    //set google maps defaults
    this.maxSpeed = 40;
    this.latitude = 22.5448;
    this.longitude = 88.3426;
    this.isSetEmployee = true;


    this.polyline = [
      {
        id: 1,
        name: "Baba Loknath H/W",
        lat: 22.4853113,
        lng: 88.3657988,
        type: "Dealer",
        isNew: 0,
      },
      {
        id: 2,
        name: "Paul H/W",
        lat: 22.4852909,
        lng: 88.3661579,
        type: "Dealer",
        isNew: 0,
      },
      {
        id: 3,
        name: "Garg Enterprise",
        lat: 22.4830579,
        lng: 88.3728338,
        type: "Dealer",
        isNew: 0,
      },
      {
        id: 4,
        name: "Gobinda H/W",
        lat: 22.4957897,
        lng: 88.3729642,
        type: "Dealer",
        isNew: 0,
      },
    ];

    this.uvPolyLine = [

      {
        id: 16,
        name: "Built Tech",
        lat: 22.5747463,
        lng: 88.4315684,
        type: "Sub Distributor",
        isNew: 0,
      },
      {
        id: 17,
        name: "GL Cement Hardware",
        lat: 22.5831991,
        lng: 88.4370691,
        type: "Sub Distributor",
        isNew: 1,
      },
      {
        id: 18,
        name: "Hardware Corner",
        lat: 22.5829666,
        lng: 88.4175377,
        type: "Sub Distributor",
        isNew: 0,
      },
    ];
    this.pvMarkers = this.polyline;
    this.upvMarkers = this.uvPolyLine;

    this.nvMarkers = [

      {
        id: 10,
        name: "Maa Tara Enterprise",
        lat: 22.5135084,
        lng: 88.40069,
        type: "Sub Dealer",
        isNew: 1,
      },
      {
        id: 11,
        name: "Mithun Roy",
        lat: 22.5253419,
        lng: 88.3931309,
        type: "Distributor",
        isNew: 0,
      },
    ]

    this.polylines = this.rebuildPolylines();
    this.uvPolyLine = this.rebuildPolylinesUV();




    //set current position
    this.setCurrentPosition();
  }

  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };

    // Location within a string
    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }

  clickedMarker(label: string) {
    console.log(`clicked the marker: ${label}`)
    this.infoLabel = label;
  }

  mapClicked($event: MouseEvent) {
  }


  private rebuildPolylines() {
    var polylines: any = [];
    var i = 0;
    var newPolyline: any = { path: [], color: '#5DAC23' };
    for (let point of this.polyline) {
      console.log(point);
      // let aa = point;
      newPolyline.path.push(point);
      const speedChanged: any = this.polyline[i + 1]
      // && (point.speed < this.maxSpeed && this.polyline[i + 1].speed < this.maxSpeed) || (point.speed > this.maxSpeed && this.polyline[i + 1].speed > this.maxSpeed)
      // if (point.speed > this.maxSpeed) {
      newPolyline.color = '#5DAC23';
      // }
      // console.log("speed Change::", speedChanged)
      if (speedChanged) {
        newPolyline.path.push(this.polyline[i + 1]);
        polylines.push(newPolyline);
        newPolyline = { path: [], color: '#5DAC23' };
      }
      i++;
    }
    console.log(polylines);
    return polylines;

  }
  private rebuildPolylinesUV() {
    var polylines: any = [];
    var i = 0;
    var newPolyline: any = { path: [], color: '#FF0000' };
    for (let point of this.uvPolyLine) {
      console.log(point);
      // let aa = point;
      newPolyline.path.push(point);
      const speedChanged: any = this.uvPolyLine[i + 1]
      // && (point.speed < this.maxSpeed && this.polyline[i + 1].speed < this.maxSpeed) || (point.speed > this.maxSpeed && this.polyline[i + 1].speed > this.maxSpeed)
      // if (point.speed > this.maxSpeed) {
      newPolyline.color = '#FF0000';
      // }
      // console.log("speed Change::", speedChanged)
      if (speedChanged) {
        newPolyline.path.push(this.uvPolyLine[i + 1]);
        polylines.push(newPolyline);
        newPolyline = { path: [], color: '#FF0000' };
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

  ngOnDestroy(){
    this.isSetEmployee = false;
  }


}
