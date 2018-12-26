import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { CourseService } from '../../core/services/course.service';
import { LibraryService } from '../../core/services/library.service';
import { IssueBook } from '../../core/classes/issuebook';
import { Course } from '../../core/classes/course';
import { UtilsService } from '../../shared/services/utils.service';


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
 default_detail_type = {1:false, 2:false};
 detail_type = this.default_detail_type;
 student = {};
 obj_issue = {};
 issue_book : IssueBook;

 _course: Course[];
 selected_course: number;

 // _batch: Batch;
 // selected_batch :number;

 // _student: Student;
 // selected_student: number;



@ViewChild(DatatableComponent) table: DatatableComponent;


onChange(newValue){
  this.reset_detail_value();
  this.detail_type[newValue] = true;
}

reset_detail_value(){
  this.detail_type = this.default_detail_type;
}

  constructor(
    private _libraryService: LibraryService,
    private _courseService: CourseService,
    private _utils: UtilsService,
    private router: Router
    ) { }
 
  rows = [];
    temp = [];
  
  
  ngOnInit() {
    this.reset_detail_value();
    this.detail_type[1]= true;   
    this.loadCourse(); 

  }


  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.obj_issue)
    this._sub = this._libraryService.addIssue(this.obj_issue)
      .subscribe(data => {
        console.log(data);
        alert('book issue');
      });
  }

 loadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this._course = data : data;
        console.log(this._course)
        this.selected_course = this._course[0].id;
        //console.log(this.section)
      }
    );
  }


    updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  initIssueBook() {
    this._utils.unsubscribeSub(this._typeSub);
    //this.course = new Course();
    //this.obj_course = {};
  }

 
}




