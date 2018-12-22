import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassComponent } from './class.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AddSectionComponent} from './add-section/add-section.component';
import { AddBatchComponent} from './add-batch/add-batch.component';

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
    path: 'add-batch',
    component: AddBatchComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }