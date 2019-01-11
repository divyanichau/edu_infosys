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
import { MarksType } from 'src/app/core/classes/exam/marks_type';
import { AcademicMixin } from '../../core/mixins/academic.mixin';


@Component({
  selector: 'app-marks-entry',
  templateUrl: './marks-entry.component.html',
  styleUrls: ['./marks-entry.component.css']
})
export class MarksEntryComponent extends AcademicMixin implements OnInit {

  // rows = [
  //   { name: 'Austin', gender: 'Male', company: 'Swimlane' },
  //   { name: 'Dany', gender: 'Male', company: 'KFC' },
  //   { name: 'Molly', gender: 'Female', company: 'Burger King' },
  // ];
  // columns = [
  //   { prop: 'name' },
  //   { name: 'Gender' },
  //   { name: 'Company' }
  // ];
  rows: any[] = [];


  //rows: any[] = [];
  temp: any[] = [];
  editing = {};
  //rows = [];

   _sub: Subscription = undefined;
  val: boolean;
  val1: boolean;
  _course: Course[]
  class: _class[]
  _section: Section[]
  _term: setTerm[]
  _subject: Subject[]
  entered_marks: MarksEntry = new MarksEntry();

  //entered_marks.marks_type:marks_type = new marks_type()


  selected_course: number;
  selected_class: number;
  selected_section: number;
  selected_term: number;
  selected_subject: number;

  constructor(
    _utils: UtilsService,
    _courseService: CourseService,
    _classService: ClassService,
    _sectionService: SectionService,
    _termService: SetTermService,
    _subjectService: SubjectService,
    _marksEntryService: MarksEntryService,
    
  ) {
    super(_utils, _courseService, _classService, _sectionService)
  }

  ngOnInit() {
    this.initCourse();
    
    this.rows = [
      
      {
        id: 1,
        name: 'Dinesh Kc',
        theory: 60,
        practical: 40,
        total: 100,
        result: "Pass"
      },
      {
        id: 1,
        name: 'Anup Kc',
        theory: 60,
        practical: 40,
        total: 100,
        result: "Pass"
      }
    ]
   

  }
  // loadCourse() {
  //   this.initCourse();
    // this._utils.unsubscribeSub(this._sub);
    // this._sub = this._courseService.get().subscribe(
    //   data => {
    //     isArray(data) ? this._course = data : data;
    //   // console.log(this._course);
    //     this.selected_course=this._course[0].id;
    //this.loadClass(); 
    // }
    // );


//  }
  onChangeCourse() {
    this.val = false;
    this.val1 = false;
    this.loadClass();
  }
  loadClass() {
    console.log("Selected ourse", this.selected_course);
    // this._academicMixin.initClassWithCourse(this.selected_course);

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._classService.getWithCourse(this.selected_course).subscribe(
      data => {
        isArray(data) ? this.class = data : data;
        console.log("Classws", this.class);
        this.selected_class = this.class[0].id;
        this.loadSection();
      }
    );
  }

  loadSection() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._sectionService.get().subscribe(
      data => {
        isArray(data) ? this._section = data : data;
        console.log(this._section);
        this.selected_section = this._section[0].id;
        this.loadSubject();
      }
    );
  }
  loadSubject() {
    this._utils.unsubscribeSub(this._sub);
    //this._sub = this._subjectService.get().subscribe(
      data => {
        isArray(data) ? this._subject = data : data;
        //console.log(this._subject);
        this.selected_subject = this._subject[0].id;
        this.loadExam();
      }
   // );

  }

  loadExam() {
    this._utils.unsubscribeSub(this._sub);
    //this._sub = this._termService.get().subscribe(
      data => {
        isArray(data) ? this._term = data : data;
        // console.log(this._section);
        this.selected_term = this._term[0].id;

      }
   // );
  }


  onChange() {
    console.log(this.selected_course);
    this.val = false;
    this.val1 = false;
  }
  marksEntryNext() {
    this.val = true;
  }

  loadBodyData() {
    if (this.rows.length > 0) {
      this.val1 = true;
    }
  }

  updateValue(event, cell, rowIndex) {
    // console.log("sgsjjsd");
    // console.log(event);
    // console.log(cell);
    // console.log(rowIndex);
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    // console.log(this.rows);
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  OnSubmitMarks() {
    this.entered_marks.class = this.selected_class;
    this.entered_marks.course = this.selected_course;
    this.entered_marks.section = this.selected_section;
    this.entered_marks.subject = this.selected_subject;
    this.entered_marks.exam = this.selected_term;
    console.log("hfhjssd", this.rows);
    // this.entered_marks.student_data = this.rows

    // console.log(this.entered_marks);
    this._utils.unsubscribeSub(this._sub);
  ///  this._sub = this._marksEntryService.add(this.entered_marks).subscribe(
      data => {



      }
   // );
  }
}
