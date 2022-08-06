import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
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
  ];
  dateInfo: any = [];
  selectedDate: any = "";
  selectedDateString: any = "";
  @Output() selectedDateEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.getAllMonthDetails();
  }

  getAllMonthDetails() {
    console.log("module::", this.calData.getMonthView());
    this.calData.setEventsDetails(this.eventData);
    this.monthView = this.calData.getMonthView();
    this.monthBox = this.monthView.view;
    console.log("monthBox", this.monthBox);
    this.weekData = this.monthView.weekdays;
    this.currDate = this.calData.getCurDate();
    this.getDateInfo(this.currDate);
    console.log("Current Date ::", this.currDate)
    this.currMonth = this.monthView.currentMonth;
    this.currYear = this.monthView.CurrentYear;
  }

  getDateInfo(value: any) {
    let aa: any = value.split("-");
    console.log("Date info::", aa);
    this.dateInfo = aa;
    this.selectedDate = value;
    let ds = this.getOrdinalNum(aa[2])
    this.selectedDateString = ds + " " + this.monthView.months[parseInt(aa[1])-1] + " " + aa[0];
    console.log("Selected Date String::", this.selectedDateString);
    let data={
      selectedDate : this.selectedDate,
      selectedDateString : this.selectedDateString
    }
    this.selectedDateEvent.emit(data);
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

  selectedDateFormTable(data: any) {
    console.log("Calender seleceted Data::", data);
    let month: any = data.month > 9 ? data.month : "0" + data.month;
    let value: any = data.year + "-" + month + "-" + data.day;
    this.selectedDate = value;
    let ds = this.getOrdinalNum(data.day)
    this.selectedDateString = ds + " " + this.monthView.months[data.month - 1] + " " + data.year;
    console.log("Selected Date String::", this.selectedDateString);
    this.dateInfo[0] = data.year;
    this.dateInfo[1] = data.month;
    this.dateInfo[2] = data.day;
  }
  getOrdinalNum(n : any) {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
  }

}
