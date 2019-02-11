import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from '@ngx-progressbar/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { ReportRoutingModule } from './report-routing.module';
import { StudentReportComponent} from './student-report/student-report.component';
import { ReportComponent } from './report.component';
import { BatchService } from '../core/services/batch.service';
import { UtilsService } from '../shared/services/utils.service';
import { StudentReportService } from '../core/services/studentreport.service';
import { DueReportComponent } from './due-report/due-report.component';
import { DueReportService } from '../core/services/duereport.service';
import { FeepaidReportComponent } from './feepaid-report/feepaid-report.component';
import { CourseService } from '../core/services/course.service';
import { FeepaidReportService } from '../core/services/feepaidreport.service';
import { AbsentReportComponent } from './absent-report/absent-report.component';
import {AbsentReportService} from '../core/services/absentreport.service';
import { ClassService } from '../core/services/class.service';
import { SectionService } from '../core/services/section.service';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import {ExpenseReportService} from '../core/services/expensereport.service';
import { LibaryReportComponent } from './libary-report/libary-report.component';
import {LibaryReportService} from '../core/services/libaryreport.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgProgressModule.withConfig({
      spinnerPosition: 'left',
      color: 'red'
    }),

  ReportRoutingModule
  ],
  providers: [BatchService , UtilsService, StudentReportService, LibaryReportService, ExpenseReportService, ClassService, SectionService, AbsentReportService , FeepaidReportService ,DueReportService, CourseService],

  declarations: [ ReportComponent , StudentReportComponent, DueReportComponent, FeepaidReportComponent, AbsentReportComponent, ExpenseReportComponent, LibaryReportComponent]


})
export class ReportModule { }