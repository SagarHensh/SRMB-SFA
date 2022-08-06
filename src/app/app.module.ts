import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageComponent,
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
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
