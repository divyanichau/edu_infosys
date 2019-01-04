import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { isArray ,isObject} from 'lodash';

import { UtilsService } from '../../../shared/services/utils.service';
import { SetTermService } from 'src/app/core/services/set-term.service';
import { ExamScheduleService } from 'src/app/core/services/schedule-exam.service';
import { SubjectService } from '../../../core/services/subject.service';

import { Subject } from '../../../core/classes/subject';
import { setTerm } from '../../../core/classes/exam/set-term';
import { scheduleExam } from '../../../core/classes/exam/schedule-exam';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  private _sub: Subscription = undefined;
  id: string;
  scheduleExm:scheduleExam=new scheduleExam();
  totlSub: Subject[];
  totlTerm:setTerm[];
  selected_subject: number;
  selected_term: number;

  constructor(
    private _examScheduleService:ExamScheduleService,
    private _utils:UtilsService,
    private _routes:ActivatedRoute,
    private _subjectService:SubjectService,
   private _setTermsService: SetTermService,
   private _router:Router
  ) { }


  ngOnInit() {
   this.initSchedule();
   
  }
  initSchedule(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._examScheduleService.find(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
          this.scheduleExm = data;
         console.log("echeduled Exam",this.scheduleExm);
        }
        this.loadSubject();
      });
  }

  loadSubject() {
    
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
       
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._setTermsService.get().subscribe(
      data => {
        isArray(data) ? this.totlTerm = data : data;
      // console.log(" Totoal Subjects",this.totlSub);
       this.selected_term=this.totlSub[0].id;
      // this.loadExamTerm();
       

      }
    );

   }

  onSubmitUpdateSchedule(){

    this.scheduleExm.subject=this.selected_subject;
    this.scheduleExm.term=this.selected_term;

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._examScheduleService.update(this.scheduleExm,this.id).subscribe(
      data => {
        //console.log("Updated Data",data);
        this._router.navigate(['exam/schedule_exam']);

      }
    );
    
  }

}
