import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';

import { AccountingService } from '../../core/services/accounting.service';
import { FeeCategory } from '../../core/classes/feecategory';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-fee-category',
  templateUrl: './fee-category.component.html',
  styleUrls: []
})
  
export class FeeCategoryComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  
  obj : FeeCategory = new FeeCategory();
  list = [];
  objs: FeeCategory[];
  selected_class: number;
  //add_class : _class[];

   rows: any[] = [];
  temp: any[] = [];
  editing = {};
 
 @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _accountingService: AccountingService,
    private _utils: UtilsService,
   private router: Router,
    private toastr: ToastrService
    ) { }

   
  ngOnInit() {
    this.initClass();
  
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.obj);
    this._sub = this._accountingService.addCategory(this.obj)
      .subscribe(data => {
        console.log(data);
         this.toastr.success('Class Added !', 'Success',{timeOut: 3000});
      });
  }


  

  initClass() {
  this._utils.unsubscribeSub(this._sub);
    this._sub = this._accountingService.getCategory().subscribe(
      data => {
        isArray(data) ? this.list = data : data;
        this.rows = this.list;
        this.temp = [...this.list];

      }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.list = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }


 feeDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._accountingService.deleteCategory(id).subscribe(data => 
          {
          //console.log(data);
          // this.toastr.success('Vehicle Added !', 'Success', { timeOut: 3000 });
         },(err)=>{
           console.log(err);
           alert(err);
         }
         );
       }
    }
}






