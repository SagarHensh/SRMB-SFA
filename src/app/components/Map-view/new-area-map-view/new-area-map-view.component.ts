import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-area-map-view',
  templateUrl: './new-area-map-view.component.html',
  styleUrls: ['./new-area-map-view.component.css']
})
export class NewAreaMapViewComponent implements OnInit {

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
    scaledSize: {height: 50, width: 40}
  }



  markers: any = [
    {
      lat: 22.5448,
      lng: 88.3426,
      label: 'Victoria',
      draggable: false
    },
    {
      lat: 22.5653,
      lng: 88.3519,
      label: 'B',
      draggable: false
    },
    {
      lat: 22.5728,
      lng: 88.3445,
      label: 'C',
      draggable: false
    },
    {
      lat: 22.5553,
      lng: 88.3312,
      label: 'D',
      draggable: false
    }
  ];

  polyline: any ;
  polylines : any;

  maxSpeed = 40;

  // ngOnInit(): void {
  //   this.getDirection();
  // }



  mapReady(map : any) {
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
            latitude:  22.5448,
            longitude: 88.3426,
            speed: 50
        },
         {
            latitude:  22.5653,
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
            latitude:  22.5448,
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

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
    this.infoLabel = label;
  }

  mapClicked($event: MouseEvent) {
  }


  private rebuildPolylines() {
    var polylines:any = [];
    var i = 0;
    var newPolyline:any = { path: [], color: 'red' };
    for (let point of this.polyline) {
      console.log(point);
      // let aa = point;
      newPolyline.path.push(point);
      const speedChanged:any = this.polyline[i + 1] 
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
