import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetTermComponent } from './set-term/set-term.component';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';

const routes: Routes = [
  {
    path:'set_term',
    component:SetTermComponent
  },
  {
    path:'schedule_exam',
    component:ScheduleExamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
