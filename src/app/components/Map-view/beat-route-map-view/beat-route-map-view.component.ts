import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beat-route-map-view',
  templateUrl: './beat-route-map-view.component.html',
  styleUrls: ['./beat-route-map-view.component.css']
})
export class BeatRouteMapViewComponent implements OnInit {

  constructor() { }
  zoom: number = 30;
  lat: any = 22.5448;
  lng: any = 88.3426;
  public origin: any;
  public destination: any;
  infoLabel: any = "";

  latitude: any;
  longitude: any;

  icon = { 
    url: 'assets/images/locn-md-icon.png',
    // url: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
     
    scaledSize: {height: 50, width: 40}
  }



  markers: any = [
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
    {
      id: 5,
      name: "M.K. Traders",
      lat: 22.4941065,
      lng: 88.3711498,
      type: "Dealer",
      isNew: 1,
    },
    {
      id: 5,
      name: "M.K. Traders",
      lat: 22.4988822,
      lng: 88.3692183,
      type: "Dealer",
      isNew: 0,
    },
    {
      id: 6,
      name: "Biswajit Saha",
      lat: 22.5080948,
      lng: 88.3556327,
      type: "Mason",
      isNew: 0,
    },
    {
      id: 7,
      name: "Maa Kali H/W",
      lat: 22.5131875,
      lng: 88.3603685,
      type: "Sub Dealer",
      isNew: 1,
    },
    {
      id: 8,
      name: "Maa Kali H/W",
      lat: 22.5184938,
      lng: 88.3711498,
      type: "Sub Dealer",
      isNew: 0,
    },
    {
      id: 9,
      name: "Maa Kali H/W",
      lat: 22.5139322,
      lng: 88.3911408,
      type: "Sub Dealer",
      isNew: 0,
    },
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
    {
      id: 12,
      name: "Radha Stores",
      lat: 22.5401381,
      lng: 88.3938624,
      type: "Distributor",
      isNew: 0,
    },
    {
      id: 13,
      name: "Srinjay Traders",
      lat: 22.557919,
      lng: 88.4070109,
      type: "Distributor",
      isNew: 1,
    },
    {
      id: 14,
      name: "Tirupati Iron Stores",
      lat: 22.5710531,
      lng: 88.4184056,
      type: "Distributor",
      isNew: 0,
    },
    {
      id: 15,
      name: "Asoka Ent",
      lat: 22.5729745,
      lng: 88.4319967,
      type: "Sub Distributor",
      isNew: 0,
    },
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
    {
      id: 19,
      name: "Sonai Dhar",
      lat: 22.5690538,
      lng: 88.4068503,
      type: "IFB",
      isNew: 1,
    },
    {
      id: 20,
      name: "Swapan Modak",
      lat: 22.5690538,
      lng: 88.4068503,
      type: "Mason",
      isNew: 0,
    },
    {
      id: 21,
      name: "Parimal Das",
      lat: 22.5925748,
      lng: 88.3888748,
      type: "Mason",
      isNew: 1,
    },
    {
      id: 22,
      name: "Priyabrata Samanta",
      lat: 22.6210587,
      lng: 88.3908469,
      type: "IFB",
      isNew: 0,
    },
    {
      id: 23,
      name: "Kamran Sk",
      lat: 22.5979665,
      lng: 88.3684575,
      type: "Mason",
      isNew: 0,
    },
    {
      id: 24,
      name: "Anadi Basak",
      lat: 22.5202434,
      lng: 88.3376986,
      type: "Mason",
      isNew: 0,
    },
  ];

  polyline: any ;
  polylines : any;

  

  maxSpeed = 40;

  uvPolyLine : any ;

  // ngOnInit(): void {
  //   this.getDirection();
  // }



