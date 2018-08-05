import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportComponent } from './transport.component';
import { AddComponent } from './add/add.component';
import { EditComponent} from './edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: TransportComponent
    
  },
  {
    path: 'add',
    component: TransportComponent,
    children: [
      { path: '', component: AddComponent }
    ]
  },

{
    path: 'edit',
    component: TransportComponent,
    children: [
      { path: '', component: EditComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }