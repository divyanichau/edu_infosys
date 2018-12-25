import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

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
  classes = [];
  selected_class: number;
  //add_class : _class[];
 
 @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _classService: ClassService,
    private _utils: UtilsService,
    private router: Router
    ) { }

   // rows = [];
   //  temp = [];
  
  
  ngOnInit() {
    this.initClass();
     this.loadClasses();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.obj)
    this._sub = this._classService.add(this.obj)
      .subscribe(data => {
        console.log(data);
        alert('Class added');
      });
  }

  loadClasses() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._classService.get().subscribe(
      data => {
        isArray(data) ? this.classes = data : data;
        console.log(this.classes)

      }
    );
  }


  initClass() {
   this._utils.unsubscribeSub(this._sub);
  // this._sub = this._classService.get().subscribe(
  //     data => {
  //       isArray(data) ? this.add_class = data : data;
  //       this.rows = this.add_class;
  //       this.temp = [...this.add_class];

  //     }
  //   );
  // }
  
  
  //  updateFilter(event) {
  //   const val = event.target.value.toLowerCase();

  //   // filter our data
  //   const temp = this.temp.filter(function(d) {
  //     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  //   });

  //   // update the rows
  //   this.rows = temp;
  //   // Whenever the filter changes, always go back to the first page
  //   this.table.offset = 0;
  }

}







