import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetTermComponent } from './set-term/set-term.component';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';
import { TermDetailComponent } from './set-term/term-detail/term-detail.component';
import { DetailComponent } from './schedule-exam/detail/detail.component';
import { MarksEntryComponent } from './marks-entry/marks-entry.component';
import { ResultPreparationComponent } from './result-preparation/result-preparation.component';

const routes: Routes = [
  {
    path:'set_term',
    component:SetTermComponent
  },
  {
    path:'edit_term/:id',
    component:TermDetailComponent
  },
  {
    path:'schedule_exam',
    component:ScheduleExamComponent
  },
  {
    path:'schedule_exam/edit/:id',
    component:DetailComponent
  },
  {
    path:'marks_entry',
    component:MarksEntryComponent
  },
 {
  path:'result_preperation',
  component:ResultPreparationComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
