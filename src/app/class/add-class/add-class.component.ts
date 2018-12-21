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
  obj : _class;
   classes = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _classService: ClassService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
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
    this._utils.unsubscribeSub(this._typeSub);
    this.obj = new _class();
  }

 
}




