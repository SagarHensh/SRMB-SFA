import { Component, OnInit } from '@angular/core';
import { CalenderDataModule } from 'src/app/calender-data/calender-data.module';

@Component({
  selector: 'app-pjp-calender',
  templateUrl: './pjp-calender.component.html',
  styleUrls: ['./pjp-calender.component.css']
})
export class PjpCalenderComponent implements OnInit {

  constructor() {
    this.calData = new CalenderDataModule();
  }

  currDate: any = "";
  currMonth: any = "";
  currYear: any = "";
  calData: any;
  monthView: any;
  monthBox: any = [];
  weekData: any = [];
  eventData: any = [
    {
      date: '2022-07-20',
      data: {
        title: "Payment"
      }
    },
    {
      date: '2022-07-20',
      data: {
        title: "Field"
      }
    },
    {
      date: '2022-07-22',
      data: {
        title: "Order"
      }
    }
  ]

  ngOnInit(): void {
    this.getAllMonthDetails();
  }

  getAllMonthDetails() {
    console.log("module::", this.calData.getMonthView());
    this.calData.setEventsDetails(this.eventData);
    this.monthView = this.calData.getMonthView();
    this.monthBox = this.monthView.view;
    console.log("monthBox", this.monthBox);
    this.weekData = this.monthView.fWeekView;
    // this.currDate = this.calData.getCurDate();
    // console.log("Current Date ::", this.currDate)
    this.currMonth = this.monthView.currentMonth;
    this.currYear = this.monthView.CurrentYear;
  }

  isArray(obj: any) {
    return Array.isArray(obj)
  }

  nextMonth() {
    this.calData.changeNextMonth();
    this.getAllMonthDetails();
  }

  prevMonth() {
    this.calData.changePrevMonth();
    this.getAllMonthDetails();
  }

}
