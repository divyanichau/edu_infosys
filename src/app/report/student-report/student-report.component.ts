import { Component, OnInit, OnDestroy, Output, EventEmitter,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';


import { BatchService } from '../../core/services/batch.service';
import { UtilsService } from '../../shared/services/utils.service';
import { Batch } from '../../core/classes/batch';
import { StudentReport } from '../../core/classes/student-report';
import { StudentReportService } from '../../core/services/studentreport.service';
import { NgForm } from '@angular/forms';
import { DatatableComponent, TableColumn } from "@swimlane/ngx-datatable";
import { Angular7Csv } from 'angular7-csv';


@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.css']
})
export class StudentReportComponent implements OnInit{

 private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  studentreport= false;
  studentemail = false;
	student_report: StudentReport = new StudentReport();
	selected_student :number;
   batch: Batch[];
   selected_batch :number;
   default_detail_type={1:false , 2:false ,3:false , 4:false, 5:false, 6:false , 7:false, 8:false};
  detail_type=this.default_detail_type;
  phonenumber :boolean = true;
  email :boolean = true;
  address : boolean= true;
  gurdiandetail:boolean = true;
  parentsdetail:boolean = true;
  amount:boolean = true;
  rows: any[] = [];

  @ViewChild('studentReport1') public studentReport:NgForm;
  @ViewChild('dataTable')  public dataTable: DatatableComponent;

  onChange(newValue) {
    this.reset_details_value();

    this.detail_type[newValue] = true;

    this.studentReport.reset();
    
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
    private studentreportService:StudentReportService,
  	private _batchService: BatchService,
  	private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService) {
   }

  ngOnInit() { 
  
    this.reset_details_value;
    this.detail_type[1] =true;
    this.LoadBatch();
   ;

  	
  }
  

  onSubmit() {
    console.log(this.student_report)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentreportService.get(this.student_report)
     .subscribe(data => {
       console.log('RETURNED DATA',data)
        this.rows =  data;
        this.rows = [...this.rows];
         console.log(this.rows);
       
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
        }
      }
    );
  }
 
 


   get_report(){
   	this.studentreport = true;
   		 // if(this.selected_student > 0){
  
        // this.studentreport = true;
        
        // }
      
       
    }
    
     
  
    get_email(){
      this.email = !this.email;
         
     }
     get_phonenumber(){
       this.phonenumber = !this.phonenumber;
     }
     get_address(){
       this.address = !this.address;
      
     }
     get_gurdiandetail(){
       this.gurdiandetail = !this.gurdiandetail;
     }

     get_parentsdetail(){
       this.parentsdetail =!this.parentsdetail;
     }
     get_feesdetail(){
      this.amount =!this.amount;
    }


    
    
   
     




exportAsCSV(dataTable: DatatableComponent) {
  const columns: TableColumn[] = dataTable.columns || dataTable._internalColumns;
  const headers =
      columns
          .map((column: TableColumn) => column.name)
          .filter((e) => e);  // remove column without name (i.e. falsy value)

  const rows: any[] = dataTable.rows.map((row) => {
      let r = {};
      columns.forEach((column) => {
          if (!column.name) { return; }   // ignore column without name
          if (column.prop) {
              let prop = column.prop.toString();
              let value = this.getNestedPropertyValue(row, prop);
              
              r[prop] = (typeof value === 'boolean') ? (value ? 'Yes' : 'No') : value;
          } else {
              // special cases handled here
          }
      })
      return r;
  });

  const options = {
      fieldSeparator  : ',',
      quoteStrings    : '"',
      decimalseparator: '.',
      showLabels      : true,
      headers         : headers,
      showTitle       : false,
      title           : 'Report',
      useBom          : true
  };

  return new Angular7Csv(rows, 'report', options);
}

getNestedPropertyValue(object: any, nestedPropertyName: string) {
    var dotIndex = nestedPropertyName.indexOf(".");
    if (dotIndex == -1) {
        return object[nestedPropertyName];
    } else {
        var propertyName = nestedPropertyName.substring(0, dotIndex);
        var nestedPropertyNames = nestedPropertyName.substring(dotIndex + 1);

        return this.getNestedPropertyValue(object[propertyName], nestedPropertyNames);
    }
}
}