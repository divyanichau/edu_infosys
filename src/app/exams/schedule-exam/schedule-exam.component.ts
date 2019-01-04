import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../shared/services/utils.service';
import { SubjectService } from '../../core/services/subject.service';
import { SetTermService } from 'src/app/core/services/set-term.service';
import { ExamScheduleService } from 'src/app/core/services/schedule-exam.service';

import { Subject } from '../../core/classes/subject';
import { setTerm } from '../../core/classes/exam/set-term';
import { scheduleExam } from '../../core/classes/exam/schedule-exam';



@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css']
})
export class ScheduleExamComponent implements OnInit {
  private _sub: Subscription = undefined;
  totlSub:Subject[];
  totlTerm:setTerm[];
  totlSchedule:scheduleExam[];
  selected_subject: number;
  selected_term: number;
  scheduleExm:scheduleExam=new scheduleExam();

  constructor(
    private _subjectService:SubjectService,
    private _utils:UtilsService,
    private _setTermService:SetTermService,
    private _examScheduleService:ExamScheduleService,
  ) { }

  ngOnInit() {

    this.initExamSchedule();

  }
 
  initExamSchedule(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._examScheduleService.get().subscribe(
      data => {
      console.log(data);
        isArray(data)?this.totlSchedule=data:data;
        this.loadSubject();
      }
    );
  
  }
  loadSubject() {
   // console.log("Initiated");
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._subjectService.get().subscribe(
      data => {
        isArray(data) ? this.totlSub = data : data;
      // console.log(" Totoal Subjects",this.totlSub);
       this.selected_subject=this.totlSub[0].id;
       this.loadExamTerm();
       

      }
    );
  }
  loadExamTerm(){
    console.log("Hehdss")
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._setTermService.get().subscribe(
      data => {
        isArray(data) ? this.totlTerm = data : data;
       console.log(" Totoal term",this.totlTerm);
       this.selected_term=this.totlTerm[0].id;
       //this.loadExamTerm();
       

      }
    );
  }
  onSubmitSchedule(){
    this.scheduleExm.subject=this.selected_subject;
    this.scheduleExm.term=this.selected_term;
  
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._examScheduleService.add(this.scheduleExm).subscribe(
      data => {
      console.log(data)
      }
    );
  }

}
