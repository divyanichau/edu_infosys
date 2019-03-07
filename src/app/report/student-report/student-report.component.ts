import { Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularCsv } from 'angular7-csv';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../shared/services/utils.service';
import { ClassService } from '../../core/services/class.service';
import { _class } from '../../core/classes/class';
import { StudentReport } from '../../core/classes/student-report';
import { StudentReportService } from '../../core/services/studentreport.service';
import {SectionService} from '../../core/services/section.service';
import {Section} from '../../core/classes/section';



@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['../../../assets/css/report-table.css']
})
export class StudentReportComponent implements OnInit {

  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  studentreport = false;
  studentemail = false;
  printbutton = false;
  csvbutton = false;
  student_report: StudentReport = new StudentReport();
  selected_student: number;
  selected_class: number;
  selected_section :number;
  phonenumber: boolean = true;
  email: boolean = true;
  address: boolean = true;
  gurdiandetail: boolean = true;
  parentsdetail: boolean = true;
  amount: boolean = true;
  destinationdetail:boolean =true;
  rows: any[] = [];
  classes: _class[];
  section:Section[];

  
  bloodgroup: boolean = false;
  category: boolean = false;
  religion: boolean = false;
  gender: boolean = false;
  studentby: boolean = false;
  transport: boolean = false;
  classwise: boolean = false;
  sectionwise:boolean = false;
  reportby:boolean =false;
  tmp = {};

  @ViewChild('studentReport1') public studentReport: NgForm;
  report_for: any;
  Bloodgroup:any;
  Province:any;
  Religion:any;
  Gender:any;
  Reportby:any;

  father_name:any;
  father_mobile:any;
  mother_name:any;
  mother_mobile:any;
 
  onChange1(newValue) {
    this.report_for = newValue
    if (newValue == "bloodgroup") {
      this.reset_report1();
      this.bloodgroup = true;
      this.reportby =true;
     // this.student_report.blood_group ;
     // this.onSubmit()
   
    } else if (newValue == "religion") {
      this.reset_report1() 
      this.religion = true;
      this.reportby =true;
      //this.student_report.religion
      //this.onSubmit()
    } else if (newValue == "gender") {
      this.reset_report1()
      this.gender = true;
      this.reportby =true;
      //this.student_report.gender;
      //this.onSubmit()
    } else if (newValue == "transport") {
      this.reset_report1()
      this.transport = true;
      this.reportby =true;
       
      //this.onSubmit()
    } else {
      this.reset_report1()
      this. reset_report2()
      this.reportby =false;
      this.studentreport = false;
     
    }
    this.button_reset();
  this.studentReport.reset();
  
  }

 button_reset(){
  this.printbutton =false;
  this.csvbutton=false;
  this.studentreport =false;
 }
 
  onChange2(value) {
    if (value =="classwise") {
      this.classwise = true;
      this.sectionwise =false;
     // this.student_report.class;
      //this.onSubmit()
    } else if(value == "sectionwise"){
      this.classwise = true;
      this.sectionwise =true;
      //this.student_report.class;
      //this.student_report.section;
      //this.onSubmit()
    }
    else if(value == "allclass"){
      this.classwise = false;
      this.sectionwise = false;
      this.student_report.class = null;
      this.student_report.section = null;
      //this.onSubmit()
    }
    else  {
      this.reset_report2()
    }
    this.button_reset()
   
  }

 reset_report2(){
  this.classwise =false;
  this.sectionwise=false;
 
 } 


 reset_report1() {
    this.bloodgroup =false;
    this.category = false;
    this.gender = false;
    this.religion = false;
    this.transport = false;
  
  }

  constructor(
    private _studentreportService: StudentReportService,
    private _classService: ClassService,
    private _sectionService: SectionService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService) {
    }

   
  ngOnInit() {
    
    this.LoadClass()
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentreportService.get(this.student_report)
      .subscribe(data => {
        //console.log('RETURNED DATA',data)
        this.rows = data;
        this.rows = [...this.rows]
          this.get_report();
       
      });
      console.log(this.rows);
      for(var row of this.rows){
          if(row.guardian_detail.type ="father"){
            this.father_name= row.guardian_detail.name;
            this.father_mobile =row.guardian_detail.mobile;
            
          }else if(row.guardian_detail.type ="mother"){

            this.mother_name= row.guardian_detail.name;
            this.mother_mobile =row.guardian_detail.mobile
            
          }
      }
   

  }


