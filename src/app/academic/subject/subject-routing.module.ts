import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectComponent } from './subject.component';
//import { AddTimetableComponent } from './add-timetable/add-timetable.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';

const routes: Routes = [

{
    path: '',
    component: SubjectComponent
    
  },

  {
    path: 'add-subject',
    component: AddSubjectComponent
    
  }

   // {
   //   path: 'timetable',
   //   loadChildren: './timetable/timetable.module#TimeTableModule'
   // },

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }