import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/classes/course';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: []
})
  
export class CourseComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  obj : Course[];
  course = [];
  obj_course = {};
  selected_course: number;

@ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _courseService: CourseService,
    private _utils: UtilsService,
    private router: Router
    ) { }
 
  rows = [];
    temp = [];
  
  
  ngOnInit() {
    this.initCourse();
    this.loadCourse();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.obj_course)
    this._sub = this._courseService.add(this.obj_course)
      .subscribe(data => {
        console.log(data);
        alert('Course added');
      });
  }

   loadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this.course = data : data;
        console.log(this.course)

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

  initCourse() {
    this._utils.unsubscribeSub(this._typeSub);
    //this.course = new Course();
    //this.obj_course = {};
  }

 
}




