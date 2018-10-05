import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student.component';
import { AddComponent } from './add/add.component';
import { ListComponent} from './list/list.component';
import { DetailComponent} from './detail/detail.component';
import { DeleteComponent} from './delete/delete.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent
    
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

  {
    path: 'delete/:id',
    component: DeleteComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }