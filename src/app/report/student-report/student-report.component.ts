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
  styleUrls: ['../../../assets/css/report-table.css']
})
export class StudentReportComponent implements OnInit{

 private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  studentreport= false;
  studentemail = false;
  printbutton =false;
  csvbutton=false;
	student_report: StudentReport = new StudentReport();
	selected_student :number;
  classes: _class[];
  selected_class :number;
  phonenumber :boolean = true;
  email :boolean = true;
  address : boolean= true;
  gurdiandetail:boolean = true;
  parentsdetail:boolean = true;
  amount:boolean = true;
  rows: any[] = [];

  hostel:boolean=false;
  bloodgroup:boolean=false;
  category:boolean=false;
  state:boolean=false;
  religion:boolean =false;
  gender:boolean=false;
  fees:boolean=false;
  transport:boolean=false;

  @ViewChild('studentReport1') public studentReport:NgForm;
  @ViewChild('dataTable')  public dataTable: DatatableComponent;

  onChange(newValue) {
   
    if(newValue =="hostel"){
      this.reset_report()
      this.hostel =true;
    } else if(newValue =="bloodgroup"){
      this.reset_report()
      this.bloodgroup =true; 
    }else if(newValue =="category"){
      this.reset_report()
      this.category =true;
    }else if(newValue =="state"){
      this.reset_report()
      this.state =true;
    }else if(newValue =="religion"){
      this.reset_report()
      this.religion= true;
    }else if(newValue =="gender"){
      this.reset_report()
      this.gender =true;
    }else if(newValue =="fees"){
      this.reset_report()
      this.fees =true;
    }else if(newValue =="transport"){
      this.reset_report()
      this.transport =true;
    }else{
     this.reset_report()
     this.studentreport = false;
    }

    this.studentReport.reset();

     
  }

  reset_report(){
    this.hostel =false;
    this.bloodgroup =false; 
    this.fees =false;
    this.category =false;
    this.gender =false;
    this.state =false;
    this.religion =false;
    this.transport =false;
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
   this.printbutton =true;
   this.csvbutton =true;
        
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