  LoadClass() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._classService.get().subscribe(
      data => {
        isArray(data) ? this.classes = data : data;
        console.log(this.classes);
        if (this.classes.length > 0) {
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
 

  table_headername(){

    if(this.student_report.blood_group == "1"){
      this.Bloodgroup = "A+";
    }else if(this.student_report.blood_group == "2"){
      this.Bloodgroup ="A-"
    }else if(this.student_report.blood_group == "3"){
      this.Bloodgroup ="B+" 
    }else if(this.student_report.blood_group == "4"){
      this.Bloodgroup ="B-"
    }else if(this.student_report.blood_group == "5"){
      this.Bloodgroup ="O+"
    }else if(this.student_report.blood_group == "6"){
      this.Bloodgroup ="O-"
    }else if(this.student_report.blood_group == "7"){
      this.Bloodgroup ="AB+"
    }else if(this.student_report.blood_group == "8"){
      this.Bloodgroup ="AB-"
    }


    if(this.student_report.religion=="1"){
      this.Religion = "hindu";
    }else if(this.student_report.religion=="2"){
      this.Religion = "muslim";
    }else if(this.student_report.religion=="3"){
      this.Religion ="christian"
    }

    if(this.student_report.gender =="1"){
      this.Gender="male";
    }else if(this.student_report.gender=="2"){
      this.Gender="female";
    }
   
  }


  get_report() {
   // console.log(this.student_report.class);
     this.Reportby= this.student_report.reportby;
    if(this.report_for!== undefined && this.report_for!="option" && this.Reportby !==undefined&&this.Reportby!="option" ){
      if(this.student_report.class!==undefined&& this.student_report.class!==null && this.Reportby=="classwise"){
       //console.log(this.student_report.class);
       //console.log(this.Bloodgroup);
       this.show_reporttable();
      }else if(this.Reportby =="sectionwise"&&this.student_report.class!==undefined && this.student_report.section!==undefined && this.student_report.section!==null && this.student_report.class!==null){
        this.show_reporttable();
      }else if(this.Reportby=="allclass"){
        this.show_reporttable();
      }

    }
       
 }
  
 show_reporttable(){
    this. table_headername()
    this.studentreport = true;
    if (this.rows.length>0){
      this.printbutton = true;
      this.csvbutton = true;
    }else{
      this.printbutton = false;
      this.csvbutton = false;
    }

 }


  get_email() {
    this.email = !this.email;

  }
  get_phonenumber() {
    this.phonenumber = !this.phonenumber;
  }
  get_address() {
    this.address = !this.address;

  }
  get_gurdiandetail() {
    this.gurdiandetail = !this.gurdiandetail;
  }

  get_parentsdetail() {
    this.parentsdetail = !this.parentsdetail;
  }
  get_destinationdetail(){
    this.destinationdetail =!this.destinationdetail
  }
 


  exportAsCSV() {
    //console.log(this.rows);
   // if(this.rows.length>0){
      var output = [];
      for (var row of this.rows) {
        // console.log(row);
         var tmp = {
           'Id':row.id,
           'Admission No':row.student_detail.student.registration_no,
           'Name':row.student_detail.student.user.first_name +" "+row.student_detail.student.user.middle_name +" "+row.student_detail.student.user.last_name,
           'Class Name':row.student_detail.class_name,
           'Section Name':row.student_detail.section,
           'Guardain Name': row.guardian_details.name,
           'Guardian Contact':row.guardian_details.contact.number,
           'Guardian Address':row.guardian_details.address.address,
           'Father Name':row.parent_details.father.name,
           'Mother Name':row.parent_details.mother.name,
           'Mother Mobile':row.parent_details.father.mobile,
           'Email':row.email,
           'Admission Date':row.admission_date,
   
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
      return new AngularCsv( output,'student-report', options);
    
    }
    
        
    
   



}