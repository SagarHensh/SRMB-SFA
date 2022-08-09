import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.css']
})
export class ViewMapComponent implements OnInit {

  constructor() { }

  mainTab: any = '1';

  ngOnInit(): void {
  }

  onChangeMainTab(id: any) {
    this.mainTab = id;
    if (id == 1) {
      document.getElementById("pills-beat-tab")?.classList.remove('active');
      document.getElementById("pills-beat")?.classList.remove('active');
      document.getElementById("pills-sales-tab")?.classList.remove('active');
      document.getElementById("pills-sales")?.classList.remove('active');
      document.getElementById("pills-area-tab")?.classList.remove('active');
      document.getElementById("pills-area")?.classList.remove('active');
      document.getElementById("pills-live-tab")?.classList.add('active');
      document.getElementById("pills-live")?.classList.add('active');
    } else if (id == 2) {
      document.getElementById("pills-live-tab")?.classList.remove('active');
      document.getElementById("pills-live")?.classList.remove('active');
      document.getElementById("pills-sales-tab")?.classList.remove('active');
      document.getElementById("pills-sales")?.classList.remove('active');
      document.getElementById("pills-area-tab")?.classList.remove('active');
      document.getElementById("pills-area")?.classList.remove('active');
      document.getElementById("pills-beat-tab")?.classList.add('active');
      document.getElementById("pills-beat")?.classList.add('active');
    } else if (id == 3) {
      document.getElementById("pills-live-tab")?.classList.remove('active');
      document.getElementById("pills-live")?.classList.remove('active');
      document.getElementById("pills-beat-tab")?.classList.remove('active');
      document.getElementById("pills-beat")?.classList.remove('active');
      document.getElementById("pills-area-tab")?.classList.remove('active');
      document.getElementById("pills-area")?.classList.remove('active');
      document.getElementById("pills-sales-tab")?.classList.add('active');
      document.getElementById("pills-sales")?.classList.add('active');
    } else if (id == 4) {
      document.getElementById("pills-live-tab")?.classList.remove('active');
      document.getElementById("pills-live")?.classList.remove('active');
      document.getElementById("pills-beat-tab")?.classList.remove('active');
      document.getElementById("pills-beat")?.classList.remove('active');
      document.getElementById("pills-sales-tab")?.classList.remove('active');
      document.getElementById("pills-sales")?.classList.remove('active');
      document.getElementById("pills-area-tab")?.classList.add('active');
      document.getElementById("pills-area")?.classList.add('active');
    }
  }

  goToBit(event: any) {
    console.log("Selected Employee Data::", event);
    this.onChangeMainTab(2);
  }

}
