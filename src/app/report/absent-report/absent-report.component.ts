import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';


import { UtilsService } from '../../shared/services/utils.service';
import { AbsentReport } from '../../core/classes/absent-report';
import { AbsentReportService } from '../../core/services/absentreport.service';
import {ClassService} from '../../core/services/class.service';
import {_class} from '../../core/classes/class';
import {SectionService} from '../../core/services/section.service';
import {Section} from '../../core/classes/section';

@Component({
  selector: 'app-absent-report',
  templateUrl: './absent-report.component.html',
  styleUrls: ['./absent-report.component.css']
})
export class AbsentReportComponent implements OnInit {
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  absent_report :AbsentReport = new AbsentReport();

  student_absent_report = false;
  teacher_absent_report = false;
  selected_class: number;
  classes: _class[];
  section :Section[];
  selected_section :number;

  constructor( 
    private _absentreportService: AbsentReportService,
    private _classService: ClassService,
    private _sectionService: SectionService,
  	private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.LoadClass()
  }
  onSubmit() {
    console.log(this.absent_report)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._absentreportService.get(this.absent_report)
     .subscribe(data => {
        console.log(data);
       
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

  get_studentabsentreport(){
    this.student_absent_report =true;
  }
  get_teacherabsentreport(){
    this.teacher_absent_report= true;
  }

}
