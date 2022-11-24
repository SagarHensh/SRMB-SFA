import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SHOP_LIST } from 'src/app/dummyData';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-beat-route-map-view',
  templateUrl: './beat-route-map-view.component.html',
  styleUrls: ['./beat-route-map-view.component.css']
})
export class BeatRouteMapViewComponent implements OnInit {

  constructor(private common: CommonService) { }

  authUserData: any;
  @Input() selectedEmployeeData: any = {
    lat: 22.5448,
    lng: 88.3426
  };
  @Input() filterData: any;
  @Output() sideDataEvent = new EventEmitter<any>();
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
  infoData: any = {
    name: "",
    email: "",
    phone: "",
    userId: ""
  };
  filter: any = {
    designation: "",
    empId: "",
    date: this.getCurrentDate()
  }
  infoDataVisit: any = {}
  infoVisitModal: any = {
    name: "",
    type: ""
  };






  ngOnChanges(changes: SimpleChanges) {
    console.log("Changes in ngonchange methoD beat map::", changes)
    let data: any = changes;
    console.log("Final change data:", data.selectedEmployeeData, data.filterData);
    if (data.selectedEmployeeData != undefined) {
      this.selectedEmployeeData = data.selectedEmployeeData.currentValue;
      this.isSetEmployee = true;
      this.filter.empId = this.selectedEmployeeData.id;
      this.filter.designation = this.selectedEmployeeData.emp_type_id;
    }
    if (data.filterData != undefined) {
      this.filter = data.filterData.currentValue;
      console.log("Changes in filter:", this.filter);
    }
    this.getBeatRouteVisitMapData();

  }



  getCurrentDate() {
    var dt = new Date();
    var day: any = dt.getDate();
    day = day > 9 ? day : "0" + day;
    var month: any = dt.getMonth() + 1;
    month = month > 9 ? month : "0" + month;
    var year: any = dt.getFullYear();
    // var finalDate = day + "-" + month + "-" + year;
    var finalDate = year + "-" + month + "-" + day;
    return finalDate;
  }

