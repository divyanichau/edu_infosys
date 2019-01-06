import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../../shared/services/utils.service';
import { CourseService } from '../services/course.service';
import { SectionService } from '../../core/services/section.service';
import { ClassService } from '../../core/services/class.service';

import { Course } from '../classes/course';
import { Section } from '../../core/classes/section';
import { _class } from '../../core/classes/class';


export class AcademicMixin {
	_sub: Subscription = undefined;
  	_typeSub: Subscription = undefined;

  	courses: Course[];
  	classes: _class[];
  	sections : Section[];

  	course: Course = new Course();
  	__class: _class = new _class(); 
  	section : Section = new Section();
  	
  	selected_course: number;
  	selected_class: number;
  	selected_section: number;


  	rows: any[] = [];
	temp: any[] = [];
	editing = {};


	constructor(
    	public _utils: UtilsService,
    	public _courseService: CourseService,
    	public _classService: ClassService,
    	public _sectionService: SectionService,
    	
  	) { 
		console.log('initialized AcademicMixin..')
  	}


	initCourse() {
	  this._utils.unsubscribeSub(this._sub);
	    this._sub = this._courseService.get().subscribe(
	      data => {
	        isArray(data) ? this.courses = data : data;
	      }
	    );
	  }



  initClass() {
	  this._utils.unsubscribeSub(this._sub);
	    this._sub = this._classService.get(this.selected_course).subscribe(
	      data => {
	        isArray(data) ? this.classes = data : data;
	        this.temp = [...this.classes];

	      }
	    );
	  }

  initSection() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._sectionService.get(this.selected_class).subscribe(
      data => {
        isArray(data) ? this.sections = data : data;
        this.temp = [...this.sections];

      }
    );
  }


  onCourseChange(course_id){
    this.selected_course = course_id;
    this.initClass();
  }

  onClassChange(class_id){
    this.selected_class = class_id;
    this.initSection();
  }

  onSectionChange(section_id){
    this.selected_section = section_id;
    this.initSection();
  }



  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }


}