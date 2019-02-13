import { Component, OnInit,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularCsv } from 'angular7-csv';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../shared/services/utils.service';
import { BatchService } from '../../core/services/batch.service';
import { Batch } from '../../core/classes/batch';
import { DueReport } from '../../core/classes/due-report';
import { DueReportService } from '../../core/services/duereport.service';
import { Course } from '../../core/classes/course';
import {ClassService} from '../../core/services/class.service';
import {_class} from '../../core/classes/class';

@Component({
  selector: 'app-due-report',
  templateUrl: './due-report.component.html',
  styleUrls: ['./due-report.component.css']
})

export class DueReportComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  due_report: DueReport = new DueReport();
  duereport=false;
  batch: Batch[];
  selected_batch:number;
  selected_class:number;
  course: Course[];
  datewise :boolean =false;
  classwise:boolean =false;
  batchwise:boolean =false;
  feecategorywise:boolean =false;
  rows: any[] = [];
  classes: _class[];

  

  @ViewChild('dueReport') public dueReport:NgForm;

  onChange(newValue) {
    if(newValue == "datewise"){
     this.reset_report()
     this.datewise =true;
    }else if(newValue =="classwise"){
      this.reset_report()
      this.classwise =true;
    }else if(newValue == "batchwise"){
      this.reset_report()
      this.batchwise = true;
    }else if(newValue =="feecategorywise"){
      this.reset_report()
      this.feecategorywise =true;
    }else{
      this.reset_report()
      this.duereport = false;
    }

    this.dueReport.reset();
  }
  
  reset_report(){
    this.datewise =false;
    this.classwise =false;
    this.batchwise =false;
    this.feecategorywise =false;
  }
 

  constructor(	
    private _batchService: BatchService,
    private  _classService:ClassService,
    private _duereportService: DueReportService,
  	private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
   
    this.LoadBatch();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    console.log(this.due_report)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._duereportService.get(this.due_report)
    
     .subscribe(data => {
        console.log(data);
        this.rows = data;
        this.rows = [...this.rows];
       
      });
    
  }

  LoadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this.batch = data : data;
        console.log(this.batch);
        if(this.batch.length > 0){
         this.selected_batch = this.batch[0].id;
         this.LoadClass()
        }
      }
    );
  }

  LoadClass() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._classService.get().subscribe(
      data => {
        isArray(data) ? this.classes = data : data;
        console.log(this.classes);
        if(this.classes.length > 0){
         this.selected_class = this.classes[0].id;
         
        }
      }
    );
  }

  get_report(){
    this.duereport = true;

   }

   do_print(id) {   
      console.log(id);
      if(document.getElementById(id) != null){
        var printContents = document.getElementById(id).innerHTML;
        console.log(printContents)
        var popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
        <html>
        <head>
          <link rel="stylesheet" type="text/css" href="../../../assets/css/report-table.css">
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
        </html>`
        );
        popupWin.document.close();
      } else{
        alert('please see a report first')
      
      }
    }




}
