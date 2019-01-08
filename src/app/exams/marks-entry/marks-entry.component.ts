import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../shared/services/utils.service';
import { CourseService } from '../../core/services/course.service';
import { ClassService } from '../../core/services/class.service';
import { SectionService } from '../../core/services/section.service';

import { Course } from '../../core/classes/course';
import { _class } from '../../core/classes/class';
import { Section } from '../../core/classes/section';

@Component({
  selector: 'app-marks-entry',
  templateUrl: './marks-entry.component.html',
  styleUrls: ['./marks-entry.component.css']
})
export class MarksEntryComponent implements OnInit {

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
  rows = [
    {
      id:1,
      name:'Dinesh Kc',
      th:60,
      pr:40,
      total:100,
      result:"Pass"
    },
    {
      id:1,
      name:'Anup Kc',
      th:60,
      pr:40,
      total:100,
      result:"Pass"
    }
  ]

  // rows: any[] = [];
  // temp: any[] = [];
  editing = {};
  //rows = [];

  private _sub: Subscription = undefined;
  val : boolean;
  val1:boolean;
  _course:Course[]
  class : _class[]
  _section:Section[]

  
  selected_course: number;
  selected_class: number;
  selected_section: number;
  constructor(
    private _utils:UtilsService,
    private _courseService:CourseService,
    private _classService:ClassService,
    private _sectionService:SectionService
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
       console.log(this._section);
        this.selected_section=this._section[0].id;
      // this.loadSubject();
      }
    );
  }


  onChange() {
    console.log(this.selected_course);
    this.val=false;
    this.val1=false;
}
  marksEntryNext(){
    this.val=true;
  }

  loadBodyData(){
    if (this.rows.length>0){
    this.val1=true;
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
    console.log(this.rows);
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
}
