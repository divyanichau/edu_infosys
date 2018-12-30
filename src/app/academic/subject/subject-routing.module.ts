import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectComponent } from './subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AssignSubjectComponent} from './assign-subject/assign-subject.component';
import { ElectiveSubjectComponent} from './elective-subject/elective-subject.component';


const routes: Routes = [

{
    path: '',
    component: SubjectComponent
    
  },

  {
    path: 'add-subject',
    component: AddSubjectComponent
    
  },

  {
    path: 'assign-subject',
    component: AssignSubjectComponent
  },

 {
    path: 'elective-subject',
    component: ElectiveSubjectComponent
  }

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }