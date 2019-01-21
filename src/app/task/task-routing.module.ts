import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './task.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { TaskDetailComponent } from './assign-task/task-detail/task-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent
    
  },

 {
    path: 'assign-task',
    component: AssignTaskComponent
    
  },

{
    path: 'edit-task/:id',
    component: TaskDetailComponent
    
  },

  ];

  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }