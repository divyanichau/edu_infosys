import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { UtilsService } from '../shared/services/utils.service';

import { AccountingService } from '../core/services/accounting.service';
import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';

import { FeeCategoryComponent } from './fee-category/fee-category.component';
import { ReportComponent } from './acc-report/acc-report.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,
    NgxTypeaheadModule,

    AccountingRoutingModule
  ],
  providers: [AccountingService, UtilsService],
  declarations: [AccountingComponent, FeeCategoryComponent, ReportComponent ]
})
export class AccountingModule { }