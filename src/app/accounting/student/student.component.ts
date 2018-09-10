import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { CourseService } from '../../core/services/course.service';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/classes/student';
import { Course } from '../../core/classes/course';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: []
})
  
export class StudentComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  student : Student;
  courses: Course[];


  constructor(
    private _studentService: StudentService,
    private _courseService: CourseService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.initStudent();
    this.loadCourses();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentService.add(this.student)
      .subscribe(data => {
        console.log(data);
        alert('student added');
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

  initStudent() {
    this._utils.unsubscribeSub(this._typeSub);
    this.student = new Student();
  }

 
}
