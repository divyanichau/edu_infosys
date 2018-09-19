import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherComponent } from './teacher.component';
import { AddComponent } from './add/add.component';
import { ListComponent} from './list/list.component';
import { DetailComponent} from './detail/detail.component';


const routes: Routes = [
  {
    path: '',
    component: TeacherComponent
    
  },
  {
    path: 'add',
    component: AddComponent,
  },

   {
    path: 'list',
    component: ListComponent,
  },

{
    path: 'detail/:id',
    component: DetailComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }