import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { DatatableComponent} from '@swimlane/ngx-datatable';
import { LibraryService } from '../../core/services/library.service';
import { BookReturn } from '../../core/classes/bookreturn';
import { UtilsService } from '../../shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';

declare var numeral: any
@Component({
  selector: 'app-book-return',
  templateUrl: './book-return.component.html',
  styleUrls: []
})
  
export class BookReturnComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  return : BookReturn = new BookReturn();
  library = [];
  //selected_category: number;

  rows: any[] = [];
  temp: any[] = [];
  editing = {};

   url = 'http://suggestqueries.google.com/complete/search';
  params = {
    hl: 'en',
    ds: 'yt',
    xhr: 't',
    client: 'youtube'
  };
  query = '';
  search = '';


@ViewChild(DatatableComponent) table: DatatableComponent;

onChange(newValue){
  }


  constructor(
    private _libraryService: LibraryService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }
  
  
  ngOnInit() {
    this.initAddCategory();
    
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.return);
    this._sub = this._libraryService.addReturn(this.return)
      .subscribe(data => {
        console.log(data);
            this.toastr.success('Book Category Added !', 'Success',{timeOut: 3000});
      });
  }

  

  

  initAddCategory() {
    this._utils.unsubscribeSub(this._typeSub);
    this._sub = this._libraryService.getReturn().subscribe(
      data => {
        isArray(data) ? this.library = data : data;
        this.rows = this.library;
        this.temp = [...this.library];

      }
    );
  }

   handleResultSelected(result) {
    this.search = result;
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
}

  

 





