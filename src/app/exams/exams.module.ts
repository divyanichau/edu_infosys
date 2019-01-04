import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';

import { ExamsRoutingModule } from './exams-routing.module';
import { SetTermComponent } from './set-term/set-term.component';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';
import { BatchService } from '../core/services/batch.service';
import { UtilsService } from '../shared/services/utils.service';
import { SetTermService } from '../core/services/set-term.service';
import { TermDetailComponent } from './set-term/term-detail/term-detail.component';
import { SubjectService } from '../core/services/subject.service';
import { ExamScheduleService } from '../core/services/schedule-exam.service';
import { DetailComponent } from './schedule-exam/detail/detail.component';

@NgModule({

  imports: [
    CommonModule,
    ExamsRoutingModule,
    FormsModule,
    NgxDatatableModule
  ],
  providers:[BatchService,UtilsService,SetTermService,SubjectService,ExamScheduleService],
  declarations: [SetTermComponent, ScheduleExamComponent, TermDetailComponent, DetailComponent],
})
export class ExamsModule { }
