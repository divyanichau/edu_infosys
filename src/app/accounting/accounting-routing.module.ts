import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountingComponent } from './accounting.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { PaymentComponent} from './payment/payment.component';
import { ExpenseComponent} from'./expense/expense.component';

const routes: Routes = [

{
	  path: "",
	    component: AccountingComponent
}, 
      
	 {
	    path: "Dashboard",
	    component:AccountingComponent,
	    children: [
	    	{path: '', component: DashboardComponent}
	    
	    ]
	    
	  },

	   {
	    path: "payment",
	    component:AccountingComponent,
	    children: [
	    	{path: '', component: PaymentComponent, }
	    
	    ]
	    
	  },

	 
      {
	    path: "expense",
	    component:AccountingComponent,
	    children: [
	    	{path: '', component: ExpenseComponent}
	    
	    ]
	    
	  }

	];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
