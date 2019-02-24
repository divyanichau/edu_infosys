import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';

import { UtilsService } from '../../shared/services/utils.service';
import { StoreService } from '../../core/services/store.service';
import { VendorService } from '../../core/services/vendor.service';
import { CategoryService } from '../../core/services/category.service';

import { inventory_item} from '../../core/classes/inventory-item';
import { _Vendor } from '../../core/classes/vendor';
import { _Category } from '../../core/classes/category';

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

  obj: _Vendor = new _Vendor();
  _vendor: _Vendor[];

  objs: _Category= new _Category();
  _category: _Category[];

  selected_vendor: number;
  selected_category: number;

  rows: any[] = [];
  temp: any[] = [];
  editing = {};
  boo1 = false

 @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _utils: UtilsService,
    private router: Router,
    private _storeService:StoreService,
    private _vendorService: VendorService,
    private _categoryService: CategoryService,
    private toastr: ToastrService
  	) { }

  ngOnInit() {
  	this.loadVendor();
  	// this.initStore();
  	// this._inventory_item.vendor=0
     this. _inventory_item.select_type=0
   	}

   	ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

   onSubmitVendor() {
    this._utils.unsubscribeSub(this._sub);
    this._inventory_item.vendor = this.selected_vendor;
    console.log(this._inventory_item);
    this._sub = this._vendorService.AddVendor(this.obj).subscribe(data => {
      //alert("Vendor Added");
    });
  }

   onSubmitCategory() {
    this._utils.unsubscribeSub(this._sub);
    this._inventory_item.category = this.selected_category;
    console.log(this._inventory_item);
    //console.log(this.obj)
    this._sub = this._categoryService.AddCategory(this.objs).subscribe(data => {
     // console.log(data);
      //alert("Category Added");
    });
  }

   OnSubmitStore() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this._inventory_item)
    this._inventory_item.vendor= this.selected_vendor;
    this._inventory_item.category=this.selected_category;
    this._sub = this._storeService.add(this._inventory_item)
      .subscribe(data => {
        console.log(data);
         this.toastr.success('Inventory Items Added !', 'Success',{timeOut: 3000});

      });
  }

   loadVendor() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._vendorService.getVendor().subscribe(
      data => {
        isArray(data) ? this._vendor = data : data;
        this.selected_vendor = this._vendor[0].id;
        this.loadCategory();
      });
    }


 loadCategory() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._categoryService.getCategory().subscribe(
      data => {
        isArray(data) ? this._category = data : data;
        this.selected_category = this._category[0].id;
        this.initStore();
      }
    );
    }

  initStore() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._storeService.get(this. _inventory_item).subscribe(
      data => {
        this.inventors = data 
        console.log("total Products",this.inventors);
        this.rows = this.inventors;
        this.temp = [...this.inventors];
      });
  }

 delete(id:number){
    if(confirm("Are You Sure Want To Delete?")){
      this._storeService.delete(id).subscribe(data => 
        {
        //console.log(data);
        alert("Deleted");
       },(errr)=>{
         console.log(errr);
       }
       );
     }
  }

 updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.inventors = temp;
    this.table.offset = 0;
  }

 onChange(value:number){
   this._inventory_item.select_type = value
  if (value == 0){
      this.boo1 = false
  }
  else{
    this.boo1 = true
    this._inventory_item.category = this.selected_category
  }
  this.initStore()
 }
}
