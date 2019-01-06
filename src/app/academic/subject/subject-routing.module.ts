import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectComponent } from './subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AssignSubjectComponent} from './assign-subject/assign-subject.component';
import { ElectiveSubjectComponent} from './elective-subject/elective-subject.component';
import { SubjectAllocationComponent} from './subject-allocation/subject-allocation.component';
import { SubjectDetailComponent} from './add-subject/subject-detail/subject-detail.component';

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
    path: 'edit-subject/:id',
    component: SubjectDetailComponent
  },

  {
    path: 'assign-subject',
    component: AssignSubjectComponent
  },

 {
    path: 'elective-subject',
    component: ElectiveSubjectComponent
  },

  {
    path: 'subject-allocation',
    component: SubjectAllocationComponent
  }




  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }