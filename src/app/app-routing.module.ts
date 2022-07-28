import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/components/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  { path: '#', loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule) },
  { path: 'scheme', loadChildren: () => import('./scheme-layout/scheme-layout.module').then(m => m.SchemeLayoutModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
