import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountingComponent } from './accounting.component';
import { FeeCategoryComponent } from './fee-category/fee-category.component';


const routes: Routes = [

{
	  path: "",
	    component: AccountingComponent
}, 
      
	 {
	    path: "fee-category",
	    component:FeeCategoryComponent	    
	  }	 
	];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
