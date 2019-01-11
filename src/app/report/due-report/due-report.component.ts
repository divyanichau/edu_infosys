import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';


import { BatchService } from '../../core/services/batch.service';
import { UtilsService } from '../../shared/services/utils.service';
import { Batch } from '../../core/classes/batch';
import { DueReport } from '../../core/classes/due-report';
import { DueReportService } from '../../core/services/duereport.service';
import { Course } from '../../core/classes/course';
import { CourseService } from '../../core/services/course.service';


@Component({
  selector: 'app-due-report',
  templateUrl: './due-report.component.html',
  styleUrls: ['./due-report.component.css']
})
export class DueReportComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  batch: Batch[];
  due_report: DueReport = new DueReport();
  duereport=false;

  selected_batch :number;
  selected_course :number;
   default_detail_type={1:false ,2:false};
  detail_type=this.default_detail_type;
  course: Course[];

  onChange(newValue) {
    this.reset_details_value();

    this.detail_type[newValue] = true;
  }

  reset_details_value(){
    this.detail_type = this.default_detail_type;
    this.detail_type[1]=false;
    this.detail_type[2]=false;
    
  }

  

  constructor(	
    private _batchService: BatchService,
    private _courseService: CourseService,
    private _duereportService: DueReportService,
  	private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.reset_details_value;
    this.detail_type[1] =true;
    this.LoadBatch();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  LoadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this.batch = data : data;
        console.log(this.batch);
        if(this.batch.length > 0){
         this.selected_batch = this.batch[0].id;
         this.LoadCourse();
        }
      }
    );
  }
  LoadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this.course = data : data;
        console.log(this.course);
        if(this.course.length > 0){
         this.selected_course = this.course[0].id;
        }
      }
    );
  }



  get_report(){
    this.duereport = true;
       // if(this.selected_student > 0){
 
       // this.studentreport = true;
       // }
   }


}
