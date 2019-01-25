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
import { ClassService } from 'src/app/core/services/class.service';
import { _class } from 'src/app/core/classes/class';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/core/classes/course';

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
  classes:_class[]
  courses:Course[]

  selected_subject: number;
  selected_term: number;
  selected_class: number;
  selected_course:number;
   

  constructor(
  private _examScheduleService:ExamScheduleService,
  private _utils:UtilsService,
  private _routes:ActivatedRoute,
  private _subjectService:SubjectService,
  private _setTermService: SetTermService,
  private _classService:ClassService,
  private _courseService:CourseService,
  
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
        this.initCourse();
      });
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


          //this.temp = [...this.classes];

      }
  );
}


  loadExamTerm(){
   // console.log(this.selected_class)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._setTermService.getWithClass(this.selected_class).subscribe(
      data => {
        isArray(data) ? this.totlTerm = data : data;
       //console.log(" Totoal term",this.totlTerm);
       this.selected_term=this.totlTerm[0].id;
       //console.log("selcetd term",this.selected_term)
 
       this.loadSubject();

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

  onSubmitUpdateSchedule(){

    // this.scheduleExm.subject=this.selected_subject;
    // this.scheduleExm.term=this.selected_term;
    this.scheduleExm.exam = this.selected_term
    this.scheduleExm.subject = this.selected_subject

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._examScheduleService.update(this.scheduleExm,this.id).subscribe(
      data => {
        //console.log("Updated Data",data);
        this._router.navigate(['exam/schedule_exam']);

      }
    );
    
  }

}
