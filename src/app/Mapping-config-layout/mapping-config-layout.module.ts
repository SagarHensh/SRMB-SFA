import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MappingConfigLayoutRoutingModule } from './mapping-config-layout-routing.module';
import { MappingConfigLayoutComponent } from './mapping-config-layout.component';
import { EmployeeMappingComponent } from './employee-mapping/employee-mapping.component';
import { InfluencerMappingComponent } from './influencer-mapping/influencer-mapping.component';
import { LocationInfluencerComponent } from './influencer-mapping/location-influencer/location-influencer.component';
import { DealerInfluencerComponent } from './influencer-mapping/dealer-influencer/dealer-influencer.component';
import { SubDealerInfluencerComponent } from './influencer-mapping/sub-dealer-influencer/sub-dealer-influencer.component';


@NgModule({
  declarations: [
    MappingConfigLayoutComponent,
    EmployeeMappingComponent,
    InfluencerMappingComponent,
    LocationInfluencerComponent,
    DealerInfluencerComponent,
    SubDealerInfluencerComponent
  ],
  imports: [
    CommonModule,
    MappingConfigLayoutRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class MappingConfigLayoutModule { }
