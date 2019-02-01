import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseTypeComponent } from './expenses/expense-type/expense-type.component';

const routes: Routes = [

  {
    path: 'expense-type',
    component: ExpenseTypeComponent,
  },
  {
    path: 'expense-type/:id',
    component: ExpenseTypeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule {

 }
