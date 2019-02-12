import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AccountingRoutingModule } from './accounting-routing.module';

import { UtilsService } from '../shared/services/utils.service';
import { AccountingComponent } from './accounting.component';
import { FeeComponent } from './fee/fee.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    AccountingRoutingModule
  ],
  providers: [ UtilsService],
  declarations: [AccountingComponent, FeeComponent]

})


export class AccountingModule { }