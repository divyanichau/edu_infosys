import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularCsv } from 'angular7-csv';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent} from "@swimlane/ngx-datatable";
import { BatchService } from '../../core/services/batch.service';
import { UtilsService } from '../../shared/services/utils.service';
import {ClassService} from '../../core/services/class.service';
import {_class} from '../../core/classes/class';
import { StudentReport } from '../../core/classes/student-report';
import { StudentReportService } from '../../core/services/studentreport.service';

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
  classes: _class[];
  selected_class :number;
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
    private _classService:ClassService,
  	private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService) {
   }

  ngOnInit() { 
  
    this.reset_details_value;
    this.detail_type[1] =true;
   this.LoadClass()
  }
  
  onSubmit() {
    //console.log(this.student_report)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentreportService.get(this.student_report)
     .subscribe(data => {
       //console.log('RETURNED DATA',data)
        this.rows = data;
        this.rows = [...this.rows];
      });
     
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
   console.log('get report..')
   this.studentreport = true;
        
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


  exportAsCSV() {
    const headers = ['id'];//Object.keys(this.rows[0]);
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

    return new AngularCsv(this.rows, 'report', options);
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
          <title>Btech School Name</title>

          <style>
          #dataTable {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }

          title{
            text-center;
          }
          h3 { 
          
            text-align: center;
          }
          table ,td{
            overflow: hidden;
          
        
            border: 1px solid black ;
            border-collapse: collapse;
          
           
          }

          td {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
           
            padding: 8px;
          }
          .center {
            margin: auto;
            width: 50%;
            padding: 10px;
          }
          
          
          //........Customized style.......
          </style>
        </head>
       <body onload="window.print();window.close()">${printContents}</body>
       </html>`
       );
       popupWin.document.close();
      // document.body.innerHTML = printContents;
       //window.print();
      // document.body.innerHTML = originalContents;
      } else{
        alert('please see a report first')
      
      }
    
   
  }


}