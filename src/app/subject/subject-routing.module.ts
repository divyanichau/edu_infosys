import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectComponent } from './subject.component';
import { AddComponent } from './add/add.component';
import { EditComponent} from './edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: SubjectComponent
    
  },
  {
    path: 'add',
    component: SubjectComponent,
    children: [
      { path: '', component: AddComponent }
    ]
  },


{
    path: 'edit',
    component: SubjectComponent,
    children: [
      { path: '', component: EditComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }