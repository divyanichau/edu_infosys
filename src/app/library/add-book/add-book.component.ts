import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { LibraryService } from '../../core/services/library.service';
import { AddBook } from '../../core/classes/addbook';
import { BookCategory } from '../../core/classes/bookcategory';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: []
})
  
export class AddBookComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  selected_lib : number;
  category : BookCategory[];
  add_book = {};
  book : AddBook;


  
  constructor(
    private _libraryService: LibraryService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  
  ngOnInit() {
    this.initAddBook();
    this.loadCategory(); 
   
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    //this.add_book.category = this.selected_lib;
    this._utils.unsubscribeSub(this._sub);
    //console.log(this.add_book)
    this._sub = this._libraryService.addBook(this.add_book)
      .subscribe(data => {
        console.log(data);
        alert('book added');
      });
  }

  loadCategory() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._libraryService.get().subscribe(
      data => {
        isArray(data) ? this.category = data : data;
        console.log(this.category)
        this.selected_lib = this.category[0].id;
       console.log(this.add_book)
      
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

  initAddBook() {
    this._utils.unsubscribeSub(this._typeSub);
    //this.course = new Course();
    //this.obj_course = {};
  }

 
}




