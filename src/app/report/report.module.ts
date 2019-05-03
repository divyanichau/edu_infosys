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
import { SssComponent } from './sss/sss.component';
import { LabReportComponent } from './lab-report/lab-report.component';


import { LabComponent } from './lab/lab.component';
import { UtilsService } from '../shared/services/utils.service';
import { LabService } from '../core/services/lab.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,
    ToastrModule.forRoot(), 
    NgProgressModule.withConfig({
      spinnerPosition: 'left',
      color: 'red'
    }),

  ReportRoutingModule
  ],
  providers: [LabService],

  declarations: [ ReportComponent , StudentReportComponent, LabReportComponent, LabComponent, SssComponent]


})
export class ReportModule { }