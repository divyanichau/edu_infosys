import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentReportComponent } from './student-report/student-report.component';
import {ReportComponent } from './report.component';
import { DueReportComponent } from './due-report/due-report.component';
import { FeepaidReportComponent } from './feepaid-report/feepaid-report.component';
import { AbsentReportComponent } from './absent-report/absent-report.component';
import {ExpenseReportComponent} from './expense-report/expense-report.component';
import { LibaryReportComponent } from './libary-report/libary-report.component';

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

  {
    path: 'feepaid-report',
    component: FeepaidReportComponent,
  },

  {
    path: 'absent-report',
    component: AbsentReportComponent,
  },
  
  {
    path: 'expense-report',
    component: ExpenseReportComponent,
  },
  {
    path: 'libary-report',
    component: LibaryReportComponent,
  },
  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }