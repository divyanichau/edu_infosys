import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { InstitutionalDetailComponent } from './institutional-detail/institutional-detail.component';

const routes: Routes = [
  {
    path:'academic_year',
    component:AcademicYearComponent
  },
  {
    path:'institutional-detail',
    component:InstitutionalDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
