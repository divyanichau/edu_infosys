import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicYearComponent } from './academic-year/academic-year.component';

const routes: Routes = [
  {
    path:'academic_year',
    component:AcademicYearComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
