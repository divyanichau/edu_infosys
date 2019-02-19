import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';


import{ DatatableComponent} from '@swimlane/ngx-datatable';

import { UtilsService } from '../../shared/services/utils.service';
import { StoreService } from '../../core/services/store.service';
import { inventory_item} from '../../core/classes/inventory-item';


@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: []
})
export class InventoryItemComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

_inventory_item: inventory_item = new inventory_item();
  inventors = [];

  rows: any[] = [];
  temp: any[] = [];
  editing = {};

 @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _utils: UtilsService,
    private router: Router,
    private _storeService:StoreService,
    private toastr: ToastrService
  	) { }

  ngOnInit() {
  	this.initStore();
  	this._inventory_item.vendors=0
  	this._inventory_item.category=0
   	}

   	ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

   OnSubmitStore() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this._inventory_item)
    this._sub = this._storeService.add(this._inventory_item)
      .subscribe(data => {
        console.log(data);
         this.toastr.success('Inventory Items Added !', 'Success',{timeOut: 3000});

      });
  }

  initStore() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._storeService.get().subscribe(
      data => {
        isArray(data) ? this.inventors = data : data;
        this.rows = this.inventors;
        this.temp = [...this.inventors];
      }
    );
  }

 updateFilter(event) {
     const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
     // console.log(d.student.toLowerCase(), val)
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.inventors = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
