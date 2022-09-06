import { Injectable } from '@angular/core';
import app_config from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrmService {

  constructor(private http: HttpClient) { }
  public apiurl: string = app_config.crmApiUrl;
  public options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getToken()}` }) };

  getToken() {
    // var token = sessionStorage.getItem('token');
    // return token;
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjEiLCJ1c2VyVHlwZUlkIjoiMSIsInJlcXRpbWUiOjE2NTMzMTI2MzM4MDZ9LCJpYXQiOjE2NTMzMTI2MzN9.MjXLcad-PzFFd9_-KnI0xrSdjOKBsakP9Hyw0dpxZJo";
  }

  getImageUrl() {
    return app_config.crmApiUrl;
  }

  getRegistrationList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/customerManagement/getlistOfNewRegCustomers', params, this.options);
  }

  // getEnquiryList(params: any): Observable<any> {
  //   return this.http.post(this.apiurl + 'api/v1/enqueryManagement/getEnqueryList', params, this.options);
  // }

  getEnquiryList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/enqueryManagement/getEnqueryListForSFA', params, this.options);
  }

  //-------------------------- For Enquiry Report Filter-------------------//

  getEnquiryData(data: any) {
    return this.http.post(this.apiurl + 'api/v1/enqueryManagement/landingPageSelections', data, this.options);
  }
  getState(data: any) {
    return this.http.post(this.apiurl + 'api/v1/state/getState', data, this.options);
  }

  getDistrict(data: any) {
    return this.http.post(this.apiurl + 'api/v1/city/getCity', data, this.options);
  }
  getZone(data: any) {
    return this.http.post(this.apiurl + 'api/v1/zone/getZone', data, this.options);
  }


}
