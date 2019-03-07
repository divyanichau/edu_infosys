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
  styleUrls: ['../../../assets/css/report-table.css']
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
  printbutton:boolean = false;
  feecategorywise:boolean =false;
  rows: any[] = [];
  classes: _class[];
  duereport_for:any;
  reportby:boolean =false;
  

  @ViewChild('dueReport') public dueReport:NgForm;

  onChange(newValue) {
   this.duereport_for= newValue;
    if(newValue == "datewise"){
     this.reset_report()
     this.reportby =true;
     this.datewise =true;
    }else if(newValue =="classwise"){
      this.reset_report()
      this.reportby =false;
      this.classwise =true;
    }else if(newValue =="feecategorywise"){
      this.reset_report()
      this.reportby =true;
      this.datewise =true;
      this.feecategorywise =true;
    }else{
      this.reset_report()
      this.reportby =false;
      this.duereport = false;
    }

    this.dueReport.reset();
  }


  onChange2(value) {
    if (value =="class") {
      this.classwise=true;
    }
    else if(value == "allclass"){
      this.classwise = false;
      this.due_report.class_name =null;
      
    }
   
   
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
  if(this.duereport_for== "datewise"&& this.duereport_for =="classwise"){
      this.duereport = true;
      this.printbutton =true;
    }
  }

  exportAsCSV() {
      console.log(this.rows);
      if(this.rows.length>0){
        
      
        var output = [];
        for (var row of this.rows) {
          // console.log(row);
          var tmp = {
            'Id':row.id,
            'Admission No':row.admission,
            'Name':row.name,
            'Guardain Name': row.guardian_details.name,
            'Guardian Contact':row.guardian_details.contact.number,
            'Total Due':row.total_due,
    
          }

          output.push(tmp)
        }

      console.log(output);
      const headers = Object.keys(output[0]);
      
        const options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          headers: headers,
          showTitle: false,
          title: 'Report',
          useBom: true
        };
        return new AngularCsv( output,'due-report', options);
      
      } else{
        alert(' data is empty');
      }
    
  }




}
