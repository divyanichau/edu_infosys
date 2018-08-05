import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { AddComponent } from './add/add.component';
import { ListComponent} from './list/list.component';
import { EditComponent} from './edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: TeacherComponent
    
  },
  {
    path: 'add',
    component: TeacherComponent,
    children: [
      { path: '', component: AddComponent }
    ]
  },

   {
    path: 'list',
    component: TeacherComponent,
    children: [
      { path: '', component: ListComponent }
    ]
  },

{
    path: 'edit',
    component: TeacherComponent,
    children: [
      { path: '', component: EditComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }