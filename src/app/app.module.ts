
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './services/common.service';
import { EnquiryReportsComponent } from './components/visit-reports/enquiry-reports/enquiry-reports.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnquiryVisitReportComponent } from './components/visit-reports/visit-reports/enquiry-visit-report/enquiry-visit-report.component';
import { PlannedUnplannedReportsComponent } from './components/visit-reports/visit-reports/planned-unplanned-reports/planned-unplanned-reports.component';
import { CalenderViewComponent } from './components/Calender/calender-view/calender-view.component';
import { ShowPlannerComponent } from './components/Calender/show-planner/show-planner.component';
import { EnquiriesComponent } from './components/enquiries/enquiries.component';
import { RegistrationListComponent } from './components/reports/Registration/registration-list/registration-list.component';
import { OdometerReportListComponent } from './components/reports/odometer/odometer-report-list/odometer-report-list.component';
import { AttendenceListComponent } from './components/self-service/attendence-list/attendence-list.component';
import { LeaveListComponent } from './components/self-service/leave/leave-list/leave-list.component';
import { ViewMapComponent } from './components/Map-view/view-map/view-map.component';
import { GmapComponent } from './components/Map-view/gmap/gmap.component';
import { BrandingListComponent } from './components/Branding/branding-list/branding-list.component';
import { BeatRouteMapViewComponent } from './components/Map-view/beat-route-map-view/beat-route-map-view.component';
import { LiveTrackingMapViewComponent } from './components/Map-view/live-tracking-map-view/live-tracking-map-view.component';
import { SalesMapViewComponent } from './components/Map-view/sales-map-view/sales-map-view.component';
import { NewAreaMapViewComponent } from './components/Map-view/new-area-map-view/new-area-map-view.component';
import { SurveyReportListComponent } from './components/reports/survey/survey-report-list/survey-report-list.component';
import { CsrReportListComponent } from './components/reports/CSR/csr-report-list/csr-report-list.component';
import { SchemeListComponent } from './components/scheme/scheme-list/scheme-list.component';
import { ActivityPageComponent } from './components/Activity/activity-page/activity-page.component';
import { StockReportComponent } from './components/reports/stock-report/stock-report.component';
import { ConsolidateReportComponent } from './components/reports/consolidate-report/consolidate-report.component';
import { UniqueVisitReportComponent } from './components/reports/unique-visit-report/unique-visit-report.component';
import { NewShopRegistrationReportComponent } from './components/reports/new-shop-registration-report/new-shop-registration-report.component';
import { DealerFeedbackReportComponent } from './components/reports/dealer-feedback-report/dealer-feedback-report.component';
import { VisitConversionReportComponent } from './components/reports/visit-conversion-report/visit-conversion-report.component';
import { TermsAndConditionsComponent } from './components/user-settings/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/user-settings/privacy-policy/privacy-policy.component';
import { NotificationComponent } from './components/notification/notification.component';


const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 54,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 2000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // PageComponent,
    SidebarComponent,
    EnquiryReportsComponent,
    EnquiryVisitReportComponent,
    PlannedUnplannedReportsComponent,
    CalenderViewComponent,
    ShowPlannerComponent,
    EnquiriesComponent,
    RegistrationListComponent,
    OdometerReportListComponent,
    AttendenceListComponent,
    LeaveListComponent,
    ViewMapComponent,
    GmapComponent,
    BrandingListComponent,
    BeatRouteMapViewComponent,
    LiveTrackingMapViewComponent,
    SalesMapViewComponent,
    NewAreaMapViewComponent,
    SurveyReportListComponent,
    CsrReportListComponent,
    SchemeListComponent,
    ActivityPageComponent,
    StockReportComponent,
    ConsolidateReportComponent,
    UniqueVisitReportComponent,
    NewShopRegistrationReportComponent,
    DealerFeedbackReportComponent,
    VisitConversionReportComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({ 
      apiKey: 'AIzaSyBUYhk7JKoA5WTtvGiRCzbqAB6Q_jvc1fA',
    }),
    AgmDirectionModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgxSpinnerModule,
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
