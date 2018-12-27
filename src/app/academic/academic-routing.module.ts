import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicComponent } from './academic.component';
import { CreateComponent } from './certification/create/create.component';
import { SubjectComponent} from './subject/subject.component';
import { TimetableComponent } from './timetable/timetable.component';
//import { ListComponent} from './list/list.component';
//import { ViewDetailComponent } from './view-detail/view-detail.component';


const routes: Routes = [
  {
    path: '',
    component: AcademicComponent
    
  },
  {
    path: 'timetable',
    loadChildren: './timetable/timetable.module#TimeTableModule'
  },
  {
    path: 'subject',
    loadChildren: './subject/subject.module#SubjectModule'
  },


  {
    path:'certification',
    component:CreateComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AcademicRoutingModule { }
