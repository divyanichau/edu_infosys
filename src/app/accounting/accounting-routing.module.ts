import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountingComponent } from './accounting.component';
import { FeeComponent} from './fee/fee.component';


const routes: Routes = [
  {
    path: '',
    component: AccountingComponent
    
  },


  {
    path:'fee',
    component:FeeComponent
  },


  // {
  //   path: 'fee',
  //   loadChildren: './fee/fee.module#FeeModule'
  // },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountingRoutingModule { }
