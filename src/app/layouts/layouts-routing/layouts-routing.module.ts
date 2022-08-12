import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
// import { LoginComponent } from 'src/app/login/login.component';
import { MasterListComponent } from '../components/master-list/master-list.component';
import { LayoutsComponent } from '../layouts.component';
import { EmployeeComponent } from '../components/master-list/employee/employee.component';
import { DealerComponent } from '../components/master-list/dealer/dealer.component';
import { DistributorComponent } from '../components/master-list/distributor/distributor.component';
import { SubDealerComponent } from '../components/master-list/sub-dealer/sub-dealer.component';
import { BrandingComponent } from '../components/master-list/branding/branding.component';
import { ProductComponent } from '../components/master-list/product/product.component';
import { AttendanceComponent } from '../components/attendance-nleave/attendance/attendance.component';
import { LeaveComponent } from '../components/attendance-nleave/leave/leave.component';
import { CreatePjpComponent } from '../components/pjp/create-pjp/create-pjp.component';
import { PjpViewReportComponent } from '../components/pjp/pjp-view-report/pjp-view-report.component';
import { ViewPjpDetailsComponent } from '../components/pjp/view-pjp-details/view-pjp-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'master',
        component: MasterListComponent
      },
      { 
        path: 'master/:id',
        component: MasterListComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent
      },
      // {
      //   path: 'dealer',
      //   component: DealerComponent
      // },
      // {
      //   path: 'distributor',
      //   component: DistributorComponent
      // },
      // {
      //   path: 'subDealer',
      //   component: SubDealerComponent
      // },
      {
        path: 'branding',
        component: BrandingComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'attendance',
        component: AttendanceComponent
      },
      {
        path: 'leave',
        component: LeaveComponent
      },
      {
        path : 'create-pjp',
        component : CreatePjpComponent
      },
      {
        path : 'pjp-view-report',
        component : PjpViewReportComponent
      },
      {
        path : 'pjp-view-details',
        component : ViewPjpDetailsComponent
      }
    ]
  }
];



@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
