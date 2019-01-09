import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentReportComponent } from './student-report/student-report.component';
import {ReportComponent } from './report.component';
import { DueReportComponent } from './due-report/due-report.component';


const routes: Routes = [

  {
    path: '',
    component: ReportComponent
    
  },
  {
    path: 'student-report',
    component: StudentReportComponent,
  },
  {
    path: 'due-report',
    component: DueReportComponent,
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }