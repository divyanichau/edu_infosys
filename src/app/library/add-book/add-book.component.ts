import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { isArray, isObject } from 'lodash';
import { switchMap } from 'rxjs/operators';


import { DatatableComponent} from '@swimlane/ngx-datatable';
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

id: string;
  selected_lib : number;
  category : BookCategory[];
   
   _library : AddBook[];
   add_book : AddBook = new AddBook();

  rows: any[] = [];
  temp: any[] = [];
  editing = {};
 
 @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _libraryService: LibraryService,
    private _utils: UtilsService,
    private _routes:ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService
    ) { }
  
  
  
  ngOnInit() {

    this.initAddBook();
     this.loadlist();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

 
    onSubmit() {
    console.log(this.id);
    if(typeof(this.id) == 'undefined'){
    this._utils.unsubscribeSub(this._sub);
    this.add_book.category = this.selected_lib;
    this._sub = this._libraryService.addBook(this.add_book)
      .subscribe(data => {
        console.log("add book",data);
        //this._router.navigate(['library/add-book']);
        this.toastr.success('Issue Book !', 'Success',{timeOut: 3000});
      });
    }
    else{
      this._sub = this._libraryService.updateBook(this.add_book,this.id)
      .subscribe();
    }
  }

 
 
   loadCategory() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._libraryService.get().subscribe(
      data => {
        isArray(data) ? this.category = data : data;
        //console.log(this.category);
        this.selected_lib = this.category[0].id;
      //console.log(this.add_book);
     
      }
    );
  }


  loadlist() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._libraryService.getBook().subscribe(
      data => {
        isArray(data) ? this._library = data : data;
        this.rows = this._library;
        this.temp = [...this._library];
  this.loadCategory();

      }
    );
  }


   initAddBook(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._libraryService.findBook(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
         console.log("vhgv",data);
         this.add_book = data;
        console.log("Edit Book",this.add_book);       
        }
      });
  }


    updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this._library = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  bookDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._libraryService.deleteBook(id).subscribe(data => 
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

 





