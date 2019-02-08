import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectComponent } from './subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AssignSubjectComponent} from './assign-subject/assign-subject.component';
import { SubjectAllocationComponent} from './subject-allocation/subject-allocation.component';
import { SubjectDetailComponent} from './add-subject/subject-detail/subject-detail.component';
import { SubjectAllocationDetailComponent} from './subject-allocation/subject-allocation-detail/subject-allocation-detail.component';
import { AssignSubjectDetailComponent } from './assign-subject/assign-subject-detail/assign-subject-detail.component';


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
     path: 'edit-assign-subject/:id',
     component: AssignSubjectDetailComponent
   },

  {
    path: 'subject-allocation',
    component: SubjectAllocationComponent
  },

   {
     path: 'edit-subject-allocation/:id',
     component: SubjectAllocationDetailComponent
   }





  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }