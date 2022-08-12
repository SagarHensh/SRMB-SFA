import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MasterListComponent } from './components/master-list/master-list.component';
import { LayoutsComponent } from './layouts.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutsRoutingModule } from './layouts-routing/layouts-routing.module';
import { MainComponent } from './main/main.component';
import { DistributorComponent } from './components/master-list/distributor/distributor.component';
import { BrandingComponent } from './components/master-list/branding/branding.component';
import { ProductComponent } from './components/master-list/product/product.component';
import { EmployeeComponent } from './components/master-list/employee/employee.component';
import { DealerComponent } from './components/master-list/dealer/dealer.component';
import { SubDealerComponent } from './components/master-list/sub-dealer/sub-dealer.component';
import { AttendanceNLeaveComponent } from './components/attendance-nleave/attendance-nleave.component';
import { AttendanceComponent } from './components/attendance-nleave/attendance/attendance.component';
import { LeaveComponent } from './components/attendance-nleave/leave/leave.component';
import { CreatePjpComponent } from './components/pjp/create-pjp/create-pjp.component';
import { PjpViewReportComponent } from './components/pjp/pjp-view-report/pjp-view-report.component';
import app_config from '../app.config';
import { PjpMapComponent } from './components/pjp/pjp-map/pjp-map.component';
import { PjpCalenderComponent } from './components/pjp/pjp-calender/pjp-calender.component';
import { StackbarchartComponent } from './components/charts/stackbarchart/stackbarchart.component';
import { LinechartComponent } from './components/charts/linechart/linechart.component';
import { ViewPjpDetailsComponent } from './components/pjp/view-pjp-details/view-pjp-details.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MasterListComponent,
    LayoutsComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    DistributorComponent,
    BrandingComponent,
    ProductComponent,
    EmployeeComponent,
    DealerComponent,
    SubDealerComponent,
    AttendanceNLeaveComponent,
    AttendanceComponent,
    LeaveComponent,
    CreatePjpComponent,
    PjpViewReportComponent,
    PjpMapComponent,
    PjpCalenderComponent,
    StackbarchartComponent,
    LinechartComponent,
    ViewPjpDetailsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    LayoutsRoutingModule,
    AgmCoreModule.forRoot({ 
      apiKey: 'AIzaSyBUYhk7JKoA5WTtvGiRCzbqAB6Q_jvc1fA',
    }),
    AgmDirectionModule,
    NgChartsModule,
    NgbModule,
    AutocompleteLibModule
  ]
})
export class LayoutsModule { }
