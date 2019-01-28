import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../shared/services/utils.service';
import { CourseService } from '../../core/services/course.service';
import { ClassService } from '../../core/services/class.service';
import { SectionService } from '../../core/services/section.service';
import { SetTermService } from '../../core/services/set-term.service';

import { Course } from '../../core/classes/course';
import { _class } from '../../core/classes/class';
import { Section } from '../../core/classes/section';
import { setTerm } from '../../core/classes/exam/set-term';
@Component({
  selector: 'app-result-preparation',
  templateUrl: './result-preparation.component.html',
  styleUrls: ['./result-preparation.component.css']
})
export class ResultPreparationComponent implements OnInit {
  private _sub: Subscription = undefined;
  courses:Course[]
  classes : _class[]
  sections:Section[]
  terms:setTerm[]

  
  selected_course: number;
  selected_class: number;
  selected_section: number;
  selected_term: number;
  val: boolean;
  constructor(
    private _utils:UtilsService,
    private _courseService:CourseService,
    private _classService:ClassService,
    private _sectionService:SectionService,
    private _termsService:SetTermService
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
         //this.loadExam();
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
      //console.log(this.selected_course);
      this.val=true;
  }
  onChange(){
    this.val=false;
  }
}
