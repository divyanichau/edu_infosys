import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { Config } from '../../shared/classes/app';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { CourseService } from '../../core/services/course.service';
import { ClassService } from '../../core/services/class.service';
import { StudentService } from '../../core/services/student.service';
import { LibraryService } from '../../core/services/library.service';

//import { AddBook } from '../../core/classes/addbook';
import { IssueBook } from '../../core/classes/issuebook';
import { Course } from '../../core/classes/course';
import { _class } from '../../core/classes/class';
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

 _classes: _class[];
 selected_class :number;

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

  searchurl = `${new Config().api}/library/search/`;
  params = {};
  query = '';
  search = '';

  bookSearch(result) {
    console.log(result)
    this.search = result.book_no + result.book_isbn_no + '[ '+result.title +' ]';
    this.obj_book = result;
  }

  

@ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _libraryService: LibraryService,
    private _courseService: CourseService,
    private _classService: ClassService,
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
         this.loadClass();
      }
    );
  }

   loadClass() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._classService.get().subscribe(
      data => {
        isArray(data) ? this._classes = data : data;
        console.log(this._classes);
        this.selected_class = this._classes[0].id;
       this.loadStudent();
      }
    );
  }

  loadStudent() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentService.get().subscribe(
      data => {
        isArray(data) ? this._student = data : data;
        console.log(this._student);
        this.selected_student = this._student[0].id;
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

}




