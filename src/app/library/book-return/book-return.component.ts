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

  _return : BookReturn = new BookReturn();
  _library : BookReturn[];
  //selected_category: number;

  default_book_return = {1:false, 2:false, 3:false};
  book_return = this.default_book_return;

  onChange(newValue) {
    this.reset_details_value();
    this.book_return[newValue] = true;
  }

  reset_details_value(){
    this.book_return = this.default_book_return;
    this.book_return[2]=false;
    this.book_return[3]=false;
    
  }

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
  constructor(
    private _libraryService: LibraryService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }
  
  
  ngOnInit() {
    this.reset_details_value();
    this.book_return[1]= true;   
    this.initReturnBook();
    
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this._return);
    this._sub = this._libraryService.addReturn(this._return)
      .subscribe(data => {
        //console.log(data);
            this.toastr.success('Return Book !', 'Success',{timeOut: 3000});
      });
  }
 

  initReturnBook() {
    this._utils.unsubscribeSub(this._typeSub);
    this._sub = this._libraryService.getReturn().subscribe(
      data => {
        isArray(data) ? this._library = data : data;
        this.rows = this._library;
        this.temp = [...this._library];

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

  

 





