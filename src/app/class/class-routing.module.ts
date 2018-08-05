import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassComponent } from './class.component';
import { ManageClassesComponent } from './add/add.component';



const routes: Routes = [
  {
    path: '',
    component:  ClassComponent
    
  },
  {
    path: 'add',
    component: ClassComponent,
    children: [
      { path: '', component: ManageClassesComponent }
    ]
  },

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }