import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassComponent } from './class.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AddSectionComponent} from './add-section/add-section.component';
import { AddCourseComponent} from './add-course/add-course.component';
import { AddBatchComponent} from './add-batch/add-batch.component';
import { TeacherAllocationComponent} from './teacher-allocation/teacher-allocation.component';


const routes: Routes = [
  {
    path: '',
    component: ClassComponent
    
  },
  {
    path: 'add-class',
    component: AddClassComponent,
  },

  {
    path: 'add-section',
    component: AddSectionComponent,
  },
 
   {
    path: 'add-course',
    component: AddCourseComponent,
  },

  {
    path: 'add-batch',
    component: AddBatchComponent,
  }, 

  {
    path: 'teacher-allocation',
    component: TeacherAllocationComponent,
  } 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }