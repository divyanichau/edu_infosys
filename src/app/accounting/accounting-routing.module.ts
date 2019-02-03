import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseTypeComponent } from './expenses/expense-type/expense-type.component';
import { ExpensesComponent } from './expenses/expenses.component'

const routes: Routes = [

  {
    path: 'expense-type',
    component: ExpenseTypeComponent,
  },
  {
    path: 'expense',
    component: ExpensesComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule {

 }
