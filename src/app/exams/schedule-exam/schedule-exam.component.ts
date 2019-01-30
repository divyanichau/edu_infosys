import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../shared/services/utils.service';
import { SubjectService } from '../../core/services/subject.service';
import { SetTermService } from 'src/app/core/services/set-term.service';
import { ExamScheduleService } from 'src/app/core/services/schedule-exam.service';
import { AcademicMixin } from 'src/app/core/mixins/academic.mixin';
import { CourseService } from 'src/app/core/services/course.service';
import { ClassService } from 'src/app/core/services/class.service';


import { Subject } from '../../core/classes/subject';
import { setTerm } from '../../core/classes/exam/set-term';
import { scheduleExam } from '../../core/classes/exam/schedule-exam';
import { Course } from 'src/app/core/classes/course';
import { _class } from 'src/app/core/classes/class';





@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css']
})
export class ScheduleExamComponent implements OnInit {
  _sub: Subscription = undefined;
  totlSub:Subject[];
  totlTerm:setTerm[];
  totlSchedule:scheduleExam[];
  courses:Course[]
  classes: _class[];

  selected_subject: number;
  selected_term: number;
  scheduleExm:scheduleExam=new scheduleExam();
  selected_course: number;
  selected_class: number;

  temp: any[] = [];
  start_date: Date;
  end_date: Date;
  constructor(
    private  _utils:UtilsService,
    private _setTermService:SetTermService,
    private _examScheduleService:ExamScheduleService,
   private _courseService:CourseService,
    private _classService:ClassService,

    private _subjectService:SubjectService,
  ) {
    //super(_utils,_courseService,_classService)
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
      //  this.loadExamTerm();
      }
    );
  
  }

  initCourse() {

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
        data => {
            isArray(data) ? this.courses = data : data;
            if (this.courses.length > 0) {
                this.selected_course = this.courses[0].id;
                this.initClass();
            }
        }
    );
}

initClass() {
  this._utils.unsubscribeSub(this._sub);
  this._sub = this._classService.getWithCourse(this.selected_course).subscribe(
      data => {
          isArray(data) ? this.classes = data : data;
          if (this.classes.length > 0) {
              this.selected_class = this.classes[0].id;
             this.loadExamTerm();
          }


          this.temp = [...this.classes];

      }
  );
}



  loadExamTerm(){
   // console.log(this.selected_class)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._setTermService.getWithClass(this.selected_class).subscribe(
      data => {
        isArray(data) ? this.totlTerm = data : data;
      //  console.log(" Totoal term",this.totlTerm);
       this.selected_term=this.totlTerm[0].id;
      //  console.log("selcetd term",this.selected_term)
      this.loadSubject();
      
      for (let term of this.totlTerm ){

        if (term.id = this.selected_term){
        console.log("terms matched_date",term.start_date)
        this.start_date = term.start_date
        this.end_date = term.end_date
         
      }
      }

      }
     
    );
  }

  loadSubject(){
     this._utils.unsubscribeSub(this._sub);
     this._sub = this._subjectService.get().subscribe(
       data => {
         isArray(data) ? this.totlSub = data : data;
        //console.log(" Totoal term",this.totlTerm);
        this.selected_subject=this.totlSub[0].id;
        //this.loadExamTerm();
        
 
       }
     );
   }
 
  onCourseChange(course_id) {
    this.selected_course = course_id;
    console.log(this.selected_course)
    this.initClass();
 //   this.loadExamTerm()
}

onClassChange(class_id) {
    this.selected_class = class_id;
  this.loadExamTerm()
}

  onSubmitSchedule(){
    // this.scheduleExm.course=this.selected_course;
    this.scheduleExm.exam=this.selected_term;
    this.scheduleExm.subject=this.selected_subject;
    console.log(this.scheduleExm)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._examScheduleService.add(this.scheduleExm).subscribe(
      data => {
      //console.log(data)
      }
    );
  }

}
