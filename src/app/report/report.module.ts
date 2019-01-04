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
  providers: [],

  declarations: [ ReportComponent , StudentReportComponent]


})
export class ReportModule { }