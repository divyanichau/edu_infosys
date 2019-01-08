import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';


import { BatchService } from '../../core/services/batch.service';
import { UtilsService } from '../../shared/services/utils.service';
import { Batch } from '../../core/classes/batch';
import { StudentReport } from '../../core/classes/student-report';
import { StudentReportService } from '../../core/services/studentreport.service';


@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.css']
})
export class StudentReportComponent implements OnInit , OnDestroy{
 private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
	studentreport= false;
	student_report : StudentReport = new StudentReport();
	selected_student :number;
   batch: Batch[];
   selected_batch :number;
   default_detail_type={1:false , 2:false ,3:false , 4:false, 5:false, 6:false , 7:false, 8:false};
  detail_type=this.default_detail_type;


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
  }




  constructor(
  	private _studentreportService: StudentReportService,
  	private _batchService: BatchService,
  	private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService) {
   }

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
        }
      }
    );
  }

  onSubmit() {
  	console.log("dsjfkf")
    //console.log(this.selected_course);
     //this.student.batch=this.selected_batch;
    this._utils.unsubscribeSub(this._sub);
   // console.log(this.subject)
    this._sub = this._studentreportService.addStudentReport(this.student_report)
      .subscribe(data => {
     
        this.toastr.success('student report!', 'Success',{timeOut: 3000});

      });
  }


   get_report(){
   	this.studentreport = true;
   		 // if(this.selected_student > 0){
  
   		 // this.studentreport = true;
   		 // }
    }



}
