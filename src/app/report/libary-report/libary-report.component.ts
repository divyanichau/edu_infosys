import { Component, OnInit,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../shared/services/utils.service';
import {LibaryReport} from '../../core/classes/libary-report';
import {LibaryReportService} from '../../core/services/libaryreport.service';
import {ClassService} from '../../core/services/class.service';
import {SectionService} from '../../core/services/section.service';
import {Section} from '../../core/classes/section';
import {_class} from '../../core/classes/class';
@Component({
  selector: 'app-libary-report',
  templateUrl: './libary-report.component.html',
  styleUrls: ['../../../assets/css/report-table.css']
})
export class LibaryReportComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  libary_report: LibaryReport = new LibaryReport();
  
  availablebook:boolean =false;
  issuedbook:boolean =false;
  libaryReport:boolean =false;
  datewise:boolean =false;
  classwise:boolean =false;
  sectionwise:boolean=false;
  printbutton:boolean =false;

  selected_class: number;
  selected_section :number;

  classes: _class[];
  section :Section[];
  rows:any[]= [];
 
 @ViewChild('libaryreport') public libaryreport:NgForm;

  onChange(newValue) {
    if(newValue == "availablebook"){
      this._utils.unsubscribeSub(this._sub);
      this._sub = this._libaryreportService.get(this.libary_report)
      .subscribe(data => {
         console.log(data);
         this.rows = data;
         this.rows = [...this.rows];
       });
       this.reset_issued();
       this.printbutton =true;
       this.availablebook= true;
     
    }
    else if(newValue == "issuedbook"){
      this.reset_availablebook()
      this.reset_button();
      this.issuedbook = true;
    }
    else{
      this.reset_availablebook()
      this.reset_issued();
      this.reset_button();
    }

  }

 reset_availablebook(){
      this.availablebook= false;   
  }

  reset_button(){
    this.printbutton = false
  }

  reset_issued(){
    this.issuedbook = false;
    this.libaryReport =false;
    this.classwise =false;
    this.sectionwise =false;
    this.datewise =false;
  }

 OnChange(newValue){
   // this.libaryreport.reset();
   
    if(newValue =="datewise"){
      this.reset_issued();
      this.issuedbook =true;
      this.datewise =true;
      this.libary_report.section =null;
      this.libary_report.class_name =null;
      
    }
    else if(newValue=="classwise"){
      this.reset_issued();
      this.issuedbook =true;
      this.classwise =true;
      this.libary_report.end_date =null;
      this.libary_report.start_date =null;
      this.libary_report.section=null;
    }
    else if(newValue == "sectionwise"){
      this.reset_issued();
      this.issuedbook =true;
      this.classwise =true;
      this.sectionwise =true;
      this.libary_report.end_date =null;
      this.libary_report.start_date =null;
    }else{
      this.reset_issued()
      this.issuedbook =true;

    }

    this.printbutton=false;
     
  }

  constructor( 
  	private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService,
    private  _classService:ClassService,
    private _sectionService:SectionService,
    private _libaryreportService:LibaryReportService) { }

  ngOnInit() {
    this.LoadClass()
  }

  onSubmit() {
    //console.log(this.libary_report);
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._libaryreportService.get(this.libary_report)
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
        console.log(this.classes);
        if(this.classes.length > 0){
         this.selected_class = this.classes[0].id;
         this.LoadSection();
        }
      }
    );
  }

  LoadSection() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._sectionService.get().subscribe(
      data => {
        isArray(data) ? this.section = data : data;
        console.log(this.section);
        if(this.section.length > 0){
         this.selected_section = this.section[0].id;
        }
      }
    );
  }

 
  get_reporttype(){
    this.libaryReport =true;
    this.printbutton =true;

  }

  
}
