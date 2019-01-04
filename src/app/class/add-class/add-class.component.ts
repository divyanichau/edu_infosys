import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';

import { ClassService } from '../../core/services/class.service';
import { _class } from '../../core/classes/class';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: []
})
  
export class AddClassComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  
  obj : _class = new _class();
  list = [];
  objs: _class[];
  selected_class: number;
  //add_class : _class[];

   rows: any[] = [];
  temp: any[] = [];
  editing = {};
 
 @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _classService: ClassService,
    private _utils: UtilsService,
   private router: Router,
    private toastr: ToastrService
    ) { }

   
  ngOnInit() {
    this.initClass();
    this.loadClass();
     
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.obj);
    this._sub = this._classService.add(this.obj)
      .subscribe(data => {
        console.log(data);
         this.toastr.success('Class Added !', 'Success',{timeOut: 3000});
      });
  }


   loadClass() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._classService.get().subscribe(
      data => {
        isArray(data) ? this.list = data : data;
        console.log(this.list);

      }
    );
  }

  initClass() {
  this._utils.unsubscribeSub(this._sub);
    this._sub = this._classService.get().subscribe(
      data => {
        isArray(data) ? this.objs = data : data;
        this.list = this.objs;
        this.temp = [...this.objs];

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


 classDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._classService.delete(id).subscribe(data => 
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






