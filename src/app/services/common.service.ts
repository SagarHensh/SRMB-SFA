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
  public apiurlCRM: string = app_config.crmApiUrl;
  public imageUrlCrm: string = app_config.imageUrlForCrm;
  public imageUrl: string = app_config.imageUrl;

  public options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getToken()}` }) };


  getToken() {
    // var token = sessionStorage.getItem('token');
    // return token;
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjEiLCJ1c2VyVHlwZUlkIjoiMSIsInJlcXRpbWUiOjE2NTMzMTI2MzM4MDZ9LCJpYXQiOjE2NTMzMTI2MzN9.MjXLcad-PzFFd9_-KnI0xrSdjOKBsakP9Hyw0dpxZJo";
  }

  getAuthUserData() {
    // return localStorage.getItem("AuthUserData");
    return localStorage.getItem("AuthUserData");
  }

  getLayoutHomePath() {
    return "/pages/user/";
  }

  getLayoutSchemePath() {
    return "/pages/scheme/";
  }

  getPagesPath() {
    return "/pages/";
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

  // getOdometerReportList(params: any): Observable<any> {
  //   return this.http.post(this.apiurl + 'api/v1/odometerManagement/getOdometerReadingList', params, this.options);
  // }

  getOdometerReportList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v2/odometerManagement/getOdometerReadingList', params, this.options);
  }

  // getAttendanceList(params: any): Observable<any> {
  //   return this.http.post(this.apiurl + 'api/v1/leaveAttendence/listAttendence', params, this.options);
  // }

  getAttendanceList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v2/leaveAttendence/listAttendence', params, this.options);
  }

  getLeaveList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/leaveAttendence/leaveList', params, this.options);
  }

  getBrandingList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/brandingManagement/getBrandList', params, this.options);
  }

  getBrandingRequisitionList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/brandingManagement/requisitionList', params, this.options);
  }

  getCsrReportList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/fetchCsrList', params, this.options);
  }

  getSurveyReportList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/survey/surveyReportList', params, this.options);
  }

  getInfluencorForLoc(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/getInfluencorForLoc', params, this.options);
  }

  getInfluencorType(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/getCustomerType', params, this.options);
  }

  getCustomerMapData(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/getCustomerMap', params, this.options);
  }

  getpjpUserDetailsById(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getpjpUserDetailsById', params, this.options);
  }

  getMapCustomerLoc(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/mapCustomerLoc', params, this.options);
  }

  getMapParentChildCustomer(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/mapParentChildCustomer', params, this.options);
  }

  getUserLocationMapping(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/mapUserLocationMapping', params, this.options);
  }

  getMasterEmployeeList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getemployeelist', params, this.options);
  }

  getUserTargetList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getUserTargetList', params, this.options);
  }

  getpjpCustomerList(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/getpjpCustomerList', params, this.options);
  }

  getSubordinateUser(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v1/pjpmanagement/getSubordinateData', params, this.options);
  }

  //..........Subordinate User ................Activity page......

  getSubordinateUserV2(params: any): Observable<any> {
    return this.http.post(this.apiurl + 'api/v2/pjpmanagement/getSubordinateData', params, this.options);
  }
  //-------------------Visit Report Filter----------------//

  getContactType(data: any) {
    return this.http.post(this.apiurl + 'api/v1/customer/getCustomerTypeList', data, this.options);
  }
  getVisitList(data: any) {
    return this.http.post(this.apiurl + 'api/v1/pjpmanagement/getVisitStatusList', data, this.options);
  }

  //--------------------- Filter---- 24/08/2022 ----------------//

  // getStockReportList(data: any) {
  //   return this.http.post(this.apiurl + 'api/v1/stockManagement/reportList', data, this.options);
  // }
  getStockReportList(data: any) {
    return this.http.post(this.apiurl + 'api/v2/stockManagement/reportList', data, this.options);
  }

  getOdometerReportsDownload(params: any): Observable<any> {

    return this.http.post(this.apiurl + 'api/v2/odometerManagement/exportAPI', params, this.options);
  }

  //----------------------------- 25/08/2022-------------------------//

  getEnquiryReportDownload(data: any) {
    return this.http.post(this.apiurlCRM + 'api/v1/enqueryManagement/exportEnquiry', data, this.options);
  }

  getRegistrationReportDownload(data: any) {
    return this.http.post(this.apiurlCRM + 'api/v1/customerManagement/download', data, this.options);
  }

  getAttendanceReportsDownload(data: any) {
    return this.http.post(this.apiurl + 'api/v1/leaveAttendence/attendenceExport', data, this.options);
  }

  //--------------------------------- 26/08/2022------------------------------//

  getStockReportDownload(data: any) {
    return this.http.post(this.apiurl + 'api/v1/stockManagement/downloadStockReport', data, this.options);
  }

  csrActivity(data: any) {
    return this.http.post(this.apiurlCRM + 'api/v1/mstCsrType/list', data, this.options);
  }
  //--------------------------------------- 30/08/2022-----------------------------//

  contactTypeListDownload(data: any) {
    return this.http.post(this.apiurl + 'api/v1/contact/exportApi', data, this.options);
  }

  employeeListDownload(data: any) {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/exportEmp', data, this.options);
  }

  // ........................ 31/08/2022 .............

  getPjvByCustomerId(data: any) {
    return this.http.post(this.apiurl + 'api/v1/pjpmanagement/getPjvByCustomerId', data, this.options);
  }
  pjvCreate(data: any) {
    return this.http.post(this.apiurl + 'api/v1/pjpmanagement/pjvCreate', data, this.options);
  }


  getInfluencerList(data: any) {
    return this.http.post(this.apiurl + 'api/v1/contact/getInfluencerList', data, this.options);
  }

  //------------------ 14/09/2022 ---------------//

  fetchMasterData(data: any) {
    return this.http.post(this.apiurl + 'api/v1/contact/getContactDetails', data, this.options);
  }

  uploadFile(data: any) {
    return this.http.post(this.apiurl + 'api/v1/imageupload', data);
  }

  //------------- Email Format Check Function-------------------//

  mailFormatCheck(mail: any) {
    const mailFormat = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (mailFormat.test(mail)) {
      return true;
    } else {
      return false;
    }
  }

  //------------- Date Format Check Function-------------------//




  getDateFormatNew3(newDate: any): any {
    // console.log('>>>>>>>>>>>>>', newDate);
    let date = new Date(newDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let actualMonth;
    if (month < 10) {
      actualMonth = '0' + month;
    } else {
      actualMonth = month;
    }
    let actualDate;
    let day = date.getDate();
    if (day < 10) {
      actualDate = '0' + day;
    } else {
      actualDate = day;
    }
    // return day + '/' + month + '/' + year;
    return year + '-' + actualMonth + '-' + actualDate + ' ' + hour + ':' + min + ':' + sec;
  }


  mstContactType(data: any) {
    return this.http.post(this.apiurl + 'api/v1/mstContactType', data, this.options);
  }

  getVisitorType(data: any) {
    return this.http.post(this.apiurl + 'api/v1/pjpmanagement/getVisitorType', data, this.options);
  }

  getStockDetails(data: any) {
    return this.http.post(this.apiurl + 'api/v1/stockManagement/getStockDetails', data, this.options);
  }

  approvedOdometer(data: any) {
    return this.http.post(this.apiurl + 'api/v1/odometerManagement/approveOdometer', data, this.options);
  }

  updateOdometer(data: any) {
    return this.http.post(this.apiurl + 'api/v1/odometerManagement/updateOdometer', data, this.options);
  }

  addCosting(data: any) {
    return this.http.post(this.apiurl + 'api/v1/brandingManagement/addCosting', data, this.options);
  }

  approvedByHod(data: any) {
    return this.http.post(this.apiurl + 'api/v1/brandingManagement/approvedByHod', data, this.options);
  }

  getVendorList(data: any) {
    return this.http.post(this.apiurl + 'api/v1/vendor/list', data, this.options);
  }

  assignVendor(data: any) {
    return this.http.post(this.apiurl + 'api/v1/brandingManagement/vendorAssign', data, this.options);
  }

  getMeasurementUnitList(data: any) {
    return this.http.post(this.apiurl + 'api/v1/brandingManagement/getMeasurementUnitList', data, this.options);
  }

  getBrandingTypeList(data: any) {
    return this.http.post(this.apiurl + 'api/v1/brandingManagement/getMasterList', data, this.options);
  }

  getBrandingListDownloadCSV(data: any) {
    return this.http.post(this.apiurl + 'api/v1/brandingManagement/brandingExport', data, this.options);
  }

  getNotificationList(data: any) {
    return this.http.post(this.apiurl + 'api/v1/notificationManagement/notificationList', data, this.options);
  }

  getActivityDetails(data: any) {
    return this.http.post(this.apiurl + 'api/v2/mapEntity/getBeatData', data, this.options);
  }

  getConsolidatedVisitReport(data: any) {
    return this.http.post(this.apiurl + 'api/v1/consolidatedVisitReport', data, this.options);
  }

  getConsolidatedVisitReportDownload(data: any) {
    return this.http.post(this.apiurl + 'api/v1/consolidatedVisitReportDownload', data, this.options);
  }

  getUniqueVisitReport(data: any) {
    return this.http.post(this.apiurl + 'api/v1/uniqueVisit', data, this.options);
  }

  getUniqueVisitReportDownload(data: any) {
    return this.http.post(this.apiurl + 'api/v1/uniqueVisitDownload', data, this.options);
  }

  getNewShopRegReport(data: any) {
    return this.http.post(this.apiurl + 'api/v1/newShopRegistration', data, this.options);
  }

  getNewShopRegReportDownload(data: any) {
    return this.http.post(this.apiurl + 'api/v1/newShopRegistrationDownload', data, this.options);
  }

  getDealerFeedbackReport(data: any) {
    return this.http.post(this.apiurl + 'api/v1/delerFeedBack', data, this.options);
  }

  getDealerFeedbackReportDownload(data: any) {
    return this.http.post(this.apiurl + 'api/v1/delerFeedBackDownload', data, this.options);
  }

  getVisitConversionReport(data: any) {
    return this.http.post(this.apiurl + 'api/v1/visitConversion', data, this.options);
  }

  getVisitConversionReportDownload(data: any) {
    return this.http.post(this.apiurl + 'api/v1/visitConversionDownload', data, this.options);
  }

  getVisitBeatMap(data: any) {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/getVisitMap', data, this.options);
  }

  fileUpload(data: any) {
    return this.http.post(this.apiurl + 'api/v1/fileupload', data, this.options);
  }

  getCrmSalesMap(data: any) {
    return this.http.post(this.apiurl + 'api/v1/mapEntity/getCrmMap', data, this.options);
  }

  getApplicationPolicyHTML(data: any) {
    return this.http.post(this.apiurl + 'api/v1/common/getApplicationPolicy', data, this.options);
  }



}
