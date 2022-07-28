import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SchemeLayoutRoutingModule } from './scheme-layout-routing.module';
import { SchemeLayoutComponent } from './scheme-layout.component';
import { EmployeeMappingComponent } from './employee-mapping/employee-mapping.component';
import { InfluencerMappingComponent } from './influencer-mapping/influencer-mapping.component';


@NgModule({
  declarations: [
    SchemeLayoutComponent,
    EmployeeMappingComponent,
    InfluencerMappingComponent
  ],
  imports: [
    CommonModule,
    SchemeLayoutRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class SchemeLayoutModule { }
