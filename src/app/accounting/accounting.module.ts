import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AccountingRoutingModule } from './accounting-routing.module';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseTypeComponent } from './expenses/expense-type/expense-type.component';

import { ExpenseService } from '../core/services/accounting/expense.service';
import { FeeMaintainanceService } from '../core/services/accounting/fee-maintainance.service';
import { FeeAllocateService } from '../core/services/accounting/fee-allocate.service';
import { FeeCollectionService } from '../core/services/accounting/fee-collection.service';

import { FeeCategoryComponent } from './feeMaintainance/fee-category/fee-category.component';
import { FeeAllocationComponent } from './feeMaintainance/fee-allocation/fee-allocation.component';
import { FeeCollectionComponent } from './feeMaintainance/fee-collection/fee-collection.component'
import { CourseService } from '../core/services/course.service';
import { ClassService } from '../core/services/class.service';
import { StudentService } from '../core/services/student.service';

@NgModule({
  declarations: [ExpensesComponent,ExpenseTypeComponent, FeeCategoryComponent, FeeAllocationComponent, FeeCollectionComponent],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    NgxDatatableModule,
    FormsModule,
   
  ],
  providers:[ExpenseService,FeeMaintainanceService,CourseService,
    ClassService,FeeAllocateService,StudentService,FeeCollectionService]
})
export class AccountingModule { }
