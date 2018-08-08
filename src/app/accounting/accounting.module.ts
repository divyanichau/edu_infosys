import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import { DashboardComponent} from './Dashboard/dashboard.component';
import { PaymentComponent} from './payment/payment.component';
import { ExpenseComponent} from './expense/expense.component';


@NgModule({
  imports: [
    CommonModule,
    AccountingRoutingModule
  ],
  declarations: [AccountingComponent, DashboardComponent,PaymentComponent, ExpenseComponent]
})
export class AccountingModule { }