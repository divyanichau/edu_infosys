import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { CourseService } from '../../core/services/course.service';
import { LibraryService } from '../../core/services/library.service';
import { Report } from '../../core/classes/bookreport';
import { Course } from '../../core/classes/course';

import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: []
})
  
export class ReportComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  
  report : Report;
  courses: Course[];
   library = [];

   rows: any[] = [];
  temp: any[] = [];
  editing = {};

 default_detail_type = {1:false, 2:false, 3:false, 4:false, 5:false, 
  6:false, 7:false, 8:false, 9:false, 10:false};

 detail_type = this.default_detail_type;

  onChange(newValue) {
    this.reset_details_value();
    this.detail_type[newValue] = true;
  }

  reset_details_value(){
    this.detail_type = this.default_detail_type;

    this.detail_type[1]=false;
    this.detail_type[2]=false;
   
    this.detail_type[4]=false;
    this.detail_type[5]=false;
    this.detail_type[6]=false;
    this.detail_type[7]=false;
    this.detail_type[8]=false;
    this.detail_type[9]=false;
    this.detail_type[10]=false;
  }


  constructor(
    private _libraryService: LibraryService,
    private _courseService: CourseService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {
   this.reset_details_value();
    this.detail_type[1]= true;   
    this.loadCourses();  
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._libraryService.addReport(this.report)
      .subscribe(data => {
        console.log(data);
        alert('student added');
      });
  }

  loadCourses() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this.courses = data : data;
      console.log(this.courses);
        
      }
    );
  }

  initReport() {
   this._utils.unsubscribeSub(this._typeSub);
    this._sub = this._libraryService.getReport().subscribe(
      data => {
        isArray(data) ? this.library = data : data;
        this.rows = this.library;
        this.temp = [...this.library];

      }
    );
  }



  generate_card(){
    this.detail_type[1] = true;
  }

 
}
