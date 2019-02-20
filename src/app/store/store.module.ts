import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';

import { UtilsService } from '../shared/services/utils.service';
import { StoreService } from '../core/services/store.service';
import { InventoryItemComponent } from './inventory-item/inventory-item.component';
import { VendorService } from '../core/services/vendor.service';
import { CategoryService } from '../core/services/category.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    StoreRoutingModule
  ],
  providers: [ StoreService , VendorService, CategoryService, UtilsService],
  declarations: [StoreComponent, InventoryItemComponent]

})


export class StoreModule { }