  mapReady(map : any) {
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
  
  ngOnInit() {
    //set google maps defaults
    this.maxSpeed = 40;
    this.latitude = 22.5448;
    this.longitude = 88.3426;


    this.polyline  = [
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
      {
        id: 5,
        name: "M.K. Traders",
        lat: 22.4941065,
        lng: 88.3711498,
        type: "Dealer",
        isNew: 1,
      },
      {
        id: 5,
        name: "M.K. Traders",
        lat: 22.4988822,
        lng: 88.3692183,
        type: "Dealer",
        isNew: 0,
      },
      {
        id: 6,
        name: "Biswajit Saha",
        lat: 22.5080948,
        lng: 88.3556327,
        type: "Mason",
        isNew: 0,
      },
      {
        id: 7,
        name: "Maa Kali H/W",
        lat: 22.5131875,
        lng: 88.3603685,
        type: "Sub Dealer",
        isNew: 1,
      },
      {
        id: 8,
        name: "Maa Kali H/W",
        lat: 22.5184938,
        lng: 88.3711498,
        type: "Sub Dealer",
        isNew: 0,
      },
      {
        id: 9,
        name: "Maa Kali H/W",
        lat: 22.5139322,
        lng: 88.3911408,
        type: "Sub Dealer",
        isNew: 0,
      },
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
      {
        id: 12,
        name: "Radha Stores",
        lat: 22.5401381,
        lng: 88.3938624,
        type: "Distributor",
        isNew: 0,
      },
      {
        id: 13,
        name: "Srinjay Traders",
        lat: 22.557919,
        lng: 88.4070109,
        type: "Distributor",
        isNew: 1,
      },
      {
        id: 14,
        name: "Tirupati Iron Stores",
        lat: 22.5710531,
        lng: 88.4184056,
        type: "Distributor",
        isNew: 0,
      },
      {
        id: 15,
        name: "Asoka Ent",
        lat: 22.5729745,
        lng: 88.4319967,
        type: "Sub Distributor",
        isNew: 0,
      }
    ];
    this.polylines = this.rebuildPolylines();

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
      {
        id: 19,
        name: "Sonai Dhar",
        lat: 22.5690538,
        lng: 88.4068503,
        type: "IFB",
        isNew: 1,
      },
      {
        id: 20,
        name: "Swapan Modak",
        lat: 22.5690538,
        lng: 88.4068503,
        type: "Mason",
        isNew: 0,
      },
      {
        id: 21,
        name: "Parimal Das",
        lat: 22.5925748,
        lng: 88.3888748,
        type: "Mason",
        isNew: 1,
      },
      {
        id: 22,
        name: "Priyabrata Samanta",
        lat: 22.6210587,
        lng: 88.3908469,
        type: "IFB",
        isNew: 0,
      },
      {
        id: 23,
        name: "Kamran Sk",
        lat: 22.5979665,
        lng: 88.3684575,
        type: "Mason",
        isNew: 0,
      },
      {
        id: 24,
        name: "Anadi Basak",
        lat: 22.5202434,
        lng: 88.3376986,
        type: "Mason",
        isNew: 0,
      },
    ]

    this.uvPolyLine = this.rebuildPolylinesUV();

  
 
    
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

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
    this.infoLabel = label;
  }

  mapClicked($event: MouseEvent) {
  }


  private rebuildPolylines() {
    var polylines:any = [];
    var i = 0;
    var newPolyline:any = { path: [], color: '#FF0000' };
    for (let point of this.polyline) {
      console.log(point);
      // let aa = point;
      newPolyline.path.push(point);
      const speedChanged:any = this.polyline[i + 1] 
      // && (point.speed < this.maxSpeed && this.polyline[i + 1].speed < this.maxSpeed) || (point.speed > this.maxSpeed && this.polyline[i + 1].speed > this.maxSpeed)
      // if (point.speed > this.maxSpeed) {
        newPolyline.color = '#FF0000';
      // }
      // console.log("speed Change::", speedChanged)
      if (speedChanged) {
        newPolyline.path.push(this.polyline[i + 1]);
        polylines.push(newPolyline);
        newPolyline = { path: [], color: '#FF0000' };
      }
      i++;
    }
    console.log(polylines);
    return polylines;

  }
  private rebuildPolylinesUV() {
    var polylines:any = [];
    var i = 0;
    var newPolyline:any = { path: [], color: '#5DAC23' };
    for (let point of this.uvPolyLine) {
      console.log(point);
      // let aa = point;
      newPolyline.path.push(point);
      const speedChanged:any = this.uvPolyLine[i + 1] 
      // && (point.speed < this.maxSpeed && this.polyline[i + 1].speed < this.maxSpeed) || (point.speed > this.maxSpeed && this.polyline[i + 1].speed > this.maxSpeed)
      // if (point.speed > this.maxSpeed) {
        newPolyline.color = '#5DAC23';
      // }
      // console.log("speed Change::", speedChanged)
      if (speedChanged) {
        newPolyline.path.push(this.uvPolyLine[i + 1]);
        polylines.push(newPolyline);
        newPolyline = { path: [], color: '#5DAC23' };
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
