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
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/core/classes/course';
import { AcademicMixin } from 'src/app/core/mixins/academic.mixin';
import { ClassService } from 'src/app/core/services/class.service';



@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css']
})
export class ScheduleExamComponent extends AcademicMixin implements OnInit {
  _sub: Subscription = undefined;
  totlSub:Subject[];
  totlTerm:setTerm[];
  totlSchedule:scheduleExam[];
  courses:Course[]

  selected_subject: number;
  selected_term: number;
  scheduleExm:scheduleExam=new scheduleExam();
  selected_course: number;

  constructor(
    private _subjectService:SubjectService,
     _utils:UtilsService,
    private _setTermService:SetTermService,
    private _examScheduleService:ExamScheduleService,
   _courseService:CourseService,
    _classService:ClassService
  ) {
    super(_utils,_courseService,_classService)
   }

  ngOnInit() {
   // this.loadExamTerm()
    this.initExamSchedule();

  }
 
  initExamSchedule(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._examScheduleService.get().subscribe(
      data => {
      console.log(data);
        isArray(data)?this.totlSchedule=data:data;
        this.initCourse();
      }
    );
  
  }
  // loadCourse() {
  //  // console.log("Initiated");
  //   this._utils.unsubscribeSub(this._sub);
  //   this._sub = this._courseService.get().subscribe(
  //     data => {
  //       isArray(data) ? this.courses = data : data;
  //     // console.log(" Totoal Subjects",this.totlSub);
  //      this.selected_course=this.courses[0].id;
  //      this.loadExamTerm();
       

  //     }
  //   );
  // }
  loadExamTerm(){
    console.log(this.selected_class)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._setTermService.get().subscribe(
      data => {
        isArray(data) ? this.totlTerm = data : data;
       //console.log(" Totoal term",this.totlTerm);
       this.selected_term=this.totlTerm[0].id;
       //this.loadExamTerm();
       

      }
    );
  }
  onSubmitSchedule(){
    this.scheduleExm.course=this.selected_course;
    this.scheduleExm.exam=this.selected_term;
  
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._examScheduleService.add(this.scheduleExm).subscribe(
      data => {
      console.log(data)
      }
    );
  }

}
