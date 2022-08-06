import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enquiry-reports',
  templateUrl: './enquiry-reports.component.html',
  styleUrls: ['./enquiry-reports.component.css']
})
export class EnquiryReportsComponent implements OnInit {

  constructor() { }

  enquiryReportList : any = [];

  ngOnInit(): void {
  }


  show01() {
    let elem: any;
    elem = document.getElementById('div01');
    elem.style.display = 'block';
  }
  show02() {
    let elem: any;
    elem = document.getElementById('div01');
    elem.style.display = 'none';
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
