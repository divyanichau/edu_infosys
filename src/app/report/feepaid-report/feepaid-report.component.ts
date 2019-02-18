import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../shared/services/utils.service';
import { FeepaidReport } from '../../core/classes/feepaid-report';
import { FeepaidReportService } from '../../core/services/feepaidreport.service';
import { ClassService } from 'src/app/core/services/class.service';
import { _class } from 'src/app/core/classes/class';
import { NgForm } from '@angular/forms';
import { AngularCsv } from 'angular7-csv';

@Component({
  selector: 'app-feepaid-report',
  templateUrl: './feepaid-report.component.html',
  styleUrls: ['./feepaid-report.component.css']
})
export class FeepaidReportComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  feepaid_report: FeepaidReport = new FeepaidReport();
  paidreport:boolean =false;
  collectivereport =false;
  monthlyreport =false;
  printbutton =false;
  csvbutton =false;
  classes: _class[];
  selected_class :number;
  rows:any[]= [];

@ViewChild('feepaidReport') public paid_report:NgForm;
@ViewChild('collectiveReport') public collective_report:NgForm;
@ViewChild('monthlyReport') public monthly_report:NgForm

  constructor( 
    private _utils: UtilsService,
    private router: Router,
    private _feepaidreportService: FeepaidReportService,
    private _classService:ClassService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.LoadClass();

  }

  onSubmit(type) {
    console.log( type);
    if( type == "feepaidReport"){
      //alert('im in first') ;
      this.collective_report.reset();
      this.monthly_report.reset();
      console.log(this.feepaid_report)
    }else if(type == "collectiveReport"){
      this.paid_report.reset();
      this.monthly_report.reset();
    } else if( type == "monthlyReport"){
      this.paid_report.reset();
      this.collective_report.reset();
    }else{
      alert('im in else')
      console.log('im in else')
    }

    console.log(this.feepaid_report);
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._feepaidreportService.get(this.feepaid_report)
     .subscribe(data => {
       console.log(data);
       this.rows = data;
       this.rows = [...this.rows];
      });
     
     
  }

  LoadClass() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._classService.get().subscribe(
      data => {
        isArray(data) ? this.classes = data : data;
       // console.log(this.classes);
        if(this.classes.length > 0){
         this.selected_class = this.classes[0].id;
       
        }
      }
    );
  }
  
   
  
  get_paidreport(){
    this.paidreport = true;
    
  }
  get_collectivereport(){
    this.collectivereport =true;
    
  }
  get_monthlyreport(){
    this.monthlyreport = true;

  }



  exportAsCSV() {
    //console.log(Object.keys(this.rows[0]));

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
  
    return new AngularCsv(this.rows, 'feepaid report', options);
  }
  
 
 

}