  mapReady(map: any) {
    map.setOptions({
      // zoomControl: 'true',
      // zoomControlOptions: {
      //   position: google.maps.ControlPosition.TOP_RIGHT,
      // },
      streetViewControl: true,

    });
    map.addListener('dragend', () => {
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
    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    // this.getBeatRouteVisitMapData();
    //set google maps defaults
    this.maxSpeed = 40;
    this.latitude = 22.5448;
    this.longitude = 88.3426;
    this.polyline = [
      // {
      //   id: 1,
      //   name: "Baba Loknath H/W",
      //   lat: 22.4853113,
      //   lng: 88.3657988,
      //   type: "Dealer",
      //   isNew: 0,
      // },
      // {
      //   id: 2,
      //   name: "Paul H/W",
      //   lat: 22.4852909,
      //   lng: 88.3661579,
      //   type: "Dealer",
      //   isNew: 0,
      // },
      // {
      //   id: 3,
      //   name: "Garg Enterprise",
      //   lat: 22.4830579,
      //   lng: 88.3728338,
      //   type: "Dealer",
      //   isNew: 0,
      // },
      // {
      //   id: 4,
      //   name: "Gobinda H/W",
      //   lat: 22.4957897,
      //   lng: 88.3729642,
      //   type: "Dealer",
      //   isNew: 0,
      // },
    ];
    this.uvPolyLine = [
      // {
      //   id: 16,
      //   name: "Built Tech",
      //   lat: 22.5747463,
      //   lng: 88.4315684,
      //   type: "Sub Distributor",
      //   isNew: 0,
      // },
      // {
      //   id: 17,
      //   name: "GL Cement Hardware",
      //   lat: 22.5831991,
      //   lng: 88.4370691,
      //   type: "Sub Distributor",
      //   isNew: 1,
      // },
      // {
      //   id: 18,
      //   name: "Hardware Corner",
      //   lat: 22.5829666,
      //   lng: 88.4175377,
      //   type: "Sub Distributor",
      //   isNew: 0,
      // },
    ]
    // this.pvMarkers = this.polyline;
    // this.upvMarkers = this.uvPolyLine;

    this.nvMarkers = [

      // {
      //   id: 10,
      //   name: "Maa Tara Enterprise",
      //   lat: 22.5135084,
      //   lng: 88.40069,
      //   type: "Sub Dealer",
      //   isNew: 1,
      // },
      // {
      //   id: 11,
      //   name: "Mithun Roy",
      //   lat: 22.5253419,
      //   lng: 88.3931309,
      //   type: "Distributor",
      //   isNew: 0,
      // }
    ]

    // this.polylines = this.rebuildPolylines();
    // this.uvPolyLine = this.rebuildPolylinesUV();
    //set current position
    // this.setCurrentPosition();
  }



  ngAfterViewInit() {
    console.log("Visit Again Beat PAge")
    this.getBeatRouteVisitMapData();
    //set google maps defaults
    this.maxSpeed = 40;
    this.latitude = 22.5448;
    this.longitude = 88.3426;
    this.isSetEmployee = true;


    this.polyline = [
      // {
      //   id: 1,
      //   name: "Baba Loknath H/W",
      //   lat: 22.4853113,
      //   lng: 88.3657988,
      //   type: "Dealer",
      //   isNew: 0,
      // },
      // {
      //   id: 2,
      //   name: "Paul H/W",
      //   lat: 22.4852909,
      //   lng: 88.3661579,
      //   type: "Dealer",
      //   isNew: 0,
      // },
      // {
      //   id: 3,
      //   name: "Garg Enterprise",
      //   lat: 22.4830579,
      //   lng: 88.3728338,
      //   type: "Dealer",
      //   isNew: 0,
      // },
      // {
      //   id: 4,
      //   name: "Gobinda H/W",
      //   lat: 22.4957897,
      //   lng: 88.3729642,
      //   type: "Dealer",
      //   isNew: 0,
      // },{
      //   id: 16,
      //   name: "Built Tech",
      //   lat: 22.5747463,
      //   lng: 88.4315684,
      //   type: "Sub Distributor",
      //   isNew: 0,
      // },
    ];

    this.uvPolyLine = [

      // {
      //   id: 16,
      //   name: "Built Tech",
      //   lat: 22.5747463,
      //   lng: 88.4315684,
      //   type: "Sub Distributor",
      //   isNew: 0,
      // },
      // {
      //   id: 17,
      //   name: "GL Cement Hardware",
      //   lat: 22.5831991,
      //   lng: 88.4370691,
      //   type: "Sub Distributor",
      //   isNew: 1,
      // },
      // {
      //   id: 18,
      //   name: "Hardware Corner",
      //   lat: 22.5829666,
      //   lng: 88.4175377,
      //   type: "Sub Distributor",
      //   isNew: 0,
      // },
    ];
    // this.pvMarkers = this.polyline;
    // this.upvMarkers = this.uvPolyLine;

    this.nvMarkers = [

      // {
      //   id: 10,
      //   name: "Maa Tara Enterprise",
      //   lat: 22.5135084,
      //   lng: 88.40069,
      //   type: "Sub Dealer",
      //   isNew: 1,
      // },
      // {
      //   id: 11,
      //   name: "Mithun Roy",
      //   lat: 22.5253419,
      //   lng: 88.3931309,
      //   type: "Distributor",
      //   isNew: 0,
      // },
    ]

    // this.polylines = this.rebuildPolylines();
    // this.uvPolyLine = this.rebuildPolylinesUV();




    //set current position
    // this.setCurrentPosition();
  }

  getBeatRouteVisitMapData() {
    if (this.filter.empId != "") {
      let req = {
        clientId: this.authUserData.clientId,
        reqUserId: this.filter.empId,
        date: this.filter.date
      }

      this.common.getVisitBeatMap(req).subscribe(response => {
        let res: any = response;
        if (res.respondcode == 200) {
          console.log("Success Beat Route Data:", res);
          let arr: any = [];
          let brr:any=[];
          if (res.data.map.length > 0) {
            res.data.map.map((mp: any) => {
              if (Number(mp.lat) != 0 && Number(mp.lng) != 0) {
                this.polyline.push({
                  id: mp.id,
                  name: mp.name,
                  lat: Number(mp.lat),
                  lng: Number(mp.lng),
                  type: mp.visitType,
                  isNew: 0
                });
              }
              if (mp.visitType == "Unplanned" && Number(mp.lat) != 0 && Number(mp.lng) != 0) {
                arr.push({
                  id: mp.id,
                  name: mp.name,
                  lat: Number(mp.lat),
                  lng: Number(mp.lng),
                  type: mp.visitType,
                  isNew: 0
                })
              }
              else if (mp.visitType == "Planned & Visited" && Number(mp.lat) != 0 && Number(mp.lng) != 0) {
                brr.push({
                  id: mp.id,
                  name: mp.name,
                  lat: Number(mp.lat),
                  lng: Number(mp.lng),
                  type: mp.visitType,
                  isNew: 0
                })
              }
            })
            console.log("Unplanned Visit Array: ", arr)
            this.upvMarkers = arr;
            this.pvMarkers = brr;
            this.polylines = this.rebuildPolylines();
            this.selectedEmployeeData = {
              userId: res.data.empData.userId,
              name: res.data.empData.firstName + " " + res.data.empData.lastName,
              phone: res.data.empData.phone,
              email: res.data.empData.email,
              lat: res.data.empData.lat,
              lng: res.data.empData.lng
            }
          }
          this.sideDataEvent.emit(res.data);
        }
      })
    }
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
    console.log("Under rebuild polyLine>>>>>", this.polyline)
    var polylines: any = [];
    var i = 0;
    var newPolyline: any = { path: [], color: '#5DAC23' };
    for (let point of this.polyline) {
      // console.log(point);
      // let aa = point;
      newPolyline.path.push(point);
      const speedChanged: any = this.polyline[i + 1]
      // && (point.speed < this.maxSpeed && this.polyline[i + 1].speed < this.maxSpeed) || (point.speed > this.maxSpeed && this.polyline[i + 1].speed > this.maxSpeed)
      if (point.type == "Unplanned") {
        newPolyline.color = '#5DAC23';
      } else {
        newPolyline.color = "red"
      }
      // console.log("speed Change::", speedChanged)
      if (speedChanged) {
        newPolyline.path.push(this.polyline[i + 1]);
        polylines.push(newPolyline);
        newPolyline = { path: [], color: '#5DAC23' };
      }
      i++;
    }
    console.log("rebuild Poly Lines",polylines);
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

  // private setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 30;
  //     });
  //   }
  // }

  ngOnDestroy() {
    this.isSetEmployee = false;
  }



  onMouseOverVisit(infoWindowVisit: any, val: any) {
    infoWindowVisit.open();
    // console.log("infoValVisit:", val)
    let obj: any = {
      name: val.name,
      type: val.type
    }
    this.infoVisitModal = obj;
  }

  onMouseOutVisit(infoWindowVisit: any, val: any) {
    infoWindowVisit.close();
  }


}
