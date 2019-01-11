import { Component, OnInit,AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import * as $ from 'jquery';

import { Config } from '../../shared/classes/app';

import { UtilsService } from '../../shared/services/utils.service';
import { CourseService } from '../../core/services/course.service';
import { SectionService } from '../../core/services/section.service';
import { ClassService } from '../../core/services/class.service';

import { AcademicMixin } from '../../core/mixins/academic.mixin';

import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/classes/student';


declare var numeral: any;
@Component({
  selector: 'app-student',
  templateUrl: './add.component.html',
  styleUrls: []
})
  
export class AddComponent extends AcademicMixin implements OnInit , AfterViewInit, OnDestroy{

  student : Student = new Student();

  searchurl = `${new Config().api}/student/search`;
  params = {};
  query = '';
  search = '';

  populateStudent(result) {
    console.log(result)
    this.search = result.user.first_name + result.user.last_name + '[ '+result.registration_no+' ]';
    this.student = result;
  }

  constructor(
    private router: Router,
    private _studentService: StudentService,
     _utils: UtilsService,
     _courseService: CourseService,
     _classService: ClassService,
     _sectionService: SectionService,
     
    ) {
      super(_utils, _courseService, _classService, _sectionService);

     }

  ngAfterViewInit(){

  }

  ngOnInit() {

    this.initStudent();
    this.initCourse();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this.student.course = this.selected_course;
    this.student._class = this.selected_class;
    this.student.section = this.selected_section;
    this._sub = this._studentService.add(this.student)
      .subscribe(data => {

      });
  }


  initStudent() {
    
  }

 
}
