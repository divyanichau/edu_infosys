import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../../shared/services/utils.service';
import { CourseService } from '../../../core/services/course.service';
import { ClassService } from '../../../core/services/class.service';
import { SectionService } from '../../../core/services/section.service';
import { ResultService } from '../../../core/services/results.service'
import { Student_Result } from 'src/app/core/classes/exam/student_result';
import { StudentService } from 'src/app/core/services/student.service';

import { Course } from '../../../core/classes/course';
import { _class } from '../../../core/classes/class';
import { Section } from '../../../core/classes/section';
import { Student } from 'src/app/core/classes/student';
import { StudentResultDetail } from '../../../core/classes/exam/student_result_detail';

@Component({
  selector: 'app-print-result',
  templateUrl: './print-result.component.html',
  styleUrls: ['./print-result.component.css']
})
export class PrintResultComponent implements OnInit {
  private _sub: Subscription = undefined;
  courses: Course[]
  classes: _class[]
  sections: Section[]
  marks: Student_Result[]
  result: StudentResultDetail
  students: Student[]

  selected_course: number;
  selected_class: number;
  selected_section: number;
  val: boolean
  selected_student: number;
  count :number = 1;

  constructor(
    private _utils: UtilsService,
    private _courseService: CourseService,
    private _classService: ClassService,
    private _sectionService: SectionService,
    private _resultService: ResultService,
    private _studentService: StudentService
  ) { }

  ngOnInit() {
    this.initCourse();
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
          this.initSection();
        }

      }
    );
  }

  initSection() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._sectionService.getWithClass(this.selected_class).subscribe(
      data => {
        isArray(data) ? this.sections = data : data;
        //console.log(this._section);
        this.selected_section = this.sections[0].id;
        this.initStudent();
      }
    );
  }

  initStudent() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentService.get().subscribe(
      data => {
        isArray(data) ? this.students = data : data;
        //console.log("Students Data",data)
        // this.rows = this.students 
        this.selected_student = this.students[0].id

      }
    );
  }
  onCourseChange(course_id) {
    this.selected_course = course_id;
    this.initClass();
  }

  onClassChange(class_id) {
    this.selected_class = class_id;
    this.initSection()
  }

  onChange() {
    this.val = false;
  }

  OnViewMarksClick() {
    this.val = true;
    this._utils.unsubscribeSub(this._sub);
   // console.log(this.selected_student)
    this._sub = this._resultService.find(this.selected_student).subscribe(
      data => {
        // console.log(data)
       this.result = data;
      //  std = this.result.markdetail
        //console.log(this.result);
        // this.selected_section = this.sections[0].id;
        //this.loadExamTerm();
      }
    );
  }

}
