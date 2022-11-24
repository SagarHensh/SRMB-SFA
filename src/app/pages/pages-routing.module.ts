import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityPageComponent } from '../components/Activity/activity-page/activity-page.component';
import { BrandingListComponent } from '../components/Branding/branding-list/branding-list.component';
import { ShowPlannerComponent } from '../components/Calender/show-planner/show-planner.component';
import { EnquiriesComponent } from '../components/enquiries/enquiries.component';
import { ViewMapComponent } from '../components/Map-view/view-map/view-map.component';
import { ConsolidateReportComponent } from '../components/reports/consolidate-report/consolidate-report.component';
import { CsrReportListComponent } from '../components/reports/CSR/csr-report-list/csr-report-list.component';
import { DealerFeedbackReportComponent } from '../components/reports/dealer-feedback-report/dealer-feedback-report.component';
import { NewShopRegistrationReportComponent } from '../components/reports/new-shop-registration-report/new-shop-registration-report.component';
import { OdometerReportListComponent } from '../components/reports/odometer/odometer-report-list/odometer-report-list.component';
import { RegistrationListComponent } from '../components/reports/Registration/registration-list/registration-list.component';
import { StockReportComponent } from '../components/reports/stock-report/stock-report.component';
import { SurveyReportListComponent } from '../components/reports/survey/survey-report-list/survey-report-list.component';
import { UniqueVisitReportComponent } from '../components/reports/unique-visit-report/unique-visit-report.component';
import { VisitConversionReportComponent } from '../components/reports/visit-conversion-report/visit-conversion-report.component';
import { SchemeListComponent } from '../components/scheme/scheme-list/scheme-list.component';
import { AttendenceListComponent } from '../components/self-service/attendence-list/attendence-list.component';
import { LeaveListComponent } from '../components/self-service/leave/leave-list/leave-list.component';
import { PrivacyPolicyComponent } from '../components/user-settings/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from '../components/user-settings/terms-and-conditions/terms-and-conditions.component';
import { EnquiryReportsComponent } from '../components/visit-reports/enquiry-reports/enquiry-reports.component';
import { EnquiryVisitReportComponent } from '../components/visit-reports/visit-reports/enquiry-visit-report/enquiry-visit-report.component';
import { PlannedUnplannedReportsComponent } from '../components/visit-reports/visit-reports/planned-unplanned-reports/planned-unplanned-reports.component';
import { DashboardComponent } from '../layouts/components/dashboard/dashboard.component';
import { PagesComponent } from "./pages.component";
import { NotificationComponent } from '../components/notification/notification.component';

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
      {
        path: "consolidate-report",
        component: ConsolidateReportComponent
      },
      {
        path: "unique-visit-report",
        component: UniqueVisitReportComponent
      },
      {
        path: "new-shop-registration-report",
        component: NewShopRegistrationReportComponent
      },
      {
        path: "dealer-feedback-report",
        component: DealerFeedbackReportComponent
      },
      {
        path: "visit-conversion-report",
        component: VisitConversionReportComponent
      },
      {
        path: "terms-and-conditions",
        component: TermsAndConditionsComponent
      },
      {
        path: "privacy-policy",
        component: PrivacyPolicyComponent
      },
      
      {
        path:"notification",
        component:NotificationComponent
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
