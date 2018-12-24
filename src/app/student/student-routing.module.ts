import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student.component';
import { AddComponent } from './add/add.component';
import { ListComponent} from './list/list.component';
import { ViewDetailComponent } from './view-detail/view-detail.component';

import { IdcardComponent} from './idcard/idcard.component';
import { DetailComponent } from './detail/detail.component';

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
    path: 'idcard',
    component: IdcardComponent,
  },

  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }