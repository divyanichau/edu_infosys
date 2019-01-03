import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ExamsRoutingModule } from './exams-routing.module';
import { SetTermComponent } from './set-term/set-term.component';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';
import { BatchService } from '../core/services/batch.service';
import { UtilsService } from '../shared/services/utils.service';

@NgModule({

  imports: [
    CommonModule,
    ExamsRoutingModule,
    FormsModule
  ],
  providers:[BatchService,UtilsService],
  declarations: [SetTermComponent, ScheduleExamComponent],
})
export class ExamsModule { }
