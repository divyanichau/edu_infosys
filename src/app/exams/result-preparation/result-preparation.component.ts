import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../shared/services/utils.service';
import { CourseService } from '../../core/services/course.service';
import { ClassService } from '../../core/services/class.service';
import { SectionService } from '../../core/services/section.service';
import { SetTermService } from '../../core/services/set-term.service';
import { SubjectService } from 'src/app/core/services/subject.service';

import { Course } from '../../core/classes/course';
import { _class } from '../../core/classes/class';
import { Section } from '../../core/classes/section';
import { setTerm } from '../../core/classes/exam/set-term';
import { Subject } from 'src/app/core/classes/subject';
import { ResultPreparation,ResultPreparationUpdate } from '../../core/classes/exam/result_preparation';
import { ResultService } from 'src/app/core/services/results.service';
import { subject_allocation } from 'src/app/core/classes/subject-allocation';


@Component({
  selector: 'app-result-preparation',
  templateUrl: './result-preparation.component.html',
  styleUrls: ['./result-preparation.component.css']
})
export class ResultPreparationComponent implements OnInit {
  private _sub: Subscription = undefined;
  rows: any[] = [];

  temp: any[] = [];
  editing = {};

  totlSub:Subject[];
  courses:Course[]
  classes : _class[]
  sections:Section[]
  terms:setTerm[]
  _resultPreparation : ResultPreparation = new ResultPreparation()
  _resultPreparationObject :ResultPreparation[]
  _resultPreparationUpdate:ResultPreparationUpdate = new ResultPreparationUpdate()
  

  
  selected_course: number;
  selected_class: number;
  selected_section: number;
  selected_term: number;
  val: boolean;
  selected_subject: number;
  constructor(
    private _utils:UtilsService,
    private _courseService:CourseService,
    private _classService:ClassService,
    private _sectionService:SectionService,
    private _termsService:SetTermService,
    private _subjectService:SubjectService,
    private _resultService:ResultService
  ) { }

  ngOnInit() {
    this.initCourse();
  }

  initCourse(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this.courses = data : data;
      // console.log(this._course);
        this.selected_course=this.courses[0].id;
        this.initClass(); 
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
          this.loadExam();
        }
      );
    }
    loadExam(){
      this._utils.unsubscribeSub(this._sub);
      this._sub = this._termsService.get().subscribe(
        data => {
          isArray(data) ? this.terms = data : data;
        // console.log(this._term);
          this.selected_term=this.terms[0].id;
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
      this.initClass();
    }
  
    onClassChange(class_id) {
      this.selected_class = class_id;
      this.initSection()
    }
    marksEntryNext() {
      this.val=true;
      this._resultPreparation.section = this.selected_section
      this._resultPreparation.subject = this.selected_subject
      this._resultPreparation.exam = this.selected_term

      this._utils.unsubscribeSub(this._sub);
        this._sub = this._resultService.get(this._resultPreparation).subscribe(
          data => {
            this._resultPreparationObject = data
           // console.log(this._resultPreparationObject)
            this.rows = this._resultPreparationObject
    
          }
        );
      
  }
  onChange(){
    this.val=false;
  }


  updateValue(event, cell, rowIndex) {
    // console.log('inline editing rowIndex', rowIndex)
     this.editing[rowIndex + '-' + cell] = false;
     this._resultPreparationObject[rowIndex][cell] = event.target.value;
     this._resultPreparationObject = [...this._resultPreparationObject];
    //  console.log('UPDATED!', this._resultPreparationObject[rowIndex][cell]);
   }

   UpdateStudentResult(){
    this._resultPreparationUpdate.section = this.selected_section
    this._resultPreparationUpdate.subject = this.selected_subject
    this._resultPreparationUpdate.exam = this.selected_term
    this._resultPreparationUpdate.result_preparation = this._resultPreparationObject

    this._utils.unsubscribeSub(this._sub);
     this._sub = this._resultService.add(this._resultPreparationUpdate).subscribe(
       data => {
       
       }
     );

   }
}
