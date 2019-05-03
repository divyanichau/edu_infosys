import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentReportComponent } from './student-report/student-report.component';
import {LabReportComponent} from './lab-report/lab-report.component';
import {LabComponent} from './lab/lab.component';
import {ReportComponent } from './report.component';
import {SssComponent } from './sss/sss.component';

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
    path: 'lab-report',
    component: LabReportComponent,
  },

  {
    path: 'lab',
    component: LabComponent,
  },
   {
    path: 'sss',
    component: SssComponent,
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }