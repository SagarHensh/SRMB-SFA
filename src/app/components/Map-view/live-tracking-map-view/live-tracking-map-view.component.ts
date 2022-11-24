import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { employee_data } from 'src/app/dummyData';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-live-tracking-map-view',
  templateUrl: './live-tracking-map-view.component.html',
  styleUrls: ['./live-tracking-map-view.component.css']
})

export class LiveTrackingMapViewComponent implements OnInit {

  constructor(private common: CommonService) { }

  @Output() newItemEvent = new EventEmitter<any>();
  @Output() sideDataEvent = new EventEmitter<any>();
  clientId: any = "";
  authUserData: any;
  zoom: number = 20;
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

  maxSpeed = 40;
  total: any = 0;
  absent: any = 0;
  late: any = 0;
  present: any = 0;
  leave: any = 0;
  allEmployee: any = [];

  @Input() filterData: any;
  filter: any = {
    state: "",
    type: "",
    district: "",
    zone: "",
    rating: ""
  };


  ngOnChanges(changes: SimpleChanges) {
    // console.log("Hello ChangesL::", changes)
    let data: any = changes;
    let filObj: any = {
      state: data.filterData.currentValue.state == '' ? 0 : Number(data.filterData.currentValue.state),
      type: data.filterData.currentValue.type == '' ? 0 : Number(data.filterData.currentValue.type),
      district: data.filterData.currentValue.district == '' ? 0 : Number(data.filterData.currentValue.district),
      zone: data.filterData.currentValue.zone == '' ? 0 : Number(data.filterData.currentValue.zone),
      rating: data.filterData.currentValue.rating == '' ? 0 : Number(data.filterData.currentValue.rating)
    }
    console.log("Final change data:", filObj);
    this.filter = filObj;
    // this.getEmpployeeList(filObj);
    this.getLiveTrackingEmployeeData();

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

    let data: any = this.common.getAuthUserData();
    this.authUserData = JSON.parse(data);
    if (Object.keys(data).length > 0) {
      this.clientId = this.authUserData.clientId;
    }
    this.getLiveTrackingEmployeeData();
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
      // console.log(point);
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
    // console.log(polylines);
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

  getLiveTrackingEmployeeData() {
    let req = {
      clientId: this.authUserData.clientId,
      stateId: this.filter.state,
      districtId: this.filter.district,
      zoneId: this.filter.zone,
      designationId: this.filter.type,
      rating: this.filter.rating
    }
    this.common.getUserLocationMapping(req).subscribe(res => {
      // console.log("Response Employee Mapp Data::", res);
      if (res.error == 0 && res.respondcode == 200) {
        let respObj = res.data;
        if (Object.keys(respObj).length > 0) {
          if (respObj.data.length > 0) {
            let arr: any = [];
            respObj.data.map((item: any) => {

              arr.push({
                id: item.userId,
                name: item.firstName + " " + item.lastName,
                phone: item.phone,
                email: item.email,
                zone_id: item.zoneId,
                district_id: item.districtId,
                state_id: item.stateId,
                lat: item.lat,
                lng: item.lng,
                emp_type_id: item.designationId,
                isPresent: item.isPresent,
                isLate: item.isLate,
                onLeave: item.onLeave
              })
            });
            this.allEmployee = arr;
            this.markers = arr;
            this.getEmpployeeList(this.filterData)
          } else {
            this.allEmployee = [];
            this.markers = [];
            this.getEmpployeeList(this.filterData)
          }
        }
      }
    })

    // this.markers = employee_data;

  }


  getEmpployeeList(filter: any) {
    let state: any = filter.state == '' ? 0 : Number(filter.state);
    let type: any = filter.type == '' ? 0 : Number(filter.type);
    let district: any = filter.district == '' ? 0 : Number(filter.district);
    let zone: any = filter.zone == '' ? 0 : Number(filter.zone);
    let rating: any = filter.rating == '' ? 0 : Number(filter.rating);

    let empList: any = [];
    let tEmpList = [];
    let multiplier = 1;
    let total = 0,
      present = 0,
      absent = 0,
      late = 0,
      leave = 0;
    let resp: any = {};
    let EMP_LIST: any = this.allEmployee;
    // if (type != 0) {
    //   for (let i = 0; i < EMP_LIST.length; i++) {
    //     console.log(type, EMP_LIST[i].emp_type_id);
    //     if (type == EMP_LIST[i].emp_type_id) {
    //       tEmpList.push(EMP_LIST[i]);
    //     }
    //   }
    // } else {
    //   tEmpList = EMP_LIST;
    // }
    // empList = tEmpList;
    empList = EMP_LIST;
    // console.log("All Emp Listr Prev::", empList)
    tEmpList = [];
    if (state != 0) {
      for (let i = 0; i < empList.length; i++) {
        if (state == empList[i].state_id) {
          tEmpList.push(empList[i]);
        }
      }
    } else {
      tEmpList = empList;
    }
    empList = tEmpList;
    tEmpList = [];
    if (district != 0) {
      for (let i = 0; i < empList.length; i++) {
        if (district == empList[i].district_id) {
          tEmpList.push(empList[i]);
        }
      }
    } else {
      tEmpList = empList;
    }
    empList = tEmpList;
    tEmpList = [];
    if (zone != 0) {
      for (let i = 0; i < empList.length; i++) {
        if (zone == empList[i].zone_id) {
          tEmpList.push(empList[i]);
        }
      }
    } else {
      tEmpList = empList;
    }
    empList = tEmpList;
    // empList = this.markers;
    // console.log("Total Employee After Filter:: ", empList)
    tEmpList = [];
    total = empList.length;
    let showEmpArr = [];
    for (let i = 0; i < empList.length; i++) {
      if (empList[i].isPresent === 1) {
        present++;
        showEmpArr.push(empList[i]);
        if (empList[i].isLate === 1) {
          late++;
          showEmpArr.push(empList[i]);
        }
      } else if (empList[i].onLeave === 1) {
        leave++;
      } else {
        absent++;
      }
    }
    let calAbsent = absent * multiplier;
    // console.log("calAbsent:", calAbsent)
    let abst = calAbsent == 0 ? 0 : calAbsent;
    // let lev = calAbsent == 0 ? 0 : calAbsent;

    this.total = total * multiplier;
    this.absent = abst;
    this.late = late * multiplier;
    this.present = this.total - calAbsent - leave;
    this.leave = leave;
    // this.markers = empList;
    this.markers = showEmpArr;

    // console.log("EmpList::", this.markers)

    let obj = {
      total: this.total,
      present: this.present,
      absent: this.absent,
      leave: this.leave,
      late: this.late
    }

    // console.log("get Data obj::", obj);

    this.sideDataEvent.emit(obj);
  }
}
