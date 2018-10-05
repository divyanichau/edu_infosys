import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardianComponent } from './guardian.component';
import { AddComponent } from './add/add.component';
import { ListComponent} from './list/list.component';
// import { DetailComponent} from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: GuardianComponent
    
  },
  {
    path: 'add',
    component: AddComponent,
  },

  {
    path: 'list',
    component: ListComponent,
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuardianRoutingModule { }