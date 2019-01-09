import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { CourseService } from '../../core/services/course.service';
import { ClassService } from '../../core/services/class.service';
import { LibraryService } from '../../core/services/library.service';
import { Report } from '../../core/classes/bookreport';
import { Course } from '../../core/classes/course';
import { _class } from '../../core/classes/class';

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

 _course: Course[];
   selected_course: number;

   _classes: _class[];
   selected_class :number;

  

   library = [];

   rows: any[] = [];
  temp: any[] = [];
  editing = {};

 default_detail_type = {1:false, 2:false, 3:false, 4:false, 5:false, 
  6:false, 7:false, 8:false, 9:false, 10:false, 11:false, 12:false, 
  13:false, 14:false, 15:false, 16:false, 17:false, 18:false, 19:false
  , 20:false , 21:false , 22:false  , 23:false , 24:false , 25:false  };

 detail_type = this.default_detail_type;

  onChange(newValue) {
    this.reset_details_value();
    this.detail_type[newValue] = true;
  }

  reset_details_value(){
    this.detail_type = this.default_detail_type;

    this.detail_type[1]=false;
    this.detail_type[2]=false;
    this.detail_type[3]=false;    
    this.detail_type[4]=false;
    this.detail_type[5]=false;
    this.detail_type[6]=false;
    this.detail_type[7]=false;
    this.detail_type[8]=false;
    this.detail_type[9]=false;
    this.detail_type[10]=false;
    this.detail_type[11]=false;
    this.detail_type[12]=false;
    this.detail_type[13]=false;
    this.detail_type[14]=false;
    this.detail_type[15]=false;
    this.detail_type[16]=false;
    this.detail_type[17]=false;
    this.detail_type[18]=false;
    this.detail_type[19]=false;
    this.detail_type[20]=false;
    this.detail_type[21]=false;
    this.detail_type[22]=false;
    this.detail_type[23]=false;
    this.detail_type[24]=false;
    this.detail_type[25]=false;


   
   
  }


  constructor(
    private _libraryService: LibraryService,
    private _courseService: CourseService,
    private _classService: ClassService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {
   this.reset_details_value();
    this.detail_type[1]= true;   
    this.loadCourse();  
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
