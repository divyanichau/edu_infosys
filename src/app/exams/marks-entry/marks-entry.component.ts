import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../shared/services/utils.service';
import { CourseService } from '../../core/services/course.service';
import { ClassService } from '../../core/services/class.service';
import { SectionService } from '../../core/services/section.service';
import { SetTermService } from '../../core/services/set-term.service';
import { SubjectService } from '../../core/services/subject.service';
import { MarksEntryService } from '../../core/services/marks-entry.service';

import { Course } from '../../core/classes/course';
import { _class } from '../../core/classes/class';
import { Section } from '../../core/classes/section';
import { setTerm } from '../../core/classes/exam/set-term';
import { Subject } from '../../core/classes/subject';
import { MarksEntry } from '../../core/classes/exam/marks-entry';
import { Student } from '../../core/classes/student';
import { MarksType } from 'src/app/core/classes/exam/marks_type';
import { AcademicMixin } from '../../core/mixins/academic.mixin';
import { StudentService } from 'src/app/core/services/student.service';


@Component({
  selector: 'app-marks-entry',
  templateUrl: './marks-entry.component.html',
  styleUrls: ['./marks-entry.component.css']
})
export class MarksEntryComponent implements OnInit {
  _sub: Subscription = undefined;
  rows: any[] = [];

  temp: any[] = [];
  editing = {};

  val: boolean;
  val1: boolean;
  courses: Course[]
  classes: _class[]
  sections: Section[]
  terms: setTerm[]
  subjects: Subject[]
  students:Student[]
  entered_marks: MarksEntry = new MarksEntry();

  //entered_marks.marks_type:marks_type = new marks_type()


  selected_course: number;
  selected_class: number;
  selected_section: number;
  selected_term: number;
  selected_subject: number;
  theory:number;
  practical:number;
  total:number;

  constructor(
    private _utils: UtilsService,
    private _courseService: CourseService,
    private _classService: ClassService,
    private _sectionService: SectionService,
    private _termService: SetTermService,
    private _subjectService: SubjectService,
    private _marksEntryService: MarksEntryService,
    private _studentService:StudentService

  ) {
    //  super(_utils, _courseService, _classService, _sectionService,_subjectService)
  }

  ngOnInit() {
    this.initStudent();
  }

  initStudent(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentService.get().subscribe(
      data => {
        isArray(data) ? this.students = data : data;
        //console.log("Students Data",data)
        this.rows = this.students 
          this.initCourse();
     
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
        this.loadExamTerm();
      }
    );
  }

  loadExamTerm() {
    // console.log(this.selected_class)
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._termService.getWithClass(this.selected_class).subscribe(
      data => {
        isArray(data) ? this.terms = data : data;
        //console.log(" Totoal term",this.totlTerm);
        this.selected_term = this.terms[0].id;
        //console.log("selcetd term",this.selected_term)
        this.initSubject()

      }

    );
  }

  initSubject() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._subjectService.get().subscribe(
      data => {
        isArray(data) ? this.subjects = data : data;
        //console.log(this._subject);
        this.selected_subject = this.subjects[0].id;
        //this.loadExamTerm();
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

  // onChange() {
  //   console.log(this.selected_course);
  //   this.val = false;
  //   this.val1 = false;
  // }
  marksEntryNext() {
    this.val = true;
  }

  loadBodyData() {
  
      this.val1 = true;
 
  }

  updateValue(event, cell, rowIndex) {
   // console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.theory = this.rows[rowIndex]['theory']
    this.theory = eval(this.theory.toString())
    this.practical = this.rows[rowIndex]['practical']
    this.practical = eval(this.practical.toString())
    this.total = this.SumMarks(this.theory,this.practical)
    console.log(this.total)

  }
  SumMarks(theory:number,practical:number){
    this.total = theory + practical
    return this.total
   // console.log(this.total)
  }
  OnSubmitMarks() {
    this.entered_marks.class = this.selected_class;
    this.entered_marks.course = this.selected_course;
    this.entered_marks.section = this.selected_section;
    this.entered_marks.subject = this.selected_subject;
    this.entered_marks.exam = this.selected_term;
    this.entered_marks.student_data = [...this.rows]

    //console.log(this.entered_marks);
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._marksEntryService.add(this.entered_marks).subscribe(
    data => {
  
    }
    );
  }

  onChange1(event: any): void {
    alert(event)
}
}
