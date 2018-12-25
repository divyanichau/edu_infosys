import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicComponent } from './academic.component';
import { TimetableComponent } from './timetable/timetable.component';
//import { ListComponent} from './list/list.component';
//import { ViewDetailComponent } from './view-detail/view-detail.component';


const routes: Routes = [
  {
    path: '',
    component: TimetableComponent
    
  },
  {
    path: 'timetable',
    component: TimetableComponent,
  },


  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule { }