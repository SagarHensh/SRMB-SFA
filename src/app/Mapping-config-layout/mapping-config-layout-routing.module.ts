import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeMappingComponent } from './employee-mapping/employee-mapping.component';
import { InfluencerMappingComponent } from './influencer-mapping/influencer-mapping.component';
import { MappingConfigLayoutComponent } from './mapping-config-layout.component';

const routes: Routes = [{
  path: "",
  component: MappingConfigLayoutComponent,
  children: [
    {
      path: "employee-mapping",
      component: EmployeeMappingComponent
    }, {
      path: "influencer-mapping",
      component: InfluencerMappingComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingConfigLayoutRoutingModule { }
