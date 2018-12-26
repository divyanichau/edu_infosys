import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimetableComponent } from './timetable.component';
//import { AddTimetableComponent } from './add-timetable/add-timetable.component';
import { AddTimetableComponent } from './add-timetable/add-timetable.component';

const routes: Routes = [

{
    path: '',
    component: TimetableComponent
    
  },

  {
    path: 'add-timetable',
    component: AddTimetableComponent
    
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
export class TimeTableRoutingModule { }