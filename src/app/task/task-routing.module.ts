import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './task.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent
    
  },

 {
    path: 'assign-task',
    component: AssignTaskComponent
    
  },

  ];

  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }