import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AccountingRoutingModule } from './accounting-routing.module';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseTypeComponent } from './expenses/expense-type/expense-type.component';

import { ExpenseService } from '../core/services/accounting/expense.service'
@NgModule({
  declarations: [ExpensesComponent,ExpenseTypeComponent],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    NgxDatatableModule,
    FormsModule
  ],
  providers:[ExpenseService]
})
export class AccountingModule { }
