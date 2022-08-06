import { Injectable } from '@angular/core';
import app_config from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  public apiurl: string = app_config.apiUrl;
  public options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getToken()}` }) };


  getToken() {
    // var token = sessionStorage.getItem('token');
    // return token;
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjEiLCJ1c2VyVHlwZUlkIjoiMSIsInJlcXRpbWUiOjE2NTMzMTI2MzM4MDZ9LCJpYXQiOjE2NTMzMTI2MzN9.MjXLcad-PzFFd9_-KnI0xrSdjOKBsakP9Hyw0dpxZJo";
  }

  getAuthUserData() {
    return localStorage.getItem("AuthUserData");
  }

  getLayoutHomePath() {
    return "/#/";
  }

  getLayoutSchemePath() {
    return "/scheme/";
  }

  signin(params: any): Observable<any> {
    // console.log("token",this.options)
    return this.http.post(this.apiurl + 'api/v1/signin', params, this.options);
  }

  getAllStates(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getStateList', params, this.options);
  }

  getAllDistrictByState(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getDistrictListByState', params, this.options);
  }

  getAllZoneByCity(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getZoneListByCity', params, this.options);
  }

  getAllContactListTypeForPjp(params: any): Observable<any> {
    // console.log("token",this.options)
    return this.http.post(this.apiurl + 'api/v1/getContactListForPjp', params, this.options);
  }

  getAllContactCategory(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getContactCatagory', params, this.options);
  }

  getVisitorListTypeByContactId(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getVisitorListType', params, this.options);
  }

  getAllTaskCategory(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getAllTaskCatagory', params, this.options);
  }

  getCustomerType(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getCustomerType', params, this.options);
  }

  getContactList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getcontactlist', params, this.options);
  }

  getLocationHierarchy(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/common/getLocationHierarchy', params, this.options);
  }

  getEmployeeMapData(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/getEmpForLoc', params, this.options);
  }

  setEmployeeMapData(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/mapEmpLoc', params, this.options);
  }

  getEmployeeDesignation(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/common/getDesignationList', params, this.options);
  }

  getEmpParentForChild(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/getEmpParentForChild', params, this.options);
  }

  setEmployeeHierarchyMapping(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/mapEmpUnderEmp', params, this.options);
  }

  getEnquiryVisitReports(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/visitReportList', params, this.options);
  }

  getEnquiryVisitReportsDownload(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/visitReportListDownload', params, this.options);
  }

  getPjpVisitReports(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/pjpReportList', params, this.options);
  }

  getPjpVisitReportsDownload(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/pjpReportListDownload', params, this.options);
  }

  getPjpUnplannedVisitReports(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/pjpUnvisitReportList', params, this.options);
  }

  getPjpUnplannedVisitReportsDownload(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/pjpUnvisitReportListDownload', params, this.options);
  }

  getCalenderActivityList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/calenderActivity/list', params, this.options);
  }

  getOdometerReportList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/odometerManagement/getOdometerReadingList', params, this.options);
  }

  getAttendanceList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/leaveAttendence/listAttendence', params, this.options);
  }

  getLeaveList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/leaveAttendence/leaveList', params, this.options);
  }

  getBrandingList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/brandingManagement/getBrandList', params, this.options);
  }
}
