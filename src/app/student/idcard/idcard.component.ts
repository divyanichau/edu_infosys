import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray, find } from 'lodash';

import { Observable, BehaviorSubject } from 'rxjs';


import { CourseService } from '../../core/services/course.service';
import { SectionService } from '../../core/services/section.service';
import { ClassService } from '../../core/services/class.service';
import { StudentService } from '../../core/services/student.service';

import { Student } from '../../core/classes/student';
import { UtilsService } from '../../shared/services/utils.service';

import { AcademicMixin } from '../../core/mixins/academic.mixin';

declare var numeral: any;
@Component({
  selector: 'app-student',
  templateUrl: './idcard.component.html',
  styleUrls: []
})
  
export class IdcardComponent extends AcademicMixin  implements OnInit , OnDestroy{

  student : Student = new Student();
  students: Student[];
  student_id = false;

  selected_student: number;

  // sectionSelectSubject: BehaviorSubject<{name: string}>;
  // sectionSelectSubscription: Subscription;


  onChange(newValue){
    this.reset_detail_value();
}

  reset_detail_value(){
    this.student_id = false;
  }


  constructor(
     private _studentService: StudentService,
     _courseService: CourseService,
     _classService: ClassService,
     _sectionService: SectionService,
     _utils: UtilsService,
    private router: Router
    ) { 
    super(_utils, _courseService, _classService, _sectionService);

  }
  
  ngOnInit() {
    this.initCourse();

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

  generate_card(){
    if(this.selected_student > 0){
      this.student_id = true;
    }else{
      this._utils.notify('failed', 'Please select a student.')
    }
  }

  initStudent(section_id) {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._studentService.getBySection(section_id).subscribe(
      data => {
        isArray(data) ? this.students = data : data;

      }
    );
  }


  loadSectionStudent(section_id){
    this.initStudent(section_id);
  }

  selectStudent(student_id){
    this.selected_student = student_id;
    this.student = find(this.students, function(o) { return o.id == student_id; });

  }

 
}
