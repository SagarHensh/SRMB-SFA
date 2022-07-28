import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pjp-view-report',
  templateUrl: './pjp-view-report.component.html',
  styleUrls: ['./pjp-view-report.component.css']
})
export class PjpViewReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleBtnList() {
    var tb: any = document.getElementById("switchList");
    tb.classList.toggle("switchActiveList");
    var tbX: any = document.getElementById('switchGrid');
    tbX.classList.remove("switchActivegrid");
  }

  toggleBtnGrid() {
    var tb: any = document.getElementById("switchGrid");
    tb.classList.toggle("switchActivegrid");
    var tbX: any = document.getElementById('switchList');
    tbX.classList.remove("switchActiveList");
  }

}
