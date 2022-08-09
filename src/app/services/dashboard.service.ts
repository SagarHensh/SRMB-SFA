import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import app_config from '../app.config';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  filterList = [{
    id: '1W',
    name: 'Last Week'
  },{
    id: '1M',
    name: 'Last Month'
  }, {
    id: '3M',
    name: 'Last 3 Month'
  }];
  /*
  , {
    id: '6M',
    name: 'Last 6 Month'
  }, {
    id: '1Y',
    name: 'Last Year'
  }, {
    id: '1D',
    name: 'Today'
  }
   */
  DASHBOARD_API_ROOT = app_config.DASHBOARD_API_ROOT;
  constructor(private http:HttpClient) { }

  getClientId(): any {
    let data: any = localStorage.getItem('AuthUserData');
    if (data) {
      data = JSON.parse(data);
      return data.clientId
    }
  }
  getUserId(): any {
    let data: any = localStorage.getItem('AuthUserData');
    if (data) {
      data = JSON.parse(data);
      // return data.userId
      return 7
    }
  }

  formatDate(date: any) {
    var d = date,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  getInitialDate(): any {
    const date = new Date();
    const endDate = this.formatDate(date);
    const startDate = this.formatDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()))
    return {startDate: startDate, endDate: endDate};
  }

  getDashboardData(data: any): any{
    data.clientId = this.getClientId();
    data.userId = this.getUserId();
    return this.http.post(this.DASHBOARD_API_ROOT + 'getSFADashboardData' , data, httpOptions);
  }

  getMemberData(data: any): any{
    data.clientId = this.getClientId();
    return this.http.post(this.DASHBOARD_API_ROOT + 'getMemberData' , data, httpOptions);
  }

  getProductData(): any{
    return this.http.get(this.DASHBOARD_API_ROOT + 'getProductData' , httpOptions);
  }

  getMinMaxOfLastMonth(): any{
    return this.http.get(this.DASHBOARD_API_ROOT + 'getMinMaxOfLastMonth' , httpOptions);
  }
}
