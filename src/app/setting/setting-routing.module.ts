import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { SettingComponent } from './setting.component';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { InstituteDetailComponent } from './institute-detail/institute-detail.component';

const routes: Routes = [
// {
//     path: '',
//     component: SettingComponent   
//   },

  {
    path:'academic_year',
    component:AcademicYearComponent
  },

  {
    path:'institute-detail',
    component:InstituteDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
