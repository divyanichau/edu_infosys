import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { CourseService } from '../../core/services/course.service';
import { BatchService } from '../../core/services/batch.service';
import { StudentService } from '../../core/services/student.service';
import { LibraryService } from '../../core/services/library.service';

//import { AddBook } from '../../core/classes/addbook';
import { IssueBook } from '../../core/classes/issuebook';
import { Course } from '../../core/classes/course';
import { Batch } from '../../core/classes/batch';
import { Student } from '../../core/classes/student';
import { UtilsService } from '../../shared/services/utils.service';

import { ToastrService } from 'ngx-toastr';

declare var numeral: any
@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: []
})
  
export class IssueBookComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
 // obj : category[];
 selectedDevice = 'Student';
 default_detail_type = {1:false, 2:false, 3:false};
 detail_type = this.default_detail_type;

obj_book : IssueBook = new IssueBook();

 _course: Course[];
 selected_course: number;

 _batch: Batch[];
 selected_batch :number;

 _student: Student[];
 selected_student: number;

 _issued_books : IssueBook[];

   // selected_user :number;

 onChange(newValue) {
    this.reset_details_value();
    this.detail_type[newValue] = true;
  }

  reset_details_value(){
    this.detail_type = this.default_detail_type;

    this.detail_type[1]=false;
    this.detail_type[2]=false;
    this.detail_type[3]=false;
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
    private _courseService: CourseService,
    private _batchService: BatchService,
    private _studentService: StudentService,
    private _utils: UtilsService,
     private router: Router,
    private toastr: ToastrService
    ) { }
  
  ngOnInit() {
    this.reset_details_value();
    this.detail_type[1]= true; 
    this.initIssueBook();
    
   
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
   //this.obj_book.user = this.selected_user;
   // this.obj_book.user = this.user;
   // this.obj_book.book= this.book;
   console.log("gsdgsaa",this.obj_book)
    this._utils.unsubscribeSub(this._sub);
   console.log(this.obj_book);
    this._sub = this._libraryService.addIssue(this.obj_book)
      .subscribe(data => {
        console.log(data);
     this.toastr.success('Issue Book !', 'Success',{timeOut: 3000});
      });
  }
 
   loadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this._course = data : data;
        console.log(this._course);
        this.selected_course = this._course[0].id;
         this.loadBatch();
      }
    );
  }

   loadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this._batch = data : data;
        console.log(this._batch);
        this.selected_batch = this._batch[0].id;
       this.loadStudent();
      }
    );
  }

  loadStudent() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentService.get().subscribe(
      data => {
        isArray(data) ? this._student = data : data;
        //console.log(this._student);
        console.log("kdskdhwhwkjehwkjehkweh")
      //  this.selected_student = this._student[0].id;
        
      }
    );

  }

   

  initIssueBook() {
  //console.log("kdskdhwhwkjehwkjehkweh")
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._libraryService.getIssue().subscribe(
      data => {
        isArray(data) ? this._issued_books = data : data;
        console.log("issud Book",data);
        this.rows = this._issued_books;
        this.temp = [...this._issued_books];
        this.loadCourse(); 
      }
    );
  }

   updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this._issued_books= temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

 handleResultSelected(result) {
    this.search = result;
  }


  issueDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._libraryService.deleteIssue(id).subscribe(data => 
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




