import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { CourseService } from '../../core/services/course.service';
import { TeacherService } from '../../core/services/teacher.service';
import { Teacher } from '../../core/classes/teacher';
import { Course } from '../../core/classes/course';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-teacher',
  templateUrl: './idcard.component.html',
  styleUrls: []
})
  
export class IdcardComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  teacher : Teacher;
  courses: Course[];
  teacher_id = false;

  onChange(newValue){
  this.reset_detail_value();
}

  reset_detail_value(){
  this.teacher_id = false;
}


  constructor(
    private _teacherService: TeacherService,
    private _courseService: CourseService,
    private _utils: UtilsService,
    private router: Router
    ) { }

   rows = [];
    temp = [];
  
  
  ngOnInit() {
    this.initTeacher();
    this.loadCourses();
     this.reset_detail_value();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._teacherService.add(this.teacher)
      .subscribe(data => {
        console.log(data);
        alert('teacher added');
      });
  }

  loadCourses() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this.courses = data : data;
        console.log(this.courses);
      }
    );
  }

  initTeacher() {
    this._utils.unsubscribeSub(this._typeSub);
    this.teacher = new Teacher();
  }

generate_card(){
    this.teacher_id = true;
  }

}

