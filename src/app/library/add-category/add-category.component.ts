import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { DatatableComponent} from '@swimlane/ngx-datatable';
import { LibraryService } from '../../core/services/library.service';
import { BookCategory } from '../../core/classes/bookcategory';
import { UtilsService } from '../../shared/services/utils.service';

declare var numeral: any
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: []
})
  
export class AddCategoryComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  obj : BookCategory[];
  obj_category : BookCategory;
 library = [];

@ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _libraryService: LibraryService,
    private _utils: UtilsService,
    private router: Router
    ) { }
 
  rows = [];
    temp = [];
  
  
  ngOnInit() {
    this.initAddCategory();
    this.loadAddCategory();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.obj_category)
    this._sub = this._libraryService.add(this.obj_category)
      .subscribe(data => {
        console.log(data);
        alert('category added');
      });
  }

   loadAddCategory() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._libraryService.get().subscribe(
      data => {
        isArray(data) ? this.library = data : data;
        console.log(this.library)

      }
    );
  }

  //   updateFilter(event) {
  //   const val = event.target.value.toLowerCase();
  //   // filter our data
  //   const temp = this.temp.filter(function(d) {
  //     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  //   });
  //   // update the rows
  //   this.rows = temp;
  //   // Whenever the filter changes, always go back to the first page
  //   this.table.offset = 0;
  // }

  initAddCategory() {
    this._utils.unsubscribeSub(this._typeSub);
   
  }

 
}




