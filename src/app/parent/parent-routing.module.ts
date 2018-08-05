import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent.component';
import { AddComponent } from './add/add.component';
import { ListComponent} from './list/list.component';
import { EditComponent} from './edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: ParentComponent
    
  },
  {
    path: 'add',
    component: ParentComponent,
    children: [
      { path: '', component: AddComponent }
    ]
  },

   {
    path: 'list',
    component: ParentComponent,
    children: [
      { path: '', component: ListComponent }
    ]
  },

{
    path: 'edit',
    component: ParentComponent,
    children: [
      { path: '', component: EditComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }