import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseTypeComponent } from './expenses/expense-type/expense-type.component';
import { ExpensesComponent } from './expenses/expenses.component'
import { FeeCategoryComponent } from './feeMaintainance/fee-category/fee-category.component';
import { FeeAllocationComponent } from './feeMaintainance/fee-allocation/fee-allocation.component';
import { FeeCollectionComponent } from './feeMaintainance/fee-collection/fee-collection.component';

const routes: Routes = [

  {
    path: 'expense-type',
    component: ExpenseTypeComponent,
  },
  {
    path: 'expense',
    component: ExpensesComponent,
  },
  {
    path: 'fee-category',
    component: FeeCategoryComponent,
  },
  {
    path: 'fee-allocation',
    component: FeeAllocationComponent,
  },

  {
    path: 'fee-collection',
    component: FeeCollectionComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule {

 }
