import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityPageComponent } from '../components/Activity/activity-page/activity-page.component';
import { BrandingListComponent } from '../components/Branding/branding-list/branding-list.component';
import { ShowPlannerComponent } from '../components/Calender/show-planner/show-planner.component';
import { EnquiriesComponent } from '../components/enquiries/enquiries.component';
import { ViewMapComponent } from '../components/Map-view/view-map/view-map.component';
import { CsrReportListComponent } from '../components/reports/CSR/csr-report-list/csr-report-list.component';
import { OdometerReportListComponent } from '../components/reports/odometer/odometer-report-list/odometer-report-list.component';
import { RegistrationListComponent } from '../components/reports/Registration/registration-list/registration-list.component';
import { StockReportComponent } from '../components/reports/stock-report/stock-report.component';
import { SurveyReportListComponent } from '../components/reports/survey/survey-report-list/survey-report-list.component';
import { SchemeListComponent } from '../components/scheme/scheme-list/scheme-list.component';
import { AttendenceListComponent } from '../components/self-service/attendence-list/attendence-list.component';
import { LeaveListComponent } from '../components/self-service/leave/leave-list/leave-list.component';
import { EnquiryReportsComponent } from '../components/visit-reports/enquiry-reports/enquiry-reports.component';
import { EnquiryVisitReportComponent } from '../components/visit-reports/visit-reports/enquiry-visit-report/enquiry-visit-report.component';
import { PlannedUnplannedReportsComponent } from '../components/visit-reports/visit-reports/planned-unplanned-reports/planned-unplanned-reports.component';
import { DashboardComponent } from '../layouts/components/dashboard/dashboard.component';
import { PagesComponent } from "./pages.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: "enquiry-report",
        component: EnquiryReportsComponent
      },
      {
        path: "enquiry-visit-report",
        component: EnquiryVisitReportComponent
      },
      {
        path: "visit-report",
        component: PlannedUnplannedReportsComponent
      },
      {
        path: "view-calender",
        component: ShowPlannerComponent
      },
      {
        path: "registration-reports",
        component: RegistrationListComponent
      },
      {
        path: "odometer-reports",
        component: OdometerReportListComponent
      },
      {
        path: "view-map",
        component: ViewMapComponent
      },
      {
        path: "attendence",
        component: AttendenceListComponent
      },
      {
        path: "leave-report",
        component: LeaveListComponent
      },
      {
        path: "branding",
        component: BrandingListComponent
      },
      {
        path: "enquiry-list",
        component: EnquiriesComponent
      },
      {
        path: "survey-report",
        component: SurveyReportListComponent
      },
      {
        path: "csr-report",
        component: CsrReportListComponent
      },
      {
        path: "scheme",
        component: SchemeListComponent
      },
      {
        path: "activity",
        component: ActivityPageComponent
      },
      {
        path: "stock-report",
        component: StockReportComponent
      },
      { path: 'user', loadChildren: () => import('../layouts/layouts.module').then(m => m.LayoutsModule) },
      { path: 'scheme', loadChildren: () => import('../Mapping-config-layout/mapping-config-layout.module').then(m => m.MappingConfigLayoutModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
