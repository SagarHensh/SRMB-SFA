import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  // @ViewChild('sidebar') sidebar : ElementRef;
  element: any;

  ngOnInit(): void {
  }


  openNav() {
    this.element = document.getElementById("sidebar");
    console.log("My nav::", this.element)
    this.element.classList.toggle("collapsed");
  }

}
