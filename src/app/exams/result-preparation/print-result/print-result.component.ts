import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../../shared/services/utils.service';
import { CourseService } from '../../../core/services/course.service';
import { ClassService } from '../../../core/services/class.service';
import { SectionService } from '../../../core/services/section.service';

import { Course } from '../../../core/classes/course';
import { _class } from '../../../core/classes/class';
import { Section } from '../../../core/classes/section';

@Component({
  selector: 'app-print-result',
  templateUrl: './print-result.component.html',
  styleUrls: ['./print-result.component.css']
})
export class PrintResultComponent implements OnInit {
  private _sub: Subscription = undefined;
  _course:Course[]
  class : _class[]
  _section:Section[]

  selected_course: number;
  selected_class: number;
  selected_section: number;
  val : boolean 

  constructor(
    private _utils:UtilsService,
    private _courseService:CourseService,
    private _classService:ClassService,
    private _sectionService:SectionService,
  ) { }

  ngOnInit() {
    this.loadCourse();
  }
  loadCourse(){
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this._course = data : data;
      // console.log(this._course);
        this.selected_course=this._course[0].id;
        this.loadClass(); 
      }
    );
    }
    loadClass(){
      this._utils.unsubscribeSub(this._sub);
      this._sub = this._classService.get().subscribe(
        data => {
          isArray(data) ? this.class = data : data;
        // console.log(this.class);
          this.selected_class=this.class[0].id;
          this.loadSection();
        }
      );
    }
    loadSection(){
      this._utils.unsubscribeSub(this._sub);
      this._sub = this._sectionService.get().subscribe(
        data => {
          isArray(data) ? this._section = data : data;
         //console.log(this._section);
          this.selected_section=this._section[0].id;
         this.loadStudent();
        }
      );
    }
    loadStudent(){
      // this.selected_student="Dinesh Kc";

    }

    onChange(){
      this.val=false;
    }
    marksEntryNext(){
      this.val=true;
    }
}
