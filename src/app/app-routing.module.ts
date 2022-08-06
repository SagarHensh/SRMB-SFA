import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandingListComponent } from './components/Branding/branding-list/branding-list.component';
import { CalenderViewComponent } from './components/Calender/calender-view/calender-view.component';
import { ShowPlannerComponent } from './components/Calender/show-planner/show-planner.component';
import { EnquiriesComponent } from './components/enquiries/enquiries.component';
import { ViewMapComponent } from './components/Map-view/view-map/view-map.component';
import { OdometerReportListComponent } from './components/reports/odometer/odometer-report-list/odometer-report-list.component';
import { RegistrationListComponent } from './components/reports/Registration/registration-list/registration-list.component';
import { AttendenceListComponent } from './components/self-service/attendence-list/attendence-list.component';
import { LeaveListComponent } from './components/self-service/leave/leave-list/leave-list.component';
import { EnquiryReportsComponent } from './components/visit-reports/enquiry-reports/enquiry-reports.component';
import { EnquiryVisitReportComponent } from './components/visit-reports/visit-reports/enquiry-visit-report/enquiry-visit-report.component';
import { PlannedUnplannedReportsComponent } from './components/visit-reports/visit-reports/planned-unplanned-reports/planned-unplanned-reports.component';
import { DashboardComponent } from './layouts/components/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "enquiry-report",
    component: EnquiryReportsComponent
  },
  {
    path : "enquiry-visit-report",
    component : EnquiryVisitReportComponent
  },
  {
    path : "visit-report",
    component : PlannedUnplannedReportsComponent
  },
  {
    path : "view-calender",
    component : ShowPlannerComponent
  },
  {
    path : "registration-reports",
    component : RegistrationListComponent
  },
  {
    path : "odometer-reports",
    component : OdometerReportListComponent
  },
  {
    path : "view-map",
    component : ViewMapComponent
  },
  {
    path : "attendence",
    component : AttendenceListComponent
  },
  {
    path : "leave-report",
    component : LeaveListComponent
  },
  {
    path : "branding",
    component : BrandingListComponent
  },
  {
    path : "enquiry-list",
    component : EnquiriesComponent
  },
  { path: '#', loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule) },
  { path: 'scheme', loadChildren: () => import('./Mapping-config-layout/mapping-config-layout.module').then(m => m.MappingConfigLayoutModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
