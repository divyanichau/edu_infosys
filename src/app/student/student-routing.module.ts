import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { AddComponent } from './add/add.component';
import { ListComponent} from './list/list.component';
import { EditComponent} from './edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: StudentComponent
    
  },
  {
    path: 'add',
    component: StudentComponent,
    children: [
      { path: '', component: AddComponent }
    ]
  },

   {
    path: 'list',
    component: StudentComponent,
    children: [
      { path: '', component: ListComponent }
    ]
  },

{
    path: 'edit',
    component: StudentComponent,
    children: [
      { path: '', component: EditComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }