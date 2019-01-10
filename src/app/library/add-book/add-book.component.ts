import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { LibraryService } from '../../core/services/library.service';
import { AddBook } from '../../core/classes/addbook';
import { BookCategory } from '../../core/classes/bookcategory';
import { UtilsService } from '../../shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';

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

  add_book : AddBook = new AddBook();
 
  constructor(
    private _libraryService: LibraryService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }
  
  
  
  ngOnInit() {
    this.initAddBook();
    this.loadCategory(); 
   
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    
    this._utils.unsubscribeSub(this._sub);
    this.add_book.category = this.selected_lib;
    this._sub = this._libraryService.addBook(this.add_book)
      .subscribe(data => {
        //console.log(data);
      this.toastr.success('Issue Book !', 'Success',{timeOut: 3000});
      });
  }

  loadCategory() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._libraryService.get().subscribe(
      data => {
        isArray(data) ? this.category = data : data;
        console.log(this.category);
        this.selected_lib = this.category[0].id;
      //console.log(this.add_book);
      
      }
    );
  }
  
  initAddBook() {
    this._utils.unsubscribeSub(this._typeSub);
     this.add_book = new AddBook();
    //this.obj_course = {};
  }

 
}




