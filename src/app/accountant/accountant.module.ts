import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountantRoutingModule } from './accountant-routing.module';
import { AccountantComponent } from './accountant.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    AccountantRoutingModule
  ],
  declarations: [AccountantComponent, PaymentComponent]
})
export class AccountantModule { }